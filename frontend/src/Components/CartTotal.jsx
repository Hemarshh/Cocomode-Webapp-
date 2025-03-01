import React, { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import { useNavigate } from "react-router-dom";

const CartTotal = () => {
  const { subtotal, shipping, total } = useContext(ShopContext);
  const navigate = useNavigate();
  return (
    <div>
      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-[#82543c] mb-4">
            Order Summary
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold">₹{shipping.toFixed(2)}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between">
                <span className="font-bold text-[#82543c]">Total</span>
                <span className="font-bold text-[#82543c]">
                  ₹{total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate("/place-order")}
            className="w-full bg-[#82543c] text-white rounded-lg py-3 mt-6 hover:bg-[#6a4532] transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
