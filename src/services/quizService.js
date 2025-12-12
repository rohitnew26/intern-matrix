import { supabase } from '../lib/supabaseClient';

/**
 * Fetch all quiz attempts for a user
 */
export async function fetchQuizAttempts() {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    // Check if quiz_attempts table exists
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', user.id)
      .order('attempted_at', { ascending: false });

    if (error && error.code === 'PGRST116') {
      return []; // Table doesn't exist yet
    }

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Failed to fetch quiz attempts:', error);
    return [];
  }
}

/**
 * Create quiz attempt record
 */
export async function createQuizAttempt(quizData) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert({
        user_id: user.id,
        quiz_id: quizData.quiz_id,
        quiz_title: quizData.title,
        course_id: quizData.course_id,
        enrollment_id: quizData.enrollment_id,
        score: quizData.score,
        total_questions: quizData.total_questions,
        correct_answers: quizData.correct_answers,
        percentage: quizData.percentage,
        time_taken: quizData.time_taken,
        attempted_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to create quiz attempt:', error);
    throw error;
  }
}

/**
 * Fetch Q&A for courses
 */
export async function fetchCourseQuestions(courseSlug) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('course_qna')
      .select('*')
      .eq('course_slug', courseSlug)
      .order('created_at', { ascending: false });

    if (error && error.code === 'PGRST116') {
      return []; // Table doesn't exist yet
    }

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Failed to fetch Q&A:', error);
    return [];
  }
}

/**
 * Post a new question
 */
export async function postQuestion(questionData) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('course_qna')
      .insert({
        user_id: user.id,
        course_id: questionData.course_id,
        course_slug: questionData.course_slug,
        question: questionData.question,
        question_type: 'question',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to post question:', error);
    throw error;
  }
}

/**
 * Post an answer to a question
 */
export async function postAnswer(answerId, answerData) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('course_qna')
      .insert({
        user_id: user.id,
        parent_id: answerId,
        answer: answerData.answer,
        question_type: 'answer',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to post answer:', error);
    throw error;
  }
}

export default {
  fetchQuizAttempts,
  createQuizAttempt,
  fetchCourseQuestions,
  postQuestion,
  postAnswer,
};
