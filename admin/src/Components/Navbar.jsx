import React from "react";
import Logo from "../assets/Cocomode Logo.png";
import { Link } from "react-router-dom";

const Navbar = ({ setToken }) => {
  return (
    <div className="bg-[#FAF8F1] flex items-center justify-between px-3 pr-4 py-5 font-medium max-h-28">
      <Link to={"/"}>
        <img width={175} height="auto" src={Logo} alt="logo" />
      </Link>
      <button
        className="p-1 bg-[#7e4f35] text-white rounded-md px-3"
        onClick={() => setToken("")}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
