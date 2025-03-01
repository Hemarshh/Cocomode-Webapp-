import React, { useState } from "react";
import uploadimage from "../assets/uploadimage.png";
import axios from "axios";
import { backendurl } from "../App";
import toast from "react-hot-toast";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [image5, setImage5] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [bestPrice, setBestPrice] = useState("");
  const [istopChocolates, setisTopChocolates] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image1 && !image2 && !image3 && !image4 && !image5) {
      toast.error("Please upload at least one image.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("originalPrice", originalPrice);
      formData.append("bestPrice", bestPrice);
      formData.append("istopChocolates", istopChocolates);
      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);
      if (image5) formData.append("image5", image5);

      const response = await axios.post(
        `${backendurl}/api/product/add-product`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setOriginalPrice("");
        setBestPrice("");
        setisTopChocolates("");
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setImage5(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="p-4 ">
      <h2 className="text-4xl font-medium font-serif text-[#D99328] text-center mb-12 relative ">
        Add Product
        <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#D4A55A] rounded-full"></span>
      </h2>
      <form className="max-w-xl" onSubmit={handleSubmit}>
        <h1 className="text-xl py-5 font-serif font-medium ">Upload Images</h1>
        <div className="flex flex-wrap gap-2 mb-6">
          {[image1, image2, image3, image4, image5].map((image, index) => (
            <label
              htmlFor={`image${index + 1}`}
              className="cursor-pointer"
              key={index}
            >
              <img
                className="w-20 h-20 rounded-md object-cover"
                src={!image ? uploadimage : URL.createObjectURL(image)}
                alt="Upload placeholder"
              />
              <input
                type="file"
                id={`image${index + 1}`}
                hidden
                onChange={(e) => {
                  const setImage = [
                    setImage1,
                    setImage2,
                    setImage3,
                    setImage4,
                    setImage5,
                  ][index];
                  setImage(e.target.files[0]);
                }}
              />
            </label>
          ))}
        </div>

        <div className="mb-4">
          <label htmlFor="chocolateName" className="mb-1 block text-lg">
            Chocolate Name
          </label>
          <input
            type="text"
            id="chocolateName"
            placeholder="Enter the Chocolate Name"
            className="w-full px-2 py-2 rounded-md outline-none border border-[#D99328] resize"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="chocolateDescription" className="mb-1 block text-lg">
            Chocolate Description
          </label>
          <textarea
            id="chocolateDescription"
            placeholder="Enter the Chocolate Description"
            className="w-full max-w-xl px-2 py-2 rounded-md outline-none border border-[#D99328] resize"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <label htmlFor="originalPrice" className="mb-1 block text-lg">
                Chocolate Original Price
              </label>
              <input
                type="number"
                id="originalPrice"
                placeholder="Enter Original Price"
                className="w-full px-2 py-2 rounded-md outline-none border border-[#D99328] resize"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <label htmlFor="bestPrice" className="mb-1 block text-lg">
                Chocolate Best Price
              </label>
              <input
                type="number"
                id="bestPrice"
                placeholder="Enter Best Price"
                className="w-full px-2 py-2 rounded-md outline-none border border-[#D99328] resize"
                value={bestPrice}
                onChange={(e) => setBestPrice(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-wrap md:flex-nowrap items-center mb-4">
          <label htmlFor="topChocolates" className="mb-1 text-lg px-2 w-1/2">
            Top Chocolates
          </label>
          <select
            id="topChocolates"
            className="w-full px-2 py-2 rounded-md outline-none border border-[#D99328]"
            value={istopChocolates.toString()}
            onChange={(e) => setisTopChocolates(e.target.value === "true")}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-4 p-1 outline-none bg-[#D99328] hover:scale-105 transition-all delay-75 text-white rounded-md px-10 py-2 w-full"
        >
          Add Chocolate
        </button>
      </form>
    </div>
  );
};

export default Add;
