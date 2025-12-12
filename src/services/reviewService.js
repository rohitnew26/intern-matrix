import { supabase } from '../lib/supabaseClient';

/**
 * Fetch all reviews (public)
 */
export async function fetchReviews() {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error && error.code === 'PGRST116') {
      return []; // Table doesn't exist
    }

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return [];
  }
}

/**
 * Fetch user's reviews
 */
export async function fetchUserReviews() {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error && error.code === 'PGRST116') {
      return []; // Table doesn't exist
    }

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Failed to fetch user reviews:', error);
    return [];
  }
}

/**
 * Submit a new review
 */
export async function submitReview(reviewData) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        user_id: user.id,
        user_name: reviewData.name,
        user_email: reviewData.email,
        title: reviewData.title,
        college: reviewData.college || '',
        review_text: reviewData.reviewText,
        rating: parseInt(reviewData.rating),
        profile_image: reviewData.profileImage || '',
        linkedin_url: reviewData.linkedinUrl || '',
        is_published: false, // Requires admin approval
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to submit review:', error);
    throw error;
  }
}

/**
 * Update review
 */
export async function updateReview(reviewId, reviewData) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('reviews')
      .update({
        title: reviewData.title,
        review_text: reviewData.reviewText,
        rating: parseInt(reviewData.rating),
        updated_at: new Date().toISOString(),
      })
      .eq('id', reviewId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to update review:', error);
    throw error;
  }
}

/**
 * Delete review
 */
export async function deleteReview(reviewId) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId)
      .eq('user_id', user.id);

    if (error) throw error;
  } catch (error) {
    console.error('Failed to delete review:', error);
    throw error;
  }
}

/**
 * Get average rating
 */
export async function getAverageRating() {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('rating')
      .eq('is_published', true);

    if (error && error.code === 'PGRST116') {
      return 0;
    }

    if (error) throw error;

    if (!data || data.length === 0) return 0;
    
    const sum = data.reduce((acc, review) => acc + review.rating, 0);
    return (sum / data.length).toFixed(1);
  } catch (error) {
    console.error('Failed to get average rating:', error);
    return 0;
  }
}

export default {
  fetchReviews,
  fetchUserReviews,
  submitReview,
  updateReview,
  deleteReview,
  getAverageRating,
};
