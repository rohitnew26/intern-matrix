import { supabase } from "./supabaseClient";

const CERT_TABLE = "certificates";

export const fetchCertificates = async ({ status = "all", limit = 200 } = {}) => {
  let query = supabase
    .from(CERT_TABLE)
    .select("*")
    .order("issued_on", { ascending: false })
    .limit(limit);

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  try {
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Admin certificate fetch failed", error);
    return [];
  }
};

export const updateCertificateStatus = async ({ certificateId, status }) => {
  if (!certificateId) {
    throw new Error("Certificate id is required");
  }

  const { data, error } = await supabase
    .from(CERT_TABLE)
    .update({ status })
    .eq("id", certificateId)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
};
