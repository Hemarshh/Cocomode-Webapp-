import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/shopContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; // Importing react-hot-toast

const Cancelled = () => {
  const { backendUrl } = useContext(ShopContext);
  const [message, setMessage] = useState(""); // To store cancellation message
  const navigate = useNavigate();

  const success = new URLSearchParams(window.location.search).get("success");

  useEffect(() => {
    if (success === "false") {
      setMessage("Your payment was not completed. Please try again.");
      toast.error("Payment canceled.");
    } else {
      setMessage("There was an error with your payment.");
      toast.error("Payment failed.");
    }
  }, [success]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">
        Payment Canceled
      </h1>
      <p className="text-lg text-gray-700 mb-4">{message}</p>
      <button
        className="bg-orange-600 text-white text-lg py-2 px-6 rounded-lg hover:bg-orange-500 transition duration-300"
        onClick={() => navigate("/chocolates")}
      >
        Go to Chocolates
      </button>
    </div>
  );
};

export default Cancelled;
