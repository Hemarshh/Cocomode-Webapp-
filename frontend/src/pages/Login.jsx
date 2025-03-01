import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Login = () => {
  const { token, setToken, backendUrl, setUserDetails } =
    useContext(ShopContext);
  const navigate = useNavigate();

  const [currentState, setCurrentState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Toggle between Login and Sign Up
  const toggleState = () => {
    setCurrentState(currentState === "Sign Up" ? "Login" : "Sign Up");
    setFormData({ name: "", email: "", password: "" });
    setErrors({});
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (currentState === "Sign Up" && !formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(
          `${backendUrl}/api/user/register`,
          formData
        );
        toast.success(response.data.message);

        if (response.data.success) {
          setTimeout(() => toggleState(), 1000);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email: formData.email,
          password: formData.password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          setUserDetails(response.data.user);

          localStorage.setItem("token", response.data.token);
          localStorage.setItem(
            "userDetails",
            JSON.stringify(response.data.user)
          );

          toast.success(response.data.message);
          setTimeout(() => navigate("/"), 1500);
        }
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Redirect user if already logged in
  useEffect(() => {
    if (token || localStorage.getItem("token")) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-[#f8f1d5] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-8 w-[90%] sm:max-w-96"
      >
        <div className="text-center mb-6">
          <h1 className="font-PlayfairDisplay text-3xl text-[#82543c] font-bold">
            {currentState}
          </h1>
          <p className="text-gray-600 mt-2">
            {currentState === "Sign Up"
              ? "Create an account to get started"
              : "Welcome back! Please log in to continue"}
          </p>
        </div>

        {currentState === "Sign Up" && (
          <div className="mb-4">
            <input
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                errors.name ? "border-red-500" : "focus:ring-[#82543c]"
              }`}
              placeholder="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
        )}

        <div className="mb-4">
          <input
            className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
              errors.email ? "border-red-500" : "focus:ring-[#82543c]"
            }`}
            placeholder="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-6">
          <input
            className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
              errors.password ? "border-red-500" : "focus:ring-[#82543c]"
            }`}
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md transition-colors ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#82543c] text-white hover:bg-[#6a4532]"
          }`}
        >
          {loading
            ? "Processing..."
            : currentState === "Sign Up"
            ? "Sign Up"
            : "Login"}
        </button>

        <p className="text-center mt-4 text-gray-600">
          {currentState === "Sign Up"
            ? "Already have an account? "
            : "Don't have an account? "}
          <button
            type="button"
            onClick={toggleState}
            className="text-[#82543c] font-semibold hover:underline"
          >
            {currentState === "Sign Up" ? "Login" : "Sign Up"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
