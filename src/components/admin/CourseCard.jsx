import React from 'react';
import { Edit2, Trash2, Eye } from 'lucide-react';

export default function CourseCard({ course, onEdit, onDelete, onView }) {
  const discountPercent = course.mrp_cents && course.price_cents 
    ? Math.round(((course.mrp_cents - course.price_cents) / course.mrp_cents) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      {/* Image Container */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {course.thumbnail_url ? (
          <img
            src={course.thumbnail_url}
            alt={course.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
            <span className="text-white text-sm">No image</span>
          </div>
        )}
        
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {discountPercent}% OFF
          </div>
        )}

        {/* Status Badge */}
        <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-semibold text-white ${
          course.status === 'published' ? 'bg-green-500' : 
          course.status === 'draft' ? 'bg-yellow-500' : 
          'bg-gray-500'
        }`}>
          {course.status}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-sm text-gray-600 mb-2">
          👨‍🏫 {course.instructor_name || 'No instructor'}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-2 mb-3 text-xs">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {course.branch || 'N/A'}
          </span>
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
            {course.type === 'online' ? 'Online' : 'Training'}
          </span>
          <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
            {course.curriculum?.modules?.length || 0} modules
          </span>
          {course.total_duration_hours && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
              {course.total_duration_hours}h
            </span>
          )}
        </div>

        {/* Description Preview */}
        {course.overview && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {course.overview}
          </p>
        )}

        {/* Pricing */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-gray-900">
            ₹{(course.price_cents / 100).toLocaleString('en-IN')}
          </span>
          {course.mrp_cents && (
            <span className="text-sm text-gray-500 line-through">
              ₹{(course.mrp_cents / 100).toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {onView && (
            <button
              onClick={() => onView(course)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded transition-colors"
            >
              <Eye className="w-4 h-4" />
              View
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(course)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(course)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
