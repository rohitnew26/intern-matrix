-- Complete database setup for InternMatrix
-- This migration creates all necessary tables, policies, and functions

-- ============================================================================
-- PROFILES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  bio TEXT,
  auth_provider TEXT DEFAULT 'email',
  is_profile_complete BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles(email);

-- ============================================================================
-- ENROLLMENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Course information
  course_id TEXT,
  course_title TEXT NOT NULL,
  course_slug TEXT NOT NULL,
  course_type TEXT DEFAULT 'online', -- online, offline, industrial_training
  instructor_name TEXT,
  course_image TEXT,
  
  -- Payment information
  price_cents INTEGER DEFAULT 0,
  currency TEXT DEFAULT 'INR',
  payment_id TEXT,
  payment_method TEXT DEFAULT 'phonepe',
  
  -- Enrollment status
  status TEXT DEFAULT 'active', -- active, completed, cancelled, expired
  
  -- Course details
  duration TEXT,
  certificate_issued BOOLEAN DEFAULT false,
  certificate_url TEXT,
  
  -- Timestamps
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Policies for enrollments
CREATE POLICY "Users can view own enrollments" ON public.enrollments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own enrollments" ON public.enrollments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can manage all enrollments" ON public.enrollments
  FOR ALL USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS enrollments_user_id_idx ON public.enrollments(user_id);
CREATE INDEX IF NOT EXISTS enrollments_course_slug_idx ON public.enrollments(course_slug);
CREATE INDEX IF NOT EXISTS enrollments_status_idx ON public.enrollments(status);
CREATE UNIQUE INDEX IF NOT EXISTS enrollments_user_course_unique 
  ON public.enrollments(user_id, course_slug);

-- ============================================================================
-- COURSE_PROGRESS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.course_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  enrollment_id UUID REFERENCES public.enrollments(id) ON DELETE CASCADE NOT NULL,
  
  -- Progress tracking
  completed_lessons INTEGER DEFAULT 0,
  total_lessons INTEGER DEFAULT 0,
  completion_percentage INTEGER DEFAULT 0,
  
  -- Lesson tracking (JSONB array of completed lesson IDs)
  completed_lesson_ids JSONB DEFAULT '[]'::jsonb,
  
  -- Time tracking
  total_time_spent INTEGER DEFAULT 0, -- in seconds
  last_accessed_at TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.course_progress ENABLE ROW LEVEL SECURITY;

-- Policies for course_progress
CREATE POLICY "Users can view own progress" ON public.course_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON public.course_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all progress" ON public.course_progress
  FOR ALL USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS course_progress_user_id_idx ON public.course_progress(user_id);
CREATE INDEX IF NOT EXISTS course_progress_enrollment_id_idx ON public.course_progress(enrollment_id);
CREATE UNIQUE INDEX IF NOT EXISTS course_progress_enrollment_unique 
  ON public.course_progress(enrollment_id);

-- ============================================================================
-- WISHLIST TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.wishlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Course information
  course_id TEXT,
  course_title TEXT NOT NULL,
  course_slug TEXT NOT NULL,
  course_type TEXT DEFAULT 'online',
  course_image TEXT,
  instructor_name TEXT,
  price_cents INTEGER DEFAULT 0,
  currency TEXT DEFAULT 'INR',
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;

-- Policies for wishlist
CREATE POLICY "Users can view own wishlist" ON public.wishlist
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert to own wishlist" ON public.wishlist
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete from own wishlist" ON public.wishlist
  FOR DELETE USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS wishlist_user_id_idx ON public.wishlist(user_id);
CREATE INDEX IF NOT EXISTS wishlist_course_slug_idx ON public.wishlist(course_slug);
CREATE UNIQUE INDEX IF NOT EXISTS wishlist_user_course_unique 
  ON public.wishlist(user_id, course_slug);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_enrollments_updated_at ON public.enrollments;
CREATE TRIGGER update_enrollments_updated_at
  BEFORE UPDATE ON public.enrollments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_course_progress_updated_at ON public.course_progress;
CREATE TRIGGER update_course_progress_updated_at
  BEFORE UPDATE ON public.course_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to auto-create progress when enrollment is created
