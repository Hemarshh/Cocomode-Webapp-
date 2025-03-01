import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import carousel1 from "../assets/carousel1.jpg";
import carousel2 from "../assets/carousel2.jpg";
import carousel3 from "../assets/carousel3.jpg";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [carousel3, carousel2, carousel1];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="carousel-container relative w-full overflow-hidden group h-[50%] py-4">
      <motion.div
        className="carousel-track flex"
        initial={{ x: "100%" }}
        animate={{ x: `-${currentSlide * 100}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 40 }}
        style={{ height: "100%" }}
      >
        {slides.map((src, index) => (
          <div
            key={index}
            className="carousel-item w-full flex-shrink-0 sm:h-auto lg:h-[99vh]"
            style={{ width: "100%" }}
          >
            <img
              src={src}
              className="w-full h-full object-fill"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </motion.div>

      {/* Navigation buttons */}
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <motion.button
          onClick={prevSlide}
          className="btn btn-circle bg-gray-800 text-white w-14 h-14 rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          ❮
        </motion.button>
        <motion.button
          onClick={nextSlide}
          className="btn btn-circle bg-gray-800 text-white w-14 h-14 rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          ❯
        </motion.button>
      </div>
    </div>
  );
};

export default Carousel;
