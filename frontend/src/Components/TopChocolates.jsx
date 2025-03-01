import React, { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import ProductCard from "./ProductCard";
import { Loader } from "lucide-react";

const TopChocolates = () => {
  const { chocolates } = useContext(ShopContext);

  // Return the loader if chocolates data is loading or empty
  if (!chocolates || chocolates.length === 0) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader className="animate-spin h-12 w-12 text-[#82543c]" />
      </div>
    );
  }

  return (
    <section className="m-4 p-4 md:p-14 border flex justify-center">
      <div className="flex flex-col m-auto w-full">
        <h1 className="mb-2 md:mb-6 text-center text-3xl lg:text-5xl lg:py-8 text-[#e1c597] font-PlayfairDisplay">
          Top Picks
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {chocolates.slice(0, 8).map((chocolate, index) => (
            <div
              key={chocolate._id} // Assuming `chocolate._id` is a unique identifier
              className={`p-2 w-full transition-all duration-300 ease-in-out transform flex-shrink-0 ${
                index % 2 === 0 ? "lg:translate-y-4" : "lg:-translate-y-4"
              }`}
            >
              <ProductCard chocolate={chocolate} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopChocolates;
