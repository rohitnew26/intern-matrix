import { supabase } from "../lib/supabaseClient";

const baseSelection = `
  id,
  slug,
  title,
  subtitle,
  description,
  instructor_name,
  instructor,
  level,
  cover_image,
  duration,
  lessons,
  couponcode,
  offerprice,
  originalprice,
  price_cents,
  currency,
  tags,
  content
`;

/* -----------------------------
   Normalize Course Record
--------------------------------*/
const normalizeCourse = (record) => {
  if (!record) return null;

  // Convert paise to rupees for display
  const priceRupees = record.price_cents ? Math.round(record.price_cents / 100) : 0;
  const mrpRupees = record.mrp_cents ? Math.round(record.mrp_cents / 100) : priceRupees;

  return {
    id: record.id,
    skillId: record.slug,
    slug: record.slug,
    course_id: record.course_id,

    // Course names
    name: record.title,
    title: record.title,

    // Descriptions
    subtitle: record.subtitle || record.overview || record.description || "",
    desc: record.description || record.overview || "",
    description: record.description || record.overview || "",
    overview: record.overview || record.description || "",

    // Instructor
    instructor: record.instructor_name || "Instructor",
    instructor_name: record.instructor_name || "Instructor",

    // Level
    level: record.level || "Beginner",

    // Images - use thumbnail_url from DB
    image: record.thumbnail_url || record.banner_url || record.cover_image,
    cover_image: record.thumbnail_url || record.banner_url || record.cover_image,
    thumbnail: record.thumbnail_url || record.banner_url,
    thumbnail_url: record.thumbnail_url,
    banner_url: record.banner_url,

    // Details
    duration: record.duration || `${record.total_duration_hours || 0} hours`,
    lessons: record.lessons || record.total_lessons,
    total_lessons: record.total_lessons,
    total_modules: record.total_modules,

    // Branch and category
    branch: record.branch,
    category: record.category,

    // Type - map from DB type field
    type: record.type,
    course_type: record.type,

    // Pricing - Cards expect:
    // - price = MRP/original (crossed out)
    // - offerPrice = discounted price (bold green)
    price: String(mrpRupees),              // Original price (crossed out)
    offerPrice: String(priceRupees),       // Offer price (bold green)
    originalPrice: mrpRupees,              // For compatibility
    price_cents: record.price_cents || 0,
    mrp_cents: record.mrp_cents || 0,
    currency: record.currency || "INR",

    // Tags & Category
    tags: record.tags || [],
    category: record.category || record.tags?.[0] || "General",

    // Content
    content: Array.isArray(record.content) ? record.content : [],

    // Rating
    rating: record.rating || 4.8,
    ratersCount: record.raters_count || 120,
  };
};

/* -----------------------------
   Fetch All Courses
--------------------------------*/
export const fetchCourses = async () => {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Debug: Log raw DB data for first course
    if (data && data.length > 0) {
      console.log("🔍 Raw DB record (first course):", {
        id: data[0].id,
        title: data[0].title,
        type: data[0].type,
        price_cents: data[0].price_cents,
        mrp_cents: data[0].mrp_cents,
        thumbnail_url: data[0].thumbnail_url,
        banner_url: data[0].banner_url,
        status: data[0].status,
        keys: Object.keys(data[0])
      });
    }

    const normalized = (data || []).map(normalizeCourse).filter(Boolean);
    
    // Debug: Log normalized data
    if (normalized.length > 0) {
      console.log("✨ Normalized course (first):", {
        title: normalized[0].title,
        price_cents: normalized[0].price_cents,
        price: normalized[0].price,
        offerPrice: normalized[0].offerPrice,
        originalPrice: normalized[0].originalPrice
      });
    }

    return normalized;
  } catch (err) {
    console.error("Failed to fetch courses from Supabase", err);
    throw err;
  }
};

/* -----------------------------
   Fetch Course by Slug
--------------------------------*/
export const fetchCourseBySlug = async (slug) => {
  if (!slug) return null;

  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error?.code === "PGRST116") return null; // no rows
    if (error) throw error;

    return normalizeCourse(data);
  } catch (err) {
    console.error("Failed to fetch course by slug", err);
    throw err;
  }
};

/* -----------------------------
   Fetch Course by ID
--------------------------------*/
export const fetchCourseById = async (id) => {
  if (!id) return null;

  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("id", id)
      .single();

    if (error?.code === "PGRST116") return null;
    if (error) throw error;

    return normalizeCourse(data);
  } catch (err) {
    console.error("Failed to fetch course by id", err);
    throw err;
  }
};
