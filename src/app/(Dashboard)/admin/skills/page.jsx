"use client";
import React, { useEffect, useState } from "react";
import Table from "@/components/Table/Table";
import { getSkills, deleteSkill } from "@/app/api/Skill";
import { FaPen, FaTrash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const [skills, setSkills] = useState([]);
  const [columns, setColumns] = useState([]);

  const router = useRouter();

  const fetchSkills = async () => {
    try {
      const skills = await getSkills();

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

      setSkills(skills);
      setColumns(columns);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const handleEdit = (row) => {
    router.push(`/admin/skills/${row}`);
  };

  const handleDelete = async (row) => {
    const deleteSkills = await deleteSkill(row);
    setSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== id));
    toast.success(deleteSkills);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div className="p-6 mx-auto w-3/4">
      <Table heading="Skills" columns={columns} data={skills} />
      <Toaster />
    </div>
  );
};

export default Page;
