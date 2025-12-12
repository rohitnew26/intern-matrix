-- Fix RLS on public.courses for admin create/update (image upload writes)
-- Created: 2025-12-12

-- Ensure RLS is enabled
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Drop existing course policies that might block admins
DROP POLICY IF EXISTS "Anyone can view published courses" ON public.courses;
DROP POLICY IF EXISTS "Admins can insert courses" ON public.courses;
DROP POLICY IF EXISTS "Admins can update courses" ON public.courses;
DROP POLICY IF EXISTS "Admins can delete courses" ON public.courses;
DROP POLICY IF EXISTS "Admin can create courses" ON public.courses;
DROP POLICY IF EXISTS "Admin can update courses" ON public.courses;

-- Read policy: allow published to all, admins see everything
CREATE POLICY "Anyone can view published courses"
ON public.courses FOR SELECT
USING (
  status = 'published'
  OR EXISTS (
    SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()
  )
);

-- Insert: only admins
CREATE POLICY "Admins can insert courses"
ON public.courses FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()
  )
);

-- Update: only admins
CREATE POLICY "Admins can update courses"
ON public.courses FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()
  )
);

-- Delete: only admins
CREATE POLICY "Admins can delete courses"
ON public.courses FOR DELETE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()
  )
);

-- Allow authenticated to read admin_users for policy checks
GRANT SELECT ON public.admin_users TO authenticated;
