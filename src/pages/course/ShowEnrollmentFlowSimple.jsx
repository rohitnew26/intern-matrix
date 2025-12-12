import React, { useState } from "react";
import { createPhonePePayment } from "../../services/phonepeService";

const ShowEnrollmentFlow = ({
  isOpen,
  onClose,
  user,
  course,
  courseIdentifier,
  courseSlug,
  courseName,
  priceCents,
  displayAmount,
}) => {
  const [checkoutError, setCheckoutError] = useState("");
  const [isPhonePeRedirecting, setIsPhonePeRedirecting] = useState(false);

  const handlePhonePePay = async () => {
    setCheckoutError("");
    setIsPhonePeRedirecting(true);
    try {
      const payload = {
        amount: Number(displayAmount) || 0,
        currency: "INR",
        courseId: course?.id || courseIdentifier,
        courseSlug,
        userEmail: user?.email,
        userName: user?.user_metadata?.full_name || user?.email,
      };

      const response = await createPhonePePayment(payload);
      const redirect = response?.redirectUrl || response?.intentUrl;
      if (redirect) {
        window.location.href = redirect;
        return;
      }

      setCheckoutError(
        "PhonePe payment link unavailable. Please retry."
      );
    } catch (error) {
      setCheckoutError(error?.message || "Unable to start PhonePe payment.");
    } finally {
      setIsPhonePeRedirecting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="relative z-10 max-w-xl mx-auto mt-10 bg-white rounded-2xl shadow-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Secure Your Seat
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-2">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-gray-900">Complete Your Payment</h4>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              You will be redirected to PhonePe's secure payment gateway to complete your enrollment.
            </p>
            <div className="bg-gray-50 rounded-lg px-4 py-3 inline-block">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Amount to Pay</p>
              <p className="text-3xl font-bold text-gray-900">₹{displayAmount}</p>
            </div>
          </div>

          {checkoutError && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
              {checkoutError}
            </div>
          )}

          <button
            onClick={handlePhonePePay}
            disabled={isPhonePeRedirecting}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg disabled:opacity-60 hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
          >
            {isPhonePeRedirecting ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Redirecting to PhonePe...
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Proceed to Payment
              </>
            )}
          </button>

          <p className="text-xs text-center text-gray-500">
            🔒 Secured by PhonePe Payment Gateway
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShowEnrollmentFlow;
