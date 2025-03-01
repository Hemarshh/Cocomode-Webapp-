import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Demo = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const [orderDetails, setOrderDetails] = useState(null);
  const [message, setMessage] = useState("Processing your order...");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/orders/latest`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (data.success) {
          setOrderDetails(data.order);
          setMessage("Thank you for your purchase!");
          toast.success("Your order is confirmed!");
        } else {
          setMessage("Something went wrong. Please try again.");
          toast.error("Order failed. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        setMessage("An error occurred. Please try again later.");
        toast.error("Error fetching order details.");
      }
    };

    fetchOrderDetails();
  }, [backendUrl, token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">Thank You!</h1>
      <p className="text-lg text-gray-700 mb-4">{message}</p>

      {orderDetails && (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-96">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Order Details
          </h2>
          <p className="text-gray-600">
            <strong>Order ID:</strong> {orderDetails.orderId}
          </p>
          <p className="text-gray-600">
            <strong>Product(s) Purchased:</strong>{" "}
            {orderDetails.items.join(", ")}
          </p>
          <p className="text-gray-600">
            <strong>Total Price:</strong> ${orderDetails.total}
          </p>
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={() => navigate("/my-orders")}
          className="bg-orange-600 text-white py-2 px-6 rounded-lg hover:bg-orange-500 transition duration-300"
        >
          View My Orders
        </button>
      </div>
    </div>
  );
};

export default Demo;
