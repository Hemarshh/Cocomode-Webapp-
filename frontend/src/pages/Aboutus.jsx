import React from "react";
import chocolateBg from "../assets/chocolatebg.jpg";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div
      className="min-h-screen text-white bg-cover bg-center p-6 overflow-hidden"
      style={{ backgroundImage: `url(${chocolateBg})` }}
    >
      {/* Welcome Text */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{
          type: "spring",
          bounce: 0.3,
          stiffness: 100,
          damping: 10,
        }}
        className="flex justify-center overflow-hidden"
      >
        <p className="bg-[#FAF8F1] text-[#4E342E] text-center text-sm sm:text-lg md:text-2xl p-4 font-PlayfairDisplay rounded-lg shadow-lg w-full">
          "Welcome to{" "}
          <span className="text-[#D99328] font-extrabold">CHOCOHOLIC</span> – A
          world of premium chocolate delights. Indulge in the finest handcrafted
          chocolates made with passion and care."
        </p>
      </motion.div>

      {/* Content Section */}
      <div className="m-2 p-6 bg-[#FAF8F1] rounded-lg shadow-lg">
        {[
          {
            title: "Our Story",
            content:
              "CHOCOHOLIC was born out of a deep love for chocolate. It all began with a simple dream: to create chocolates that are not just treats but experiences. From humble beginnings, we’ve grown into a brand that delivers premium, handcrafted chocolates made with the finest ingredients and a touch of creativity.",
          },
          {
            title: "Our Values",
            content: [
              {
                label: "Quality",
                text: "We use only the finest ingredients to ensure every bite is a moment of indulgence.",
              },
              {
                label: "Craftsmanship",
                text: "Every chocolate is handcrafted with precision and care, ensuring a unique and memorable experience.",
              },
              {
                label: "Sustainability",
                text: "We are committed to eco-friendly practices, sourcing ethically and minimizing waste.",
              },
              {
                label: "Passion",
                text: "Our chocolates are made with love, aiming to bring joy to every moment.",
              },
            ],
          },
          {
            title: "Why Choose Us?",
            content: [
              {
                label: "Handcrafted Excellence",
                text: "Our chocolates are crafted by skilled artisans who take pride in their work.",
              },
              {
                label: "Unique Flavors",
                text: "We offer a wide range of flavors, from classic to innovative, to satisfy every palate.",
              },
              {
                label: "Made with Love",
                text: "Every chocolate is created with care, ensuring the best experience for you.",
              },
            ],
          },
          {
            title: "Our Promise to You",
            content:
              "At CHOCOHOLIC, we promise to deliver chocolates that are more than just sweets—they’re moments of joy. Whether you’re treating yourself or gifting someone special, our chocolates are designed to make every occasion unforgettable.",
          },
        ].map(({ title, content }, index) => (
          <div key={index} className="py-2">
            <h2 className="text-[#D99328] text-2xl sm:text-3xl font-bold font-PlayfairDisplay">
              {title}
            </h2>
            {Array.isArray(content) ? (
              <ul className="list-disc px-8 text-sm sm:text-lg md:text-xl text-[#4E342E]">
                {content.map(({ label, text }, i) => (
                  <li key={i}>
                    <span className="font-semibold">{label}:</span> {text}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-2 text-sm sm:text-lg md:text-xl text-[#4E342E] font-PlayfairDisplay">
                {content}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
