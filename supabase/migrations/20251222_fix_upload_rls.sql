-- Fix admin RLS for course image uploads
-- Idempotent: drops and recreates admin policies on courses

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'courses'
  ) THEN
    -- Ensure RLS is enabled so policies apply
    ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

    -- Recreate admin insert policy
    DROP POLICY IF EXISTS "Admin can create courses" ON public.courses;
    CREATE POLICY "Admin can create courses" ON public.courses
      FOR INSERT TO authenticated
      WITH CHECK (
        EXISTS (
          SELECT 1 FROM public.admin_users
          WHERE admin_users.user_id = auth.uid()
        )
      );

    -- Recreate admin update policy
    DROP POLICY IF EXISTS "Admin can update courses" ON public.courses;
    CREATE POLICY "Admin can update courses" ON public.courses
      FOR UPDATE TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM public.admin_users
          WHERE admin_users.user_id = auth.uid()
        )
      )
      WITH CHECK (
        EXISTS (
          SELECT 1 FROM public.admin_users
          WHERE admin_users.user_id = auth.uid()
        )
      );
  END IF;
END $$ LANGUAGE plpgsql;
