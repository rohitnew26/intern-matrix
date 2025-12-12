import React, { useState } from "react";
import { Mail, LifeBuoy, Clock, Send, User, MessageCircle } from "lucide-react";

export default function SupportPage() {
  const [messages, setMessages] = useState([
    { sender: "support", text: "Hello! How can we assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "support",
          text: "Thanks for your message. A support agent will join shortly.",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 p-6">
      
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mt-6">
        <h1 className="text-3xl font-bold text-indigo-700 flex justify-center gap-2 items-center">
          <LifeBuoy size={32} /> Support & Help Center
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          We're here to assist with any course, internship, or certificate queries.
        </p>
      </div>

      {/* Support Banner */}
      <div className="max-w-5xl mx-auto bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl p-8 shadow-lg mt-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-lg">
            <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
              <LifeBuoy className="w-6 h-6" /> Need Personal Help?
            </h2>
            <p className="text-sm opacity-90 leading-relaxed mt-1">
              Our support team is available <b>Monday – Saturday · 9:00 AM – 7:00 PM IST</b>.<br />
              Share your enrollment ID and request details to prioritize support.
            </p>

            <div className="mt-4 space-y-1 text-sm">
              <p className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:info@internmatrix.com" className="underline hover:text-yellow-300">
                  info@internmatrix.com
                </a>
              </p>

              <p>
                Support Portal:{" "}
                <a
                  href="https://internmatrix.com/support"
                  className="underline hover:text-yellow-300"
                  target="_blank"
                  rel="noreferrer"
                >
                  internmatrix.com/support
                </a>
              </p>
            </div>
          </div>

          <div className="bg-white text-indigo-700 rounded-lg p-5 shadow-md flex items-center gap-4">
            <Clock size={32} className="text-indigo-600" />
            <div>
              <h3 className="font-semibold text-base">Support Hours</h3>
              <p className="text-sm">Mon–Sat · 9 AM – 7 PM IST</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Box */}
      <div className="max-w-4xl mx-auto mt-10 grid md:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
            <MessageCircle /> Live Chat
          </h3>

          <div className="border p-3 rounded-md h-64 overflow-y-auto bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 my-2 rounded-lg max-w-[80%] ${
                  msg.sender === "user"
                    ? "ml-auto bg-indigo-600 text-white"
                    : "mr-auto bg-gray-200 text-slate-800"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex mt-4 gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded-lg p-2 text-sm"
            />
            <button
              onClick={handleSend}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-1"
            >
              <Send size={16} /> Send
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="font-semibold text-lg mb-4">Frequently Asked Questions</h3>
          <ul className="space-y-3 text-sm">
            <li><b>How long does certificate verification take?</b><br />Typically 24–48 hours.</li>
            <li><b>I paid but didn’t receive course access?</b><br />Send payment receipt + mobile number.</li>
            <li><b>Can I change internship type?</b><br />Yes, request change within 3 days of enrollment.</li>
            <li><b>Do you provide placement support?</b><br />Yes — resume sessions + interview preparation.</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-10 text-sm text-slate-500">
        © 2025 InternMatrix — Support Center · All Rights Reserved
      </div>
    </div>
  );
}
