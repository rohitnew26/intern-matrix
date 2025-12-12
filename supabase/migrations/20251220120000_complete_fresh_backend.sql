-- ============================================
-- FRESH START - Complete Backend Schema
-- ============================================

-- Drop existing tables if any
DROP TABLE IF EXISTS public.enrollments CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.payments CASCADE;
DROP TABLE IF EXISTS public.courses CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.admin_users CASCADE;

-- ============================================
-- 1. ADMIN USERS TABLE
-- ============================================
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  permissions JSONB DEFAULT '{"all": true}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. PROFILES TABLE (Enhanced Student Information)
-- ============================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Unique Student ID
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  
  -- Personal Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  
  -- Academic Information
  college_name TEXT,
  university TEXT,
  branch TEXT, -- CSE, ECE, Civil, Mechanical, etc.
  semester TEXT,
  enrollment_number TEXT,
  session TEXT, -- e.g., "2023-2024", "2024-2025"
  graduation_year INTEGER,
  
  -- Contact Information
  alternate_email TEXT,
  alternate_phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  country TEXT DEFAULT 'India',
  
  -- Profile Details
  profile_picture_url TEXT,
  bio TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  portfolio_url TEXT,
  
  -- Skills & Interests
  skills JSONB DEFAULT '[]'::jsonb, -- Array of skills
  interests JSONB DEFAULT '[]'::jsonb, -- Array of interests
  
  -- Professional Information
  current_company TEXT,
  job_title TEXT,
  experience_years INTEGER DEFAULT 0,
  resume_url TEXT,
  
  -- System Fields
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  verification_token TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ
);

-- ============================================
-- 3. COURSES TABLE (Advanced with Rich Content)
-- ============================================
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id TEXT UNIQUE NOT NULL, -- Human-readable ID (e.g., "python-fullstack-2024")
  
  -- Basic Information
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  subtitle TEXT,
  description TEXT,
  
  -- Rich Content (with formatting support)
  detailed_description JSONB, -- Rich text content with formatting
  overview TEXT, -- Short overview for cards
  what_you_learn JSONB DEFAULT '[]'::jsonb, -- Array of learning outcomes
  requirements JSONB DEFAULT '[]'::jsonb, -- Array of prerequisites
  target_audience JSONB DEFAULT '[]'::jsonb, -- Who should take this course
  
  -- Course Structure
  curriculum JSONB DEFAULT '[]'::jsonb, -- Detailed curriculum with modules/lessons
  total_duration_hours INTEGER,
  total_lessons INTEGER DEFAULT 0,
  total_modules INTEGER DEFAULT 0,
  
  -- Categorization
  branch TEXT, -- CSE, IT, ECE, Civil, Mechanical, Electrical, DS
  category TEXT, -- Programming, Web Development, Data Science, etc.
  type TEXT NOT NULL CHECK (type IN ('online', 'industrial_training', 'workshop', 'bootcamp')),
  level TEXT CHECK (level IN ('beginner', 'intermediate', 'advanced', 'all_levels')),
  tags JSONB DEFAULT '[]'::jsonb, -- Array of tags for search
  
  -- Instructor Information
  instructor_name TEXT,
  instructor_title TEXT,
  instructor_bio TEXT,
  instructor_image_url TEXT,
  instructor_rating DECIMAL(3,2) DEFAULT 0.0,
  
  -- Media
  thumbnail_url TEXT,
  banner_url TEXT,
  promo_video_url TEXT,
  gallery_images JSONB DEFAULT '[]'::jsonb, -- Array of image URLs
  
  -- Pricing
  price_cents INTEGER NOT NULL DEFAULT 0, -- Price in paise (₹1 = 100 paise)
  mrp_cents INTEGER DEFAULT 0, -- Original price in paise
  discount_percentage INTEGER DEFAULT 0,
  is_free BOOLEAN DEFAULT FALSE,
  
  -- Features & Benefits
  features JSONB DEFAULT '[]'::jsonb, -- Course features (certificates, lifetime access, etc.)
  tools_covered JSONB DEFAULT '[]'::jsonb, -- Technologies/tools covered
  projects JSONB DEFAULT '[]'::jsonb, -- Projects included in course
  
  -- Enrollment Details
  max_enrollments INTEGER, -- NULL = unlimited
  current_enrollments INTEGER DEFAULT 0,
  enrollment_start_date DATE,
  enrollment_end_date DATE,
  course_start_date DATE,
  course_end_date DATE,
  
  -- Ratings & Reviews
  average_rating DECIMAL(3,2) DEFAULT 0.0,
  total_ratings INTEGER DEFAULT 0,
  
  -- Certificate
  certificate_available BOOLEAN DEFAULT TRUE,
  certificate_template_url TEXT,
  
  -- Status & Visibility
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  is_featured BOOLEAN DEFAULT FALSE,
  is_trending BOOLEAN DEFAULT FALSE,
  is_new BOOLEAN DEFAULT TRUE,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords JSONB DEFAULT '[]'::jsonb,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- ============================================
