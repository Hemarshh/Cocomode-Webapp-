import React, { useState, useEffect } from "react";
import { User, Loader } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendurl } from "../App";
import toast from "react-hot-toast";

const Orders = ({ token }) => {
  const navigate = useNavigate();
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const ORDER_STATUSES = [
    "Placed",
    "Confirmed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];

  const STATUS_COLORS = {
    Placed: "bg-blue-200 text-blue-700",
    Confirmed: "bg-purple-200 text-purple-700",
    Shipped: "bg-yellow-200 text-yellow-700",
    "Out for Delivery": "bg-orange-200 text-orange-700",
    Delivered: "bg-green-200 text-green-700",
    Cancelled: "bg-red-200 text-red-700",
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchAllOrders();
  }, [token, navigate]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${backendurl}/api/orders/list`, {
        headers: { token },
      });
      setAllOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `${backendurl}/api/orders/update-status/${orderId}`,
        { status: newStatus },
        { headers: { token } }
      );
      toast.success("Order status updated successfully");
      fetchAllOrders();
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  const markItemAsPaid = async (orderId, itemId) => {
    try {
      console.log(orderId, itemId);

      await axios.put(
        `${backendurl}/api/orders/mark-item-paid/${orderId}/${itemId}`,
        {},
        { headers: { token } }
      );
      toast.success("Item marked as paid");
      fetchAllOrders();
    } catch (error) {
      toast.error("Failed to mark item as paid");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader className="animate-spin h-12 w-12 text-[#82543c]" />
      </div>
    );
  }

  if (allOrders.length === 0) {
    return (
      <div className="p-6 flex justify-center items-center">
        <p className="text-xl font-medium text-[#4E342E]">No Orders Yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-medium font-serif text-[#D99328] text-center mb-12 relative">
          Order History
          <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#D4A55A] rounded-full"></span>
        </h2>

        <div className="space-y-6">
          {allOrders.map((order) => (
            <div
              key={order._id}
              className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-[#D4A55A]"
            >
              <div className="flex items-start gap-6">
                {/* User Info */}
                <div className="cursor-pointer relative flex-shrink-0 bg-[#FAF8F1] p-4 rounded-lg shadow-sm w-32 text-center group">
                  <User size={40} className="text-[#4E342E] mx-auto" />
                  <p className="text-sm font-medium text-[#4E342E] mt-2 truncate">
                    {order.userName}
                  </p>

                  <div className="absolute left-1/2 -translate-x-1/2 mt-1 top-full mb-2 w-max max-w-xs bg-[#4E342E] text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {order.userName}
                  </div>
                </div>

                {/* Order Details */}
                <div className="flex-1">
                  <div className="mb-3">
                    <h3 className="text-xl font-semibold text-[#3D2B1F]">
                      Order #{order._id.slice(-6)}
                    </h3>
                    <p className="text-sm text-[#A0522D]/80">
                      {new Date(order.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  {order.address && (
                    <p className="text-sm text-[#3D2B1F] font-medium mb-2">
                      <div>Ordered By : {order.address.fullName}</div>
                      Address: {order.address.street}, {order.address.city},{" "}
                      {order.address.state}, {order.address.zipCode},{" "}
                      {order.address.country}
                    </p>
                  )}

                  <div className="space-y-3">
                    {order.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="p-3 border-b flex justify-between items-center"
                      >
                        <div>
                          <p className="text-[#3D2B1F] font-medium">
                            {item.name} (x{item.quantity})
                          </p>
                          <p className="text-sm text-[#A0522D]/80">
                            ₹{item.bestPrice} - {item.paymentMethod}
                          </p>
                        </div>
                        <div>
                          {console.log(item)}
                          {item.payment ? (
                            <p className="text-sm text-green-400 font-semibold">
                              Payment Done
                            </p>
                          ) : (
                            <p className="text-sm text-[#A0522D]/80 font-semibold">
                              Pending:{" "}
                              <span className="line-through">
                                ₹{item.bestPrice?.toFixed(2)}
                              </span>
                            </p>
                          )}
                        </div>

                        {item.payment === false ? (
                          <button
                            onClick={() => markItemAsPaid(order._id, item._id)}
                            className="px-3 py-1 outline-none bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                          >
                            Mark as Paid
                          </button>
                        ) : (
                          <button
                            onClick={() => markItemAsPaid(order._id, item._id)}
                            className="px-3 py-1 outline-none bg-green-600 text-white rounded-lg hover:bg-green-700"
                          >
                            Mark as UnPaid
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <p className="text-lg font-semibold text-[#D99328]">
                      Total: ₹{order.amount.toFixed(2)}
                    </p>

                    <div className="relative">
                      <select
                        className={`px-3 py-1 border rounded-lg outline-none appearance-none cursor-pointer transition-all ${
                          STATUS_COLORS[order.status]
                        }`}
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order._id, e.target.value)
                        }
                      >
                        {ORDER_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
