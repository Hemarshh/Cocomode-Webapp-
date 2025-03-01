import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { backendurl } from "../App";

const Messages = ({ token }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchMessages();
    }
  }, [token, navigate]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${backendurl}/api/contactus`);
      setMessages(response.data.fetchMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      if (error.response && error.response.status === 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#FAF8F1]">
        <Loader className="animate-spin h-12 w-12 text-[#82543c]" />
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#FAF8F1]">
        <p className="text-xl font-medium text-[#4E342E]">
          No messages available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F1]">
      <h2 className="text-4xl font-medium font-serif text-[#D99328] text-center mb-12 relative ">
        Messages
        <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#D4A55A] rounded-full"></span>
      </h2>

      <div className="max-w-4xl mx-auto space-y-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-[#D4A55A]"
          >
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 bg-[#FFF7E0] p-4 rounded-full shadow-md">
                <Mail size={28} className="text-[#A0522D]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#3D2B1F] font-playfair">
                  {msg.name}
                </h3>
                <p className="text-sm text-[#A0522D]/80 mb-2">{msg.email}</p>
                <p className="text-xs text-[#A0522D]/60 mb-4">
                  {new Date(msg.date).toLocaleString()}
                </p>
                <p className="text-[#3D2B1F]/90 leading-relaxed">
                  {msg.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
