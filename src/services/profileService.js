import { supabase } from "./supabaseClient";

export const fetchProfiles = async ({ limit = 100, search } = {}) => {
  let query = supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (search) {
    query = query.ilike("full_name", `%${search}%`);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Admin profiles fetch failed", error);
    throw error;
  }

  return data || [];
};
