"use client";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { addTechnology } from "@/app/api/Techonology";

const Page = () => {
  const [formData, setFormData] = useState({
    svg: "",
    name: "",
    description: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.svg) {
      toast.error("All fields are required!");
      return;
    }

    const technology = await addTechnology(formData);

    if (technology.status === 201) {
      toast.success(technology.data.message);
      router.push("/admin/technology");
    }
  };

  return (
    <div className="p-6 mx-auto mt-10 w-full sm:w-3/4 lg:w-1/2 bg-gray-800 shadow-md rounded-md text-white">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Add Technology
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* SVG Input */}
        <label htmlFor="svg" className="block text-sm font-medium mb-2">
          SVG Code
        </label>
        <div className="flex gap-5">
          <textarea
            id="svg"
            name="svg"
            rows="4"
            value={formData.svg}
            onChange={handleChange}
            placeholder="<svg>...</svg>"
            className="w-2/3 px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          {/* SVG Preview */}
          <div
            className="w-1/3 mt-4 p-2 border border-gray-600 rounded bg-gray-700 flex items-center justify-center"
            style={{ maxWidth: "150px", maxHeight: "150px" }}
            dangerouslySetInnerHTML={{ __html: formData.svg }}
          />
        </div>

        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Technology Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Technology Name"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description Input */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2"
          >
            Technology Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description of the technology"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Technology
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default Page;
