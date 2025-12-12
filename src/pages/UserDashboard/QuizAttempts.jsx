import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchQuizAttempts } from '../../services/quizService';

const QuizAttempts = () => {
  const { user } = useAuth();
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    const loadAttempts = async () => {
      try {
        setLoading(true);
        const data = await fetchQuizAttempts();
        setAttempts(data);
      } catch (err) {
        console.error('Failed to load quiz attempts:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadAttempts();
  }, [user?.id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full text-center text-zinc-200">
        <h2 className="text-2xl font-semibold">Sign in to view quiz attempts</h2>
        <p className="text-zinc-500 mt-2">Your quiz results will show up here once you are logged in.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white">Quiz Attempts</h2>
        <div className="h-1 w-20 bg-yellow-400 rounded-full mt-2"></div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
          Failed to load quiz attempts. Please try again.
        </div>
      )}

      {attempts.length === 0 ? (
        <div className="text-center py-12 bg-zinc-900/40 border border-zinc-800 rounded-2xl">
          <p className="text-gray-400 text-lg">No quiz attempts yet</p>
          <p className="text-gray-500 text-sm mt-2">Complete quizzes in your courses to see your results here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {attempts.map((attempt) => (
            <div key={attempt.id} className="p-4 bg-white/5 rounded-lg flex justify-between items-center hover:bg-white/10 transition-colors border border-white/10">
              <div>
                <div className="font-medium text-white">{attempt.quiz_title}</div>
                <div className="text-xs text-gray-400">Attempted on {formatDate(attempt.attempted_at)}</div>
                {attempt.correct_answers && attempt.total_questions && (
                  <div className="text-xs text-gray-500 mt-1">
                    {attempt.correct_answers} of {attempt.total_questions} questions correct
                  </div>
                )}
              </div>
              <div className={`font-bold text-lg ${getScoreColor(attempt.percentage || 0)}`}>
                {attempt.percentage || 0}%
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizAttempts;