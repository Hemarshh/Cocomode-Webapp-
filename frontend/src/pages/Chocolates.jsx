import React, { useContext, useState, useMemo } from "react";
import { ShopContext } from "../context/shopContext";
import ProductCard from "../Components/ProductCard";

const Chocolates = () => {
  const { chocolates } = useContext(ShopContext);

  const [maxPrice, setMaxPrice] = useState(500);
  const [filterEnabled, setFilterEnabled] = useState(true);
  const [sortOrder, setSortOrder] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const chocolatesPerPage = 6;

  // Filter and sort chocolates
  const displayedChocolates = useMemo(() => {
    let filtered = chocolates.filter(
      (chocolate) => chocolate.bestPrice <= maxPrice
    );

    if (sortOrder === "lowToHigh") {
      filtered.sort((a, b) => a.bestPrice - b.bestPrice);
    } else if (sortOrder === "highToLow") {
      filtered.sort((a, b) => b.bestPrice - a.bestPrice);
    }

    return filtered;
  }, [chocolates, maxPrice, sortOrder]);

  // Pagination logic
  const totalPages = Math.ceil(displayedChocolates.length / chocolatesPerPage);
  const paginatedChocolates = useMemo(
    () =>
      displayedChocolates.slice(
        (pageNo - 1) * chocolatesPerPage,
        pageNo * chocolatesPerPage
      ),
    [displayedChocolates, pageNo]
  );

  // Toggle filter state
  const handleFilterToggle = () => setFilterEnabled((prev) => !prev);

  return (
    <div className="flex flex-col lg:flex-row gap-4 py-4 px-4 sm:px-6 md:px-10 bg-[#FAF8F1]">
      {/* Filters Section */}
      <div className="border border-zinc-200 rounded-md w-full lg:w-56 h-48 p-4">
        <p className="text-2xl mb-4">Filters</p>
        <div className={filterEnabled ? "pointer-events-none opacity-50" : ""}>
          <label>Price 0 to {maxPrice}₹</label>
          <input
            className="w-full mt-2"
            type="range"
            max="500"
            value={maxPrice}
            step={10}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center mt-6">
          <label>Use this Filter</label>
          <input
            className="w-4 h-4"
            type="checkbox"
            checked={!filterEnabled}
            onChange={handleFilterToggle}
          />
        </div>
      </div>

      {/* Products Section */}
      <div className="border border-zinc-200 rounded-md flex-1">
        <h1 className="font-PlayfairDisplay text-3xl text-center py-4 text-[#82543c] font-bold">
          Our Collections
        </h1>

        {/* Sort By Dropdown */}
        <div className="flex justify-end px-4 sm:px-8">
          <div className="relative inline-block group">
            <button className="px-6 py-2 bg-zinc-300 text-black rounded-lg">
              Sort-By
            </button>
            <div className="absolute hidden group-hover:flex flex-col bg-[#D99328] top-full mt-1 w-full text-sm rounded-lg shadow-lg">
              <ul className="flex flex-col gap-2 text-white">
                <li
                  className="p-2 cursor-pointer hover:bg-[#82543c] hover:text-white"
                  onClick={() => setSortOrder("lowToHigh")}
                >
                  Low to High
                </li>
                <li
                  className="p-2 cursor-pointer hover:bg-[#82543c] hover:text-white"
                  onClick={() => setSortOrder("highToLow")}
                >
                  High to Low
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 sm:px-6 md:px-8 py-6">
          {paginatedChocolates.length > 0 ? (
            paginatedChocolates.map((chocolate) => (
              <ProductCard key={chocolate._id} chocolate={chocolate} />
            ))
          ) : (
            <p className="text-center col-span-full">
              No chocolates match the selected criteria.
            </p>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-2 py-5">
          <button
            aria-label="Previous Page"
            className={`border py-2 px-4 rounded-lg ${
              pageNo === 1
                ? "bg-gray-400 text-gray-500 cursor-not-allowed"
                : "bg-[#D99328] text-white"
            }`}
            onClick={() => setPageNo((prev) => prev - 1)}
            disabled={pageNo === 1}
          >
            Prev
          </button>
          <span className="border py-2 px-4 bg-[#D99328] text-white rounded-lg">
            {pageNo}
          </span>
          <button
            aria-label="Next Page"
            className={`border py-2 px-4 rounded-lg ${
              pageNo >= totalPages
                ? "bg-gray-400 text-gray-500 cursor-not-allowed"
                : "bg-[#D99328] text-white"
            }`}
            onClick={() => setPageNo((prev) => prev + 1)}
            disabled={pageNo >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chocolates;
