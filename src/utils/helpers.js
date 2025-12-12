// Helper functions
// Date formatting helper
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Validate date format (MM/DD/YYYY)
export const isValidDate = (dateString) => {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(dateString)) return false;
  const dateParts = dateString.split('/');
  const date = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);
  return date instanceof Date && !isNaN(date);
};

// Validate certificate serial number
export const isValidSerialNumber = (serialNumber) => {
  return serialNumber && serialNumber.trim().length > 0;
};

export const formatCurrency = (value, currency = "INR") => {
  if (value === null || value === undefined) return "-";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value / 100);
};

export const slugify = (value = "") => {
  return value
    .toString()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "course";
};

export const getCourseSlug = (course, fallbackKey = "course") => {
  if (!course) return slugify(fallbackKey);
  const explicit = course.slug || course.skillId || course.id || fallbackKey;
  const title = course.name || course.title || explicit;
  // Prefer server-provided slug when available, but always sanitize for URLs.
  const base = course.slug ? course.slug : title;
  return slugify(base || explicit);
};

export const buildCourseRoute = (course, fallbackKey = "course") => {
  const slug = getCourseSlug(course, fallbackKey);
  const identifier = (course?.id || course?.skillId || fallbackKey || slug).toString();
  if (!identifier) return slug;
  return `${slug}--${identifier}`;
};

export const getCourseDetailPath = (courseOrSlug, fallbackKey = "course") => {
  if (!courseOrSlug) return "/course";

  const slugCandidate =
    typeof courseOrSlug === "string"
      ? courseOrSlug
      : getCourseSlug(courseOrSlug, fallbackKey);

  const normalized = slugCandidate
    .toString()
    .trim()
    .replace(/^\/+/, "");

  if (!normalized) return "/course";

  // Always nest course detail under /course/<slug>
  return `/course/${encodeURIComponent(normalized)}`;
};

export const parseCourseRouteParam = (param = "") => {
  const decoded = decodeURIComponent(param);
  const [slugPart, ...idParts] = decoded.split("--");
  const idPart = idParts.length ? idParts.join("--") : null;
  return {
    slug: slugPart || decoded,
    id: idPart || null,
  };
};

