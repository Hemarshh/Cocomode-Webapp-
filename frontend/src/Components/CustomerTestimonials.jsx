import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShopContext } from "../context/shopContext";

const CustomerTestimonials = ({ Data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const { backendUrl } = useContext(ShopContext);

  const nextBtn = () => {
    setDirection(1);
    setCurrentIndex((currentIndex + 1) % Data.length);
  };

  const prevBtn = () => {
    setDirection(-1);
    setCurrentIndex((currentIndex - 1 + Data.length) % Data.length);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.8,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    }),
    center: {
      x: "0%",
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.8,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    }),
  };

  const truncateText = (text, limit = 50) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-4 bg-[#e0b6a2] py-10 px-4 ">
      <div className="font-playwrite text-center text-2xl md:text-5xl md:mb-0 sm:mt-4">
        <h1 className="leading-loose">Sweet Words from Our Happy Customers</h1>
      </div>
      <div className="w-full max-w-lg">
        <div className="flex flex-col items-center p-8">
          <div className="relative w-40 h-40 md:w-48 md:h-48 mb-4">
            <AnimatePresence initial={false}>
              <motion.div
                key={Data[currentIndex].image}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full h-full rounded-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${Data[currentIndex].image})`,
                }}
              />
            </AnimatePresence>
          </div>
          <motion.div
            key={Data[currentIndex].name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg font-bold text-center text-gray-800 mb-4 max-w-full md:max-w-96"
          >
            {Data[currentIndex].name}
          </motion.div>
          <motion.div
            key={Data[currentIndex].testimonial}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg text-center text-gray-800 mb-8 max-w-full md:max-w-96"
          >
            {truncateText(Data[currentIndex].testimonial, 150)}{" "}
          </motion.div>
          <div className="flex gap-4 flex-wrap justify-center">
            <button
              className="py-2 px-8 bg-gray-700 rounded-lg text-white font-bold cursor-pointer border-none"
              onClick={prevBtn}
            >
              <svg
                className="w-5.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
                style={{ transform: "rotate(180deg)" }}
              >
                <path
                  stroke="#D99328"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
            <button
              className="py-2 px-8 bg-gray-700 rounded-lg text-white font-bold cursor-pointer border-none"
              onClick={nextBtn}
            >
              <svg
                className="w-5.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="#D99328"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerTestimonials;
