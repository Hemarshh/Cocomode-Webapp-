import React, { useContext, useState } from "react";
import { CreditCard, Wallet, Banknote } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/shopContext";
import axios from "axios";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const {
    backendUrl,
    token,
    chocolates,
    cart,
    setCart,
    subtotal,
    shipping,
    total,
    minialcartData,
  } = useContext(ShopContext);

  // State for delivery address
  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  // State for payment method
  const [paymentMethod, setPaymentMethod] = useState("");

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  // Handle payment method selection
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, street, city, state, zipCode } = address;
    if (!fullName || !street || !city || !state || !zipCode) {
      return toast.error(
        "Please fill in all address fields before placing the order."
      );
    }

    const orderChocolates = [];
    try {
      for (const items in cart) {
        const element = cart[items]; // Each cart item object
        const isChocolateMatch = chocolates.find(
          (choco) => choco._id === element._id // Match based on _id
        );

        if (isChocolateMatch) {
          const updatedChocolate = {
            ...isChocolateMatch,
            quantity: element.quantity,
          };
          orderChocolates.push(updatedChocolate);
        }
      }
      // let OrderData = {};
      if (paymentMethod === "") {
        toast.error("Please select your Payment option.");
      } else {
        switch (paymentMethod) {
          // cod
          case "cod":
            console.log("cod");
            console.log(backendUrl);

            const response = await axios.post(
              `${backendUrl}/api/orders/place`,
              { address, items: orderChocolates, amount: total, paymentMethod }, // Include paymentMethod
              {
                headers: { token },
              }
            );

            console.log(response);

            if (response.data.success) {
              toast.success(response.data.message);
              setAddress({
                fullName: "",
                street: "",
                city: "",
                state: "",
                zipCode: "",
                country: "",
              });
              setTimeout(() => {
                navigate("/my-orders");
              }, 1000);
            } else {
              toast.error(response.data.message);
            }
            break;

          case "stripe":
            try {
              // Load the Stripe object with your public key
              const stripe = await loadStripe(
                "pk_test_51Qn3O2HPgcRf7N1tUsAdusz1fTwKYK2G9VbJLvYBViFrlp0ECEuzn9ajKNYurWj7LenLF23iufrMZ0lNIucBFLm700FkJ7fVUH"
              );

              // Prepare the data to be sent to the backend
              const responseStripe = await axios.post(
                `${backendUrl}/api/orders/stripe`,
                {
                  address,
                  items: orderChocolates,
                  amount: total,
                  paymentMethod,
                  origin: backendUrl,
                },
                { headers: { token } }
              );

              console.log(responseStripe.data); // Log the response for debugging

              // Check if the session creation was successful
              if (
                responseStripe.data.success &&
                responseStripe.data.session_url
              ) {
                // Redirect the user to the Stripe checkout page
                window.location.replace(responseStripe.data.session_url);
                toast.success("Order placed successfully.");
              } else {
                // Show error message if the session URL is not available or there was an issue
                toast.error(
                  responseStripe.data.message ||
                    "Something went wrong. Please try again."
                );
              }
            } catch (error) {
              // Handle any errors during the process
              console.error(error);
              toast.error(
                "An error occurred while processing your payment. Please try again later."
              );
            }
            break;
          default:
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f1d5] py-8 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl text-center font-bold text-[#82543c] mb-8 font-PlayfairDisplay">
          Place Order
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-[#82543c] mb-4">
              Delivery Address
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={address.fullName}
                    onChange={handleInputChange}
                    className="mt-1 py-1 px-2 outline-none bg-[#f1e9db6d] block w-full rounded-md border-gray-300 shadow-sm focus:border-[#82543c] focus:ring-[#82543c]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={address.street}
                    onChange={handleInputChange}
                    className="mt-1 py-1 px-2 outline-none bg-[#f1e9db6d] block w-full rounded-md border-gray-300 shadow-sm focus:border-[#82543c] focus:ring-[#82543c]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleInputChange}
                    className="mt-1 py-1 px-2 outline-none bg-[#f1e9db6d] block w-full rounded-md border-gray-300 shadow-sm focus:border-[#82543c] focus:ring-[#82543c]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleInputChange}
                    className="mt-1 py-1 px-2 outline-none bg-[#f1e9db6d] block w-full rounded-md border-gray-300 shadow-sm focus:border-[#82543c] focus:ring-[#82543c]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={address.zipCode}
                    onChange={handleInputChange}
                    className="mt-1 py-1 px-2 outline-none bg-[#f1e9db6d] block w-full rounded-md border-gray-300 shadow-sm focus:border-[#82543c] focus:ring-[#82543c]"
                    required
                  />
                </div>
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={address.country}
                    onChange={handleInputChange}
                    className="mt-1 py-1 px-2 outline-none bg-[#f1e9db6d] block w-full rounded-md border-gray-300 shadow-sm focus:border-[#82543c] focus:ring-[#82543c]"
                    required
                  />
                </div> */}
              </div>
            </form>
          </div>

          <div className="space-y-8">
            {/* Order Summary */}
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
            </div>

            {/* Payment Options */}

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-[#82543c] mb-4">
                Payment Options
              </h2>
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="stripe"
                    checked={paymentMethod === "stripe"}
                    onChange={handlePaymentMethodChange}
                    className="form-radio h-5 w-5 text-[#82543c]"
                  />
                  <CreditCard className="h-6 w-6 text-[#82543c]" />
                  <span className="text-gray-700">Stripe</span>
                </label>

                {/* <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="razorpay"
                    checked={paymentMethod === "razorpay"}
                    onChange={handlePaymentMethodChange}
                    className="form-radio h-5 w-5 text-[#82543c]"
                  />
                  <Wallet className="h-6 w-6 text-[#82543c]" />
                  <span className="text-gray-700">Razorpay</span>
                </label> */}

                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={handlePaymentMethodChange}
                    className="form-radio h-5 w-5 text-[#82543c]"
                  />
                  <Banknote className="h-6 w-6 text-[#82543c]" />
                  <span className="text-gray-700">Cash on Delivery</span>
                </label>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-[#82543c] text-white rounded-lg py-3 hover:bg-[#6a4532] transition-colors"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
