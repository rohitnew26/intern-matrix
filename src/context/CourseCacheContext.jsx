import React, { createContext, useContext, useRef, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";

const TTL = 120 * 1000; // 120 seconds
const STORAGE_PREFIX = "im_course_";

const CourseCacheContext = createContext(null);

export const CourseCacheProvider = ({ children }) => {
  const cacheRef = useRef(new Map());

  const now = () => Date.now();

  const makeKey = (opts) => {
    if (!opts) return null;
    return opts.id ? `id:${opts.id}` : opts.slug ? `slug:${opts.slug}` : null;
  };

  const readLocal = (key) => {
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + key);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || !parsed.ts || !parsed.data) return null;
      return parsed;
    } catch (e) {
      return null;
    }
  };

  const writeLocal = (key, data) => {
    try {
      localStorage.setItem(
        STORAGE_PREFIX + key,
        JSON.stringify({ ts: now(), data })
      );
    } catch (e) {
      // fail silently
    }
  };

  const getSync = useCallback((opts) => {
    const key = makeKey(opts);
    if (!key) return null;
    const entry = cacheRef.current.get(key);
    if (entry && now() - entry.ts < TTL) return entry.data;

    const local = readLocal(key);
    if (local && now() - local.ts < 1000 * 60 * 60 * 24) {
      // localStorage fallback valid for longer (1 day); will revalidate in background
      return local.data;
    }
    return null;
  }, []);

  // Background revalidation
  const revalidate = useCallback(async (opts) => {
    const key = makeKey(opts);
    if (!key) return null;
    try {
      // Only fetch minimal fields to keep it fast
      if (opts.id) {
        const { data, error } = await supabase
          .from("courses")
          .select("id,title,description,price,thumbnail,slug")
          .eq("id", opts.id)
          .single();
        if (!error && data) {
          cacheRef.current.set(key, { data, ts: now() });
          writeLocal(key, data);
          if (data.thumbnail) new Image().src = data.thumbnail;
          return data;
        }
      }

      if (opts.slug) {
        const { data, error } = await supabase
          .from("courses")
          .select("id,title,description,price,thumbnail,slug")
          .eq("slug", opts.slug)
          .single();
        if (!error && data) {
          const k2 = makeKey({ id: data.id }) || key;
          cacheRef.current.set(k2, { data, ts: now() });
          cacheRef.current.set(key, { data, ts: now() });
          writeLocal(k2, data);
          writeLocal(key, data);
          if (data.thumbnail) new Image().src = data.thumbnail;
          return data;
        }
      }
    } catch (err) {
      // silent
    }
    return null;
  }, []);

  const prefetchCourse = useCallback(async (opts) => {
    const key = makeKey(opts);
    if (!key) return null;
    const entry = cacheRef.current.get(key);
    if (entry && now() - entry.ts < TTL) return entry.data;

    const local = readLocal(key);
    if (local && now() - local.ts < TTL) {
      cacheRef.current.set(key, { data: local.data, ts: local.ts });
      if (local.data.thumbnail) new Image().src = local.data.thumbnail;
      return local.data;
    }

    const data = await revalidate(opts);
    return data;
  }, [revalidate]);

  const setCourse = useCallback((data) => {
    if (!data) return;
    const keyId = makeKey({ id: data.id });
    const keySlug = makeKey({ slug: data.slug });
    const ts = now();
    if (keyId) cacheRef.current.set(keyId, { data, ts });
    if (keySlug) cacheRef.current.set(keySlug, { data, ts });
    if (keyId) writeLocal(keyId, data);
    if (keySlug) writeLocal(keySlug, data);
  }, []);

  return (
    <CourseCacheContext.Provider
      value={{ getSync, prefetchCourse, revalidate, setCourse }}
    >
      {children}
    </CourseCacheContext.Provider>
  );
};

export const useCourseCache = () => {
  const ctx = useContext(CourseCacheContext);
  if (!ctx) throw new Error("useCourseCache must be used within CourseCacheProvider");
  return ctx;
};

export default CourseCacheContext;
