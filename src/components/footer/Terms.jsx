import React from "react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen w-full p-6">
      <div className="w-full p-6   shadow-sm rounded-none">
        <header className="mb-4">
          <h1 className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
            Terms of Service
          </h1>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            InternMatrix — Effective Date: 01 Jan 2025
          </p>
        </header>

        <section className="prose prose-sm dark:prose-invert text-[12px] leading-snug">
          <h2 className="text-[13px] mt-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using InternMatrix, you agree to these Terms of Service.
            If you do not agree, please do not use the platform.
          </p>

          <h2 className="text-[13px] mt-3">2. Services</h2>
          <p>
            InternMatrix provides online internships, skill-development courses,
            and certificate verification services. We may update or change features
            at any time.
          </p>

          <h2 className="text-[13px] mt-3">3. User Accounts</h2>
          <p>
            You must provide accurate information and maintain the security of your
            password. You are responsible for all activity under your account.
          </p>

          <h2 className="text-[13px] mt-3">4. Payments</h2>
          <p>
            Paid courses and services are non-refundable unless required by law.
            Payments are processed through secure third-party gateways. We do not
            store complete card details.
          </p>

          <h2 className="text-[13px] mt-3">5. Certificates</h2>
          <p>
            Certificates issued by InternMatrix are valid only after successful
            completion of the associated program and are subject to verification.
          </p>

          <h2 className="text-[13px] mt-3">6. Prohibited Activities</h2>
          <p>Users must not:</p>
          <ul className="list-disc pl-5">
            <li>Use false information or impersonate others</li>
            <li>Access or modify our systems without permission</li>
            <li>Copy, sell, or redistribute course content</li>
            <li>Engage in harassment, fraud, or illegal activities</li>
          </ul>

          <h2 className="text-[13px] mt-3">7. Intellectual Property</h2>
          <p>
            All content, branding, and materials are the property of InternMatrix
            and may not be copied, reproduced, or resold without written permission.
          </p>

          <h2 className="text-[13px] mt-3">8. Disclaimer of Liability</h2>
          <p>
            Our services are provided “as-is.” We are not liable for any loss,
            downtime, or misuse resulting from technical issues or user behavior.
          </p>

          <h2 className="text-[13px] mt-3">9. Termination</h2>
          <p>
            We may suspend or terminate accounts that violate these Terms without
            notice. Users may request account deletion at any time.
          </p>

          <h2 className="text-[13px] mt-3">10. Changes to Terms</h2>
          <p>
            We may update these Terms. Continued use of the service means you accept
            the latest version.
          </p>

          <h2 className="text-[13px] mt-3">11. Contact Us</h2>
          <p>
            Patna, Bihar — 800001 · +91 9288075422 · info@internmatrix.com ·
            support@internmatrix.com
          </p>
        </section>

        <footer className="mt-6 text-[11px] text-slate-500 dark:text-slate-400">
          <p>© 2025 InternMatrix. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
