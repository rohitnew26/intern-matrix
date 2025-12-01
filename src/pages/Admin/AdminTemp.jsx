import React, { useEffect, useState } from "react";

const Enrollments = ({ user }) => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);

  // Fetch Data
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await fetch("https://intern-backend-wheat.vercel.app/api/enrollment");
        const data = await res.json();

        // Filter data: only those who submitted screenshot
        const filtered = data.filter(
          (item) => item.paymentScreenshot && item.paymentScreenshot.trim() !== ""
        );

        setEnrollments(filtered);
      } catch (error) {
        console.error("Error loading enrollments:", error);
      }
      setLoading(false);
    };

    fetchEnrollments();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-semibold text-white bg-gray-900">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-10 px-6">
      <h1 className="text-4xl font-bold text-center text-white mb-10">
        📸 Payment Screenshot Submitted Users
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrollments.map((item, index) => (
          <div
            key={item._id}
            className="bg-gray-800/60 hover:bg-gray-800 border border-gray-700 rounded-2xl p-5 shadow-xl backdrop-blur-lg transition transform hover:scale-[1.02]"
          >
            <h2 className="text-xl font-semibold text-white">{item.fullName}</h2>
            <p className="text-gray-300 text-sm mt-1">{item.email}</p>
            <p className="text-gray-300 text-sm">{item.phone}</p>

            <div className="mt-3 text-gray-300 text-sm space-y-1">
              <p><strong>College:</strong> {item.collegeName}</p>
              <p><strong>Is CR:</strong> {item.isCR ? "✔ Yes" : "❌ No"}</p>
              <p><strong>Joining:</strong> {item.joiningDate}</p>
              <p><strong>End:</strong> {item.endDate}</p>
              <p><strong>UTR Number:</strong> {item.utrNumber ? item.utrNumber : "Not Provided"}</p>
            </div>

            {/* Payment Screenshot */}
            <div className="mt-4">
              <p className="text-sm text-gray-400 mb-1">Payment Screenshot:</p>
              <img
                src={item.paymentScreenshot}
                alt="Payment Screenshot"
                className="w-full h-40 object-cover rounded-lg border border-gray-600 cursor-pointer hover:opacity-80"
                onClick={() => setPreviewImage(item.paymentScreenshot)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Full Screen Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="Preview Screenshot"
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default Enrollments;
