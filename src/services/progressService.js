import { supabase } from '../lib/supabaseClient';

/**
 * Fetch course progress for an enrollment
 */
export async function fetchCourseProgress(enrollmentId) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('course_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('enrollment_id', enrollmentId)
      .single();

    if (error && error.code === 'PGRST116') {
      return null; // Not found
    }

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to fetch course progress:', error);
    throw error;
  }
}

/**
 * Update course progress
 */
export async function updateCourseProgress(enrollmentId, progressData) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('course_progress')
      .update(progressData)
      .eq('user_id', user.id)
      .eq('enrollment_id', enrollmentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to update course progress:', error);
    throw error;
  }
}

/**
 * Create course progress record
 */
export async function createCourseProgress(enrollmentId, totalLessons = 0) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('course_progress')
      .insert({
        user_id: user.id,
        enrollment_id: enrollmentId,
        total_lessons: totalLessons,
        completed_lessons: 0,
        completion_percentage: 0,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to create course progress:', error);
    throw error;
  }
}

/**
 * Mark lesson as completed
 */
export async function markLessonCompleted(enrollmentId, lessonId) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    // Get current progress
    const progress = await fetchCourseProgress(enrollmentId);
    
    if (!progress) {
      throw new Error('Course progress not found');
    }

    // Add lesson ID to completed list
    const completedIds = progress.completed_lesson_ids || [];
    if (!completedIds.includes(lessonId)) {
      completedIds.push(lessonId);
    }

    // Calculate new completion percentage
    const completionPercentage = progress.total_lessons > 0 
      ? Math.round((completedIds.length / progress.total_lessons) * 100)
      : 0;

    // Update progress
    const { data, error } = await supabase
      .from('course_progress')
      .update({
        completed_lessons: completedIds.length,
        completed_lesson_ids: completedIds,
        completion_percentage: completionPercentage,
        last_accessed_at: new Date().toISOString(),
      })
      .eq('user_id', user.id)
      .eq('enrollment_id', enrollmentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to mark lesson completed:', error);
    throw error;
  }
}

/**
 * Update time spent on course
 */
export async function updateTimeSpent(enrollmentId, additionalSeconds) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    // Get current progress
    const progress = await fetchCourseProgress(enrollmentId);
    
    if (!progress) {
      throw new Error('Course progress not found');
    }

    const { data, error } = await supabase
      .from('course_progress')
      .update({
        total_time_spent: (progress.total_time_spent || 0) + additionalSeconds,
        last_accessed_at: new Date().toISOString(),
      })
      .eq('user_id', user.id)
      .eq('enrollment_id', enrollmentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to update time spent:', error);
    throw error;
  }
}

export default {
  fetchCourseProgress,
  updateCourseProgress,
  createCourseProgress,
  markLessonCompleted,
  updateTimeSpent,
};
