import React, { useState } from "react";
import axios from "axios";
import { backendurl } from "../App";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${backendurl}/api/user/adminlogin`, {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        toast.success("Logged in Successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FAF8F1] to-[#E6D5C4]">
      <div className="bg-white shadow-xl rounded-2xl px-8 py-10 max-w-sm w-full border-l-4 border-[#D4A55A]">
        <h1 className="text-3xl font-serif text-center mb-6 text-[#D99328] relative">
          Admin Login
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#D4A55A] rounded-full"></span>
        </h1>
        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#4E342E] my-1">
              Email
            </label>
            <input
              className="w-full border rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-[#D99328] outline-none"
              type="email"
              name="email"
              placeholder="Enter your Email"
              onChange={handleInputChange}
              value={formData.email}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#4E342E] my-1">
              Password
            </label>
            <input
              className="w-full border rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-[#D99328] outline-none"
              type="password"
              name="password"
              placeholder="Enter your Password"
              onChange={handleInputChange}
              value={formData.password}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center bg-[#D99328] hover:bg-[#B87E20] text-white font-medium py-2 rounded-lg transition-all"
            disabled={loading}
          >
            {loading ? <Loader className="animate-spin" size={20} /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
