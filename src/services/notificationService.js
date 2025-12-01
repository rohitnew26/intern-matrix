import apiClient from "./apiClient";

const ADMIN_EMAIL = "update@internmatrix.com";

const resolveEndpoint = () => {
  return (
    import.meta.env.VITE_ENROLLMENT_NOTIFICATION_URL ||
    import.meta.env.VITE_GOOGLE_SHEETS_API_URL ||
    ""
  );
};

export const sendEnrollmentEmail = async (payload = {}) => {
  const endpoint = resolveEndpoint();

  if (!endpoint) {
    throw new Error("Enrollment notification endpoint is not configured.");
  }

  const requestBody = {
    action: "enrollment_notification",
    admin_email: ADMIN_EMAIL,
    ...payload,
  };

  const { data } = await apiClient.post(endpoint, requestBody);

  if (!data) {
    throw new Error("Empty response from enrollment notification gateway.");
  }

  if (data.success === false) {
    throw new Error(data.message || "Notification gateway rejected the request.");
  }

  return data;
};
