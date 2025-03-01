import React from "react";
import LeftImg from "../assets/chocolates.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      style={{ overflow: "hidden", width: "100%" }}
      className="flex flex-col lg:flex-row justify-center items-center px-8 lg:px-64 sm:pt-0 md:py-16 lg:py-4 space-y-10 lg:space-y-0 lg:space-x-10"
    >
      {/* Hero Text */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="flex flex-col gap-5 justify-center items-center text-2xl sm:text-3xl md:text-3xl lg:text-5xl"
      >
        <h2 className="font-playwrite leading-loose text-[#7e4f39] text-center p-3 tracking-wide">
          Exclusive Delights in Every Bite
        </h2>
        <Link to={"/chocolates"} className="flex justify-center items-center">
          <button className="relative sm:px-3 md:py-1 px-2 py-1 border-2 border-[#7e4f39] text-[#7e4f39] font-medium text-sm rounded-md overflow-hidden outline-none hover:bg-[#7e4f39] hover:text-white hover:scale-110 transition-all ">
            Explore Now
          </button>
        </Link>
        <div className=""></div>
      </motion.div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      >
        <motion.img
          className="rounded-full w-[250px] sm:w-[350px] md:w-[400px] lg:w-[450px] object-cover"
          src={LeftImg}
          alt="An assortment of chocolate delights"
          onError={(e) => (e.target.src = "/path/to/placeholder.png")}
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            duration: 10,
          }}
        />
      </motion.div>
    </div>
  );
};

export default Hero;
