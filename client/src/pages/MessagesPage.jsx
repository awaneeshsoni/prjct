import React, { useContext } from "react";
import { MessageContext } from "../context/MessageContext";
import messageService from "../services/messageService";
import Message from "../components/Message";
import { FaTrash, FaSyncAlt } from "react-icons/fa";

export default function MessagesPage() {
  const { messages, setMessages } = useContext(MessageContext);

  const handleRefresh = async () => {
    try {
      const res = await messageService.getMessages();
      setMessages(res.data.messages);
    } catch (err) {
      console.error("Failed to refresh messages:", err);
      alert("Error refreshing messages.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this message?");
    if (!confirmed) return;

    try {
      const res = await messageService.deleteMessage(id);
      if (res) {
        setMessages((prev) => prev.filter((msg) => msg._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete message:", err);
      alert("Error deleting message.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Messages</h1>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition text-sm"
        >
          <FaSyncAlt /> Refresh
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        {messages && messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg._id}
              className="relative group w-full sm:w-[48%] lg:w-[32%]"
            >
              <Message
                message={msg.message}
                page={msg.page?.title || "Page Deleted"}
                createdAt={msg.createdAt}
              />
              <button
                onClick={() => handleDelete(msg._id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 hidden group-hover:block"
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No messages found.</p>
        )}
      </div>
    </div>
  );
}
