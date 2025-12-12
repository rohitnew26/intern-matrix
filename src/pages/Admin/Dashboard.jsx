import React, { useState } from "react";
import AddCourse from "./AddOnline/AddCourse";
import AddQuiz from "./AddOnline/AddQuiz";
import ManageCourse from "./AddOnline/ManageCourse";
import ManageQuiz from "./AddOnline/ManageQuiz"; // added import

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("addCourse");

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <div className="w-60 bg-white shadow-lg p-5 border-r">
        <h2 className="text-xl font-bold mb-6 text-blue-600">Admin Menu</h2>

        <ul className="space-y-3">
          <li
            className={`cursor-pointer p-3 rounded-md text-sm font-semibold ${
              activeSection === "addCourse"
                ? "bg-blue-600 text-white"
                : "text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setActiveSection("addCourse")}
          >
            ➕ Add Course
          </li>

          <li
            className={`cursor-pointer p-3 rounded-md text-sm font-semibold ${
              activeSection === "addQuiz"
                ? "bg-green-600 text-white"
                : "text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setActiveSection("addQuiz")}
          >
            📝 Add Quiz
          </li>

          <li
            className={`cursor-pointer p-3 rounded-md text-sm font-semibold ${
              activeSection === "manageCourses"
                ? "bg-purple-600 text-white"
                : "text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setActiveSection("manageCourses")}
          >
            📚 Manage Courses
          </li>

          <li
            className={`cursor-pointer p-3 rounded-md font-semibold ${
              activeSection === "manageQuiz"
                ? "bg-red-600 text-white"
                : "text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setActiveSection("manageQuiz")}
          >
            🧠 Manage Quiz
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="bg-white rounded-xl shadow-md p-5">
          {activeSection === "addCourse" && <AddCourse />}
          {activeSection === "addQuiz" && <AddQuiz />}
          {activeSection === "manageCourses" && <ManageCourse />}
          {activeSection === "manageQuiz" && <ManageQuiz />}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
