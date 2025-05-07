"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { addProject } from "@/app/api/Project";

const AddProjectForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    technologies: "",
    team: "",
    description: "",
  });

  const [uploadedImage, setUploadedImage] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file); // Store the file
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const projectData = new FormData();
      projectData.append("title", formData.title);
      projectData.append("technologies", formData.technologies);
      projectData.append("team", formData.team);
      projectData.append("description", formData.description);

      if (uploadedImage) {
        projectData.append("image", uploadedImage);
      }

      const response = await addProject(projectData);

      if (response.status === 201) {
        toast.success(response.data.message);
        router.push("/admin/projects");
      } else {
        throw new Error("Request Failed.");
      }
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Failed to add project. Please try again.");
    }
  };

  return (
    <div className="p-6 mx-auto w-full max-w-4xl bg-[#1F2937] text-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block font-medium text-gray-300">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-600 rounded bg-[#2D2E32] text-white"
          />
        </div>

        {/* Image */}
        <div>
          <label htmlFor="image" className="block font-medium text-gray-300">
            Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
            required
            className="w-full p-2 border border-gray-600 rounded bg-[#2D2E32] text-white"
          />
        </div>

        {/* Technologies */}
        <div>
          <label
            htmlFor="technologies"
            className="block font-medium text-gray-300"
          >
            Technologies
          </label>
          <input
            type="text"
            id="technologies"
            name="technologies"
            value={formData.technologies}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-600 rounded bg-[#2D2E32] text-white"
          />
        </div>

        {/* Team */}
        <div>
          <label htmlFor="team" className="block font-medium text-gray-300">
            Team (comma-separated)
          </label>
          <input
            type="text"
            id="team"
            name="team"
            value={formData.team}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded bg-[#2D2E32] text-white"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block font-medium text-gray-300"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-600 rounded bg-[#2D2E32] text-white"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Project
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default AddProjectForm;
