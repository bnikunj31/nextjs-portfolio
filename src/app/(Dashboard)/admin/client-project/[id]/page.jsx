"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { getWorkById, updateWork } from "@/app/api/Work";
import Select from "react-select";
import { getClients } from "@/app/api/Client";
import { getProjects } from "@/app/api/Project";

const EditProjectClientForm = () => {
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(null);

  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectClientData = await getWorkById(id);
        const clientsData = await getClients();
        const projectsData = await getProjects();

        setInitialData(projectClientData);
        setClients(clientsData);
        setProjects(projectsData);

        // Set the initial selected client and project
        setSelectedClient({
          value: projectClientData.client.id,
          label: projectClientData.client.name,
        });
        setSelectedProject({
          value: projectClientData.project.id,
          label: projectClientData.project.title,
        });
      } catch (error) {
        toast.error("Failed to fetch data for editing");
      }
    };

    fetchData();
  }, [id]);

  const handleClientChange = (selectedOption) => {
    setSelectedClient(selectedOption);
  };

  const handleProjectChange = (selectedOption) => {
    setSelectedProject(selectedOption);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!selectedClient || !selectedProject) {
      toast.error("Please select both a client and a project");
      setLoading(false);
      return;
    }

    try {
      const updatedWork = {
        clientId: selectedClient.value,
        projectId: selectedProject.value,
      };
      const updatedProjectClient = await updateWork(id, updatedWork); // Assuming updateProjectClient updates the record
      toast.success(updatedProjectClient.message);
      router.push("/admin/client-project");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update project-client relationship");
    } finally {
      setLoading(false);
    }
  };

  // Dark theme styles for react-select dropdown
  const customSelectStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "#2d3748", // Dark background for the input
      borderColor: "#4a5568", // Dark border
      color: "white", // Text color
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: "#2d3748", // Dark background for the dropdown
      color: "white", // Text color
    }),
    option: (styles, { isSelected, isFocused }) => ({
      ...styles,
      backgroundColor: isSelected
        ? "#4a90e2" // Highlight color for selected option
        : isFocused
        ? "#2b6cb0" // Focus color
        : "transparent",
      color: isSelected || isFocused ? "white" : "gray",
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "white", // Text color for selected value
    }),
    placeholder: (styles) => ({
      ...styles,
      color: "gray", // Placeholder text color
    }),
  };

  if (!initialData) {
    return <div>Loading...</div>; // Show loading until the data is fetched
  }

  return (
    <div className="container min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-lg p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Edit Project Client
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium">Client</label>
            <Select
              options={clients.map((client) => ({
                value: client.id,
                label: client.name,
              }))}
              value={selectedClient}
              onChange={handleClientChange}
              styles={customSelectStyles} // Apply custom styles for dark theme
              placeholder="Select a client"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium">Project</label>
            <Select
              options={projects.map((project) => ({
                value: project.id,
                label: project.title,
              }))}
              value={selectedProject}
              onChange={handleProjectChange}
              styles={customSelectStyles} // Apply custom styles for dark theme
              placeholder="Select a project"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Project Client"}
          </button>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default EditProjectClientForm;
