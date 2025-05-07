"use client";
import React, { useEffect, useState } from "react";
import Table from "@/components/Table/Table";
import { getTechnology, deleteTechnology } from "@/app/api/Techonology";
import { FaPen, FaTrash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const [technologies, setTechnologies] = useState([]);
  const [columns, setColumns] = useState([]);

  const router = useRouter();

  const fetchTechnologies = async () => {
    try {
      const technologies = await getTechnology();

      // Define table columns with actions
      const columns = [
        {
          key: "svg",
          header: "Icon",
          render: (svg) => <span dangerouslySetInnerHTML={{ __html: svg }} />,
        },
        { key: "name", header: "Name" },
        { key: "description", header: "Description" },
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

      setTechnologies(technologies);
      setColumns(columns);
    } catch (error) {
      console.error("Error fetching Technologies:", error);
    }
  };

  const handleEdit = (row) => {
    router.push(`/admin/technology/${row}`);
  };

  const handleDelete = async (row) => {
    const deleteTech = await deleteTechnology(row);
    setTechnologies((prevTechs) => prevTechs.filter((tech) => tech.id !== row));
    toast.success(deleteTech);
  };

  useEffect(() => {
    fetchTechnologies();
  }, []);

  return (
    <div className="p-6 mx-auto w-3/4">
      <Table heading="Technology" columns={columns} data={technologies} />
      <Toaster />
    </div>
  );
};

export default Page;
