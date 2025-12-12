import { supabase } from '../lib/supabaseClient';

/**
 * Add course to wishlist
 */
export async function addToWishlist(courseData) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const wishlistItem = {
      user_id: user.id,
      course_id: courseData.id || null,
      course_title: courseData.title || courseData.name || '',
      course_slug: courseData.slug || courseData.skillId || '',
      course_type: courseData.type || 'online',
      course_image: courseData.image || courseData.cover_image || '',
      instructor_name: courseData.instructor || courseData.instructor_name || '',
      price_cents: courseData.price_cents || courseData.price || 0,
      currency: 'INR',
    };

    const { data, error } = await supabase
      .from('wishlist')
      .insert(wishlistItem)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to add to wishlist:', error);
    throw error;
  }
}

/**
 * Remove course from wishlist
 */
export async function removeFromWishlist(courseSlug) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const { error } = await supabase
      .from('wishlist')
      .delete()
      .eq('user_id', user.id)
      .eq('course_slug', courseSlug);

    if (error) throw error;
  } catch (error) {
    console.error('Failed to remove from wishlist:', error);
    throw error;
  }
}

/**
 * Fetch user's wishlist
 */
export async function fetchWishlist() {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('wishlist')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Failed to fetch wishlist:', error);
    throw error;
  }
}

/**
 * Check if course is in wishlist
 */
export async function isInWishlist(courseSlug) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return false;
    }

    const { data, error } = await supabase
      .from('wishlist')
      .select('id')
      .eq('user_id', user.id)
      .eq('course_slug', courseSlug)
      .single();

    if (error && error.code === 'PGRST116') {
      return false; // Not found
    }

    return !!data;
  } catch (error) {
    console.error('Failed to check wishlist:', error);
    return false;
  }
}

export default {
  addToWishlist,
  removeFromWishlist,
  fetchWishlist,
  isInWishlist,
};
