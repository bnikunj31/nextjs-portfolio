"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { createClient } from "@/app/api/Client";
const ClientForm = () => {
  const [client, setClient] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await createClient(client);
      toast.success("Client created successfully");
      router.push("/admin/clients");
    } catch (error) {
      toast.error("Failed to create client");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-lg p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Create Client</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={client.name}
              onChange={handleChange}
              className="w-full p-3 mt-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter client's name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={client.email}
              onChange={handleChange}
              className="w-full p-3 mt-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter client's email"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={client.phone}
              onChange={handleChange}
              className="w-full p-3 mt-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter client's phone"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Client"}
          </button>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default ClientForm;
