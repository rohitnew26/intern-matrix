// @ts-nocheck

async function handleAuthTest() {
  // @ts-ignore Deno provided at runtime
  const clientId = Deno.env.get("PHONEPE_CLIENT_ID");
  // @ts-ignore Deno provided at runtime
  const clientSecret = Deno.env.get("PHONEPE_CLIENT_SECRET");
  // @ts-ignore Deno provided at runtime
  // Default to production unless explicitly set otherwise
  const env = (Deno.env.get("PHONEPE_ENV") || "production").toLowerCase();
  const isSandbox = env === "sandbox" || env === "preprod";

  if (!clientId || !clientSecret) {
    return jsonResponse({ error: "Missing client credentials" }, 400);
  }

  try {
    const { accessToken, expiresAt, raw } = await getAuthToken(clientId, clientSecret, isSandbox);
    return jsonResponse({ accessToken, expiresAt, env: isSandbox ? "sandbox" : "production", raw });
  } catch (error) {
    return jsonResponse({ error: "Auth test failed", message: String(error) }, 500);
  }
}
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { action } = body || {};

  if (action === "create") {
    return await handleCreate(body);
  }
  if (action === "status") {
    return await handleStatus(body);
  }
  if (action === "auth-test") {
    return await handleAuthTest();
  }
  if (action === "verify-and-enroll") {
    return await handleVerifyAndEnroll(body);
  }

  return new Response(JSON.stringify({ error: "Unknown action" }), {
    status: 400,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});

type CreateRequest = {
  amount: number;
  currency?: string;
  userEmail?: string;
  userName?: string;
  courseId?: string;
  courseSlug?: string;
  merchantUserId?: string;
  expireAfter?: number;
  metaInfo?: Record<string, unknown>;
  paymentModeConfig?: Record<string, unknown>;
  redirectUrl?: string;
  callbackUrl?: string;
};

async function handleCreate({
  amount,
  currency = "INR",
  userEmail,
  userName,
  courseId,
  courseSlug,
  merchantUserId,
  expireAfter,
  metaInfo = {},
  paymentModeConfig,
  redirectUrl,
  callbackUrl,
}: CreateRequest) {
  const clientId = Deno.env.get("PHONEPE_CLIENT_ID");
  const clientSecret = Deno.env.get("PHONEPE_CLIENT_SECRET");
  const merchantId = Deno.env.get("PHONEPE_MERCHANT_ID");
  const returnUrl = Deno.env.get("RETURN_URL");
  const env = (Deno.env.get("PHONEPE_ENV") || "production").toLowerCase();
  const isSandbox = env === "sandbox" || env === "preprod";
  const base = isSandbox
    ? "https://api-preprod.phonepe.com/apis/pg-sandbox"
    : "https://api.phonepe.com/apis/pg";

  if (!amount || !clientId || !clientSecret || !returnUrl || !merchantId) {
    return jsonResponse({ error: "Missing required config or amount" }, 400);
  }

  const merchantOrderId = `order_${crypto.randomUUID()}`;
  const amountPaise = Math.round(Number(amount) * 100);
  const expiresInSeconds = Number(expireAfter) > 0 ? Number(expireAfter) : 1200;

  const effectiveRedirectUrl = redirectUrl || `${returnUrl}?tx=${merchantOrderId}`;
  const effectiveCallbackUrl = callbackUrl || `${returnUrl}?tx=${merchantOrderId}&cb=1`;

    const payload: Record<string, unknown> = {
    merchantId,
    merchantOrderId,
    amount: amountPaise,
    expireAfter: expiresInSeconds,
    paymentFlow: {
      type: "PG_CHECKOUT",
      merchantUrls: {
        redirectUrl: effectiveRedirectUrl,
        callbackUrl: effectiveCallbackUrl,
      },
    },
    merchantUserId: merchantUserId || userEmail || userName || courseId || "anon-user",
    metaInfo: {
      udf1: courseId || "",
      udf2: courseSlug || "",
      udf3: userEmail || "",
      udf4: userName || "",
      udf5: currency,
      ...metaInfo,
    },
  };

  if (paymentModeConfig && typeof paymentModeConfig === "object") {
    payload.paymentModeConfig = paymentModeConfig;
  }

  console.log("Payment payload:", JSON.stringify(payload, null, 2));

  try {
    // Get OAuth token
    const { accessToken, expiresAt } = await getAuthToken(clientId, clientSecret, isSandbox);

    console.log("Got auth token, calling payment API...");
    
    // V2 Standard Checkout pay endpoint
    const paymentEndpoint = `${base}/checkout/v2/pay`;
    
    console.log("Payment endpoint:", paymentEndpoint);

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `O-Bearer ${accessToken}`,
      "X-CLIENT-ID": clientId,
      "X-CLIENT-VERSION": "1",
      "X-MERCHANT-ID": merchantId,
    };

    console.log("Request headers:", JSON.stringify(headers, null, 2));

    const resp = await fetch(paymentEndpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const responseText = await resp.text();
    console.log("Payment API response status:", resp.status);
    console.log("Payment API response headers:", JSON.stringify(Object.fromEntries(resp.headers.entries()), null, 2));
    console.log("Payment API response body:", responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse payment response:", responseText);
      return jsonResponse({ 
        error: "Payment API returned invalid response", 
        details: responseText || "Empty response",
        status: resp.status,
        headers: Object.fromEntries(resp.headers.entries())
      }, 500);
    }

    if (!resp.ok) {
      console.error("PhonePe Create Error:", data);
      return jsonResponse({ error: "Payment creation failed", details: data }, resp.status);
    }

    const token = data?.data?.token || data?.token;
    const payPageUrl =
      data?.data?.url ||
      data?.url ||
      data?.data?.redirectUrl ||
      data?.redirectUrl;

    if (!token && !payPageUrl) {
      console.error("PhonePe Create Missing token/url", data);
      return jsonResponse({ error: "Payment creation returned no token or URL", details: data }, 502);
    }

    // For iframe flow via checkout.js (if only token is returned)
    const checkoutBaseUrl = isSandbox
      ? "https://mercury-uat.phonepe.com/transact/uat_v2"
      : "https://mercury.phonepe.com/transact/pg/v2";

    return jsonResponse({
      token,
      payPageUrl,
      orderId: data?.orderId || merchantOrderId,
      state: data?.state,
      env: isSandbox ? "sandbox" : "production",
      checkoutBaseUrl,
      authExpiresAt: expiresAt,
      raw: data,
    });
  } catch (error) {
    console.error("Create payment error:", error);
    return jsonResponse({ error: "Failed to create payment", message: String(error) }, 500);
  }
}

