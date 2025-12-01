import { supabase } from "./supabaseClient";

const DEFAULT_CURRENCY = "INR";
const LOCAL_ENROLLMENTS_KEY = "imx_local_enrollments";
const DUPLICATE_ENROLLMENT_MESSAGE = "You are already enrolled in this course.";

const baseSelection = `
  id,
  user_id,
  course_id,
  course_title,
  course_slug,
  instructor_name,
  course_image,
  status,
  price_cents,
  currency,
  created_at
`;

const safeWindow = () => (typeof window === "undefined" ? null : window);

const readLocalEnrollments = () => {
  const win = safeWindow();
  if (!win) return [];
  try {
    const raw = win.localStorage.getItem(LOCAL_ENROLLMENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.warn("Unable to read cached enrollments", error);
    return [];
  }
};

const writeLocalEnrollments = (records) => {
  const win = safeWindow();
  if (!win) return;
  try {
    win.localStorage.setItem(LOCAL_ENROLLMENTS_KEY, JSON.stringify(records));
  } catch (error) {
    console.warn("Unable to persist cached enrollments", error);
  }
};

const mergeWithLocalFallback = (userId, remoteData) => {
  const local = readLocalEnrollments().filter((item) => item.user_id === userId);
  if (!local.length) return remoteData;

  const seenKeys = new Set(
    (remoteData || []).map((item) => (item.course_id || item.course_slug || item.id))
  );

  const unsynced = local.filter((item) => {
    const key = item.course_id || item.course_slug || item.id;
    return key ? !seenKeys.has(key) : true;
  });

  return [...remoteData, ...unsynced].sort((a, b) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
};

const generateLocalId = () => {
  const globalCrypto = typeof globalThis !== "undefined" ? globalThis.crypto : undefined;
  if (globalCrypto?.randomUUID) {
    return globalCrypto.randomUUID();
  }
  return `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const persistLocalRecord = (record) => {
  const records = readLocalEnrollments().filter((item) => item.id !== record.id);
  records.push(record);
  writeLocalEnrollments(records);
  return record;
};

const courseKey = (courseId, courseSlug) => courseId || courseSlug || "";

const ensureNoLocalDuplicate = (userId, key) => {
  if (!key) return false;
  return readLocalEnrollments().some(
    (item) => item.user_id === userId && courseKey(item.course_id, item.course_slug) === key
  );
};

const createLocalEnrollment = (payload) => {
  const key = courseKey(payload.course_id, payload.course_slug);
  if (ensureNoLocalDuplicate(payload.user_id, key)) {
    throw new Error(DUPLICATE_ENROLLMENT_MESSAGE);
  }

  const record = {
    id: generateLocalId(),
    ...payload,
    created_at: new Date().toISOString(),
    source: "local",
  };

  return persistLocalRecord(record);
};

export const fetchEnrollments = async (userId) => {
  if (!userId) return [];

  try {
    const { data, error } = await supabase
      .from("enrollments")
      .select(baseSelection)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return mergeWithLocalFallback(userId, data || []);
  } catch (error) {
    console.error("Failed to fetch enrollments from Supabase, using cached data", error);
    return readLocalEnrollments().filter((item) => item.user_id === userId);
  }
};

export const createEnrollment = async ({ userId, course, priceCents, currency = DEFAULT_CURRENCY }) => {
  if (!userId) throw new Error("You need to be signed in to enroll");
  if (!course) throw new Error("Missing course data");

  const uuidRegex = /^[0-9a-fA-F-]{36}$/;
  const normalizedCourseId = typeof course.id === "string" && uuidRegex.test(course.id) ? course.id : null;
  const payload = {
    user_id: userId,
    course_id: normalizedCourseId || null,
    course_title: course.name || course.title,
    course_slug: course.slug || course.skillId,
    instructor_name: course.instructor || course.instructor_name,
    course_image: course.image || course.cover_image,
    price_cents: typeof priceCents === "number" ? priceCents : course.price_cents || 0,
    currency,
    status: "pending",
  };

  if (!payload.course_slug) {
    throw new Error("Course reference missing. Try reloading the catalog.");
  }

  const attemptSupabaseEnrollment = async () => {
    const enrollmentQuery = supabase
      .from("enrollments")
      .select("id")
      .eq("user_id", userId)
      .limit(1);

    if (normalizedCourseId) {
      enrollmentQuery.eq("course_id", normalizedCourseId);
    } else {
      enrollmentQuery.eq("course_slug", payload.course_slug);
    }

    const { data: existing, error: lookupError } = await enrollmentQuery;

    if (lookupError) {
      throw lookupError;
    }

    if (existing && existing.length > 0) {
      throw new Error(DUPLICATE_ENROLLMENT_MESSAGE);
    }

    const { data, error } = await supabase
      .from("enrollments")
      .insert(payload)
      .select(baseSelection)
      .single();

    if (error) {
      throw error;
    }

    persistLocalRecord(data);
    return data;
  };

  try {
    return await attemptSupabaseEnrollment();
  } catch (error) {
    if (error?.message === DUPLICATE_ENROLLMENT_MESSAGE) {
      throw error;
    }
    console.error("Falling back to offline enrollment cache", error);
    return createLocalEnrollment(payload);
  }
};

export const fetchAllEnrollments = async ({ status } = {}) => {
  let query = supabase
    .from("enrollments")
    .select(baseSelection)
    .order("created_at", { ascending: false })
    .limit(200);

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  const { data, error } = await query;
  if (error) {
    throw error;
  }
  return data || [];
};

export const updateEnrollmentStatus = async ({ enrollmentId, status }) => {
  if (!enrollmentId) {
    throw new Error("Enrollment id is required");
  }

  const { data, error } = await supabase
    .from("enrollments")
    .update({ status })
    .eq("id", enrollmentId)
    .select(baseSelection)
    .single();

  if (error) {
    throw error;
  }

  persistLocalRecord(data);
  return data;
};
