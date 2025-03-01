// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/shopContext";
// import axios from "axios";
// import { Loader } from "lucide-react";

// const Orders = () => {
//   const { backendUrl, token } = useContext(ShopContext);
//   const [ordersData, setOrdersData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState();

//   console.log(data);

//   const fetchorderData = async () => {
//     try {
//       if (!token) {
//         return null;
//       }
//       setIsLoading(true);
//       setError(null);
//       const response = await axios.get(`${backendUrl}/api/orders/userorders`, {
//         headers: { token },
//       });

//       setOrdersData(response.data.orders.items || []);
//       setData(response.data.orders);
//       console.log(response);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       setError("Failed to fetch orders. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchorderData();
//   }, [token]);

//   return (
//     <div className="min-h-screen bg-[#f8f1d5]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Orders Title */}
//         <h1 className="text-3xl text-center font-PlayfairDisplay text-[#82543c] font-bold mb-8">
//           My Orders
//         </h1>

//         {/* Loading State */}
//         {isLoading && (
//           <div className="flex justify-center items-center py-16">
//             <Loader className="animate-spin h-12 w-12 text-[#82543c]" />
//           </div>
//         )}

//         {/* Error Message */}
//         {error && <p className="text-center text-lg text-red-600">{error}</p>}

//         {/* No Orders */}
//         {!isLoading && !error && ordersData.length === 0 && (
//           <p className="text-center text-lg text-gray-600">
//             No products ordered yet.
//           </p>
//         )}

//         {/* Orders List */}
//         {!isLoading && !error && ordersData.length > 0 && (
//           <div>
//             {ordersData.map((item) => (
//               <div
//                 key={item._id}
//                 className="bg-white rounded-lg shadow-md p-6 mb-4 flex flex-col md:flex-row gap-6 items-start"
//               >
//                 {/* Product Image */}
//                 <img
//                   className="w-24 h-24 object-contain"
//                   src={item.images[0]}
//                   alt={item.name}
//                   loading="lazy"
//                 />

//                 {/* Product Details */}
//                 <div className="flex-1 w-full">
//                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//                     <div>
//                       <p className="text-base sm:text-lg font-semibold text-[#82543c]">
//                         {item.name}
//                       </p>
//                       <p className="text-sm text-gray-600 mt-1">
//                         {item.description.slice(0, 100)}...
//                       </p>
//                       <div className="flex items-center gap-3 mt-2">
//                         <p className="text-lg font-bold text-[#82543c]">
//                           ₹
//                           {(
//                             Number(item.bestPrice) * Number(item.quantity)
//                           ).toFixed(2)}
//                         </p>
//                         <p className="text-lg px-3 font-semibold">
//                           Quantity: {item.quantity}
//                         </p>
//                       </div>
//                       <p>Date: {ordersData.date}</p>
//                     </div>

//                     {/* Track Order Button */}
//                     <button className="bg-[#D99328] text-white px-4 py-2 rounded-md hover:scale-105 transition-transform">
//                       Track Order
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Orders;

import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";
import axios from "axios";
import { Loader } from "lucide-react";

const Orders = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const [ordersData, setOrdersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(ordersData);

  const fetchOrderData = async () => {
    try {
      if (!token) return;

      setIsLoading(true);
      setError(null);

      const response = await axios.get(`${backendUrl}/api/orders/userorders`, {
        headers: { token },
      });
      if (response.data.orders && response.data.orders.items) {
        setOrdersData(response.data.orders.items);
        console.log(response);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);

      console.error("Error fetching orders:", error);
      setError("Failed to fetch orders. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f1d5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Orders Title */}
        <h1 className="text-3xl text-center font-PlayfairDisplay text-[#82543c] font-bold mb-8">
          My Orders
        </h1>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <Loader className="animate-spin h-12 w-12 text-[#82543c]" />
          </div>
        )}

        {/* Error Message */}
        {error && <p className="text-center text-lg text-red-600">{error}</p>}

        {/* No Orders */}
        {!isLoading && !error && ordersData.length === 0 && (
          <p className="text-center text-lg text-gray-600">
            No products ordered yet.
          </p>
        )}

        {/* Orders List */}
        {!isLoading && !error && ordersData.length > 0 && (
          <div>
            {ordersData.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 mb-4 md:items-center flex flex-col md:flex-row gap-6 items-start"
              >
                {/* Product Image */}
                <img
                  className="w-24 h-24 object-contain"
                  src={item.images[0]}
                  alt={item.name}
                  loading="lazy"
                />

                {/* Product Details */}
                <div className="flex-1 w-full">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <p className="text-base sm:text-lg font-semibold text-[#82543c]">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.description.slice(0, 100)}...
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <p className="text-lg font-bold text-[#82543c]">
                          ₹
                          {(
                            Number(item.bestPrice) * Number(item.quantity)
                          ).toFixed(2)}
                        </p>
                        <p className="text-lg px-3 font-semibold">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <p className="text-sm my-1 text-gray-500">
                          Order Date: {new Date(item.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm my-1 text-gray-500">
                          Payment : {item.paymentMethod}
                        </p>
                      </div>
                    </div>

                    {/* Track Order Button */}
                    <button className="bg-[#D99328] text-white px-4 py-2 rounded-md hover:scale-105 transition-transform">
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
