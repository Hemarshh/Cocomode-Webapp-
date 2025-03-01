import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Create the context
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  // -------------------- State Variables --------------------
  // const [userDetails, setUserDetails] = useState({});
  const [userDetails, setUserDetails] = useState(() => {
    const storedUser = localStorage.getItem("userDetails");
    return storedUser ? JSON.parse(storedUser) : {};
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [cart, setCart] = useState([]);
  const [minialcartData, setMinimalCartData] = useState([]);
  const [chocolates, setChocolates] = useState([]);

  // -------------------- Constants --------------------
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // -------------------- Effects --------------------

  // Fetch chocolates from the backend on component mount
  useEffect(() => {
    const fetchChocolates = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/product/list-product`
        );
        if (response.data.success) {
          setChocolates(response.data.listChocolates);
        }
      } catch (error) {
        console.error("Failed to fetch chocolates:", error);
      }
    };
    fetchChocolates();
  }, [backendUrl]);

  // Fetch cart data from backend when token changes (user login)
  useEffect(() => {
    if (token) {
      getUserCartData();
    } else {
      setCart([]);
    }
  }, [token]);

  // Fetch cart data from backend
  const getUserCartData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/cart/get`, {
        headers: { token },
      });
      if (response.data.success) {
        setCart(response.data.cartData);
      }
    } catch (error) {
      console.error("Error fetching user cart data:", error);
      setCart([]);
    }
  };

  // Fetch minimal cart data
  const getMinimalUserCartData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/cart/getdata`, {
        headers: { token },
      });
      if (response.data.success) {
        setMinimalCartData(response.data.minimalCardData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMinimalUserCartData();
  }, []);

  // -------------------- Functions --------------------
  const addToCart = async (newChocolate, quantity = 1) => {
    setCart((prevCart) => {
      const existingChocolate = prevCart.find(
        (item) => item.id === newChocolate.id
      );
      if (existingChocolate) {
        return prevCart.map((item) =>
          item.id === newChocolate.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...newChocolate, quantity }];
    });

    if (token) {
      try {
        const response = await axios.post(
          `${backendUrl}/api/cart/add`,
          { chocolateId: newChocolate._id, quantity },
          { headers: { token } }
        );
        if (response.data.success) {
          toast.success(response.data.message);
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  const updateQuantity = async (chocolateId, change) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item._id === chocolateId) {
            const newQuantity = item.quantity + change;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter(Boolean)
    );

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { chocolateId, change },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  const removeFromCart = async (chocolateId) => {
    const loadingToastId = toast.loading("Deleting Chocolates...");
    try {
      const response = await axios.delete(
        `${backendUrl}/api/cart/delete?chocolateId=${chocolateId}`,
        { headers: { token } }
      );

      if (response.data.success) {
        setCart(cart.filter((choco) => choco._id !== chocolateId));
        toast.dismiss(loadingToastId);
        toast.success("Chocolate removed successfully!");
      } else {
        toast.dismiss(loadingToastId);
        toast.error(response.data.message || "Failed to remove chocolate.");
      }
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error("Failed to remove chocolate. Please try again.");
      console.error("Error removing item from cart:", error);
    }
  };

  // -------------------- Derived Values --------------------
  const subtotal = Object.values(cart).reduce(
    (sum, item) => sum + item.bestPrice * item.quantity,
    0
  );
  const shipping = 5.99;
  const total = subtotal + shipping;

  // -------------------- Context Value --------------------
  const value = {
    chocolates,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    shipping,
    total,
    backendUrl,
    token,
    setToken,
    getUserCartData,
    setCart,
    userDetails,
    setUserDetails,
  };

  // -------------------- Render --------------------
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
