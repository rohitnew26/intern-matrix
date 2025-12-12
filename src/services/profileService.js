import { supabase } from '../lib/supabaseClient';
import { uploadSingleFile } from './uploadService';

export const fetchProfiles = async ({ limit = 100, search } = {}) => {
  try {
    let query = supabase
      .from('profiles')
      .select('*')
      .limit(limit);
    
    if (search) {
      query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('Admin profiles fetch failed', err);
    throw err;
  }
};

export const fetchUserProfile = async (userId) => {
  if (!userId) return null;
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      throw error;
    }
    
    return data || null;
  } catch (err) {
    console.error('Failed to fetch user profile', err);
    throw err;
  }
};

export const updateUserProfile = async (userId, payload) => {
  if (!userId) throw new Error('User ID is required');
  try {
    const updateData = {
      ...payload,
      user_id: userId,
      updated_at: new Date().toISOString()
    };

    // Try to update existing profile by user_id
    const { data: existing } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (existing) {
      const { data, error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('user_id', userId)
        .select()
        .single();
      if (error) throw error;
      return data;
    }

    const { data, error } = await supabase
      .from('profiles')
      .insert({
        ...updateData,
        created_at: new Date().toISOString()
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Failed to update user profile', err);
    throw err;
  }
};

export const uploadProfilePhoto = async (userId, file) => {
  if (!file) throw new Error('File is required');
  if (!userId) throw new Error('User ID is required');
  
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    // Upload to Supabase storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('profiles')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      throw uploadError;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('profiles')
      .getPublicUrl(filePath);

    if (!publicUrl) {
      throw new Error('Failed to get public URL');
    }

    // Update profile with new avatar URL
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ 
        avatar_url: publicUrl,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (updateError) {
      console.error('Profile update error:', updateError);
      throw updateError;
    }

    return publicUrl;
  } catch (err) {
    console.error('Profile photo upload failed', err);
    throw err;
  }
};
