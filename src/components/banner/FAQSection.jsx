import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQSection = () => {
  const faqs = [
    {
      question: "How to download certificate?",
      answer:
        "Login to dashboard → Go to Certificates section → Click Download. You can save it as PDF or share it directly.",
    },
    {
      question: "How to start my course?",
      answer:
        "After enrollment, go to Dashboard → My Courses → Click Start Learning.",
    },
    {
      question: "How to Login?",
      answer:
        "Visit internmatrix.com → Click Login → Enter your registered email & password.",
    },
    {
      question: "I paid fees but the status is showing 'Payment Pending' or 'Failed'?",
      answer:
        "Sometimes payments take 1–10 minutes to update. If it still shows pending, contact support with Transaction ID.",
    },
    {
      question: "Are There Any Hidden Fees Or Additional Charges?",
      answer:
        "No, there are absolutely no hidden charges. All prices mentioned on our platform are transparent and final.",
    },
    {
      question: "Is there additional charges for certificate?",
      answer:
        "No, certificates are included in the course fee. There are no extra charges for issuing or downloading the certificate.",
    },
    {
      question: "Do we get a certificate after completing this course?",
      answer:
        "Yes, after successful completion, you will receive an ISO-recognized and AICTE-verified digital certificate.",
    },
    {
      question: "Can We Access It On Mobile?",
      answer:
        "Yes, our platform is optimized for mobile, tablet, and desktop. Learn anywhere, anytime ❤️.",
    },
    {
      question: "Why Are Your Programmes So Affordable?",
      answer:
        "InternMatrix focuses on providing high-quality industrial training at student-friendly pricing through optimized operations and partnerships.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4 font-sans">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
        Frequently Asked Questions (FAQ's)
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-xl overflow-hidden transition-all"
          >
            <button
              className="w-full flex justify-between items-center p-5 text-left text-lg md:text-xl font-medium"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {openIndex === index ? (
                <ChevronUp size={22} />
              ) : (
                <ChevronDown size={22} />
              )}
            </button>

            {openIndex === index && (
              <div className="px-5 pb-5 text-gray-600 text-base md:text-lg leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-center mt-8 text-lg md:text-xl font-semibold">
        Yes, all our courses are mobile friendly. It will always be ❤️.
      </p>
    </section>
  );
};

export default FAQSection;
