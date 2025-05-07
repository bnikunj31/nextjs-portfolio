// DynamicTable.jsx
"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

const Table = ({ heading, columns, data, onRowClick }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isEnquiryPage = pathname.includes("/enquiry");
  const handleAdd = (e) => {
    e.preventDefault();
    router.push(`${heading.toLowerCase()}/add`);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl text-white font-bold my-3">{heading}</h1>
        {!isEnquiryPage && (
          <button
            type="button"
            onClick={(e) => handleAdd(e)}
            className="text-white font-semibold border border-white px-4 py-2 rounded-lg hover:bg-[#18191a] focus:outline-none"
          >
            Add {heading}
          </button>
        )}
      </div>
      <table className="min-w-full table-auto border-collapse border border-gray-300 bg-[#37383b]">
        <thead className="bg-[#25262A] text-white">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-2 border border-gray-300 text-left font-semibold"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-[#2D2E32] hover:text-white cursor-pointer"
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-4 py-2 border border-gray-300"
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
