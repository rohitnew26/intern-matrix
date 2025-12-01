import React, { useCallback, useEffect, useMemo, useState } from "react";
import { fetchAllEnrollments, updateEnrollmentStatus } from "../../services/enrollmentService";
import { fetchProfiles } from "../../services/profileService";
import { fetchCertificates, updateCertificateStatus } from "../../services/certificateService";
import { fetchCourses } from "../../services/courseService";
import {
  sendSmtpEmail,
  getSmtpRelayOverride,
  saveSmtpRelayOverride,
  clearSmtpRelayOverride,
} from "../../services/smtpService";
import { formatDate, formatCurrency } from "../../utils/helpers";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "payment_review", label: "Payment Review" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const CERT_STATUS_OPTIONS = [
  { value: "issued", label: "Issued" },
  { value: "verified", label: "Verified" },
  { value: "revoked", label: "Revoked" },
  { value: "draft", label: "Draft" },
];

const ADMIN_EMAIL = "update@internmatrix.com";
const PAYMENT_UPI_ID = "9288075422@yescred";

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "enrollments", label: "Enrollments" },
  { key: "users", label: "Users" },
  { key: "courses", label: "Courses" },
  { key: "certificates", label: "Certificates" },
];

const SECRET_PATH = "/admin-no-guess-no-check";

