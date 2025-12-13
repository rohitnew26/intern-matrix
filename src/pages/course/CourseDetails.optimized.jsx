import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CourseSkeletonuLoadingUi from "../../pages/skeletonLoadingUi/CourseDetailsLoadingUi.jsx";
import OfferCelebration from "../../components/OfferCelebration";
import { useAuth } from "../../context/AuthContext";
import { useCourseCache } from "../../context/CourseCacheContext";
import { parseCourseRouteParam } from "../../utils/helpers";
import ShowEnrollmentFlow from "./ShowEnrollmentFlowSimple";
import CourseChapter from "./CourseChapter";

// Minimal, optimized Course Details component
export default function CourseDetailsOptimized() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { user } = useAuth();
  const { getSync, revalidate, prefetchCourse, setCourse: providerSetCourse } = useCourseCache();

  const safeCourseParam = params.courseSlug || params.courseId || params.slug || params.courseParam || "";
  const routeInfo = useMemo(() => parseCourseRouteParam(safeCourseParam), [safeCourseParam]);
  const courseId = routeInfo.id || "";
  const courseSlug = routeInfo.slug || "";

  const [course, setCourse] = useState(() => {
    const fromState = (location.state && location.state.course) || null;
    if (fromState) return fromState;
    return getSync({ id: courseId }) || getSync({ slug: courseSlug }) || null;
  });
  const [loading, setLoading] = useState(!course);
  const [error, setError] = useState("");

  // show skeleton if missing critical fields
  const needsHydration = useMemo(() => {
    if (!course) return true;
    return !(course.title && (course.description || course.desc) && (course.price || course.offerPrice || course.price_cents));
  }, [course]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setError("");
      setLoading(prev => prev || true);

      try {
        // Try background revalidation (only minimal fields)
        const fetched = await (courseId ? revalidate({ id: courseId }) : revalidate({ slug: courseSlug }));
        if (fetched && mounted) {
          setCourse(fetched);
          providerSetCourse && providerSetCourse(fetched);
        }
      } catch (e) {
        if (mounted && !course) setError("Unable to load course details right now.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    // If there's partial data, still revalidate in background
    if (needsHydration) load();
    else setLoading(false);

    return () => { mounted = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, courseSlug]);

  // Prefetch helper for cards to call on hover/click
  const prefetch = useCallback((opts) => {
    // opts = { id } or { slug }
    prefetchCourse(opts).catch(() => {});
  }, [prefetchCourse]);

  // Save to localStorage via provider whenever user opens
  useEffect(() => {
    if (course) providerSetCourse && providerSetCourse(course);
  }, [course, providerSetCourse]);

  if (loading) return <CourseSkeletonuLoadingUi />;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
  if (!course) return <div className="p-6 text-center">Course not found.</div>;

  // render optimized view (trimmed for clarity)
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
          <div className="text-sm text-gray-600 mb-4">{course.instructor || course.instructor_name || "Instructor"}</div>

          <div className="mb-6">
            {course.thumbnail ? (
              <img
                src={course.thumbnail}
                alt={course.title}
                loading="lazy"
                style={{ width: '100%', height: 'auto', borderRadius: 8 }}
              />
            ) : (
              <div style={{ width: '100%', height: 240, background: '#f3f4f6', borderRadius: 8 }} />
            )}
          </div>

          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: course.description || course.desc || "" }} />
          </div>

          <div className="mt-6">
            <CourseChapter chapters={course.chapters || course.content || []} />
          </div>
        </div>

        <aside className="p-4 border rounded-md">
          <div className="text-xl font-semibold">Price</div>
          <div className="text-2xl font-bold mt-2">{course.offerPrice || course.price || 'Free'}</div>
          <div className="mt-4">
            <button className="btn-primary w-full">Enroll now</button>
          </div>
        </aside>
      </div>

      <OfferCelebration show={false} />
      <ShowEnrollmentFlow open={false} />
    </div>
  );
}
