import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Verify = () => {
  const { token, backendUrl, setCart } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const userId = searchParams.get("userId");
  const itemIds = searchParams.get("itemIds");

  useEffect(() => {
    if (success && orderId && userId) {
      verifyPayment();
    }
  }, [success, orderId, userId]);

  const verifyPayment = async () => {
    try {
      if (!token || !orderId || !userId || !itemIds) {
        setMessage("Missing required information.");
        toast.error("Missing required information.");
        return;
      }
      const response = await axios.post(
        `${backendUrl}/api/orders/verifystripe`,
        { success, orderId, userId, itemIds },
        { headers: { token } }
      );

      if (response.data.success) {
        setMessage("Payment successful! Your order is being processed.");
        toast.success("Payment Successful! Your order is being processed.");
        setCart({});
        setTimeout(() => navigate("/chocolates"), 3000);
      } else {
        setMessage("Payment failed, order not completed.");
        toast.error("Payment Failed. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred while verifying the payment.");
      toast.error("An error occurred while verifying the payment.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold text-gray-800 ">
        Payment Verification
      </h1>
      <p className="text-lg text-gray-700 mb-4">{message}</p>

      <div className="">
        {success && (
          <button
            className="bg-[#804f36] text-white text-lg py-2 px-6 rounded-lg hover:opacity-90 transition duration-300"
            onClick={() => navigate("/chocolates")}
          >
            Go to Chocolates Page
          </button>
        )}
      </div>
    </div>
  );
};

export default Verify;
