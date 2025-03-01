import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/shopContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { token } = useContext(ShopContext);
  const navigate = useNavigate();

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-[#f8f1d5] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 w-[90%] sm:max-w-96">
        <h1 className="font-PlayfairDisplay text-3xl text-[#82543c] font-bold text-center">
          Profile
        </h1>
        {userDetails ? (
          <div className="mt-4">
            <p>
              <strong>Name:</strong> {userDetails.name}
            </p>
            <p>
              <strong>Email:</strong> {userDetails.email}
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-500">No user details found</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