const AdminControlRoom = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const [enrollments, setEnrollments] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [enrollmentLoading, setEnrollmentLoading] = useState(true);
  const [enrollmentError, setEnrollmentError] = useState("");

  const [users, setUsers] = useState([]);
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState("");

  const [courses, setCourses] = useState([]);
  const [courseLoading, setCourseLoading] = useState(false);
  const [courseError, setCourseError] = useState("");

  const [certificates, setCertificates] = useState([]);
  const [certificateFilter, setCertificateFilter] = useState("all");
  const [certificateLoading, setCertificateLoading] = useState(false);
  const [certificateError, setCertificateError] = useState("");
  const [certificateUpdatingId, setCertificateUpdatingId] = useState(null);

  const [toast, setToast] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const [manualEnrollment, setManualEnrollment] = useState(null);
  const [manualTemplate, setManualTemplate] = useState("invoice");
  const [manualForm, setManualForm] = useState({
    to: "",
    cc: ADMIN_EMAIL,
    subject: "",
    body: "",
  });
  const [manualSending, setManualSending] = useState(false);
  const [manualError, setManualError] = useState("");
  const [manualSuccess, setManualSuccess] = useState("");
  const [relayOverrideInput, setRelayOverrideInput] = useState("");
  const [relayOverrideBanner, setRelayOverrideBanner] = useState({ type: "", message: "" });

  const loadEnrollments = useCallback(async () => {
    setEnrollmentLoading(true);
    setEnrollmentError("");
    try {
      const data = await fetchAllEnrollments({ status: filterStatus });
      setEnrollments(data);
    } catch (err) {
      console.error("Admin enrollment fetch failed", err);
      setEnrollmentError(err.message || "Unable to load enrollments right now.");
    } finally {
      setEnrollmentLoading(false);
    }
  }, [filterStatus]);

  const loadUsers = useCallback(async () => {
    setUserLoading(true);
    setUserError("");
    try {
      const data = await fetchProfiles({ limit: 200, search: userSearch || undefined });
      setUsers(data);
    } catch (err) {
      console.error("Admin user fetch failed", err);
      setUserError(err.message || "Unable to load user profiles right now.");
    } finally {
      setUserLoading(false);
    }
  }, [userSearch]);

  const loadCourses = useCallback(async () => {
    setCourseLoading(true);
    setCourseError("");
    try {
      const data = await fetchCourses();
      setCourses(data);
    } catch (err) {
      console.error("Admin course fetch failed", err);
      setCourseError(err.message || "Unable to load courses");
    } finally {
      setCourseLoading(false);
    }
  }, []);

  const loadCertificates = useCallback(async () => {
    setCertificateLoading(true);
    setCertificateError("");
    try {
      const data = await fetchCertificates({ status: certificateFilter });
      setCertificates(data);
    } catch (err) {
      console.error("Admin certificate fetch failed", err);
      setCertificateError(err.message || "Unable to load certificates");
    } finally {
      setCertificateLoading(false);
    }
  }, [certificateFilter]);

  useEffect(() => {
    loadEnrollments();
  }, [loadEnrollments]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  useEffect(() => {
    loadCertificates();
  }, [loadCertificates]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  const summary = useMemo(() => {
    return enrollments.reduce(
      (acc, item) => {
        acc.total += 1;
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
      },
      { total: 0 }
    );
  }, [enrollments]);

  const uniqueLearners = useMemo(() => {
    const bag = new Set(enrollments.map((item) => item.user_id).filter(Boolean));
    return bag.size;
  }, [enrollments]);

  const revenueCents = useMemo(() => {
    return enrollments.reduce((sum, item) => {
      return ["active", "completed"].includes(item.status) ? sum + (item.price_cents || 0) : sum;
    }, 0);
  }, [enrollments]);

  const enrollmentByCourse = useMemo(() => {
    return enrollments.reduce((acc, item) => {
      const key = item.course_slug || item.course_id || item.id;
      if (!key) return acc;
      const bucket = acc.get(key) || { count: 0, title: item.course_title };
      bucket.count += 1;
      bucket.title = item.course_title || bucket.title;
      acc.set(key, bucket);
      return acc;
    }, new Map());
  }, [enrollments]);

  const enrollmentByUser = useMemo(() => {
    return enrollments.reduce((acc, item) => {
      if (!item.user_id) return acc;
      acc.set(item.user_id, (acc.get(item.user_id) || 0) + 1);
      return acc;
    }, new Map());
  }, [enrollments]);

  const certificateStatusChoices = useMemo(() => {
    const map = new Map(CERT_STATUS_OPTIONS.map((item) => [item.value, item]));
    certificates.forEach((item) => {
      if (item.status && !map.has(item.status)) {
        map.set(item.status, { value: item.status, label: item.status });
      }
    });
    return Array.from(map.values());
  }, [certificates]);

  const buildManualEmailTemplate = useCallback(
    (templateType, enrollment) => {
      if (!enrollment) {
        return { subject: "", body: "" };
      }

      const invoiceNumber = `INV-ADM-${String(enrollment.id || Date.now())
        .slice(-6)
        .toUpperCase()}`;
      const amountDisplay = formatCurrency(enrollment.price_cents || 0, enrollment.currency || "INR");
      const courseTitle = enrollment.course_title || "Course";
      const learnerRef = enrollment.user_id || "Learner";

      if (templateType === "update") {
        return {
          subject: `Enrollment Update | ${courseTitle}`,
          body: `Hi ${learnerRef},\n\nWe just updated your enrollment for ${courseTitle}. Current status: ${
            enrollment.status || "pending"
          }.\n\nIf you have already paid via UPI (${PAYMENT_UPI_ID}), reply with the payment reference so we can activate your dashboard.\n\nThanks,\nInternMatrix Team`,
        };
      }

      return {
        subject: `Invoice ${invoiceNumber} | ${courseTitle}`,
        body: `Hi ${learnerRef},\n\nThanks for choosing ${courseTitle}. Please settle invoice ${invoiceNumber} for ${amountDisplay}.\n\nPay via UPI: ${PAYMENT_UPI_ID}\nReference ID: ${enrollment.id}\n\nShare the screenshot once done so we can lock your internship start date.\n\nRegards,\nInternMatrix Finance Desk`,
      };
    },
    []
  );

  useEffect(() => {
    if (!manualEnrollment) return;
    const template = buildManualEmailTemplate(manualTemplate, manualEnrollment);
    setManualForm((prev) => ({
      ...prev,
      subject: template.subject,
      body: template.body,
      cc: prev.cc || ADMIN_EMAIL,
    }));
  }, [manualEnrollment, manualTemplate, buildManualEmailTemplate]);

  useEffect(() => {
    setRelayOverrideInput(getSmtpRelayOverride());
  }, []);

  const handleStatusChange = async (enrollmentId, newStatus) => {
    setUpdatingId(enrollmentId);
    setEnrollmentError("");
    try {
      const updated = await updateEnrollmentStatus({ enrollmentId, status: newStatus });
      setEnrollments((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      setToast(`Enrollment updated to ${newStatus}`);
    } catch (err) {
      console.error("Admin status update failed", err);
      setEnrollmentError(err.message || "Unable to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCertificateStatusChange = async (certificateId, nextStatus) => {
    setCertificateUpdatingId(certificateId);
    setCertificateError("");
    try {
      const updated = await updateCertificateStatus({ certificateId, status: nextStatus });
      setCertificates((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      setToast(`Certificate marked ${nextStatus}`);
    } catch (err) {
      console.error("Admin certificate status update failed", err);
      setCertificateError(err.message || "Unable to update certificate status");
    } finally {
      setCertificateUpdatingId(null);
    }
  };

  const handlePrefillManualEnrollment = (enrollment) => {
    if (!enrollment) return;
    setManualEnrollment(enrollment);
    setManualError("");
    setManualSuccess("");
    setManualForm((prev) => ({
      ...prev,
      to: prev.to || "",
      cc: prev.cc || ADMIN_EMAIL,
    }));
  };

  const updateManualForm = (field, value) => {
    setManualForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateRelayBanner = (type, message) => {
    setRelayOverrideBanner({ type, message });
  };

  const handleRelayOverrideSave = () => {
    const trimmed = relayOverrideInput.trim();
    if (!trimmed) {
      updateRelayBanner("error", "Provide a full HTTPS endpoint before saving.");
      return;
    }
    const stored = saveSmtpRelayOverride(trimmed);
    setRelayOverrideInput(stored);
    updateRelayBanner("success", "Relay override saved in this browser. Manual emails will use it immediately.");
  };

  const handleRelayOverrideClear = () => {
    clearSmtpRelayOverride();
    setRelayOverrideInput("");
    updateRelayBanner("info", "Relay override cleared. Build-time env vars will be used.");
  };

  const handleManualEmailSend = async () => {
    if (!manualEnrollment) {
      setManualError("Select an enrollment from the list above to prefill the email.");
      return;
    }
    if (!manualForm.to.trim()) {
      setManualError("Recipient email is required.");
      return;
    }

    setManualSending(true);
    setManualError("");
    setManualSuccess("");

    try {
      await sendSmtpEmail({
        to: manualForm.to.trim(),
        cc: manualForm.cc?.trim() || undefined,
        subject: manualForm.subject,
        body: manualForm.body,
        template: manualTemplate,
        enrollmentId: manualEnrollment.id,
        courseSlug: manualEnrollment.course_slug,
        courseTitle: manualEnrollment.course_title,
        status: manualEnrollment.status,
        userId: manualEnrollment.user_id,
      });
      setManualSuccess("Email sent via SMTP relay.");
    } catch (err) {
      console.error("Manual SMTP email failed", err);
      setManualError(err.message || "Unable to send email");
    } finally {
      setManualSending(false);
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
          <p className="text-sm text-slate-400">Total Enrollments</p>
          <p className="text-3xl font-semibold">{summary.total}</p>
        </div>
        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
          <p className="text-sm text-slate-400">Unique Learners</p>
          <p className="text-3xl font-semibold">{uniqueLearners}</p>
        </div>
        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
          <p className="text-sm text-slate-400">Recognized Revenue</p>
          <p className="text-3xl font-semibold">{formatCurrency(revenueCents)}</p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STATUS_OPTIONS.map((option) => (
          <div key={option.value} className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
            <p className="text-sm text-slate-400">{option.label}</p>
            <p className="text-2xl font-semibold">{summary[option.value] || 0}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
          <p className="text-sm text-slate-400">Live Courses</p>
          <p className="text-3xl font-semibold">{courses.length}</p>
        </div>
        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
          <p className="text-sm text-slate-400">Certificates Tracked</p>
          <p className="text-3xl font-semibold">{certificates.length}</p>
        </div>
        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
          <p className="text-sm text-slate-400">Pending Payments</p>
          <p className="text-3xl font-semibold">
            {(summary.pending || 0) + (summary.payment_review || 0)}
          </p>
        </div>
      </section>
    </div>
  );

  const renderEnrollments = () => (
    <div className="space-y-5">
      <section className="flex flex-col md:flex-row md:items-center gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-400">Status Filter</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-3 items-center">
          <button
            onClick={loadEnrollments}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-semibold"
          >
            Refresh
          </button>
          {enrollmentLoading && <span className="text-sm text-slate-400">Syncing…</span>}
        </div>
      </section>

      {enrollmentError && <p className="text-sm text-red-400">{enrollmentError}</p>}
      {toast && <p className="text-sm text-emerald-400">{toast}</p>}

      <section className="space-y-4">
        {enrollments.length === 0 && !enrollmentLoading && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center text-slate-400">
            No enrollments in this view.
          </div>
        )}

        {enrollments.map((enrollment) => (
          <article key={enrollment.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <p className="text-sm text-slate-400">Course</p>
                <p className="text-lg font-semibold">{enrollment.course_title}</p>
                <p className="text-xs text-slate-500">Slug: {enrollment.course_slug}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Learner</p>
                <p className="text-sm font-medium">{enrollment.user_id || "N/A"}</p>
                <p className="text-xs text-slate-500">Enrollment #{enrollment.id}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Created</p>
                <p className="text-sm font-medium">{formatDate(enrollment.created_at)}</p>
              </div>
              <div>
                <label className="text-sm text-slate-400">Status</label>
                <select
                  value={enrollment.status || "pending"}
                  onChange={(e) => handleStatusChange(enrollment.id, e.target.value)}
                  className="mt-1 bg-black/40 border border-slate-700 rounded-lg px-3 py-2 text-sm"
                  disabled={updatingId === enrollment.id}
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {updatingId === enrollment.id && <p className="text-xs text-amber-400 mt-1">Updating…</p>}
              </div>
            </div>
            <div className="flex flex-wrap gap-3 border-t border-slate-800 pt-3">
              <button
                onClick={() => handlePrefillManualEnrollment(enrollment)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-700 bg-black/30 hover:border-blue-500"
              >
                Prefill email composer
              </button>
              <span className="text-xs text-slate-500 self-center">
                Enrollment ID: {enrollment.id}
              </span>
            </div>
          </article>
        ))}
      </section>

      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col gap-1">
          <p className="text-base font-semibold">Manual notifications (SMTP)</p>
          <p className="text-sm text-slate-400">
            Select an enrollment above to auto-fill the template. Messages are sent through the configured SMTP relay
            so you can resend invoices or status updates on demand.
          </p>
        </div>

        <div className="bg-black/30 border border-slate-800 rounded-xl p-4 space-y-3">
          <div>
            <p className="text-sm font-semibold">Relay endpoint override</p>
            <p className="text-xs text-slate-400">
              Paste your Google Apps Script or webhook URL. We store it only in this browser (localStorage) so
              deployments without VITE_SMTP_RELAY_URL can still send manual emails.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="url"
              value={relayOverrideInput}
              onChange={(e) => setRelayOverrideInput(e.target.value)}
              placeholder="https://script.google.com/macros/s/···/exec"
              className="flex-1 bg-black/20 border border-slate-700 rounded-lg px-3 py-2 text-sm"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleRelayOverrideSave}
                className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold"
              >
                Save override
              </button>
              <button
                type="button"
                onClick={handleRelayOverrideClear}
                className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs"
              >
                Use env defaults
              </button>
            </div>
          </div>
          {relayOverrideBanner.message && (
            <p
              className={`text-xs ${
                relayOverrideBanner.type === "error"
                  ? "text-red-400"
                  : relayOverrideBanner.type === "info"
                  ? "text-slate-400"
                  : "text-emerald-400"
              }`}
            >
              {relayOverrideBanner.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm text-slate-400">Template</label>
          <div className="flex gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => setManualTemplate("invoice")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                manualTemplate === "invoice" ? "bg-blue-600 border-blue-500" : "border-slate-700"
              }`}
            >
              Invoice reminder
            </button>
            <button
              type="button"
              onClick={() => setManualTemplate("update")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                manualTemplate === "update" ? "bg-blue-600 border-blue-500" : "border-slate-700"
              }`}
            >
              Enrollment update
            </button>
          </div>
        </div>

        {manualEnrollment ? (
          <div className="text-xs text-slate-400">
            Targeting <span className="text-white font-semibold">{manualEnrollment.course_title}</span> · ID {manualEnrollment.id}
          </div>
        ) : (
          <p className="text-xs text-amber-400">No enrollment selected yet.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-slate-400">To</label>
            <input
              type="email"
              value={manualForm.to}
              onChange={(e) => updateManualForm("to", e.target.value)}
              placeholder="student@example.com"
              className="mt-1 w-full bg-black/30 border border-slate-700 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400">CC</label>
            <input
              type="email"
              value={manualForm.cc}
              onChange={(e) => updateManualForm("cc", e.target.value)}
              placeholder={ADMIN_EMAIL}
              className="mt-1 w-full bg-black/30 border border-slate-700 rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-slate-400">Subject</label>
          <input
            type="text"
            value={manualForm.subject}
            onChange={(e) => updateManualForm("subject", e.target.value)}
            className="mt-1 w-full bg-black/30 border border-slate-700 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="text-sm text-slate-400">Message</label>
          <textarea
            rows={6}
            value={manualForm.body}
            onChange={(e) => updateManualForm("body", e.target.value)}
            className="mt-1 w-full bg-black/30 border border-slate-700 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        {manualError && <p className="text-sm text-red-400">{manualError}</p>}
        {manualSuccess && <p className="text-sm text-emerald-400">{manualSuccess}</p>}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleManualEmailSend}
            disabled={manualSending}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-semibold disabled:opacity-50"
          >
            {manualSending ? "Sending…" : "Send via SMTP"}
          </button>
          <button
            type="button"
            onClick={() => {
              setManualForm({ to: "", cc: ADMIN_EMAIL, subject: "", body: "" });
              setManualEnrollment(null);
              setManualSuccess("");
              setManualError("");
            }}
            className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm"
          >
            Reset
          </button>
        </div>
      </section>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-4">
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex-1 flex gap-2">
          <input
            value={userSearchTerm}
            onChange={(e) => setUserSearchTerm(e.target.value)}
            placeholder="Search learner names"
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm"
          />
          <button
            onClick={() => setUserSearch(userSearchTerm.trim())}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-semibold"
          >
            Apply
          </button>
          <button
            onClick={() => {
              setUserSearchTerm("");
              setUserSearch("");
            }}
            className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm"
          >
            Reset
          </button>
        </div>
        {userLoading && <span className="text-sm text-slate-400">Loading profiles…</span>}
      </section>

      {userError && <p className="text-sm text-red-400">{userError}</p>}

      <section className="space-y-3">
        {users.length === 0 && !userLoading && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center text-slate-400">
            No profiles found.
          </div>
        )}

        {users.map((user) => {
          const enrollmentCount = enrollmentByUser.get(user.id) || 0;
          const primaryLabel = user.full_name || "Unlabeled user";
          const email = user.email || user.primary_email || "Email not stored";
          return (
            <article key={user.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-2">
              <div className="flex flex-wrap justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold">{primaryLabel}</p>
                  <p className="text-xs text-slate-500">{user.id}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <p className="text-sm font-medium break-all">{email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Phone</p>
                  <p className="text-sm font-medium">{user.phone || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Enrollments</p>
                  <p className="text-2xl font-semibold">{enrollmentCount}</p>
                </div>
              </div>
              <div className="text-xs text-slate-500 flex gap-4">
                <span>Created {formatDate(user.created_at)}</span>
                {user.updated_at && <span>Updated {formatDate(user.updated_at)}</span>}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-slate-400">Total courses synced: {courses.length}</p>
        <button onClick={loadCourses} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-semibold">
          Refresh
        </button>
      </div>

      {courseError && <p className="text-sm text-red-400">{courseError}</p>}
      {courseLoading && <p className="text-sm text-slate-400">Fetching courses…</p>}

      <section className="space-y-3">
        {courses.length === 0 && !courseLoading && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center text-slate-400">
            No course documents found.
          </div>
        )}

        {courses.map((course) => {
          const courseKey = course.slug || course.skillId || course.id;
          const bucket = courseKey ? enrollmentByCourse.get(courseKey) : null;
          return (
            <article key={course.id || course.slug} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-3">
              <div className="flex flex-wrap justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold">{course.title || course.name}</p>
                  <p className="text-xs text-slate-500">/{course.slug}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Level</p>
                  <p className="text-sm font-medium">{course.level || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Duration</p>
                  <p className="text-sm font-medium">{course.duration || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Price</p>
                  <p className="text-sm font-medium">{formatCurrency(course.price_cents || 0)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Enrollments</p>
                  <p className="text-2xl font-semibold">{bucket?.count || 0}</p>
                </div>
              </div>
              <p className="text-sm text-slate-400 line-clamp-2">{course.description}</p>
            </article>
          );
        })}
      </section>
    </div>
  );

  const renderCertificates = () => (
    <div className="space-y-4">
      <section className="flex flex-col md:flex-row md:items-center gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-400">Status Filter</label>
          <select
            value={certificateFilter}
            onChange={(e) => setCertificateFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All</option>
            {certificateStatusChoices.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-3 items-center">
          <button
            onClick={loadCertificates}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-semibold"
          >
            Refresh
          </button>
          {certificateLoading && <span className="text-sm text-slate-400">Loading certificates…</span>}
        </div>
      </section>

      {certificateError && <p className="text-sm text-red-400">{certificateError}</p>}

      <section className="space-y-3">
        {certificates.length === 0 && !certificateLoading && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center text-slate-400">
            No certificate records found. Ensure the `certificates` table exists in Supabase or connect the Google Sheet export endpoint.
          </div>
        )}

        {certificates.map((certificate) => (
          <article key={certificate.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <p className="text-sm text-slate-400">Learner</p>
                <p className="text-lg font-semibold">{certificate.user_name || certificate.user_email || "Unnamed"}</p>
                <p className="text-xs text-slate-500">Serial: {certificate.serial_number || certificate.id}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Course</p>
                <p className="text-sm font-medium">{certificate.course_title || "Unknown course"}</p>
                {certificate.course_slug && <p className="text-xs text-slate-500">/{certificate.course_slug}</p>}
              </div>
              <div>
                <p className="text-sm text-slate-400">Issued</p>
                <p className="text-sm font-medium">{formatDate(certificate.issued_on)}</p>
                {certificate.verified_at && (
                  <p className="text-xs text-emerald-400">Verified {formatDate(certificate.verified_at)}</p>
                )}
              </div>
              <div>
                <label className="text-sm text-slate-400">Status</label>
                <select
                  value={certificate.status || "issued"}
                  onChange={(e) => handleCertificateStatusChange(certificate.id, e.target.value)}
                  className="mt-1 bg-black/40 border border-slate-700 rounded-lg px-3 py-2 text-sm"
                  disabled={certificateUpdatingId === certificate.id}
                >
                  {certificateStatusChoices.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {certificateUpdatingId === certificate.id && (
                  <p className="text-xs text-amber-400 mt-1">Updating…</p>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );

  const renderActiveTab = () => {
    if (activeTab === "overview") return renderOverview();
    if (activeTab === "enrollments") return renderEnrollments();
    if (activeTab === "users") return renderUsers();
    if (activeTab === "courses") return renderCourses();
    if (activeTab === "certificates") return renderCertificates();
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-blue-400">Control Room</p>
          <h1 className="text-3xl font-semibold">Hidden Admin Panel</h1>
          <p className="text-sm text-slate-400">
            Bookmark this path ({SECRET_PATH}) and keep it private. Only the allow-listed Google account can reach it.
          </p>
        </header>

        <nav className="flex flex-wrap gap-3">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all ${
                activeTab === tab.key
                  ? "bg-blue-600 border-blue-500"
                  : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {renderActiveTab()}
      </div>
    </div>
  );
};

export default AdminControlRoom;
