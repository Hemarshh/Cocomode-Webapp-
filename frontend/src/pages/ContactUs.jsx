import axios from "axios";
import React, { useContext, useState } from "react";
import { ShopContext } from "../context/shopContext";
import toast from "react-hot-toast";

const ContactUs = () => {
  const { backendUrl } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const formDataHandleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitform = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      toast.error("All fields are required!");
      return;
    }

    try {
      // Make the POST request to the backend
      const response = await axios.post(`${backendUrl}/api/contactus/`, {
        formData,
      });

      if (response.data.success) {
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-PlayfairDisplay font-bold text-center text-[#7f5036] mb-8">
          Contact Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-[#FAF8F1] p-6 rounded-lg shadow-lg ">
            <h2 className="text-2xl font-semibold text-[#7f5036] mb-4">
              Send Us a Message
            </h2>
            <form onSubmit={submitform}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  value={formData.name}
                  onChange={formDataHandleChange}
                  type="text"
                  name="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#7f5036] focus:border-[#7f5036]"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  value={formData.email}
                  onChange={formDataHandleChange}
                  type="email"
                  name="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#7f5036] focus:border-[#7f5036]"
                  placeholder="Your Email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={formDataHandleChange}
                  rows="4"
                  name="message"
                  className="max-h-32 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#7f5036] focus:border-[#7f5036]"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#D99328] text-white py-2 px-4 rounded-md hover:bg-[#6a412c] focus:outline-none focus:ring-2 focus:ring-[#7f5036] focus:ring-offset-2 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information and Map */}
          <div className="bg-[#FAF8F1] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-[#7f5036] mb-4">
              Our Information
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-700">Address</h3>
                <p className="text-gray-600">Thakur village Kandivali 400101</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Phone</h3>
                <p className="text-gray-600">+91 8828040548</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Email</h3>
                <p className="text-gray-600">akshataut101@gmail.com</p>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium text-[#7f5036] mb-4">
                Find Us on the Map
              </h3>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  title="address-map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7535.275042288928!2d72.86784514068188!3d19.21102810950133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b739ce450b55%3A0x5cd9559c542442c8!2sKandivali%2C%20Thakur%20Village%2C%20Kandivali%20East%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1738746800839!5m2!1sen!2sin"
                  className="w-full h-full rounded-lg"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
