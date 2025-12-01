import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 rounded-2xl shadow-sm ">
      <header className="mb-4">
        <h1 className="text-lg sm:text-xl font-semibold text-amber-500">
          Privacy Policy
        </h1>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          InternMatrix — Effective Date: 01 Jan 2025
        </p>
      </header>

      <section className="prose prose-sm dark:prose-invert text-[12px] sm:text-[13px] leading-snug">
        <h2 className="text-[13px] sm:text-[14px] mt-3 font-semibold">1. Information We Collect</h2>
        <p>
          We collect personal info you provide (name, email, phone, password—stored securely), certificate details (serial number & DOB), usage data (IP, device, pages) and payment metadata via third-party gateways. We do <em>not</em> store full card numbers.
        </p>

        <h2 className="text-[13px] sm:text-[14px] mt-3 font-semibold">2. How We Use Data</h2>
        <p>
          To create/manage accounts, provide courses, verify certificates, process payments, send updates, and improve the service. We also use data to detect and prevent fraud.
        </p>

        <h2 className="text-[13px] sm:text-[14px] mt-3 font-semibold">3. Certificate Verification</h2>
        <p>
          Verification requires certificate serial number and DOB. We check against our secure database and return results only to the verifier.
        </p>

        <h2 className="text-[13px] sm:text-[14px] mt-3 font-semibold">4. Sharing & Disclosure</h2>
        <p>
          We do not sell personal data. We share data with service providers (hosting, payments, email) and when required by law. Providers are contractually bound to protect data.
        </p>

        <h2 className="text-[13px] sm:text-[14px] mt-3 font-semibold">5. Cookies & Tracking</h2>
        <p>
          We use cookies for sessions, functionality and analytics. You can disable cookies in your browser, but some features may not work.
        </p>

        <h2 className="text-[13px] sm:text-[14px] mt-3 font-semibold">6. Security</h2>
        <p>
          We use encryption, secure authentication, and access controls. No online system is 100% secure; please use strong passwords and enable protections where available.
        </p>

        <h2 className="text-[13px] sm:text-[14px] mt-3 font-semibold">7. Your Rights</h2>
        <p>
          You can request access, correction, deletion, or portability of your data, and opt out of marketing. Contact support@internmatrix.com to exercise these rights.
        </p>

        <h2 className="text-[13px] sm:text-[14px] mt-3 font-semibold">8. Children</h2>
        <p>
          We do not knowingly collect data from children under 13. If you believe we have, contact us to remove the information.
        </p>

        <h2 className="text-[13px] sm:text-[14px] mt-3 font-semibold">9. Changes</h2>
        <p>
          We may update this policy. Updated versions will show an effective date. Continued use means acceptance.
        </p>

        <h2 className="text-[13px] sm:text-[14px] mt-3 font-semibold">10. Contact</h2>
        <p>
          Patna, Bihar — 800001 · +91 9288075422 · info@internmatrix.com · support@internmatrix.com
        </p>
      </section>
    </div>
  );
}
