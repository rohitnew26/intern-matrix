import { supabase } from "../lib/supabaseClient";

/**
 * Fetch certificates with optional status filter
 */
export const fetchCertificates = async ({ status = "all", limit = 200 } = {}) => {
  try {
    let query = supabase
      .from("certificates")
      .select("*")
      .order("issued_on", { ascending: false })
      .limit(limit);

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Admin certificate fetch failed", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Admin certificate fetch failed", err);
    return [];
  }
};

/**
 * Update certificate status
 */
export const updateCertificateStatus = async ({ certificateId, status }) => {
  if (!certificateId) {
    throw new Error("Certificate id is required");
  }

  try {
    const { data, error } = await supabase
      .from("certificates")
      .update({ status })
      .eq("id", certificateId)
      .select()
      .single();

    if (error) {
      console.error("Failed to update certificate status", error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Failed to update certificate status", err);
    throw err;
  }
};
