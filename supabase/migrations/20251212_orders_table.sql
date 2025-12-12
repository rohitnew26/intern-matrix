-- Migration to add orders table for tracking all payment attempts
-- Created: 2025-12-11

-- ============================================================================
-- HELPER FUNCTION: Update updated_at timestamp
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- ORDERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Order/Transaction Information
  order_id TEXT UNIQUE NOT NULL, -- PhonePe transaction ID
  transaction_id TEXT,
  merchant_transaction_id TEXT,
  
  -- Course Information
  course_id TEXT,
  course_title TEXT NOT NULL,
  course_slug TEXT NOT NULL,
  course_type TEXT DEFAULT 'online',
  course_image TEXT,
  instructor_name TEXT,
  
  -- Payment Information
  amount_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'INR',
  payment_method TEXT DEFAULT 'phonepe',
  payment_status TEXT DEFAULT 'pending', -- pending, success, failed, cancelled
  
  -- Payment Details
  payment_response JSONB,
  payment_url TEXT,
  callback_url TEXT,
  redirect_url TEXT,
  
  -- Status and Tracking
  status TEXT DEFAULT 'pending', -- pending, processing, completed, failed, cancelled
  payment_verified BOOLEAN DEFAULT false,
  enrollment_created BOOLEAN DEFAULT false,
  enrollment_id UUID REFERENCES public.enrollments(id) ON DELETE SET NULL,
  
  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb,
  error_message TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policies for orders
CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can manage all orders" ON public.orders
  FOR ALL USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS orders_user_id_idx ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS orders_order_id_idx ON public.orders(order_id);
CREATE INDEX IF NOT EXISTS orders_payment_status_idx ON public.orders(payment_status);
CREATE INDEX IF NOT EXISTS orders_status_idx ON public.orders(status);
CREATE INDEX IF NOT EXISTS orders_course_slug_idx ON public.orders(course_slug);
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON public.orders(created_at DESC);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_orders_updated_at ON public.orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- VIEW: User Order History with Enrollment Status
-- ============================================================================
CREATE OR REPLACE VIEW public.user_order_history AS
SELECT 
  o.id,
  o.user_id,
  o.order_id,
  o.transaction_id,
  o.course_id,
  o.course_title,
  o.course_slug,
  o.course_type,
  o.course_image,
  o.instructor_name,
  o.amount_cents,
  o.currency,
  o.payment_method,
  o.payment_status,
  o.status,
  o.payment_verified,
  o.enrollment_created,
  o.enrollment_id,
  o.error_message,
  o.created_at,
  o.updated_at,
  o.completed_at,
  e.status as enrollment_status,
  e.created_at as enrollment_created_at,
  CASE 
    WHEN o.payment_status = 'success' AND o.enrollment_created = true THEN 'enrolled'
    WHEN o.payment_status = 'success' AND o.enrollment_created = false THEN 'payment_success_no_enrollment'
    WHEN o.payment_status = 'pending' THEN 'pending'
    WHEN o.payment_status = 'failed' THEN 'failed'
    ELSE 'unknown'
  END as order_enrollment_status
FROM public.orders o
LEFT JOIN public.enrollments e ON o.enrollment_id = e.id;

-- Grant access to the view
GRANT SELECT ON public.user_order_history TO authenticated;
GRANT SELECT ON public.user_order_history TO anon;

-- ============================================================================
-- FUNCTION: Create Order
-- ============================================================================
CREATE OR REPLACE FUNCTION public.create_order(
  p_user_id UUID,
  p_order_id TEXT,
  p_course_id TEXT,
  p_course_title TEXT,
  p_course_slug TEXT,
  p_amount_cents INTEGER,
  p_currency TEXT DEFAULT 'INR',
  p_payment_method TEXT DEFAULT 'phonepe',
  p_course_image TEXT DEFAULT NULL,
  p_instructor_name TEXT DEFAULT NULL,
  p_metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS UUID AS $$
DECLARE
  v_order_id UUID;
BEGIN
  INSERT INTO public.orders (
    user_id,
    order_id,
    course_id,
    course_title,
    course_slug,
    course_image,
    instructor_name,
    amount_cents,
    currency,
    payment_method,
    payment_status,
    status,
    metadata
  )
  VALUES (
    p_user_id,
    p_order_id,
    p_course_id,
    p_course_title,
    p_course_slug,
    p_course_image,
    p_instructor_name,
    p_amount_cents,
    p_currency,
    p_payment_method,
    'pending',
    'pending',
    p_metadata
  )
  RETURNING id INTO v_order_id;
  
  RETURN v_order_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.create_order TO authenticated;

-- ============================================================================
-- FUNCTION: Update Order Payment Status
-- ============================================================================
CREATE OR REPLACE FUNCTION public.update_order_payment_status(
  p_order_id TEXT,
  p_payment_status TEXT,
  p_payment_response JSONB DEFAULT NULL,
  p_error_message TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
  v_updated BOOLEAN;
BEGIN
  UPDATE public.orders
  SET 
    payment_status = p_payment_status,
    status = CASE 
      WHEN p_payment_status = 'success' THEN 'completed'
      WHEN p_payment_status = 'failed' THEN 'failed'
      ELSE status
    END,
    payment_verified = CASE WHEN p_payment_status = 'success' THEN true ELSE false END,
    payment_response = COALESCE(p_payment_response, payment_response),
    error_message = p_error_message,
    completed_at = CASE WHEN p_payment_status IN ('success', 'failed') THEN NOW() ELSE completed_at END,
    updated_at = NOW()
  WHERE order_id = p_order_id;
  
  GET DIAGNOSTICS v_updated = ROW_COUNT;
  RETURN v_updated > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.update_order_payment_status TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_order_payment_status TO service_role;
