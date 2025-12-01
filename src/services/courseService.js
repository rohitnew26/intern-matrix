import { supabase } from "./supabaseClient";

const baseSelection = `
  id,
  slug,
  title,
  subtitle,
  description,
  instructor_name,
  level,
  cover_image,
  duration,
  lessons,
  price_cents,
  currency,
  tags,
  content
`;

const normalizeCourse = (record) => {
  if (!record) return null;
  return {
    id: record.id,
    skillId: record.slug,
    slug: record.slug,
    name: record.title,
    title: record.title,
    subtitle: record.subtitle || record.description || "",
    desc: record.description || "",
    description: record.description || "",
    instructor: record.instructor_name || "Instructor",
    instructor_name: record.instructor_name || "Instructor",
    level: record.level || "Beginner",
    image: record.cover_image,
    cover_image: record.cover_image,
    duration: record.duration,
    lessons: record.lessons,
    price: record.price_cents ? `${Math.round(record.price_cents / 100)}` : "0",
    offerPrice: record.price_cents ? `${Math.round(record.price_cents / 100)}` : "0",
    price_cents: record.price_cents || 0,
    currency: record.currency || "INR",
    tags: record.tags || [],
    category: record.tags?.[0] || "General",
    content: Array.isArray(record.content) ? record.content : [],
    rating: record.rating || 4.8,
    ratersCount: record.raters_count || 120,
  };
};

export const fetchCourses = async () => {
  const { data, error } = await supabase
    .from("courses")
    .select(baseSelection)
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return (data || []).map(normalizeCourse).filter(Boolean);
};

export const fetchCourseBySlug = async (slug) => {
  if (!slug) return null;

  const { data, error } = await supabase
    .from("courses")
    .select(baseSelection)
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }

  return normalizeCourse(data);
};

export const fetchCourseById = async (id) => {
  if (!id) return null;

  const { data, error } = await supabase
    .from("courses")
    .select(baseSelection)
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }

  return normalizeCourse(data);
};
