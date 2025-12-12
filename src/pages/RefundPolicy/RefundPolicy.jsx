 

import React from "react";

const policySteps = [
  {
    title: "Simple request",
    body: "Send an email to info@interrnmatrix.com with your enrollment ID to trigger the review.",
  },
  {
    title: "Fast processing",
    body: "Requests are assessed within 3 business days. Approved refunds typically credited within 5–7 business days depending on your bank.",
  },
  {
    title: "Transparent status",
    body: "You will receive timeline updates in your inbox so you always know what comes next.",
  },
];

const faq = [
  {
    question: "Can I request a refund after 48 hours?",
    answer:
      "No. Refund requests submitted after 48 hours from the enrollment time are not eligible under any circumstances.",
  },
  {
    question: "How much refund will I receive within 48 hours?",
    answer:
      "If approved, 50% of your paid amount will be processed to your original payment method after review.",
  },
  {
    question: "How do I track my request?",
    answer:
      "After you email us, you will receive a case ID. Use that ID to check status with our support team at any time.",
  },
];

function RefundPolicy() {
  return (
    <main className="bg-gray-50 min-h-screen py-16 px-4">
      <section className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12">
        <p className="text-xs font-semibold tracking-[0.3em] text-blue-600 uppercase mb-3">
          Refund Policy
        </p>

        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Zero-risk learning guarantee
        </h1>

        {/* UPDATED REFUND TEXT SECTION */}
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          We want every learner to feel confident when they enroll. That’s why we
          provide a simple and transparent refund process. If you feel the course
          is not the right fit, you can apply for a refund within the first{" "}
          <strong>48 hours of enrollment</strong>.
        </p>

        <p className="text-sm md:text-base text-gray-600 mt-2 leading-relaxed">
          If your request is approved, <strong>50% of your payment</strong> will
          be returned to the original payment method after processing.
        </p>

        <div className="bg-red-50 border border-red-300 rounded-md p-4 mt-4">
          <p className="text-sm md:text-base text-red-700 font-semibold leading-relaxed">
            ⛔ Refunds are <strong>not available after 48 hours</strong>. Once the
            48-hour window has passed, the purchase becomes final and cannot be
            reversed or refunded.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3 text-left">
          {policySteps.map((card) => (
            <article
              key={card.title}
              className="p-5 rounded-2xl bg-gray-50 border border-gray-200"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h2>
              <p className="text-sm text-gray-600">{card.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 text-sm text-gray-600">
          <p>
            <span className="font-semibold text-gray-900">How to request:</span>{" "}
            Email{" "}
            <a href="mailto:info@internmatrix.com" className="text-blue-600 underline ml-1">
              info@internmatrix.com
            </a>{" "}
            with your enrollment ID and registered email address.
          </p>
          <p>
            <span className="font-semibold text-gray-900">Refund timeline:</span>{" "}
            We send the approval decision within 72 hours. Banks may require an
            additional 2–4 working days to post funds back to your account.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto mt-12 grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need personal help?</h2>
          <p className="text-gray-600 text-sm md:text-base mb-6">
            Our support team is available Monday through Saturday, 9:00 AM – 7:00 PM IST.
            Share your enrollment ID and the reason for the request so we can prioritize it.
          </p>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <span className="font-semibold text-gray-900">Email:</span>{" "}
              <a href="mailto:info@interrnmatrix.com" className="text-blue-600 underline ml-1">
                info@interrnmatrix.com
              </a>
            </p>
            <p>
              <span className="font-semibold text-gray-900">Support portal:</span>{" "}
              <a
                href="http://localhost:5173/support "
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline ml-1"
              >
                internmatrix.com/support
                
              </a>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently asked</h2>
          <div className="space-y-6">
            {faq.map((item) => (
              <article key={item.question}>
                <h3 className="text-base font-semibold text-gray-900">{item.question}</h3>
                <p className="text-sm text-gray-600 mt-2">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default RefundPolicy;
