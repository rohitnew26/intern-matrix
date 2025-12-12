import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchCourseQuestions, postQuestion, postAnswer } from '../../services/quizService';

const QnA = () => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user?.id || !selectedCourse) {
      setLoading(false);
      return;
    }

    const loadQuestions = async () => {
      try {
        setLoading(true);
        const data = await fetchCourseQuestions(selectedCourse);
        setQuestions(data);
      } catch (err) {
        console.error('Failed to load Q&A:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [user?.id, selectedCourse]);

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestion.trim() || !selectedCourse) return;

    setIsSubmitting(true);
    try {
      const questionData = {
        question: newQuestion.trim(),
        course_slug: selectedCourse,
      };
      await postQuestion(questionData);
      setNewQuestion('');
      // Reload questions
      const data = await fetchCourseQuestions(selectedCourse);
      setQuestions(data);
    } catch (err) {
      console.error('Failed to post question:', err);
      setError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!user) {
    return (
      <div className="w-full text-center text-zinc-200">
        <h2 className="text-2xl font-semibold">Sign in to view Q&A</h2>
        <p className="text-zinc-500 mt-2">Ask and answer questions in your courses when you are logged in.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white">Questions & Answers</h2>
        <div className="h-1 w-20 bg-yellow-400 rounded-full mt-2"></div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
          Failed to load Q&A. Please try again.
        </div>
      )}

      {questions.length === 0 ? (
        <div className="text-center py-12 bg-zinc-900/40 border border-zinc-800 rounded-2xl">
          <p className="text-gray-400 text-lg">No questions yet</p>
          <p className="text-gray-500 text-sm mt-2">Ask a question to help other learners</p>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map(item => (
            <div key={item.id} className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
              <div className="font-medium text-white">Q: {item.question}</div>
              {item.answer && (
                <div className="text-gray-300 mt-2 pl-4 border-l-2 border-yellow-400">A: {item.answer}</div>
              )}
              <div className="text-xs text-gray-500 mt-2">
                Posted on {formatDate(item.created_at)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QnA;