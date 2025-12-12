-- Relax gender check constraint to allow null/empty submissions from the profile form
-- Created: 2025-12-12

-- Drop the old constraint if it exists
ALTER TABLE public.profiles
  DROP CONSTRAINT profiles_gender_check;

-- Recreate with permissive check (allow null/empty or valid enum values)
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_gender_check
  CHECK (
    gender IS NULL
    OR gender = ''
    OR gender IN ('male', 'female', 'other', 'prefer_not_to_say')
  );
