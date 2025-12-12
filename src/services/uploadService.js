 


// Supabase Storage upload to bucket "New2" with 1MB limit
import { supabase } from '../lib/supabaseClient';

const BUCKET = 'New2';
const MAX_SIZE_BYTES = 1_000_000; // 1MB limit per user request

export async function uploadSingleFile(file) {
  if (!file) throw new Error('No file provided');
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error('File too large. Max 1MB allowed.');
  }

  const ext = file.name?.split('.').pop() || 'dat';
  const fileName = `${crypto.randomUUID ? crypto.randomUUID() : Date.now()}-${Math.random().toString(16).slice(2)}.${ext}`;
  const filePath = `uploads/${fileName}`;

  const { data, error } = await supabase.storage.from(BUCKET).upload(filePath, file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) {
    const message = (error.message || '').toLowerCase();
    if (message.includes('bucket') || message.includes('not found')) {
      throw new Error('Upload bucket missing or blocked. Create/publicize bucket "New2" and allow authenticated uploads to uploads/*.');
    }
    if (message.includes('row-level security')) {
      throw new Error('Upload blocked by RLS. Add storage policies for bucket "New2" to allow authenticated insert/delete and public select.');
    }
    throw new Error(error.message || 'Upload failed');
  }

  const { data: publicData } = supabase.storage.from(BUCKET).getPublicUrl(data.path || filePath);
  const url = publicData?.publicUrl;
  if (!url) {
    throw new Error('Could not generate public URL');
  }

  return { url, path: data.path || filePath, success: true };
}

export async function deleteFile(path) {
  if (!path) throw new Error('No path provided');
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) {
    throw new Error(error.message || 'Delete failed');
  }
  return { success: true };
}
