"use client";
import React, { useEffect, useState } from "react";
import Table from "@/components/Table/Table";
import { getClients, deleteClient } from "@/app/api/Client";
import { FaPen, FaTrash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const [clients, setClients] = useState([]);
  const [columns, setColumns] = useState([]);

  const router = useRouter();

  const fetchClients = async () => {
    try {
      const clients = await getClients();

      // Define table columns with actions
      const columns = [
        { key: "name", header: "Name" },
        { key: "email", header: "Email" },
        { key: "phone", header: "Phone" },
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

      setClients(clients);
      setColumns(columns);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const handleEdit = (id) => {
    router.push(`/admin/clients/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const deleteResponse = await deleteClient(id);
      setClients((prevClients) =>
        prevClients.filter((client) => client.id !== id)
      );
      toast.success(deleteResponse.message || "Client deleted successfully");
    } catch (error) {
      toast.error("Failed to delete client");
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="p-6 mx-auto w-3/4">
      <Table heading="Clients" columns={columns} data={clients} />
      <Toaster />
    </div>
  );
};

export default Page;
