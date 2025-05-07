"use client";
import React, { useEffect, useState } from "react";
import Table from "@/components/Table/Table";
import { getProjects, deleteProject } from "@/app/api/Project";
import { FaPen, FaTrash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const [projects, setProjects] = useState([]);
  const [columns, setColumns] = useState([]);

  const router = useRouter();

  const fetchProjects = async () => {
    try {
      const projects = await getProjects();

      // Define table columns with actions
      const columns = [
        {
          key: "title",
          header: "Title",
        },

        {
          key: "technologies",
          header: "Technologies",
        },
        {
          key: "team",
          header: "Team",
          render: (team) => team.join(", "),
        },
        {
          key: "action",
          header: "Actions",
          render: (_, row) => (
            <div className="flex items-center space-x-2">
              {/* Edit Button */}
              <button
                className="p-2 text-blue-500 hover:bg-blue-100 rounded"
                onClick={() => handleEdit(row.id)}
              >
                <FaPen size={18} />
              </button>

              {/* Delete Button */}
              <button
                className="p-2 text-red-500 hover:bg-red-100 rounded"
                onClick={() => handleDelete(row.id)}
              >
                <FaTrash size={18} />
              </button>
            </div>
          ),
        },
      ];

      setProjects(projects);
      setColumns(columns);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleEdit = (id) => {
    router.push(`/admin/projects/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteProject(id);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== id)
      );
      toast.success(response);
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete the project.");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-6 mx-auto w-3/4">
      <Table heading="Projects" columns={columns} data={projects} />
      <Toaster />
    </div>
  );
};

export default Page;
