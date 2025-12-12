import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { fetchEnrollments } from "../../services/enrollmentService";
import { formatCurrency, formatDate, getCourseDetailPath } from "../../utils/helpers";

const EnrolledCourses = () => {
    const { user } = useAuth();
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({ total: 0, active: 0, completed: 0 });

    useEffect(() => {
        if (!user?.id) {
            setLoading(false);
            return;
        }

        const loadEnrollments = async () => {
            try {
                setLoading(true);
                const data = await fetchEnrollments(user.id);
                setEnrollments(data);
                
                // Calculate stats
                setStats({
                    total: data.length,
                    active: data.filter(e => (e.status || e.enrollment_status) === 'active').length,
                    completed: data.filter(e => e.is_completed || (e.status === 'completed')).length
                });
            } catch (err) {
                console.error("Failed to load enrollments:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadEnrollments();
    }, [user?.id]);

    if (!user) {
        return (
            <div className="w-full text-center text-zinc-200">
                <h2 className="text-2xl font-semibold">Sign in to view enrollments</h2>
                <p className="text-zinc-500 mt-2">Your purchased courses will show up here once you are logged in.</p>
            </div>
        );
    }

    return (
        <div className="w-full animate-fade-in">
            <div className="flex items-end justify-between mb-10">
                <div>
                    <h2 className="text-3xl font-bold text-white">My Learning</h2>
                    <div className="h-1 w-20 bg-yellow-400 rounded-full mt-2" />
                </div>
                <div className="text-right">
                    <span className="text-zinc-400 text-sm block">
                        {stats.total} course{stats.total === 1 ? "" : "s"}
                    </span>
                    <span className="text-green-400 text-xs">
                        {stats.completed} completed · {stats.active} in progress
                    </span>
                </div>
            </div>

            {error && <p className="text-red-400 mb-6">Unable to load enrollments: {error.message}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading &&
                    Array.from({ length: 3 }).map((_, index) => (
                        <div key={`skeleton-${index}`} className="h-96 bg-zinc-900/40 border border-zinc-800 rounded-2xl animate-pulse" />
                    ))}

                {!loading && enrollments.length === 0 && (
                    <div className="col-span-full text-center text-zinc-400 py-12">
                        <p className="text-xl mb-2">No enrollments yet</p>
                        <p className="text-sm text-zinc-500">Explore courses and enroll to get started.</p>
                    </div>
                )}

                {!loading &&
                    enrollments.map((enrollment) => {
                        const detailPath = getCourseDetailPath(
                            enrollment.course_slug || enrollment.course_title
                        );

                        const progress = enrollment.completion_percentage || 0;
                        const isCompleted = enrollment.is_completed || enrollment.status === 'completed';
                        const status = enrollment.status || enrollment.enrollment_status || 'pending';

                        return (
                            <div
                                key={enrollment.id || enrollment.enrollment_id}
                                className="group bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden hover:border-yellow-400/50 transition-all duration-500 hover:shadow-lg hover:shadow-yellow-400/5"
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={enrollment.course_image || "https://placehold.co/600x400?text=Course"}
                                        alt={enrollment.course_title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                                    
                                    {/* Status Badge */}
                                    <span className={`absolute top-3 left-3 text-xs uppercase tracking-widest px-3 py-1 rounded-full ${
                                        isCompleted 
                                            ? 'bg-green-500/90 text-white' 
                                            : status === 'failed'
                                            ? 'bg-red-500/90 text-white'
                                            : 'bg-black/70 text-white'
                                    }`}>
                                        {isCompleted ? '✓ Completed' : status}
                                    </span>

                                    {/* Certificate Badge */}
                                    {enrollment.certificate_issued && (
                                        <span className="absolute top-3 right-3 bg-yellow-400/90 text-black text-xs font-bold px-3 py-1 rounded-full">
                                            🏆 Certified
                                        </span>
                                    )}
                                </div>

                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-white mb-1 truncate group-hover:text-yellow-400 transition-colors">
                                        {enrollment.course_title}
                                    </h3>
                                    <p className="text-xs text-zinc-400 mb-3">By {enrollment.instructor_name || "Instructor"}</p>

                                    {/* Progress Bar */}
                                    <div className="mb-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs text-zinc-500">Progress</span>
                                            <span className="text-xs font-bold text-yellow-400">{progress.toFixed(0)}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full transition-all duration-500 ${
                                                    isCompleted ? 'bg-green-500' : 'bg-yellow-400'
                                                }`}
                                                style={{ width: `${Math.min(progress, 100)}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between items-center mt-1">
                                            <span className="text-xs text-zinc-600">
                                                {enrollment.completed_lessons || 0} / {enrollment.total_lessons || 0} lessons
                                            </span>
                                            {enrollment.last_accessed_at && (
                                                <span className="text-xs text-zinc-600">
                                                    Last: {formatDate(enrollment.last_accessed_at)}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-xs text-zinc-500 mb-4">
                                        Enrolled: {formatDate(enrollment.enrolled_at)} · {formatCurrency(enrollment.price_cents, 'INR')}
                                    </p>

                                    <Link
                                        to={detailPath}
                                        className="w-full inline-flex items-center justify-center cursor-pointer py-2.5 rounded-lg border border-yellow-400/30 text-yellow-400 text-sm font-bold hover:bg-yellow-400 hover:text-black transition-all duration-300"
                                    >
                                        {isCompleted ? '🎓 View Course' : '📚 Continue Learning'}
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default EnrolledCourses;