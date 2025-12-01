import apiClient from "./apiClient";

const STORAGE_KEY = "imx.smtpRelayUrl";

const readStoredOverride = () => {
  if (typeof window === "undefined") {
    return "";
  }
  try {
    return window.localStorage?.getItem(STORAGE_KEY) || "";
  } catch (err) {
    console.warn("Unable to read SMTP relay override", err);
    return "";
  }
};

const resolveRelayUrl = () => {
  const runtimeInjected =
    typeof window !== "undefined" && typeof window.__SMTP_RELAY_URL__ === "string"
      ? window.__SMTP_RELAY_URL__.trim()
      : "";
  if (runtimeInjected) {
    return runtimeInjected;
  }

  const storedOverride = readStoredOverride();
  if (storedOverride) {
    return storedOverride;
  }

  // Prefer the dedicated relay but gracefully reuse the existing notification webhooks.
  return (
    import.meta.env.VITE_SMTP_RELAY_URL ||
    import.meta.env.VITE_ENROLLMENT_NOTIFICATION_URL ||
    import.meta.env.VITE_GOOGLE_SHEETS_API_URL ||
    ""
  );
};

export const getSmtpRelayOverride = () => readStoredOverride();

export const saveSmtpRelayOverride = (value = "") => {
  if (typeof window === "undefined") {
    return "";
  }
  const trimmed = value.trim();
  try {
    if (trimmed) {
      window.localStorage?.setItem(STORAGE_KEY, trimmed);
    } else {
      window.localStorage?.removeItem(STORAGE_KEY);
    }
  } catch (err) {
    console.warn("Unable to persist SMTP relay override", err);
  }
  return trimmed;
};

export const clearSmtpRelayOverride = () => {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage?.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn("Unable to clear SMTP relay override", err);
  }
};

export const sendSmtpEmail = async (payload = {}) => {
  const endpoint = resolveRelayUrl();
  if (!endpoint) {
    throw new Error(
      "SMTP relay endpoint is not configured. Set VITE_SMTP_RELAY_URL or save an override inside the admin console."
    );
  }

  const requestBody = {
    action: "manual_admin_email",
    ...payload,
  };

  const { data } = await apiClient.post(endpoint, requestBody);
  if (!data) {
    throw new Error("Empty response from SMTP relay.");
  }

  if (data.success === false) {
    throw new Error(data.message || "SMTP relay rejected the request.");
  }

  return data;
};
