// import React, { useEffect, useState } from "react";
// import Sidebar from "../../components/UserDashboard/Sidebar";
// import EnrolledCourses from "./EnrolledCourses";
// import Wishlist from "./Wishlist";
// import MyProfile from "./MyProfile";
// import { useAuth } from "../../context/AuthContext";
// import { useLocation } from "react-router-dom";

// import { form } from "motion/react-client"

// const Dashboard = () => {
//   const location = useLocation();
//   const queryTab = new URLSearchParams(location.search).get("tab");
//   const [selection, setSelection] = useState(queryTab || "profile");
//   const { user, profile } = useAuth();

//   useEffect(() => {
//     if (queryTab && queryTab !== selection) {
//       setSelection(queryTab);
//     }
//   }, [queryTab, selection]);

//   return (
//     <div className="flex min-h-screen bg-black text-white font-sans selection:bg-yellow-500 selection:text-black">

//       <Sidebar selection={selection} setSelection={setSelection} />

//       <div className="flex-1 relative overflow-y-auto h-screen bg-black">
        
//         {/* Header user info */}
//         <div className="p-6 border-b border-gray-800 bg-black/30 backdrop-blur-md flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-semibold">Welcome, {profile?.full_name || user?.email || "Learner"} 👋</h1>
//             <p className="text-gray-400 text-sm">{user?.email}</p>
//           </div>
//         </div>

//         <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none"></div>

//         <div className="relative z-10 p-6 md:p-12 max-w-7xl mx-auto">
//           {selection === "profile" && <MyProfile />}
//           {selection === "courses" && <EnrolledCourses />}
//           {selection === "wishlist" && <Wishlist />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
  



import React, { useEffect, useState } from "react";
import Sidebar from "../../components/UserDashboard/Sidebar";
import EnrolledCourses from "./EnrolledCourses";
import Wishlist from "./Wishlist";
import MyProfile from "./MyProfile";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

const Dashboard = () => {
  const location = useLocation();
  const queryTab = new URLSearchParams(location.search).get("tab");
  const [selection, setSelection] = useState(queryTab || "profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, profile } = useAuth();

  useEffect(() => {
    if (queryTab && queryTab !== selection) {
      setSelection(queryTab);
    }
  }, [queryTab, selection]);

  return (
    <div className="flex min-h-screen bg-black text-white font-sans selection:bg-yellow-500 selection:text-black">

      <Sidebar
        selection={selection}
        setSelection={setSelection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 relative overflow-y-auto h-screen bg-black">

        {/* Header user info */}
        <div className="p-6 border-b border-gray-800 bg-black/30 backdrop-blur-md flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">
              Welcome, {profile?.full_name || user?.email || "Learner"} 👋
            </h1>
            <p className="text-gray-400 text-sm">{user?.email}</p>
          </div>

          {/* Mobile sidebar toggle button */}
          <button
            className="md:hidden bg-yellow-500 text-black px-3 py-2 rounded-lg shadow-md"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FiMenu size={22} />
          </button>
        </div>

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 p-6 md:p-12 max-w-7xl mx-auto">
          {selection === "profile" && <MyProfile />}
          {selection === "courses" && <EnrolledCourses />}
          {selection === "wishlist" && <Wishlist />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
