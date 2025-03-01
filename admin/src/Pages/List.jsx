import React, { useEffect, useState } from "react";
import { CirclePlusIcon, Trash2, Loader } from "lucide-react";
import axios from "axios";
import { backendurl } from "../App";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import chocolate from "../assets/chocolate.png";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const response = await axios.get(
        `${backendurl}/api/product/list-product`
      );
      if (response.data.success) {
        setList(response.data.listChocolates.reverse());
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `${backendurl}/api/product/remove-product/${id}`,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        setList((prevList) => prevList.filter((item) => item._id !== id));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data.message : error.message
      );
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F1] py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-serif text-[#D99328] text-center mb-8 relative">
          Our Chocolate Collection
          <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#D4A55A] rounded-full"></span>
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader className="animate-spin h-12 w-12 text-[#82543c]" />
          </div>
        ) : list.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <p className="text-lg text-gray-600">No products found.</p>
            <button
              className="mt-4 px-5 py-2 flex items-center gap-2 bg-[#D99328] text-white rounded-lg shadow-md hover:scale-105 transition-all"
              onClick={() => navigate("/add")}
            >
              Add Item <CirclePlusIcon />
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {list.map((chocolate, index) => (
              <div
                key={chocolate._id}
                className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border-l-4 border-[#D4A55A] flex items-center gap-6"
              >
                <p className="text-lg font-semibold text-gray-700">
                  {index + 1}.
                </p>
                <div className="flex-shrink-0 w-24 h-24 border-4 border-[#F5E6D8] rounded-lg overflow-hidden">
                  <img
                    src={chocolate.images[0] || chocolate}
                    alt={chocolate.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#3D2B1F] font-playfair">
                    {chocolate.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {chocolate.description.length > 100
                      ? `${chocolate.description.slice(0, 100)}...`
                      : chocolate.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-4">
                    <p className="text-md text-gray-700">
                      <span className="text-red-500 line-through">
                        ₹{Number(chocolate.originalPrice).toFixed(2)}
                      </span>
                    </p>
                    <p className="text-md text-green-600 font-semibold">
                      ₹{chocolate.bestPrice.toFixed(2)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => deleteProduct(chocolate._id)}
                  className="text-red-600 hover:bg-red-100 p-2 rounded-full transition-all"
                  aria-label="Delete product"
                >
                  <Trash2 size={22} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
