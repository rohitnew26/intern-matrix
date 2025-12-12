-- ============================================
-- VERIFICATION SCRIPT
-- Run this in Supabase SQL Editor to verify setup
-- ============================================

-- 1. Check profiles table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'profiles'
ORDER BY ordinal_position;

-- 2. Check course_progress table exists
SELECT 
    column_name, 
    data_type
FROM information_schema.columns 
WHERE table_name = 'course_progress'
ORDER BY ordinal_position;

-- 3. Verify triggers are active
SELECT 
    trigger_name, 
    event_manipulation, 
    event_object_table,
    action_statement
FROM information_schema.triggers
WHERE trigger_schema = 'public'
AND event_object_table IN ('profiles', 'course_progress', 'enrollments');

-- 4. Check views exist
SELECT 
    table_name as view_name,
    view_definition
FROM information_schema.views
WHERE table_schema = 'public'
AND table_name IN ('enrollments_with_progress', 'user_dashboard_summary');

-- 5. Test progress summary function
-- Replace 'your-user-id' with actual user UUID
-- SELECT * FROM get_user_progress_summary('your-user-id');

-- 6. Check RLS policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE schemaname = 'public'
AND tablename IN ('profiles', 'course_progress', 'enrollments')
ORDER BY tablename, policyname;

-- 7. Check storage buckets (if created)
SELECT 
    id,
    name,
    public
FROM storage.buckets
WHERE name = 'avatars';

-- 8. Sample data check (only if you have data)
-- SELECT COUNT(*) as total_profiles FROM profiles;
-- SELECT COUNT(*) as total_progress FROM course_progress;
-- SELECT COUNT(*) as total_enrollments FROM enrollments;

-- ============================================
-- Expected Results:
-- ============================================
-- profiles: Should have 20+ columns including email, first_name, last_name, 
--           phone, mobile, college_name, batch, branch, bio, etc.
--
-- course_progress: Should have columns for tracking lessons, percentage,
--                  certificates, time spent, etc.
--
-- Triggers: Should see auto_create_progress, calculate_completion_percentage
--
-- Views: enrollments_with_progress should exist
--
-- Policies: Each table should have appropriate RLS policies
-- ============================================
