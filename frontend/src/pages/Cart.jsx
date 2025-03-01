import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import CartTotal from "../Components/CartTotal";
import { Loader } from "lucide-react";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getUserCartData } =
    useContext(ShopContext);
  const [loading, setLoading] = useState(true);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  useEffect(() => {
    if (!isCartLoaded) {
      const loadCartData = async () => {
        setLoading(true);
        await getUserCartData();
        setIsCartLoaded(true);
        setLoading(false);
      };
      loadCartData();
    }
  }, [isCartLoaded, getUserCartData]);

  return (
    <div className="min-h-screen bg-[#f8f1d5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl text-center font-PlayfairDisplay text-[#82543c] font-bold mb-8">
          Your Cart
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader className="animate-spin h-12 w-12 text-[#82543c]" />
          </div>
        ) : cart.length === 0 ? (
          <div className="flex flex-col justify-center items-center py-16 bg-white rounded-lg shadow-md">
            <div className="text-center">
              <div className="flex justify-center">
                <ShoppingCart className="h-24 w-24 text-amber-200" />
              </div>
              <h2 className="mt-6 text-3xl font-bold text-amber-900">
                Your cart is empty
              </h2>
              <p className="mt-4 text-lg text-amber-700">
                Looks like you haven't added any delicious chocolates to your
                cart yet.
              </p>
              <div className="mt-6">
                <Link
                  to="/chocolates"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-800 hover:bg-amber-900 transition-colors duration-200"
                >
                  <ArrowLeft className="h-5 w-5 mr-2 text-[#D99328]" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {cart.map((choco) => (
                <div
                  key={choco._id}
                  className="bg-white rounded-lg shadow-md p-6 mb-4 flex flex-wrap gap-6 items-start"
                >
                  <img
                    className="w-24 h-24 object-contain"
                    src={choco.images[0]}
                    alt={choco.name}
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-base sm:text-lg font-semibold text-[#82543c]">
                          {choco.name}
                        </p>
                        <p className="text-base font-semibold">
                          {choco.description.slice(0, 100)}...
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQuantity(choco._id, -1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <Minus size={20} className="text-[#82543c]" />
                          </button>
                          <span className="text-lg font-semibold w-8 text-center">
                            {choco.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(choco._id, +1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <Plus size={20} className="text-[#82543c]" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-lg font-bold text-[#82543c]">
                          ₹{(choco.bestPrice * choco.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeFromCart(choco._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <CartTotal />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
