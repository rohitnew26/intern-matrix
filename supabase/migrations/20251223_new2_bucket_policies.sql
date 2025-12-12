-- Ensure public bucket "New2" exists with 1MB limit and safe upload policies
-- Created: 2025-12-12

-- Create bucket if missing
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'New2') THEN
    INSERT INTO storage.buckets (id, name, "public", file_size_limit)
    VALUES ('New2', 'New2', true, 1000000);
  ELSE
    UPDATE storage.buckets
    SET "public" = true,
        file_size_limit = 1000000
    WHERE id = 'New2';
  END IF;
END $$;

-- Policies for bucket New2 (drop then recreate idempotently)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'New2 uploads insert'
  ) THEN
    DROP POLICY "New2 uploads insert" ON storage.objects;
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'New2 uploads delete'
  ) THEN
    DROP POLICY "New2 uploads delete" ON storage.objects;
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'New2 uploads select'
  ) THEN
    DROP POLICY "New2 uploads select" ON storage.objects;
  END IF;
END $$ LANGUAGE plpgsql;

-- Allow authenticated users to upload files under uploads/ in New2
CREATE POLICY "New2 uploads insert"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'New2'
  AND (storage.foldername(name))[1] = 'uploads'
);

-- Allow owners to delete their own uploads in New2
CREATE POLICY "New2 uploads delete"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'New2'
  AND (storage.foldername(name))[1] = 'uploads'
  AND owner = auth.uid()
);

-- Allow public read of New2 files
CREATE POLICY "New2 uploads select"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'New2');
