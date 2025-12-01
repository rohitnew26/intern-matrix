import React, { useState } from "react";
import paymentQR from "../../assets/images/pymentQR.png";
import { createEnrollment } from "../../services/enrollmentService";
import { sendEnrollmentEmail } from "../../services/notificationService";
import { formatCurrency } from "../../utils/helpers";

const generateInvoiceNumber = () => {
  const timePart = Date.now().toString(36).toUpperCase();
  const randomPart = Math.floor(Math.random() * 1e4)
    .toString(36)
    .toUpperCase()
    .padStart(3, "0");
  return `INV-${timePart}${randomPart}`;
};

const ShowEnrollmentFlow = ({
  isOpen,
  onClose,
  enrollmentStep,
  paymentConfirmed,
  setPaymentConfirmed,
  proceedToDetailsStep,
  isAdvancingStep,
  handleCopyUpi,
  upiCopied,
  PAYMENT_UPI_ID,
  displayAmount,
  detailsForm,
  handleDetailChange,
  user,
  course,
  courseIdentifier,
  courseSlug,
  courseName,
  priceCents,
  setCheckoutError,
  setCheckoutSuccess,
  onSuccess,
}) => {
  const [formErrors, setFormErrors] = useState({});
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const validateDetails = () => {
    const errors = {};
    if (!detailsForm.utrNumber.trim())
      errors.utrNumber = "UTR number is required.";
    if (!detailsForm.fullName.trim())
      errors.fullName = "Full name is required.";
    if (!detailsForm.collegeName.trim())
      errors.collegeName = "College name is required.";
    if (!detailsForm.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(detailsForm.email)) {
      errors.email = "Enter a valid email.";
    }
    if (!detailsForm.phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (detailsForm.phone.replace(/[^0-9]/g, "").length < 8) {
      errors.phone = "Enter a valid phone number.";
    }
    if (!detailsForm.joiningDate)
      errors.joiningDate = "Joining date is required.";
    if (!detailsForm.endDate) errors.endDate = "End date is required.";
    if (!detailsForm.paymentScreenshot)
      errors.paymentScreenshot = "Payment screenshot is required.";
    if (!detailsForm.course.trim()) errors.course = "Course name is required.";
    return errors;
  };

  // Convert ISO date (YYYY-MM-DD) to MM/DD/YYYY format
  const formatDateForAPI = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) return isoDate;
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const submitEnrollmentRecord = async () => {
    const invoiceNumber = generateInvoiceNumber();
    const joiningDateIso = detailsForm.joiningDate;
    const joiningDateReadable = (() => {
      if (!joiningDateIso) return "Not provided";
      const candidate = new Date(joiningDateIso);
      if (Number.isNaN(candidate.getTime())) {
        return joiningDateIso;
      }
      return candidate.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    })();

    try {
      setCheckoutError("");
      setCheckoutSuccess("Sending enrollment...");
      setIsProcessingPayment(true);

      // Format dates from ISO (YYYY-MM-DD) to MM/DD/YYYY as backend expects
      const joiningDateFormatted = formatDateForAPI(detailsForm.joiningDate);
      const endDateFormatted = formatDateForAPI(detailsForm.endDate);

      const formData = new FormData();
      formData.append("utrNumber", detailsForm.utrNumber.trim());
      formData.append("fullName", detailsForm.fullName.trim());
      formData.append("collegeName", detailsForm.collegeName.trim());
      formData.append("email", detailsForm.email.trim());
      formData.append("phone", String(detailsForm.phone).trim());
      formData.append("joiningDate", joiningDateFormatted);
      formData.append("endDate", endDateFormatted);
      formData.append("isCR", detailsForm.isCR === "Yes" ? "true" : "false");
      formData.append("course", detailsForm.course.trim());

      if (detailsForm.paymentScreenshot) {
        const originalFile = detailsForm.paymentScreenshot;
        const extension = originalFile.name.includes(".")
          ? originalFile.name.split(".").pop()
          : "jpg";

        // Create a safe filename to avoid invalid storage keys on backend
        const safeFileName = `payment_${Date.now()}.${extension}`.replace(
          /[^a-zA-Z0-9_.-]/g,
          "_"
        );

        const safeFile = new File([originalFile], safeFileName, {
          type: originalFile.type || "image/jpeg",
        });

        formData.append("paymentScreenshot", safeFile);
      }

      // Debug: Log the data being sent (for development)
      console.log("Sending enrollment data:", {
        utrNumber: detailsForm.utrNumber.trim(),
        fullName: detailsForm.fullName.trim(),
        collegeName: detailsForm.collegeName.trim(),
        email: detailsForm.email.trim(),
        phone: String(detailsForm.phone).trim(),
        joiningDate: joiningDateFormatted,
        endDate: endDateFormatted,
        isCR: detailsForm.isCR === "Yes" ? "true" : "false",
        course: detailsForm.course.trim(),
        hasScreenshot: !!detailsForm.paymentScreenshot,
      });

      const apiResponse = await fetch(
        "https://intern-backend-wheat.vercel.app/api/enrollment",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!apiResponse.ok) {
        // Try to get detailed error message from backend
        let errorMessage = `API error: ${apiResponse.status}`;
        try {
          const errorData = await apiResponse.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          } else if (errorData && errorData.error) {
            errorMessage = errorData.error;
          }
        } catch {
          // If JSON parsing fails, try text
          try {
            const text = await apiResponse.text();
            if (text) errorMessage = text;
          } catch {
            // Keep default error message
          }
        }
        throw new Error(errorMessage);
      }

      const apiData = await apiResponse.json();

      let enrollmentRecord = null;
      try {
        enrollmentRecord = await createEnrollment({
          userId: user?.id || "anonymous",
          course,
          priceCents,
          currency: "INR",
        });
      } catch (supabaseError) {
        console.warn("Supabase enrollment creation failed", supabaseError);
      }

      let emailFailed = false;
      try {
        await sendEnrollmentEmail({
          invoiceNumber,
          enrollmentId: enrollmentRecord?.id || apiData?.id,
          courseId: course?.id || courseIdentifier,
          courseTitle: courseName,
          courseSlug: course?.slug || courseSlug,
          learnerName: detailsForm.fullName,
          learnerEmail: detailsForm.email,
          learnerPhone: detailsForm.phone,
          collegeName: detailsForm.collegeName,
          isCampusRep: detailsForm.isCR === "Yes",
          userId: user?.id || "anonymous",
          amountCents: priceCents,
          amountDisplay: formatCurrency(priceCents, "INR"),
          joiningDate: joiningDateIso,
          joiningDateReadable,
          paymentInstructions: `UPI payment to ${PAYMENT_UPI_ID}`,
          submittedAt: new Date().toISOString(),
        });
      } catch (notifyError) {
        emailFailed = true;
        console.error("Enrollment notification email failed", notifyError);
      }

      const invoiceLine = `Invoice ${invoiceNumber} generated for ${formatCurrency(
        priceCents,
        "INR"
      )}.`;
      const paymentLine = `Please pay ₹${displayAmount} to ${PAYMENT_UPI_ID} so we can lock your internship start date.`;
      const statusLine = emailFailed
        ? "Email notification could not be sent automatically. Please forward your payment screenshot to update@internmatrix.com."
        : "Our operations inbox (update@internmatrix.com) has been notified with your invoice PDF (check your email copy too).";

      setCheckoutSuccess(
        `Enrollment submitted successfully! ${invoiceLine} ${paymentLine} ${statusLine}`
      );

      if (emailFailed) {
        setCheckoutError(
          "Enrollment saved, but automatic email failed. Please contact support if you do not hear from us within 24 hours."
        );
      }

      return { success: true, invoiceNumber, emailFailed };
    } catch (error) {
      console.error("Enrollment submission error", error);
      setCheckoutError(error.message || "Unable to submit enrollment");
      return { success: false };
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleEnrollmentSubmit = async (event) => {
    event.preventDefault();

    if (!course) {
      setCheckoutError("Course data is missing. Please refresh and try again.");
      return;
    }

    const errors = validateDetails();
    setFormErrors(errors);
    if (Object.keys(errors).length) {
      return;
    }

    const result = await submitEnrollmentRecord();
    if (result?.success && onSuccess) {
      onSuccess();
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

        {enrollmentStep === 1 && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">
                Step 1 of 2 — Payment Confirmation
              </span>
              <br />
              Please complete the payment using UPI. You can manually enter the
              UPI ID or scan the QR code to proceed.
            </p>

            {/* ---------- UPI + QR SCANNER GRID ----------- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* LEFT: UPI ID */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3 shadow-sm border">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 text-sm font-medium">
                    UPI ID for Payment
                  </span>
                  <button
                    onClick={handleCopyUpi}
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    {upiCopied ? "Copied" : "Copy"}
                  </button>
                </div>

                <p className="text-xl font-bold tracking-wide text-gray-900">
                  {PAYMENT_UPI_ID}
                </p>

                <p className="text-sm text-gray-600">
                  Amount:
                  <span className="font-semibold text-gray-900">
                    {" "}
                    ₹{displayAmount}
                  </span>
                </p>
              </div>

              {/* RIGHT: QR SCAN IMAGE ONLY */}
              <div className="flex items-center justify-center bg-white border rounded-xl p-4 shadow-sm">
                <img
                  src={paymentQR}
                  alt="UPI QR Code"
                  className="w-44 h-44 object-contain"
                />
              </div>
            </div>

            {/* PAYMENT CONFIRM CHECKBOX */}
            <label className="flex items-center gap-2 text-sm text-gray-700 mt-2">
              <input
                type="checkbox"
                className="accent-blue-600 h-4 w-4"
                checked={paymentConfirmed}
                onChange={(event) => setPaymentConfirmed(event.target.checked)}
              />
              I confirm that I have completed the payment.
            </label>

            {/* NEXT BUTTON */}
            <button
              onClick={proceedToDetailsStep}
              disabled={!paymentConfirmed || isAdvancingStep}
              className="w-full bg-black text-white py-3 rounded-xl font-semibold disabled:opacity-50 hover:bg-gray-900 transition"
            >
              {isAdvancingStep ? "Verifying..." : "Next"}
            </button>
          </div>
        )}

        {enrollmentStep === "waiting" && (
          <div className="flex flex-col items-center gap-4 py-10">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            <p className="text-gray-700 text-sm text-center">
              Verifying payment acknowledgement... hang tight!
            </p>
          </div>
        )}

        {enrollmentStep === 2 && (
          <div className="flex flex-col max-h-[85vh]">
            <form
              id="enrollmentForm"
              className="space-y-3 overflow-y-auto px-1 sm:px-0 pb-20"
              onSubmit={handleEnrollmentSubmit}
            >
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                <span className="font-semibold">
                  Step 2 of 2 — Onboarding & Payment Verification
                </span>
                <br />
                Please provide your internship details and upload your payment
                proof to confirm your enrollment.
              </p>

              {/* UTR + Screenshot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-600">
                    UTR / Transaction Reference Number
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full border rounded-lg px-2 py-1.5 text-sm"
                    placeholder="Enter reference"
                    value={detailsForm.utrNumber}
                    onChange={(e) =>
                      handleDetailChange("utrNumber", e.target.value)
                    }
                  />
                  {formErrors.utrNumber && (
                    <p className="text-[10px] text-red-500 mt-1">
                      {formErrors.utrNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-600">
                    Upload Payment Screenshot
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-1 w-full border rounded-lg px-2 py-1.5 bg-white text-sm"
                    onChange={(e) =>
                      handleDetailChange(
                        "paymentScreenshot",
                        e.target.files && e.target.files[0]
                      )
                    }
                  />
                  <p className="text-[10px] text-gray-500 mt-1">
                    JPG / PNG · Max size 5MB
                  </p>
                  {formErrors.paymentScreenshot && (
                    <p className="text-[10px] text-red-500 mt-1">
                      {formErrors.paymentScreenshot}
                    </p>
                  )}
                </div>
              </div>

              {/* NAME + COLLEGE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-600">Full Name</label>
                  <input
                    type="text"
                    className="mt-1 w-full border rounded-lg px-2 py-1.5 text-sm"
                    value={detailsForm.fullName}
                    onChange={(e) =>
                      handleDetailChange("fullName", e.target.value)
                    }
                  />
                  {formErrors.fullName && (
                    <p className="text-[10px] text-red-500 mt-1">
                      {formErrors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-600">College Name</label>
                  <input
                    type="text"
                    className="mt-1 w-full border rounded-lg px-2 py-1.5 text-sm"
                    value={detailsForm.collegeName}
                    onChange={(e) =>
                      handleDetailChange("collegeName", e.target.value)
                    }
                  />
                  {formErrors.collegeName && (
                    <p className="text-[10px] text-red-500 mt-1">
                      {formErrors.collegeName}
                    </p>
                  )}
                </div>
              </div>

              {/* EMAIL PHONE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-600">Email</label>
                  <input
                    type="email"
                    className="mt-1 w-full border rounded-lg px-2 py-1.5 text-sm"
                    value={detailsForm.email}
                    onChange={(e) =>
                      handleDetailChange("email", e.target.value)
                    }
                  />
                  {formErrors.email && (
                    <p className="text-[10px] text-red-500 mt-1">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-600">Phone</label>
                  <input
                    type="tel"
                    className="mt-1 w-full border rounded-lg px-2 py-1.5 text-sm"
                    value={detailsForm.phone}
                    onChange={(e) =>
                      handleDetailChange("phone", e.target.value)
                    }
                  />
                  {formErrors.phone && (
                    <p className="text-[10px] text-red-500 mt-1">
                      {formErrors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* DATES */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-600">
                    Preferred Joining Date
                  </label>
                  <input
                    type="date"
                    className="mt-1 w-full border rounded-lg px-2 py-1.5 text-sm"
                    value={detailsForm.joiningDate}
                    onChange={(e) =>
                      handleDetailChange("joiningDate", e.target.value)
                    }
                  />
                  {formErrors.joiningDate && (
                    <p className="text-[10px] text-red-500 mt-1">
                      {formErrors.joiningDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-600">
                    Preferred End Date
                  </label>
                  <input
                    type="date"
                    className="mt-1 w-full border rounded-lg px-2 py-1.5 text-sm"
                    value={detailsForm.endDate}
                    onChange={(e) =>
                      handleDetailChange("endDate", e.target.value)
                    }
                  />
                  {formErrors.endDate && (
                    <p className="text-[10px] text-red-500 mt-1">
                      {formErrors.endDate}
                    </p>
                  )}
                </div>
              </div>

              {/* CR */}
              <div>
                <label className="text-xs text-gray-600">
                  Are you a Class Representative?
                </label>
                <select
                  className="mt-1 w-full border rounded-lg px-2 py-1.5 text-sm"
                  value={detailsForm.isCR}
                  onChange={(e) =>
                    handleDetailChange("isCR", e.target.value)
                  }
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-600">Course Name</label>
                <input
                  type="text"
                  className="mt-1 w-full border rounded-lg px-2 py-1.5 text-sm"
                  value={detailsForm.course}
                  onChange={(e) =>
                    handleDetailChange("course", e.target.value)
                  }
                />
                {formErrors.course && (
                  <p className="text-[10px] text-red-500 mt-1">
                    {formErrors.course}
                  </p>
                )}
              </div>
            </form>

            {/* Sticky Submit Button */}
            <div className="sticky bottom-0 left-0 w-full bg-white py-3 mt-2">
              <button
                type="submit"
                form="enrollmentForm"
                disabled={isProcessingPayment}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg text-sm font-semibold disabled:opacity-60"
              >
                {isProcessingPayment ? "Saving..." : "Submit Details"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowEnrollmentFlow;


