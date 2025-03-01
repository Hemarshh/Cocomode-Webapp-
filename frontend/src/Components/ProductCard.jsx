import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import productImage from "../assets/chocolatedemo.png"; // Static image or fallback
import { ShopContext } from "../context/shopContext";
import toast from "react-hot-toast";

const ProductCard = ({ chocolate }) => {
  const { addToCart, token } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="max-w-sm w-full rounded-lg shadow-sm overflow-hidden border border-gray-300 hover:shadow-md transition-shadow duration-300 cursor-pointer">
      <Link to={`/chocolates/${chocolate._id}`}>
        <img
          className="w-full h-56 object-cover"
          src={chocolate.images[0] || productImage}
          alt={chocolate.name || "Chocolate"}
        />
      </Link>

      <div className="p-4">
        <h2 className="text-xl font-bold truncate">
          {chocolate.name || "Chocolate Name"}
        </h2>

        <p
          className="text-gray-600 mt-2 h-12 overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {chocolate.description || "Delicious handmade chocolate."}
        </p>

        <div className="flex items-center space-x-2 mt-3">
          <p className="text-2xl font-semibold text-green-600">
            ₹ {Number(chocolate.bestPrice).toFixed(2) || "000"}
          </p>
          {chocolate.originalPrice && (
            <p className="text-sm text-gray-500 line-through">
              ₹ {Number(chocolate.originalPrice).toFixed(2)}
            </p>
          )}
        </div>

        <button
          className="w-full flex justify-between items-center px-3 mt-4 py-2 hover:scale-105 transition-transform border-2 font-bold rounded-lg bg-[#7f5036] text-white"
          onClick={() =>
            token
              ? addToCart(chocolate, quantity)
              : toast.error(`Login to Add the ${chocolate.name} to the Cart. `)
          }
        >
          Add to Cart
          <svg
            className="rtl:rotate-180 w-5.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="#D99328"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
