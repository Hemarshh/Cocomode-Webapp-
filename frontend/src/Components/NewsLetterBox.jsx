import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { ShopContext } from "../context/shopContext";
import axios from "axios";

const NewsLetterBox = () => {
  const [email, setEmail] = useState("");
  const { backendUrl } = useContext(ShopContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email!");
      return;
    }
    console.log(email);

    try {
      const response = await axios.post(`${backendUrl}/api/subscribe`, {
        email,
      });
      console.log();

      if (response.data.success) {
        toast.success(response.data.message);
        setEmail("");
      } else {
        toast.error(response.data.message || "Failed to subscribe. Try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="text-center py-10">
      <p className="text-lg md:text-xl lg:text-2xl font-PlayfairDisplay text-[#7e4f39] py-2">
        Subscribe to get Updates & Offers
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-[70%] lg:w-1/2 flex items-center justify-center gap-1 mx-auto"
      >
        <input
          className="text:sm md:text-md w:full lg:w-1/2 p-2 bg-[#f5deb9] rounded-lg outline-none text-black pl-6 placeholder-black"
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="p-2 lg:px-4 rounded-lg text-white bg-[#4E342E]"
          type="submit"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
