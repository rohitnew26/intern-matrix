-- Automatic fix for admin course creation
-- This will be applied via Supabase CLI

-- Step 1: Disable RLS on admin_users to prevent infinite recursion
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop old course policies
DROP POLICY IF EXISTS "Anyone can view published courses" ON courses;
DROP POLICY IF EXISTS "Admins can insert courses" ON courses;
DROP POLICY IF EXISTS "Admins can update courses" ON courses;
DROP POLICY IF EXISTS "Admins can delete courses" ON courses;

-- Step 3: Create new policies with direct admin_users check
CREATE POLICY "Anyone can view published courses"
  ON courses FOR SELECT
  USING (
    status = 'published' 
    OR 
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can insert courses"
  ON courses FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can update courses"
  ON courses FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete courses"
  ON courses FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.user_id = auth.uid()
    )
  );

-- Step 4: Update is_admin() function to use SECURITY DEFINER (bypass RLS)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 5: Grant SELECT on admin_users to authenticated users
GRANT SELECT ON admin_users TO authenticated;

-- Step 6: Ensure super admin exists (delete first, then insert)
DELETE FROM admin_users WHERE email = 'appdostofficial@gmail.com';

INSERT INTO admin_users (user_id, email, role, permissions)
SELECT 
  id,
  email,
  'super_admin',
  '{"all": true}'::jsonb
FROM auth.users
WHERE email = 'appdostofficial@gmail.com';
