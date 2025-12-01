import React from "react";
import { Link } from "react-router-dom";
import { useEnrollments } from "../../hooks/useEnrollments";
import { useAuth } from "../../context/AuthContext";
import { formatCurrency, formatDate, getCourseDetailPath } from "../../utils/helpers";

const EnrolledCourses = () => {
    const { user } = useAuth();
    const { enrollments, stats, loading, error } = useEnrollments();

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
                <span className="text-zinc-500 text-sm">
                    {stats.total} course{stats.total === 1 ? "" : "s"} · {stats.active} active
                </span>
            </div>

            {error && <p className="text-red-400 mb-6">Unable to load enrollments: {error.message}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading &&
                    Array.from({ length: 3 }).map((_, index) => (
                        <div key={`skeleton-${index}`} className="h-72 bg-zinc-900/40 border border-zinc-800 rounded-2xl animate-pulse" />
                    ))}

                {!loading && enrollments.length === 0 && (
                    <div className="col-span-full text-center text-zinc-400">
                        <p>No enrollments yet. Explore courses and enroll to get started.</p>
                    </div>
                )}

                {!loading &&
                    enrollments.map((enrollment) => {
                        const detailPath = getCourseDetailPath(
                            enrollment.course_slug || enrollment.course_title
                        );

                        return (
                            <div
                                key={enrollment.id}
                                className="group bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden hover:border-yellow-400/50 transition-all duration-500 hover:shadow-lg hover:shadow-yellow-400/5"
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={enrollment.course_image || "https://placehold.co/600x400?text=Course"}
                                        alt={enrollment.course_title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                                    <span className="absolute top-3 left-3 bg-black/70 text-xs uppercase tracking-widest px-3 py-1 rounded-full text-white">
                                        {enrollment.status}
                                    </span>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-white mb-1 truncate group-hover:text-yellow-400 transition-colors">
                                        {enrollment.course_title}
                                    </h3>
                                    <p className="text-xs text-zinc-400 mb-2">By {enrollment.instructor_name || "Instructor"}</p>
                                    <p className="text-sm text-zinc-500 mb-4">
                                        Enrolled on {formatDate(enrollment.created_at)} · {formatCurrency(enrollment.price_cents, enrollment.currency)}
                                    </p>

                                    <Link
                                        to={detailPath}
                                        className="w-full inline-flex items-center justify-center cursor-pointer py-2.5 rounded-lg border border-yellow-400/30 text-yellow-400 text-sm font-bold hover:bg-yellow-400 hover:text-black transition-all duration-300"
                                    >
                                        {enrollment.status === "active" ? "Continue Learning" : "Pending Confirmation"}
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