import { supabase } from "../lib/supabaseClient"; // (optional, not used here)

const STORAGE_KEY = "imx.smtpRelayUrl";

/* ===============================
   Local Storage Helpers
================================ */

const readStoredOverride = () => {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(STORAGE_KEY) || "";
  } catch (err) {
    console.warn("Unable to read SMTP relay override", err);
    return "";
  }
};

const resolveRelayUrl = () => {
  // Runtime injected (highest priority)
  const runtimeInjected =
    typeof window !== "undefined" &&
    typeof window.__SMTP_RELAY_URL__ === "string"
      ? window.__SMTP_RELAY_URL__.trim()
      : "";

  if (runtimeInjected) return runtimeInjected;

  // Admin override (localStorage)
  const storedOverride = readStoredOverride();
  if (storedOverride) return storedOverride;

  // Env fallback (priority order)
  return (
    import.meta.env.VITE_SMTP_RELAY_URL ||
    import.meta.env.VITE_ENROLLMENT_NOTIFICATION_URL ||
    import.meta.env.VITE_GOOGLE_SHEETS_API_URL ||
    ""
  );
};

export const getSmtpRelayOverride = () => readStoredOverride();

export const saveSmtpRelayOverride = (value = "") => {
  if (typeof window === "undefined") return "";

  const trimmed = value.trim();
  try {
    if (trimmed) {
      localStorage.setItem(STORAGE_KEY, trimmed);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (err) {
    console.warn("Unable to persist SMTP relay override", err);
  }

  return trimmed;
};

export const clearSmtpRelayOverride = () => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn("Unable to clear SMTP relay override", err);
  }
};

/* ===============================
   SMTP Email Sender
================================ */

export const sendSmtpEmail = async (payload = {}) => {
  const endpoint = resolveRelayUrl();

  if (!endpoint) {
    throw new Error(
      "SMTP relay endpoint is not configured. Set VITE_SMTP_RELAY_URL or save an override in the admin console."
    );
  }

  const requestBody = {
    action: "manual_admin_email",
    ...payload,
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`SMTP relay request failed (${response.status})`);
  }

  const data = await response.json();

  if (!data) {
    throw new Error("Empty response from SMTP relay.");
  }

  if (data.success === false) {
    throw new Error(data.message || "SMTP relay rejected the request.");
  }

  return data;
};
