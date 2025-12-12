import { supabase } from '../lib/supabaseClient';

const DEFAULT_CURRENCY = "INR";

export const fetchEnrollments = async (userId) => {
  if (!userId) return [];

  try {
    const { data, error } = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Failed to fetch enrollments:", error);
    throw error;
  }
};

export const createEnrollment = async ({ userId, course, priceCents, currency = DEFAULT_CURRENCY, paymentId, paymentMethod = 'phonepe' }) => {
  if (!userId) throw new Error("User ID is required");
  if (!course) throw new Error("Course data is required");

  const payload = {
    user_id: userId,
    course_id: course.id || null,
    course_title: course.name || course.title || "Course",
    course_slug: course.slug || course.skillId || "",
    instructor_name: course.instructor || course.instructor_name || "",
    course_image: course.image || course.cover_image || "",
    price_cents: typeof priceCents === "number" ? priceCents : course.price_cents || 0,
    currency,
    payment_id: paymentId,
    payment_method: paymentMethod,
    status: "active",
  };

  if (!payload.course_slug) {
    throw new Error("Course reference missing");
  }

  try {
    // Check for existing enrollment
    const { data: existing } = await supabase
      .from('enrollments')
      .select('id')
      .eq('user_id', userId)
      .eq('course_slug', payload.course_slug)
      .maybeSingle();

    if (existing) {
      throw new Error("You are already enrolled in this course");
    }

    const { data, error } = await supabase
      .from('enrollments')
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Failed to create enrollment:", error);
    throw error;
  }
};

export const fetchAllEnrollments = async ({ status } = {}) => {
  try {
    let query = supabase
      .from('enrollments')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('Failed to fetch all enrollments', err);
    throw err;
  }
};

export const updateEnrollmentStatus = async ({ enrollmentId, status }) => {
  if (!enrollmentId) {
    throw new Error("Enrollment ID is required");
  }

  try {
    const { data, error } = await supabase
      .from('enrollments')
      .update({ status })
      .eq('id', enrollmentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Failed to update enrollment status', err);
    throw err;
  }
};
