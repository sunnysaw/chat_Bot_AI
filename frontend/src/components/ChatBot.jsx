import React, { useState } from "react";
import backendConnection from "../services/backendConnection.js";

function ChatBot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message immediately
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    const userInput = input; // preserve before clearing
    setInput("");
    setLoading(true);

    try {
      // 🔹 Call backend
      const response = await backendConnection(userInput);

      // 🔹 Append bot's response
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: response.answer || "No response received" },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error connecting to server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100">
      {/* Header */}
      <div className="p-4 bg-blue-600 text-white font-bold text-lg shadow-md">
        Chat Assistant
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs md:max-w-md shadow ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-300 text-gray-900 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-2xl bg-gray-300 text-gray-900 shadow">
              Typing...
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t flex items-center space-x-2">
        <input
          type="text"
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
