import React, { useEffect, useState } from "react";
import { getQuiz, updateQuiz, deleteQuiz } from "../../../services/authApi";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    question: "",
    options: ["", "", "", ""],
    answerIndex: 0,
  });

  // Fetch All Quizzes
  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const response = await getQuiz();
      setQuizzes(response.quiz || []);
    } catch {
      toast.error("Error loading quizzes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  // Edit quiz
  const handleEdit = (quiz) => {
    setEditingQuiz(quiz.id); // ✔ FIXED
    setFormData({
      question: quiz.question,
      options: [
        quiz.option1,
        quiz.option2,
        quiz.option3,
        quiz.option4,
      ],
      answerIndex: quiz.answerindex,
    });
  };

  // Update quiz
  const handleUpdate = async () => {
    if (!formData.question.trim()) {
      toast.error("Question cannot be empty");
      return;
    }
    if (formData.options.some((opt) => !opt.trim())) {
      toast.error("All 4 options are required");
      return;
    }

    try {
      setUpdating(true);
      await updateQuiz(editingQuiz, formData); // ✔ Correct ID
      toast.success("Quiz updated successfully");

      setEditingQuiz(null);
      setFormData({
        question: "",
        options: ["", "", "", ""],
        answerIndex: 0,
      });

      fetchQuizzes();
    } catch (error) {
      toast.error(error.message || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  // Delete quiz
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteQuiz(id);
      toast.success("Quiz deleted successfully");
      fetchQuizzes();
    } catch (error) {
      toast.error(error.message || "Delete failed");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-xl rounded-xl border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Manage Quiz
      </h1>

      {/* Edit Form */}
      {editingQuiz && (
        <div className="border p-6 mb-8 rounded-lg bg-blue-50 shadow-md">
          <h2 className="font-bold mb-3 text-lg text-blue-700">
            ✏️ Edit Quiz
          </h2>

          {/* Question */}
          <label className="font-semibold">Question</label>
          <input
            type="text"
            className="w-full border-2 border-blue-400 p-3 rounded-lg mb-4 shadow-sm"
            value={formData.question}
            onChange={(e) =>
              setFormData({ ...formData, question: e.target.value })
            }
          />

          {/* Options */}
          <label className="font-semibold">Options</label>
          {formData.options.map((opt, index) => (
            <input
              key={index}
              type="text"
              className={`w-full p-3 rounded-lg mb-2 border ${
                index === formData.answerIndex
                  ? "bg-green-100 border-green-500"
                  : "border-gray-300"
              }`}
              placeholder={`Option ${index + 1}`}
              value={opt}
              onChange={(e) => {
                const updatedOptions = [...formData.options];
                updatedOptions[index] = e.target.value;
                setFormData({ ...formData, options: updatedOptions });
              }}
            />
          ))}

          {/* Correct answer */}
          <label className="font-semibold">Correct Answer</label>
          <select
            className="w-full border p-3 rounded-lg bg-white mb-4"
            value={formData.answerIndex}
            onChange={(e) =>
              setFormData({
                ...formData,
                answerIndex: Number(e.target.value),
              })
            }
          >
            <option value={0}>Option 1</option>
            <option value={1}>Option 2</option>
            <option value={2}>Option 3</option>
            <option value={3}>Option 4</option>
          </select>

          <div className="flex gap-4 mt-3">
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
              disabled={updating}
            >
              {updating ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={() => setEditingQuiz(null)}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Question</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz.id} className="border-b hover:bg-blue-50">
                <td className="p-3">{quiz.question}</td>

                <td className="p-3 flex justify-center gap-6">
                  <button
                    onClick={() => handleEdit(quiz)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(quiz.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {quizzes.length === 0 && (
              <tr>
                <td colSpan={2} className="p-4 text-center text-gray-500">
                  No quizzes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ManageQuiz;
