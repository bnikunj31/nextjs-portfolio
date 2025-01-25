"use client";
import React, { useState, useEffect } from "react";
import Table from "@/components/Table/Table";
import Modal from "@/components/Modal/Modal";
import {
  fetchEnquiries,
  deleteEnquiry,
  sendReply,
  markAsRead,
} from "@/app/api/Enquiry";
import { FaPen, FaTrash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  // Fetch Enquiries
  const fetchEnquiry = async () => {
    try {
      const response = await fetchEnquiries();
      toast.success(response.message);
      setEnquiries(response.data);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    }
  };

  // Handle Reply Modal Open
  const handleReply = () => {
    setIsReplyModalOpen(true);
  };

  // Handle Reply Submission
  const handleSendReply = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const reply = {
      reply: formData.get("message"),
    };
    const id = selectedEnquiry.id;
    try {
      const response = await sendReply(id, reply);
      toast.success(response.message);
      setIsReplyModalOpen(false);
    } catch (error) {
      console.error("Error sending reply:", error);
      toast.error("Failed to send reply.");
    }
  };

  // Close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEnquiry(null); // Reset selected enquiry when modal closes
  };

  // Delete Enquiry
  const handleDeleteEnquiry = async (id) => {
    try {
      await deleteEnquiry(id); // Assuming the API responds successfully
      setEnquiries((prev) => prev.filter((enquiry) => enquiry.id !== id)); // Remove from state
      toast.success("Enquiry deleted successfully!");
    } catch (error) {
      console.error("Error deleting enquiry:", error);
      toast.error("Failed to delete enquiry.");
    }
  };
  const handleRead = async (row) => {
    try {
      const id = row.id;
      const newReadStatus = !row.read;
      const response = await markAsRead(id);
      if (response.status === 200) {
        toast.success(response.data.message);
        setEnquiries((prevEnquiries) =>
          prevEnquiries.map((enquiry) =>
            enquiry.id === row.id
              ? { ...enquiry, read: newReadStatus }
              : enquiry
          )
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to perform action");
    }
  };

  useEffect(() => {
    fetchEnquiry();
  }, []);

  return (
    <div className="p-6 mx-auto w-3/4">
      <Table
        heading="Enquiries"
        columns={[
          { key: "name", header: "Name" },
          { key: "email", header: "Email" },
          {
            key: "createdAt",
            header: "Created At",
            render: (createdAt) => new Date(createdAt).toLocaleString(),
          },
          {
            key: "read",
            header: "Read",
            render: (read, row) => (
              <button
                onClick={() => {
                  handleRead(row);
                }}
                className={`px-2 py-1 rounded ${
                  read
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {read ? "Yes" : "No"}
              </button>
            ),
          },
          {
            key: "action",
            header: "Actions",
            render: (_, row) => (
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedEnquiry(row);
                    setIsModalOpen(true);
                  }}
                  className="text-blue-500 hover:bg-blue-100 p-2 rounded"
                >
                  <FaPen size={18} />
                </button>
                <button
                  onClick={() => handleDeleteEnquiry(row.id)} // Use delete handler
                  className="text-red-500 hover:bg-red-100 p-2 rounded"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            ),
          },
        ]}
        data={enquiries}
      />

      {/* Main Modal for Viewing Details */}
      {isModalOpen && selectedEnquiry && (
        <Modal onClose={handleCloseModal}>
          <div className="p-6 bg-gray-900 text-gray-100 rounded-lg">
            {/* Header Section */}
            <div className="border-b border-gray-700 pb-4 mb-4">
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <p className="font-semibold">{selectedEnquiry.name}</p>
                  <span className="text-gray-400">
                    &lt;{selectedEnquiry.email}&gt;
                  </span>
                </div>
                <div>
                  <button
                    onClick={handleReply} // Open Reply Modal
                    className="text-gray-400 hover:text-gray-200 px-3 py-1 rounded"
                    title="Reply"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="mb-4">
              <p>
                <strong className="text-gray-400">From:</strong>{" "}
                <span>{selectedEnquiry.email}</span>
              </p>
              <p>
                <strong className="text-gray-400">Date:</strong>{" "}
                {new Date(selectedEnquiry.createdAt).toLocaleString()}
              </p>
            </div>

            {/* Body Section */}
            <div className="border-t border-gray-700 pt-4 max-h-80 overflow-y-auto">
              <h1>
                <strong className="text-gray-400">Message:</strong>{" "}
              </h1>
              <p className="whitespace-pre-line text-gray-300">
                {selectedEnquiry.message || "No message provided."}
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* Reply Modal */}
      {isReplyModalOpen && (
        <Modal onClose={() => setIsReplyModalOpen(false)}>
          <form
            onSubmit={handleSendReply}
            className="p-6 bg-gray-900 text-gray-100 rounded-lg"
          >
            <h2 className="text-2xl font-bold mb-4">
              Reply to {selectedEnquiry.email}
            </h2>
            <div className="mb-4">
              <label className="block text-gray-400 mb-1">To</label>
              <input
                type="text"
                value={selectedEnquiry.email}
                readOnly
                className="w-full bg-gray-800 text-gray-200 px-3 py-2 rounded border border-gray-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-1">Message</label>
              <textarea
                name="message"
                rows="5"
                placeholder="Write your reply..."
                className="w-full bg-gray-800 text-gray-200 px-3 py-2 rounded border border-gray-700"
                required
              ></textarea>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsReplyModalOpen(false)}
                className="px-4 py-2 bg-gray-700 text-gray-200 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </form>
        </Modal>
      )}

      <Toaster />
    </div>
  );
};

export default Page;
