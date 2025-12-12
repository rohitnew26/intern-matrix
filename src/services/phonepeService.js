const PHONEPE_EDGE_URL =
  "https://hhdronajrkxnetwqppkg.supabase.co/functions/v1/phonePP";

// Get Supabase anon key from environment
const SUPABASE_ANON_KEY = import.meta.env.SUPABASE_ANON_KEY || 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhoZHJvbmFqcmt4bmV0d3FwcGtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNTY3MjIsImV4cCI6MjA3OTkzMjcyMn0.sIDB1ufidIyBxbzPXElYdmQr9uoy_igfVLaqxAHx5WU";

const postJson = async (url, payload) => {
  const resp = await fetch(url, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    const text = await resp.text();
    try {
      const data = JSON.parse(text || "{}");
      const msg = data?.error || data?.message || text || `Request failed with ${resp.status}`;
      const err = new Error(msg);
      err.details = data;
      err.status = resp.status;
      throw err;
    } catch (e) {
      const err = new Error(text || `Request failed with ${resp.status}`);
      err.status = resp.status;
      throw err;
    }
  }
  return resp.json();
};

export const createPhonePePayment = async ({
  amount,
  currency = "INR",
  courseId,
  courseSlug,
  userEmail,
  userName,
}) => {
  console.log("[PhonePe] Creating payment with params:", { 
    amount, 
    currency, 
    courseId, 
    courseSlug, 
    userEmail, 
    userName 
  });

  const payload = {
    action: "create",
    amount,
    currency,
    courseId,
    courseSlug,
    userEmail,
    userName,
  };

  console.log("[PhonePe] Sending payload:", payload);
  
  try {
    const response = await postJson(PHONEPE_EDGE_URL, payload);
    console.log("[PhonePe] Response received:", response);
    return response;
  } catch (error) {
    console.error("[PhonePe] Payment creation failed:", error);
    throw error;
  }
};

export const fetchPhonePeStatus = async (transactionId) => {
  console.log("[PhonePe] Fetching status for transaction:", transactionId);
  
  const payload = { 
    action: "status", 
    orderId: transactionId,
    transactionId 
  };
  
  console.log("[PhonePe] Status payload:", payload);
  
  try {
    const response = await postJson(PHONEPE_EDGE_URL, payload);
    console.log("[PhonePe] Status response:", response);
    return response;
  } catch (error) {
    console.error("[PhonePe] Status check failed:", error);
    throw error;
  }
};
