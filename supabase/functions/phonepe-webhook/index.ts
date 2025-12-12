import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

async function computeSha256Hex(input: string) {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  }

  // Read raw body for signature verification
  const rawBody = await req.text();
  const headers = Object.fromEntries(req.headers.entries());

  // Attempt signature verification (adjust to exact PhonePe V2 webhook spec)
  const xVerify = headers["x-verify"] || headers["X-VERIFY"];
  const saltKey = Deno.env.get("PHONEPE_WEBHOOK_SALT_KEY");
  const saltIndex = Deno.env.get("PHONEPE_WEBHOOK_SALT_INDEX") || "1";

  if (xVerify && saltKey) {
    try {
      // Common PhonePe pattern: SHA256(body + path + saltKey) + "###" + saltIndex
      // Update `pathForHash` if PhonePe specifies a different concatenation for webhooks.
      const pathForHash = "/phonepe-webhook";
      const toSign = rawBody + pathForHash + saltKey;
      const hash = await computeSha256Hex(toSign);
      const expected = `${hash}###${saltIndex}`;
      if (expected !== xVerify) {
        console.warn("Webhook signature mismatch", { expected, got: xVerify });
        return new Response("unauthorized", { status: 401, headers: corsHeaders });
      }
    } catch (err) {
      console.error("Signature verification failed", err);
      return new Response("unauthorized", { status: 401, headers: corsHeaders });
    }
  } else {
    console.warn("Webhook received without signature verification (missing x-verify or salt key)");
  }

  console.log("PHONEPE WEBHOOK HEADERS:", headers);
  console.log("PHONEPE WEBHOOK BODY:", rawBody);

  try {
    const body = JSON.parse(rawBody);
    // TODO: Update order status in your DB based on body/state
    // Example: body.orderId, body.transactionId, body.state/status
  } catch (err) {
    console.error("Webhook parse error", err);
    return new Response("bad request", { status: 400, headers: corsHeaders });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
