-- ============================================================================
-- ADMIN ROLES AND PERMISSIONS
-- Create admin_users table and set appdostofficial@gmail.com as admin
-- ============================================================================

-- Create admin_users table
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'admin', -- admin, super_admin
  permissions JSONB DEFAULT '{"courses": true, "orders": true, "users": true, "payments": true}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index
CREATE INDEX IF NOT EXISTS admin_users_user_id_idx ON public.admin_users(user_id);
CREATE INDEX IF NOT EXISTS admin_users_email_idx ON public.admin_users(email);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Only admins can view admin_users table
CREATE POLICY "Admins can view admin users" ON public.admin_users
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au
      WHERE au.user_id = auth.uid()
    )
  );

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE email = user_email
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert admin user (appdostofficial@gmail.com)
-- This will be executed after the user signs up
INSERT INTO public.admin_users (user_id, email, role, permissions)
SELECT 
  id,
  email,
  'super_admin',
  '{"courses": true, "orders": true, "users": true, "payments": true, "settings": true}'::jsonb
FROM auth.users
WHERE email = 'appdostofficial@gmail.com'
ON CONFLICT (user_id) DO UPDATE
SET role = 'super_admin',
    permissions = '{"courses": true, "orders": true, "users": true, "payments": true, "settings": true}'::jsonb,
    updated_at = timezone('utc'::text, now());

-- Update courses table policies to allow admin full access
DROP POLICY IF EXISTS "Service role can manage courses" ON public.courses;

CREATE POLICY "Admins can manage all courses" ON public.courses
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE user_id = auth.uid()
    )
  );

-- Update orders table policies for admin access
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can insert own orders" ON public.orders;

CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own orders" ON public.orders
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all orders" ON public.orders
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all orders" ON public.orders
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE user_id = auth.uid()
    )
  );

-- Update enrollments policies for admin
CREATE POLICY "Admins can view all enrollments" ON public.enrollments
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all enrollments" ON public.enrollments
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE user_id = auth.uid()
    )
  );

-- Create trigger to auto-add admin on signup (if email matches)
CREATE OR REPLACE FUNCTION public.handle_new_user_admin_check()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the new user's email is appdostofficial@gmail.com
  IF NEW.email = 'appdostofficial@gmail.com' THEN
    INSERT INTO public.admin_users (user_id, email, role, permissions)
    VALUES (
      NEW.id,
      NEW.email,
      'super_admin',
      '{"courses": true, "orders": true, "users": true, "payments": true, "settings": true}'::jsonb
    )
    ON CONFLICT (user_id) DO UPDATE
    SET role = 'super_admin',
        permissions = '{"courses": true, "orders": true, "users": true, "payments": true, "settings": true}'::jsonb,
        updated_at = timezone('utc'::text, now());
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on auth.users (if not exists)
DROP TRIGGER IF EXISTS on_auth_user_created_admin_check ON auth.users;
CREATE TRIGGER on_auth_user_created_admin_check
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_admin_check();

COMMENT ON TABLE public.admin_users IS 'Admin users with elevated permissions';
COMMENT ON FUNCTION public.is_admin(TEXT) IS 'Check if given email belongs to an admin';
COMMENT ON FUNCTION public.is_current_user_admin() IS 'Check if current authenticated user is an admin';
