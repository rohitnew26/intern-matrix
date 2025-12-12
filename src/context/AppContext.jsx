import React, { createContext, useState, useEffect, useCallback } from "react";
import apiClient, { BASE_URL } from "../services/apiClient";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    if (savedToken) {
      setToken(savedToken);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken("");
    delete apiClient.defaults.headers.common['Authorization'];
  };

  const fetchCourses = useCallback(async () => {
    setCoursesLoading(true);
    try {
      const response = await apiClient.get("/api/user/courses");
      
      // Handle both array and object response formats
      let data = response.data || [];
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        // If data is an object, check for common array properties
        data = data.courses || data.data || data.items || [];
      }
      
      // Ensure data is an array
      if (!Array.isArray(data)) {
        data = [];
      }
      
      setCourses(data);
      return data;
    } catch (err) {
      console.error('Failed to load courses in AppContext', err);
      setCourses([]);
      return [];
    } finally {
      setCoursesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        token,
        logout,
        courses,
        coursesLoading,
        refreshCourses: fetchCourses,
        apiClient,
        apiBase: BASE_URL,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

 