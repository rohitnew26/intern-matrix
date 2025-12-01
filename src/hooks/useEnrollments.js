import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchEnrollments } from "../services/enrollmentService";

export const useEnrollments = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!user?.id) {
      setEnrollments([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchEnrollments(user.id);
      setEnrollments(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    load();
  }, [load]);

  const stats = useMemo(() => ({
    total: enrollments.length,
    active: enrollments.filter((item) => item.status === "active").length,
  }), [enrollments]);

  return {
    enrollments,
    stats,
    loading,
    error,
    refresh: load,
  };
};
