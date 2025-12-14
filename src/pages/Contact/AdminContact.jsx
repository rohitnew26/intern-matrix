import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient.js";
import { FiTrash2 } from "react-icons/fi";

const GmailStyleInbox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest"); // newest / oldest
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contacts")
      .select("*");

    if (error) setError(error.message);
    else setMessages(data || []);
    setLoading(false);
  };

  const markAsViewed = async (id) => {
    await supabase.from("contacts").update({ viewed: true }).eq("id", id);
    fetchMessages();
  };

  const deleteMessage = async (id) => {
    if (confirm("Are you sure you want to delete this message?")) {
      await supabase.from("contacts").delete().eq("id", id);
      fetchMessages();
      if (selectedMessage?.id === id) setSelectedMessage(null);
    }
  };

  // Filtered and sorted messages
  const filteredMessages = messages
    .filter((msg) => {
      if (filter === "viewed") return msg.viewed;
      if (filter === "unviewed") return !msg.viewed;
      return true;
    })
    .filter((msg) =>
      msg.first_name.toLowerCase().includes(search.toLowerCase()) ||
      msg.last_name.toLowerCase().includes(search.toLowerCase()) ||
      msg.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "newest") return new Date(b.created_at) - new Date(a.created_at);
      else return new Date(a.created_at) - new Date(b.created_at);
    });

  if (loading)
    return (
      <p className="flex justify-center items-center h-screen text-gray-500">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </p>
    );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r flex-shrink-0 p-4 flex flex-col">
        <button className="bg-blue-600 text-white font-semibold rounded-md px-4 py-2 mb-4 hover:bg-blue-700 transition">
          Compose
        </button>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li
              className={`p-2 rounded hover:bg-gray-100 cursor-pointer font-medium ${
                filter === "all" ? "bg-blue-100 text-blue-700" : "text-gray-700"
              }`}
              onClick={() => setFilter("all")}
            >
              Inbox
            </li>
            <li
              className={`p-2 rounded hover:bg-gray-100 cursor-pointer ${
                filter === "viewed" ? "bg-blue-100 text-blue-700" : "text-gray-700"
              }`}
              onClick={() => setFilter("viewed")}
            >
              Viewed
            </li>
            <li
              className={`p-2 rounded hover:bg-gray-100 cursor-pointer ${
                filter === "unviewed" ? "bg-blue-100 text-blue-700" : "text-gray-700"
              }`}
              onClick={() => setFilter("unviewed")}
            >
              Unviewed
            </li>
          </ul>
        </nav>
      </div>

      {/* Messages area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top controls */}
        <div className="flex items-center justify-between bg-white p-4 border-b">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-md px-3 py-2 w-1/2 focus:outline-none focus:ring focus:border-blue-300"
          />
          <div className="flex space-x-2">
            <button
              onClick={() => setSortOrder("newest")}
              className={`px-3 py-1 rounded ${sortOrder === "newest" ? "bg-blue-100 text-blue-700" : "text-gray-600"}`}
            >
              Newest
            </button>
            <button
              onClick={() => setSortOrder("oldest")}
              className={`px-3 py-1 rounded ${sortOrder === "oldest" ? "bg-blue-100 text-blue-700" : "text-gray-600"}`}
            >
              Oldest
            </button>
          </div>
        </div>

        {/* Messages list */}
        <div className="p-4 space-y-3">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col border-b hover:bg-gray-50 cursor-pointer transition rounded-lg ${
                selectedMessage?.id === msg.id ? "bg-gray-100 border-blue-300" : "border-gray-200"
              }`}
              onClick={() => {
                setSelectedMessage(selectedMessage?.id === msg.id ? null : msg);
                if (!msg.viewed) markAsViewed(msg.id);
              }}
            >
              {/* Header */}
              <div className="flex justify-between items-center px-4 py-3">
                <div className="flex items-center space-x-3">
                  {/* Avatar with initials */}
                  <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-semibold">
                    {msg.first_name[0].toUpperCase()}{msg.last_name[0].toUpperCase()}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                    <span className="font-semibold">{msg.first_name} {msg.last_name}</span>
                    <span className="text-gray-500 text-sm truncate">{msg.email}</span>
                    <span className="text-gray-500 text-sm">{msg.phone}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      msg.viewed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {msg.viewed ? "Viewed" : "Unviewed"}
                  </span>
                  <FiTrash2
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteMessage(msg.id);
                    }}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  />
                </div>
              </div>

              {/* Preview */}
              <div className="px-4 pb-3 text-gray-700 truncate sm:truncate-none">
                {msg.message.length > 100 ? msg.message.slice(0, 100) + "..." : msg.message}
              </div>

              {/* Full message */}
              {selectedMessage?.id === msg.id && (
                <div className="bg-gray-50 p-4 text-gray-700 border-t">
                  <p>{msg.message}</p>
                  <div className="text-sm text-gray-500 mt-2">
                    Submitted On: {new Date(msg.created_at).toLocaleString()}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GmailStyleInbox;
