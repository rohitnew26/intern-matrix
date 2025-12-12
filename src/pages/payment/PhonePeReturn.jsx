import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchPhonePeStatus } from "../../services/phonepeService";
import { createEnrollment } from "../../services/enrollmentService";
import { useAuth } from "../../context/AuthContext";

const STATUS_POLL_INTERVAL = 3000;
const STATUS_POLL_MAX_ATTEMPTS = 15;
const PENDING_PHONEPE_KEY = "imx_phonepe_pending";

const PhonePeReturn = () => {
  const [searchParams] = useSearchParams();
  const tx = useMemo(() => searchParams.get("tx"), [searchParams]);
  const [status, setStatus] = useState("PENDING");
  const [message, setMessage] = useState("Checking payment status...");
  const [attempts, setAttempts] = useState(0);
  const { user } = useAuth();

  const getPendingRecord = (txId) => {
    if (!txId) return null;
    try {
      const raw = localStorage.getItem(PENDING_PHONEPE_KEY);
      const list = raw ? JSON.parse(raw) : [];
      return list.find((item) => item.tx === txId) || null;
    } catch (err) {
      console.warn("Unable to read pending PhonePe record", err);
      return null;
    }
  };

  const removePendingRecord = (txId) => {
    if (!txId) return;
    try {
      const raw = localStorage.getItem(PENDING_PHONEPE_KEY);
      const list = raw ? JSON.parse(raw) : [];
      const filtered = list.filter((item) => item.tx !== txId);
      localStorage.setItem(PENDING_PHONEPE_KEY, JSON.stringify(filtered));
    } catch (err) {
      console.warn("Unable to remove pending PhonePe record", err);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const poll = async () => {
      if (!tx) {
        setMessage("Missing transaction id.");
        setStatus("ERROR");
        return;
      }

      for (let i = 1; i <= STATUS_POLL_MAX_ATTEMPTS; i += 1) {
        try {
          const resp = await fetchPhonePeStatus(tx);
          const code = resp?.status || resp?.code || resp?.state;
          const msg = resp?.message || "";
          if (cancelled) return;
          setAttempts(i);
          setMessage(msg || `Attempt ${i} of ${STATUS_POLL_MAX_ATTEMPTS}`);
          if (code === "SUCCESS" || code === "PAYMENT_SUCCESS" || code === "COMPLETED") {
            setStatus("SUCCESS");
            setMessage("Payment confirmed. Processing enrollment...");

            // Attempt enrollment creation if pending record exists
            const pending = getPendingRecord(tx);
            console.log("[PhonePeReturn] Pending record:", pending);
            console.log("[PhonePeReturn] User:", user);
            
            if (pending) {
              // Use userId from pending record (saved before payment) or current logged-in user
              const effectiveUserId = pending?.userId || user?.id;
              
              if (!effectiveUserId) {
                console.warn("[PhonePeReturn] No user ID available");
                setMessage("Payment successful! Please sign in to complete your enrollment.");
                return;
              }

              try {
                console.log("[PhonePeReturn] Verifying payment and enrolling via backend...");
                const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhoZHJvbmFqcmt4bmV0d3FwcGtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNTY3MjIsImV4cCI6MjA3OTkzMjcyMn0.sIDB1ufidIyBxbzPXElYdmQr9uoy_igfVLaqxAHx5WU";
                const verifyResp = await fetch(
                  "https://hhdronajrkxnetwqppkg.supabase.co/functions/v1/phonePP",
                  {
                    method: "POST",
                    headers: { 
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
                    },
                    body: JSON.stringify({
                      action: "verify-and-enroll",
                      orderId: tx,
                      userId: effectiveUserId,
                      course: pending.course,
                      priceCents: pending.priceCents,
                      currency: pending.currency || "INR",
                    }),
                  }
                );
                const verifyData = await verifyResp.json();
                if (!verifyResp.ok) {
                  console.error("[PhonePeReturn] Backend verification failed", verifyData);
                  setMessage(`Payment confirmed, but enrollment failed: ${verifyData.error || 'Unknown error'}. Please contact support with transaction ID: ${tx}`);
                  return;
                }
                console.log("[PhonePeReturn] Enrollment created via backend:", verifyData);
                removePendingRecord(tx);
                setMessage("✅ Payment confirmed! Enrollment complete. Check your dashboard.");
              } catch (enrollErr) {
                console.error("[PhonePeReturn] Failed to verify and enroll", enrollErr);
                setMessage(`Payment confirmed, but enrollment failed: ${enrollErr.message}. Contact support with transaction ID: ${tx}`);
              }
            } else {
              console.warn("[PhonePeReturn] No pending record found for transaction", tx);
              setMessage("Payment successful! However, we couldn't find your enrollment details. Please contact support with your transaction ID.");
            }
            return;
          }
          if (code === "FAILED" || code === "PAYMENT_FAILED") {
            setStatus("FAILED");
            setMessage("Payment failed. Please retry.");
            return;
          }
        } catch (err) {
          if (cancelled) return;
          setMessage(err?.message || "Unable to check status.");
        }
        await new Promise((res) => setTimeout(res, STATUS_POLL_INTERVAL));
      }
      if (!cancelled) {
        setStatus("PENDING");
        setMessage("Status pending. Please refresh after a minute if needed.");
      }
    };

    poll();
    return () => {
      cancelled = true;
    };
  }, [tx]);

  const badgeClass =
    status === "SUCCESS"
      ? "bg-green-100 text-green-800"
      : status === "FAILED" || status === "ERROR"
      ? "bg-red-100 text-red-800"
      : "bg-yellow-100 text-yellow-800";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">PhonePe Payment</h1>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${badgeClass}`}>
            {status}
          </span>
        </div>
        <div className="space-y-2 text-sm text-gray-700">
          <p>{message}</p>
          {tx && <p className="text-xs text-gray-500">Transaction ID: {tx}</p>}
          <p className="text-xs text-gray-500">Checks: {attempts}/{STATUS_POLL_MAX_ATTEMPTS}</p>
        </div>
        <div className="text-xs text-gray-500">
          If your payment is successful but not reflected, please wait a minute and refresh this page.
        </div>
        {status === "SUCCESS" && (
          <a
            href="/dashboard?tab=courses"
            className="block w-full text-center bg-yellow-500 text-black font-semibold py-2 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Go to Dashboard
          </a>
        )}
      </div>
    </div>
  );
};

export default PhonePeReturn;