-- 4. ENROLLMENTS TABLE
-- ============================================
CREATE TABLE public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  
  -- Enrollment Details
  enrollment_date TIMESTAMPTZ DEFAULT NOW(),
  completion_date TIMESTAMPTZ,
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  
  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped', 'suspended')),
  
  -- Certificate
  certificate_issued BOOLEAN DEFAULT FALSE,
  certificate_number TEXT UNIQUE,
  certificate_issued_date TIMESTAMPTZ,
  certificate_url TEXT,
  
  -- Progress Tracking
  lessons_completed JSONB DEFAULT '[]'::jsonb, -- Array of completed lesson IDs
  last_accessed_at TIMESTAMPTZ,
  time_spent_minutes INTEGER DEFAULT 0,
  
  -- Payment Reference
  order_id UUID,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(student_id, course_id)
);

-- ============================================
-- 5. ORDERS TABLE
-- ============================================
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL, -- Human-readable order number
  
  -- Student & Course
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE SET NULL,
  
  -- Order Details
  amount_cents INTEGER NOT NULL, -- Amount in paise
  discount_cents INTEGER DEFAULT 0,
  tax_cents INTEGER DEFAULT 0,
  total_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'INR',
  
  -- Payment Details
  payment_method TEXT, -- phonepe, razorpay, paytm, etc.
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'processing', 'success', 'failed', 'refunded')),
  transaction_id TEXT,
  payment_gateway_response JSONB,
  
  -- Order Status
  order_status TEXT DEFAULT 'created' CHECK (order_status IN ('created', 'confirmed', 'completed', 'cancelled', 'refunded')),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  refunded_at TIMESTAMPTZ
);

-- ============================================
-- 6. PAYMENTS TABLE (Transaction History)
-- ============================================
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- Payment Details
  amount_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'INR',
  payment_method TEXT,
  payment_gateway TEXT, -- phonepe, razorpay, stripe, etc.
  
  -- Transaction Info
  transaction_id TEXT UNIQUE,
  gateway_transaction_id TEXT,
  gateway_response JSONB,
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed', 'refunded')),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  failed_at TIMESTAMPTZ
);

-- ============================================
-- INDEXES for Performance
-- ============================================

-- Admin Users
CREATE INDEX idx_admin_users_email ON public.admin_users(email);
CREATE INDEX idx_admin_users_user_id ON public.admin_users(user_id);

-- Profiles
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_profiles_college ON public.profiles(college_name);
CREATE INDEX idx_profiles_branch ON public.profiles(branch);
CREATE INDEX idx_profiles_session ON public.profiles(session);

-- Courses
CREATE INDEX idx_courses_course_id ON public.courses(course_id);
CREATE INDEX idx_courses_slug ON public.courses(slug);
CREATE INDEX idx_courses_branch ON public.courses(branch);
CREATE INDEX idx_courses_type ON public.courses(type);
CREATE INDEX idx_courses_status ON public.courses(status);
CREATE INDEX idx_courses_featured ON public.courses(is_featured) WHERE is_featured = true;
CREATE INDEX idx_courses_trending ON public.courses(is_trending) WHERE is_trending = true;