async function handleStatus({ transactionId, orderId }: { transactionId?: string; orderId?: string }) {
  const clientId = Deno.env.get("PHONEPE_CLIENT_ID");
  const clientSecret = Deno.env.get("PHONEPE_CLIENT_SECRET");
  const env = (Deno.env.get("PHONEPE_ENV") || "production").toLowerCase();
  const isSandbox = env === "sandbox" || env === "preprod";
  const base = isSandbox
    ? "https://api-preprod.phonepe.com/apis/pg-sandbox"
    : "https://api.phonepe.com/apis/pg";

  const targetOrderId = orderId || transactionId;

  if (!targetOrderId || !clientId || !clientSecret) {
    return jsonResponse({ error: "Missing orderId/transactionId or config" }, 400);
  }

  try {
    // Get OAuth token
    const { accessToken } = await getAuthToken(clientId, clientSecret, isSandbox);

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `O-Bearer ${accessToken}`,
      "X-CLIENT-ID": clientId,
      "X-CLIENT-VERSION": "1",
      // @ts-ignore Deno env in runtime
      ...(typeof Deno !== "undefined" && Deno.env.get("PHONEPE_MERCHANT_ID")
        ? { "X-MERCHANT-ID": Deno.env.get("PHONEPE_MERCHANT_ID") }
        : {}),
    };

    const statusEndpoint = `${base}/checkout/v2/order/${targetOrderId}/status`;

    const resp = await fetch(statusEndpoint, {
      method: "GET",
      headers,
    });

    const responseText = await resp.text();
    let data;
    
    try {
      data = JSON.parse(responseText);
    } catch {
      return jsonResponse({ error: "Invalid status response", details: responseText }, 500);
    }

    if (!resp.ok) {
      console.error("PhonePe Status Error:", data);
      return jsonResponse({ error: "Status check failed", details: data }, resp.status);
    }

    const state = data?.state || data?.data?.state;
    const code = data?.code;
    const status = code || state || data?.status || "PENDING";
    const message = data?.message || "";

    return jsonResponse({ status, code, message, state, raw: data });
  } catch (error) {
    console.error("Status check error:", error);
    return jsonResponse({ error: "Failed to check status", message: String(error) }, 500);
  }
}

