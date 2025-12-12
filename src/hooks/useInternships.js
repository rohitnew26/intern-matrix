import { useState, useEffect, useMemo } from "react";
import { supabase } from "../lib/supabaseClient";

/**
 * Hook to fetch and normalize internship/course data from Supabase
 * Filters by course type and branch
 */
export const useInternships = (courseType = "Industrial Training", branchFilter = []) => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        
        // Build query
        let query = supabase
          .from('courses')
          .select('*')
          .eq('status', 'published'); // Only show published courses
        
        // Filter by course type if provided
        if (courseType === "Industrial Training") {
          query = query.eq('type', 'industrial_training');
        } else if (courseType === "Online Course") {
          query = query.eq('type', 'online');
        }

        const { data: courses, error: fetchError } = await query.order('created_at', { ascending: false });
        
        if (fetchError) throw fetchError;

        let filteredCourses = courses || [];

        // Further filter by branches if provided
        if (branchFilter.length > 0) {
          filteredCourses = filteredCourses.filter((course) => {
            if (!course.branch) return false;
            
            // Parse branch string (e.g., "CSE,IT,IOT,AIML,DS")
            const courseBranches = course.branch
              .split(",")
              .map((b) => b.trim().toUpperCase());
            
            // Check if any branch matches the filter
            return branchFilter.some((filterBranch) =>
              courseBranches.includes(filterBranch.toUpperCase())
            );
          });
        }

        // Normalize course data to internship format
        const normalized = filteredCourses.map((course) => ({
          id: course.id,
          title: course.title,
          slug: course.slug,
          description: course.subtitle || course.overview || course.description || "",
          thumbnail: course.thumbnail_url,
          branches: course.branch ? course.branch.split(",").map((b) => b.trim()) : [],
          duration: course.total_duration_hours ? `${course.total_duration_hours} hours` : "Not specified",
          price: Math.round(course.price_cents / 100) || 0,
          offerPrice: Math.round(course.price_cents / 100) || 0,
          originalPrice: Math.round(course.mrp_cents / 100) || Math.round(course.price_cents / 100) || 0,
          enrolledCount: course.current_enrollments || 0,
          certificateAwarded: course.certificate_available || true,
          level: course.level || "beginner",
          instructor: course.instructor_name || "Instructor",
          category: course.category || "General",
          rating: course.average_rating || 4.5,
          couponCode: "",
          couponDiscount: course.discount_percentage || 0,
        }));

        setInternships(normalized);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch internships from Supabase", err);
        setError(err.message);
        setInternships([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, [courseType, branchFilter.length]); // Re-fetch if filters change

  return { internships, loading, error };
};

export default useInternships;
