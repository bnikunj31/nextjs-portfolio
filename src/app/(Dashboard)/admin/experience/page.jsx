"use client";
import React, { useEffect, useState } from "react";
import Table from "@/components/Table/Table";
import { getExperience, deleteExperience } from "@/app/api/Experience";
import { FaPen, FaTrash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const [experiences, setExperiences] = useState([]);
  const [columns, setColumns] = useState([]);

  const router = useRouter();

  const fetchExperience = async () => {
    try {
      const experienceData = await getExperience();

      // Define table columns with actions
      const columns = [
        { key: "company_name", header: "Company Name" },
        { key: "role", header: "Role" },
        { key: "joining_date", header: "Joining Date" },
        { key: "ending_date", header: "Ending Date" },
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

      setExperiences(experienceData);
      setColumns(columns);
    } catch (error) {
      console.error("Error fetching experience:", error);
    }
  };

  const handleEdit = (id) => {
    router.push(`/admin/experience/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteExperience(id);
      setExperiences((prevExperiences) =>
        prevExperiences.filter((experience) => experience.id !== id)
      );
      toast.success("Experience deleted successfully!");
    } catch (error) {
      console.error("Error deleting experience:", error);
      toast.error("Failed to delete experience.");
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  return (
    <div className="p-6 mx-auto w-3/4">
      <Table heading="Experience" columns={columns} data={experiences} />
      <Toaster />
    </div>
  );
};

export default Page;