async function handleVerifyAndEnroll({
  orderId,
  userId,
  course,
  priceCents,
  currency = "INR",
}: {
  orderId?: string;
  userId?: string;
  course?: unknown;
  priceCents?: number;
  currency?: string;
}) {
  if (!orderId || !userId || !course) {
    // course can be recovered from an existing pending order, so only block if no orderId/userId
    if (!orderId || !userId) {
      return jsonResponse({ error: "Missing orderId or userId" }, 400);
    }
  }

  try {
    const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !supabaseKey) {
      return jsonResponse({ error: "Supabase config missing" }, 500);
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    // Try to reuse existing pending order (created before redirect). If missing, create one.
    const { data: existingOrder } = await supabase
      .from("orders")
      .select("*")
      .eq("order_id", orderId)
      .maybeSingle();

    const courseData: Record<string, unknown> = existingOrder
      ? {
          id: existingOrder.course_id,
          name: existingOrder.course_title,
          title: existingOrder.course_title,
          slug: existingOrder.course_slug,
          skillId: existingOrder.course_slug,
          instructor: existingOrder.instructor_name,
          instructor_name: existingOrder.instructor_name,
          image: existingOrder.course_image,
          cover_image: existingOrder.course_image,
        }
      : typeof course === "object" && course !== null
      ? (course as Record<string, unknown>)
      : {};

    // Step 1: Ensure order record exists
    let orderRecord = existingOrder;
    if (!orderRecord) {
      const orderPayload = {
        user_id: userId,
        order_id: orderId,
        course_id: courseData.id || null,
        course_title: courseData.name || courseData.title || "Course",
        course_slug: courseData.slug || courseData.skillId || "",
        instructor_name: courseData.instructor || courseData.instructor_name || "",
        course_image: courseData.image || courseData.cover_image || "",
        amount_cents: priceCents || 0,
        currency,
        payment_status: "pending",
        status: "processing",
      };

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert(orderPayload)
        .select()
        .single();

      if (orderError) {
        console.error("Order creation error:", orderError);
        return jsonResponse({ error: "Failed to create order", details: orderError }, 500);
      }
      orderRecord = order;
    }

    // Step 2: Check payment status server-side
    const statusResult = await handleStatus({ orderId });
    const statusData = await statusResult.json();

    const paymentState = statusData?.state || statusData?.status || statusData?.code;
    const paymentSuccess = paymentState === "COMPLETED" || paymentState === "SUCCESS" || paymentState === "PAYMENT_SUCCESS";

    if (!paymentSuccess) {
      // Update order as failed
      await supabase
        .from("orders")
        .update({
          payment_status: "failed",
          status: "failed",
          payment_response: statusData,
          error_message: `Payment not confirmed. Status: ${paymentState}`,
        })
        .eq("id", orderRecord.id);

      return jsonResponse({ error: "Payment not confirmed", status: paymentState, orderId: order.id }, 400);
    }

    // Step 3: Payment successful - create enrollment
    const enrollmentPayload = {
      user_id: userId,
      course_id: courseData.id || null,
      course_title: courseData.name || courseData.title || orderRecord.course_title || "Course",
      course_slug: courseData.slug || courseData.skillId || orderRecord.course_slug || "",
      instructor_name: courseData.instructor || courseData.instructor_name || orderRecord.instructor_name || "",
      course_image: courseData.image || courseData.cover_image || orderRecord.course_image || "",
      price_cents: priceCents || orderRecord.amount_cents || 0,
      currency,
      payment_id: orderId,
      status: "active",
      created_at: new Date().toISOString(),
    };

    const { data: enrollment, error: enrollmentError } = await supabase
      .from("enrollments")
      .insert(enrollmentPayload)
      .select()
      .single();

    if (enrollmentError) {
      console.error("Enrollment DB error:", enrollmentError);
      // Update order with error
      await supabase
        .from("orders")
        .update({
          payment_status: "success",
          payment_verified: true,
          enrollment_created: false,
          status: "failed",
          payment_response: statusData,
          error_message: `Payment success but enrollment failed: ${enrollmentError.message}`,
        })
        .eq("id", orderRecord.id);

      return jsonResponse({ error: "Payment successful but failed to create enrollment", details: enrollmentError }, 500);
    }

    // Step 4: Update order as successful with enrollment link
    await supabase
      .from("orders")
      .update({
        payment_status: "success",
        payment_verified: true,
        enrollment_created: true,
        enrollment_id: enrollment.id,
        status: "completed",
        payment_response: statusData,
        completed_at: new Date().toISOString(),
      })
      .eq("id", order.id);

    return jsonResponse({ 
      enrollment, 
      order: { id: orderRecord.id, order_id: orderId },
      paymentStatus: paymentState 
    });
  } catch (error) {
    console.error("Verify-and-enroll error:", error);
    return jsonResponse({ error: "Failed to verify and enroll", message: String(error) }, 500);
  }
}

// PhonePe V2 OAuth Token Generation
async function getAuthToken(
  clientId: string,
  clientSecret: string,
  isSandbox: boolean,
): Promise<{ accessToken: string; expiresAt?: number; raw?: unknown }> {
  const oauthUrl = isSandbox
    ? "https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token"
    : "https://api.phonepe.com/apis/identity-manager/v1/oauth/token";

  const formData = new URLSearchParams();
  formData.append("client_id", clientId);
  formData.append("client_secret", clientSecret);
  formData.append("client_version", "1");
  formData.append("grant_type", "client_credentials");

  console.log("Requesting OAuth token from:", oauthUrl);
  console.log("OAuth params:", {
    client_id: clientId,
    client_version: "1",
    grant_type: "client_credentials"
  });

  const authResp = await fetch(oauthUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  const responseText = await authResp.text();
  console.log("OAuth response status:", authResp.status);
  console.log("OAuth response body:", responseText);

  if (!authResp.ok) {
    throw new Error(`Auth failed [${authResp.status}]: ${responseText}`);
  }

  try {
    const authData = JSON.parse(responseText);
    if (!authData.access_token) {
      throw new Error("No access_token in response");
    }
    console.log("OAuth token obtained successfully");
    return {
      accessToken: authData.access_token,
      expiresAt: authData.expires_at,
      raw: authData,
    };
  } catch (parseError) {
    throw new Error(`Failed to parse auth response: ${responseText}`);
  }
}

function jsonResponse(obj: unknown, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
