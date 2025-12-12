 

import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, BookOpen, Users, Loader } from "lucide-react";
import LazyImage from "./common/LazyImage";

const InternshipList = ({
  title,
  branchFilter,
  data = [],
  loading = false,
  error = null,
}) => {
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // FILTER LOGIC
  const filteredInternships = useMemo(() => {
    return data.filter((internship) => {
      const branchMatch =
        branchFilter.length === 0 ||
        branchFilter.some((branch) =>
          internship.branches.some(
            (b) => b.toLowerCase() === branch.toLowerCase()
          )
        );

      const durationMatch =
        selectedDuration === "all" || internship.duration === selectedDuration;

      const searchMatch =
        searchTerm === "" ||
        internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.description.toLowerCase().includes(searchTerm.toLowerCase());

      return branchMatch && durationMatch && searchMatch;
    });
  }, [data, branchFilter, selectedDuration, searchTerm]);

  const durations = [...new Set(data.map((item) => item.duration))].sort();

  const navigate = useNavigate();

  const handleEnroll = (internship) => {
    if (internship?.slug) {
      navigate(`/${internship.slug}`);
      return;
    }
    if (internship?.id) {
      navigate(`/course/${internship.id}`);
      return;
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Explore internship opportunities tailored for {title.split(" ")[0]}{" "}
            students. Gain real-world experience and build your professional
            network.
          </p>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader className="w-12 h-12 text-yellow-500 animate-spin mx-auto mb-4" />
              <p className="text-gray-500">Loading internships...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <BookOpen className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-500">
                Something went wrong. Please try again.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* FILTERS */}
            <div className="mb-8">
              <div className="flex items-end gap-3 flex-nowrap w-full overflow-x-auto">
                {/* Search */}
                <div className="flex-1 min-w-[140px]">
                  <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-700">
                    Search Internships
                  </label>
                  <input
                    type="text"
                    placeholder="Search by title or keyword..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-2 py-2 sm:px-3 sm:py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-yellow-500 shadow-sm transition"
                  />
                </div>

                {/* Duration */}
                {durations.length > 0 && (
                  <div className="flex-1 min-w-[120px] max-w-[180px]">
                    <label className="block text-xs sm:text-sm font-semibold mb-1 text-gray-700">
                      Duration
                    </label>
                    <select
                      value={selectedDuration}
                      onChange={(e) => setSelectedDuration(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-lg px-2 py-2 sm:px-3 sm:py-3 text-gray-900 focus:outline-none focus:border-yellow-500 shadow-sm transition"
                    >
                      <option value="all">All Durations</option>
                      {durations.map((duration) => (
                        <option key={duration} value={duration}>
                          {duration}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* RESULTS COUNT */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing{" "}
                <span className="text-yellow-600 font-semibold">
                  {filteredInternships.length}
                </span>{" "}
                internship{filteredInternships.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* GRID */}
            {filteredInternships.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredInternships.map((internship) => (
                  <div
                    key={internship.id}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 group"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-48 overflow-hidden">
                      <LazyImage
                        src={internship.thumbnail}
                        alt={internship.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Branch Tags */}
                      <div className="absolute top-3 right-3 flex flex-wrap gap-2">
                        {internship.branches.slice(0, 2).map((branch) => (
                          <span
                            key={branch}
                            className="bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow"
                          >
                            {branch}
                          </span>
                        ))}

                        {internship.branches.length > 2 && (
                          <span className="bg-yellow-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            +{internship.branches.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">
                        {internship.title}
                      </h3>

                      <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                        {internship.description}
                      </p>

                      {/* Meta */}

                      {/* META + RATING (All in one row) */}
                      <div className="flex items-center justify-between text-sm text-gray-700">
                        {/* Left: Duration + Enrolled */}
                        <div className="flex items-center gap-4">
                          {/* Duration */}
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-yellow-600" />
                            <span>{internship.duration}</span>
                          </div>

                          {/* Enrolled Count */}
                          {internship.enrolledCount > 0 && (
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-yellow-600" />
                              <span>{internship.enrolledCount} Enrolled</span>
                            </div>
                          )}
                        </div>

                        {/* Right: Rating */}
                        {internship.rating && internship.rating > 0 && (
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, index) => (
                                <span
                                  key={index}
                                  className={
                                    index < Math.round(internship.rating)
                                      ? "text-yellow-500"
                                      : "text-gray-300"
                                  }
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="text-sm text-gray-700">
                              {internship.rating.toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Price */}
                      <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                        {/* Price Section */}
                        <div className="flex items-baseline gap-2">
                          {internship.offerPrice ? (
                            <>
                              <p className="text-xs sm:text-sm md:text-lg text-gray-500 line-through">
                                ₹{internship.originalPrice}
                              </p>
                              <p className="text-sm sm:text-lg md:text-2xl font-bold text-yellow-600">
                                ₹{internship.offerPrice}
                              </p>
                            </>
                          ) : (
                            <p className="text-sm sm:text-lg md:text-2xl font-bold text-yellow-600">
                              ₹{internship.price}
                            </p>
                          )}
                        </div>

                        {/* Certificate Awarded */}
                        {internship.certificateAwarded && (
                          <div className="flex items-center gap-1 text-xs sm:text-sm md:text-base whitespace-nowrap">
                            <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                            <span>Certificate Awarded</span>
                          </div>
                        )}
                      </div>

                      {/* Button */}
                      <button
                        type="button"
                        onClick={() => handleEnroll(internship)}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2.5 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  No internships found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters or search terms.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InternshipList;
