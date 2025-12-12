-- Archived copy (do not run through CLI)
-- Recreate profiles table and trigger safely
-- Created: 2025-12-11

-- Ensure helper function exists
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create profiles table if missing
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY,
  full_name text NULL,
  avatar_url text NULL,
  phone text NULL,
  created_at timestamptz NULL DEFAULT now(),
  updated_at timestamptz NULL DEFAULT now(),
  email text NULL,
  first_name text NULL,
  last_name text NULL,
  mobile text NULL,
  batch text NULL,
  branch text NULL,
  bio text NULL,
  linkedin_url text NULL,
  github_url text NULL,
  portfolio_url text NULL,
  city text NULL,
  state text NULL,
  country text NULL DEFAULT 'India'::text,
  auth_provider text NULL DEFAULT 'email'::text,
  is_profile_complete boolean NULL DEFAULT false,
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users (id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_profiles_id ON public.profiles USING btree (id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles USING btree (email);
CREATE INDEX IF NOT EXISTS idx_profiles_batch ON public.profiles USING btree (batch);

-- Trigger to keep updated_at current
DROP TRIGGER IF EXISTS profiles_set_updated_at ON public.profiles;
CREATE TRIGGER profiles_set_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();
