import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { addQuiz } from "../../../services/authApi";
import "react-toastify/dist/ReactToastify.css";

const AddQuiz = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answerIndex, setAnswerIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOptionChange = (value, index) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question || options.some((opt) => opt.trim() === "") || answerIndex === null) {
      toast.error("Please enter a question, 4 options, and select the correct answer.");
      return;
    }

    setLoading(true);

    try {
      const data = await addQuiz({
        question,
        options,
        answerIndex,
      });

      if (data.success) {
        toast.success(data.message || "Quiz added successfully!");

        // Reset form on success
        setQuestion("");
        setOptions(["", "", "", ""]);
        setAnswerIndex(null);
      } else {
        toast.error(data.message || "Failed to add quiz. Try again.");
      }

    } catch (error) {
      toast.error(error.message || "Failed to add quiz. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="min-h-screen px-4 py-10 bg-gray-100 flex justify-center items-start">
        <div className="w-full max-w-2xl bg-white shadow-xl rounded-xl p-8 border border-gray-300">

          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Add New Quiz Question
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Create a question with 4 options & select the correct answer
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Question Input */}
            <div>
              <label className="block font-semibold mb-2 text-gray-700">Question</label>
              <textarea
                rows={3}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter the quiz question here..."
                className="w-full p-3 border rounded-lg focus:ring-2 outline-none border-gray-300 focus:ring-green-500"
                required
              />
            </div>

            {/* Options List */}
            <div className="space-y-3">
              <p className="font-semibold text-gray-700">Options</p>
              {options.map((opt, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg border">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={answerIndex === i}
                    onChange={() => setAnswerIndex(i)}
                    className="w-5 h-5 text-green-600"
                  />
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(e.target.value, i)}
                    placeholder={`Option ${i + 1}`}
                    className="flex-1 p-2 rounded border border-gray-300 outline-none"
                    required
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 transition text-white font-bold py-3 rounded-lg shadow-md"
            >
              {loading ? "Adding Quiz..." : "Add Quiz"}
            </button>
          </form>

        </div>
      </div>
    </>
  );
};

export default AddQuiz;
