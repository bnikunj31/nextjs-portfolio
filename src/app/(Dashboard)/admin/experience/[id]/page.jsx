"use client";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import { getExperienceById, updateExperience } from "@/app/api/Experience";

const Page = () => {
  const [formData, setFormData] = useState({
    company_name: "",
    role: "",
    joining_date: "",
    ending_date: "",
    description: "",
  });
  const router = useRouter();
  const { id } = useParams();

  // Fetch experience data
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await getExperienceById(id);
        setFormData(response);
      } catch (error) {
        console.error("Error fetching experience:", error);
        toast.error("An error occurred while fetching experience.");
      }
    };

    if (id) {
      fetchExperience();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const { company_name, role, joining_date, description } = formData;
    if (!company_name || !role || !joining_date || !description) {
      toast.error("Please fill in all required fields!");
      return;
    }

    try {
      const response = await updateExperience(formData, id);

      if (response.status === 200) {
        toast.success("Experience updated successfully!");
        router.push("/admin/experience");
      } else {
        toast.error("Failed to update experience.");
      }
    } catch (error) {
      console.error("Error updating experience:", error);
      toast.error("An error occurred while updating the experience.");
    }
  };

  return (
    <div className="p-6 mx-auto mt-10 w-full sm:w-3/4 lg:w-1/2 bg-gray-800 shadow-md rounded-md text-white">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Edit Experience
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Company Name Input */}
        <div>
          <label
            htmlFor="company_name"
            className="block text-sm font-medium mb-2"
          >
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            id="company_name"
            name="company_name"
            type="text"
            value={formData.company_name}
            onChange={handleChange}
            placeholder="Company Name"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Role Input */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium mb-2">
            Role <span className="text-red-500">*</span>
          </label>
          <input
            id="role"
            name="role"
            type="text"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role (e.g., Software Engineer)"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Joining Date Input */}
        <div>
          <label
            htmlFor="joining_date"
            className="block text-sm font-medium mb-2"
          >
            Joining Date <span className="text-red-500">*</span>
          </label>
          <input
            id="joining_date"
            name="joining_date"
            type="date"
            value={formData.joining_date}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Ending Date Input */}
        <div>
          <label
            htmlFor="ending_date"
            className="block text-sm font-medium mb-2"
          >
            Ending Date
          </label>
          <input
            id="ending_date"
            name="ending_date"
            type="date"
            value={formData.ending_date}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description Input */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2"
          >
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description of your experience"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Experience
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default Page;
