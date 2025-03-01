import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#3E2723] text-[#D7CCC8]">
      <div className="container mx-auto px-16 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center text-center sm:text-left">
          <div>
            <h1 className="text-2xl font-bold text-[#FFD54F]">
              COCOMODE Chocolates
            </h1>
            <p className="text-sm mt-2">
              Indulge in the finest handmade chocolates.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center ">
            <Link
              to={"/chocolates"}
              className="hover:text-[#FFD54F] transition-colors"
            >
              Chocolates
            </Link>
            <Link
              to={"/aboutus"}
              className="hover:text-[#FFD54F] transition-colors"
            >
              About Us
            </Link>
            <Link
              to={"/contactus"}
              className="hover:text-[#FFD54F] transition-colors"
            >
              Contact Us
            </Link>
          </div>

          <div className="flex justify-center sm:justify-end space-x-4">
            <Link
              to={"https://www.instagram.com/cocomode_/"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-4xl lg:text-3xl text-[#FFD54F] hover:text-[#FFF59D] transition-colors"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
          </div>
        </div>

        <div className="mt-3 text-center text-sm text-[#BCAAA4]">
          &copy; {new Date().getFullYear()} COCOMODE Chocolates. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
