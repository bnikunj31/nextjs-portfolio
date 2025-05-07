"use client";
import React, { useEffect, useState } from "react";
import Table from "@/components/Table/Table";
import { getWorks, deleteWork } from "@/app/api/Work"; // Assuming you have an API function to fetch ProjectClients
import { FaPen, FaTrash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const [projectClients, setProjectClients] = useState([]);
  const [columns, setColumns] = useState([]);

  const router = useRouter();

  const fetchProjectClients = async () => {
    try {
      // Fetch data using your API
      const projectClientsData = await getWorks();

      // Define table columns with actions
      const columns = [
        {
          key: "client",
          header: "Client",
          render: (row) => (
            <div>
              <p>{row.name}</p>
            </div>
          ),
        },
        {
          key: "project",
          header: "Project",
          render: (row) => (
            <div>
              <p>{row.title}</p>
            </div>
          ),
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

      setProjectClients(projectClientsData);
      setColumns(columns);
    } catch (error) {
      console.error("Error fetching project clients:", error);
    }
  };

  const handleEdit = (id) => {
    router.push(`/admin/client-project/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteWork(id); // Assuming you have a delete function
      setProjectClients((prev) =>
        prev.filter((projectClient) => projectClient.id !== id)
      );
      toast.success("ProjectClient deleted successfully");
    } catch (error) {
      toast.error("Failed to delete ProjectClient");
    }
  };

  useEffect(() => {
    fetchProjectClients();
  }, []);

  return (
    <div className="p-6 mx-auto w-3/4">
      <Table heading="Client-Project" columns={columns} data={projectClients} />
      <Toaster />
    </div>
  );
};

export default Page;
