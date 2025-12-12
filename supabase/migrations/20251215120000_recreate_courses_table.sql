-- ============================================================================
-- COMPLETE COURSES TABLE RECOVERY
-- This recreates the courses table with all data
-- ============================================================================

-- Drop existing table if it exists (cleanup)
DROP TABLE IF EXISTS public.courses CASCADE;

-- Create courses table with full schema
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Course identifiers
  course_id TEXT UNIQUE NOT NULL,
  course_title TEXT NOT NULL,
  course_slug TEXT UNIQUE NOT NULL,
  course_type TEXT DEFAULT 'online', -- online, offline, industrial_training
  branch TEXT, -- CSE, IT, DS, Civil, Mechanical, Electrical, ECE
  
  -- Course details
  description TEXT,
  instructor_name TEXT,
  course_image TEXT,
  duration TEXT,
  skill_level TEXT DEFAULT 'beginner', -- beginner, intermediate, advanced
  
  -- Pricing
  price_cents INTEGER DEFAULT 0,
  mrp_cents INTEGER, -- Maximum Retail Price
  currency TEXT DEFAULT 'INR',
  
  -- Course content
  syllabus JSONB,
  learning_outcomes TEXT[],
  prerequisites TEXT[],
  
  -- Enrollment info
  max_students INTEGER,
  enrolled_count INTEGER DEFAULT 0,
  
  -- Status and metadata
  status TEXT DEFAULT 'active', -- active, draft, archived
  featured BOOLEAN DEFAULT false,
  
  -- Ratings
  average_rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX idx_courses_slug ON public.courses(course_slug);
CREATE INDEX idx_courses_type ON public.courses(course_type);
CREATE INDEX idx_courses_branch ON public.courses(branch);
CREATE INDEX idx_courses_status ON public.courses(status);
CREATE INDEX idx_courses_featured ON public.courses(featured);

-- Add RLS (Row Level Security) policies
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Anyone can read active courses
CREATE POLICY "Anyone can view active courses" ON public.courses
  FOR SELECT
  USING (status = 'active');

-- Only authenticated users with service_role can modify courses
CREATE POLICY "Service role can manage courses" ON public.courses
  FOR ALL
  USING (auth.role() = 'service_role');

-- Add comment
COMMENT ON TABLE public.courses IS 'Course catalog with online courses and industrial training programs';
COMMENT ON COLUMN public.courses.mrp_cents IS 'Maximum Retail Price in cents (paise). Discounted price is in price_cents.';