-- Enrollments
CREATE INDEX idx_enrollments_student ON public.enrollments(student_id);
CREATE INDEX idx_enrollments_course ON public.enrollments(course_id);
CREATE INDEX idx_enrollments_status ON public.enrollments(status);
CREATE INDEX idx_enrollments_certificate ON public.enrollments(certificate_number) WHERE certificate_number IS NOT NULL;

-- Orders
CREATE INDEX idx_orders_student ON public.orders(student_id);
CREATE INDEX idx_orders_course ON public.orders(course_id);
CREATE INDEX idx_orders_order_number ON public.orders(order_number);
CREATE INDEX idx_orders_payment_status ON public.orders(payment_status);
CREATE INDEX idx_orders_transaction_id ON public.orders(transaction_id);

-- Payments
CREATE INDEX idx_payments_order ON public.payments(order_id);
CREATE INDEX idx_payments_student ON public.payments(student_id);
CREATE INDEX idx_payments_transaction ON public.payments(transaction_id);
CREATE INDEX idx_payments_status ON public.payments(status);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Helper Functions
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN is_admin();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- ADMIN_USERS POLICIES
-- ============================================

CREATE POLICY "Admins can view all admin users"
  ON public.admin_users FOR SELECT
  USING (is_admin());

CREATE POLICY "Super admins can manage admin users"
  ON public.admin_users FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

-- ============================================
-- PROFILES POLICIES
-- ============================================

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can update all profiles"
  ON public.profiles FOR UPDATE
  USING (is_admin());

-- ============================================
-- COURSES POLICIES
-- ============================================

CREATE POLICY "Anyone can view published courses"
  ON public.courses FOR SELECT
  USING (status = 'published' OR is_admin());

CREATE POLICY "Admins can insert courses"
  ON public.courses FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update courses"
  ON public.courses FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete courses"
  ON public.courses FOR DELETE
  USING (is_admin());

-- ============================================
-- ENROLLMENTS POLICIES
-- ============================================

CREATE POLICY "Users can view own enrollments"
  ON public.enrollments FOR SELECT
  USING (
    student_id IN (
      SELECT id FROM public.profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own enrollments"
  ON public.enrollments FOR UPDATE
  USING (
    student_id IN (
      SELECT id FROM public.profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "System can insert enrollments"
  ON public.enrollments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all enrollments"
  ON public.enrollments FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can manage all enrollments"
  ON public.enrollments FOR ALL
  USING (is_admin());

-- ============================================
-- ORDERS POLICIES
-- ============================================

CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING (
    student_id IN (
      SELECT id FROM public.profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "System can insert orders"
  ON public.orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all orders"
  ON public.orders FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can manage all orders"
  ON public.orders FOR ALL
  USING (is_admin());

-- ============================================
-- PAYMENTS POLICIES
-- ============================================

CREATE POLICY "Users can view own payments"
  ON public.payments FOR SELECT
  USING (
    student_id IN (
      SELECT id FROM public.profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "System can insert payments"
  ON public.payments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all payments"
  ON public.payments FOR SELECT
  USING (is_admin());

-- ============================================
-- TRIGGERS for Updated_at
-- ============================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON public.admin_users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_enrollments_updated_at
  BEFORE UPDATE ON public.enrollments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- AUTO-CREATE ADMIN USER
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create profile for new user
  INSERT INTO public.profiles (user_id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  );
  
  -- Auto-create admin if email matches
  IF NEW.email = 'appdostofficial@gmail.com' THEN
    INSERT INTO public.admin_users (user_id, email, role, permissions)
    VALUES (NEW.id, NEW.email, 'super_admin', '{"all": true}'::jsonb)
    ON CONFLICT (email) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure trigger can be recreated safely
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- GRANT PERMISSIONS
-- ============================================

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;
