"use client";
import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { sendEnquiry } from "../api/Enquiry";
import toast, { Toaster } from "react-hot-toast";

const page = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await sendEnquiry(formData);
      if (response.status !== 201) {
        throw new Error("Try again after sometime");
      }
      toast.success(response.data.message);
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-8">
      <div className="flex flex-col-reverse md:flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        {/* Left Section */}
        <div className="lg:w-1/2 text-white">
          <p className="text-[#5DE3A0] mb-2">— Contact Me</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Get In Touch With Me
          </h1>
          <p className="mb-8 text-sm md:text-base leading-relaxed">
            The technological revolution is changing aspects of our lives, and
            the fabric of society itself. It’s also changing the way we learn
            and what we learn. Factual knowledge is less prized when everything
            you ever need to know can be found on your phone. There’s no
            imperative to be an expert in doing everything.
          </p>

          {/* Contact Details */}
          <div className="flex flex-col sm:flex-row gap-12 md:justify-center md:items-center ">
            {/* Phone Section */}
            <div className="flex items-center group">
              <div className="bg-[#25262A] p-6 sm:p-8 rounded-full mr-4 group-hover:bg-yellow-400 transition duration-500">
                <FaPhoneAlt className="text-[#5DE3A0] text-2xl sm:text-3xl group-hover:text-black transition duration-500" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold">Phone</h1>
                <p>
                  <a href="tel:+9729891959">+91 9729891959</a>
                </p>
                <p>
                  <a href="tel:+919588701079">+91 9588701079</a>
                </p>
              </div>
            </div>

            {/* Email Section */}
            <div className="flex items-center group">
              <div className="bg-[#25262A] p-6 sm:p-8 rounded-full mr-4 group-hover:bg-yellow-400 transition duration-500">
                <FaEnvelope className="text-green-400 text-2xl sm:text-3xl group-hover:text-black transition duration-500" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold">Email</h1>
                <p>
                  <a href="mailto:nikunj.banssal@gmail.com">
                    nikunj.banssal@gmail.com
                  </a>
                </p>
                <p>
                  <a href="mailto:bnikunj31@gmail.com">bnikunj31@gmail.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full sm:w-1/2 p-4 bg-[#25262A] border border-green-400 rounded-md text-white"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full sm:w-1/2 p-4 bg-[#25262A] border border-green-400 rounded-md text-white"
                required
              />
            </div>
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-4 bg-[#25262A] border border-green-400 rounded-md text-white h-32"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full sm:w-auto bg-yellow-500 text-black px-6 py-2 rounded-md shadow-md hover:bg-yellow-600"
            >
              Message
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default page;