CREATE OR REPLACE FUNCTION create_course_progress_for_enrollment()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.course_progress (user_id, enrollment_id)
  VALUES (NEW.user_id, NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply auto-create progress trigger
DROP TRIGGER IF EXISTS auto_create_progress ON public.enrollments;
CREATE TRIGGER auto_create_progress
  AFTER INSERT ON public.enrollments
  FOR EACH ROW EXECUTE FUNCTION create_course_progress_for_enrollment();

-- ============================================================================
-- VIEWS
-- ============================================================================

-- View: Enrollments with Progress
CREATE OR REPLACE VIEW public.enrollments_with_progress AS
SELECT 
  e.id,
  e.user_id,
  e.course_id,
  e.course_title,
  e.course_slug,
  e.course_type,
  e.instructor_name,
  e.course_image,
  e.price_cents,
  e.currency,
  e.payment_id,
  e.payment_method,
  e.status,
  e.duration,
  e.certificate_issued,
  e.certificate_url,
  e.enrolled_at,
  e.completed_at,
  e.expires_at,
  e.created_at,
  e.updated_at,
  COALESCE(cp.completed_lessons, 0) as completed_lessons,
  COALESCE(cp.total_lessons, 0) as total_lessons,
  COALESCE(cp.completion_percentage, 0) as completion_percentage,
  COALESCE(cp.completed_lesson_ids, '[]'::jsonb) as completed_lesson_ids,
  COALESCE(cp.total_time_spent, 0) as total_time_spent,
  cp.last_accessed_at
FROM public.enrollments e
LEFT JOIN public.course_progress cp ON e.id = cp.enrollment_id;

-- Grant access to the view
GRANT SELECT ON public.enrollments_with_progress TO authenticated;
GRANT SELECT ON public.enrollments_with_progress TO anon;

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to mark lesson as completed
CREATE OR REPLACE FUNCTION mark_lesson_completed(
  p_enrollment_id UUID,
  p_lesson_id TEXT,
  p_total_lessons INTEGER DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  v_progress RECORD;
  v_new_completed INTEGER;
  v_new_percentage INTEGER;
BEGIN
  -- Get current progress
  SELECT * INTO v_progress
  FROM public.course_progress
  WHERE enrollment_id = p_enrollment_id;

  -- If progress doesn't exist, create it
  IF NOT FOUND THEN
    INSERT INTO public.course_progress (user_id, enrollment_id)
    SELECT user_id, id FROM public.enrollments WHERE id = p_enrollment_id;
    
    SELECT * INTO v_progress
    FROM public.course_progress
    WHERE enrollment_id = p_enrollment_id;
  END IF;

  -- Add lesson to completed list if not already there
  IF NOT (v_progress.completed_lesson_ids ? p_lesson_id) THEN
    UPDATE public.course_progress
    SET 
      completed_lesson_ids = completed_lesson_ids || jsonb_build_array(p_lesson_id),
      completed_lessons = completed_lessons + 1,
      total_lessons = COALESCE(p_total_lessons, total_lessons),
      completion_percentage = CASE 
        WHEN COALESCE(p_total_lessons, total_lessons) > 0 
        THEN LEAST(100, ((completed_lessons + 1) * 100 / COALESCE(p_total_lessons, total_lessons)))
        ELSE 0
      END,
      last_accessed_at = timezone('utc'::text, now())
    WHERE enrollment_id = p_enrollment_id
    RETURNING 
      completed_lessons, 
      total_lessons, 
      completion_percentage 
    INTO v_new_completed, v_progress.total_lessons, v_new_percentage;

    RETURN jsonb_build_object(
      'success', true,
      'completed_lessons', v_new_completed,
      'total_lessons', v_progress.total_lessons,
      'completion_percentage', v_new_percentage
    );
  ELSE
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Lesson already completed'
    );
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION mark_lesson_completed TO authenticated;

-- ============================================================================
-- INITIAL DATA / CLEANUP
-- ============================================================================

-- Update existing records to have updated_at if NULL
UPDATE public.profiles SET updated_at = created_at WHERE updated_at IS NULL;
UPDATE public.enrollments SET updated_at = created_at WHERE updated_at IS NULL;
UPDATE public.course_progress SET updated_at = created_at WHERE updated_at IS NULL;

-- Ensure all enrollments have progress records
INSERT INTO public.course_progress (user_id, enrollment_id)
SELECT user_id, id FROM public.enrollments e
WHERE NOT EXISTS (
  SELECT 1 FROM public.course_progress cp WHERE cp.enrollment_id = e.id
);
