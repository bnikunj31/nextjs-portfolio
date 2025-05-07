"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { login } from "@/app/api/Auth.js";
const Cookies = require("js-cookie");

const LoginPage = () => {
  const [formData, setFormData] = useState({
    entity: "",
    password: "",
  });
  const router = useRouter();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData);
      const token = data.token;
      Cookies.set("token", token, { expires: 7, secure: true });
      toast.success(data.message);
      if (data.data.role === "admin") {
        router.push("/admin");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to login");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#161618] p-8 rounded-lg shadow-2xl w-96">
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="entity"
              value={formData.nameOrEmailPhone}
              onChange={handleChange}
              placeholder="Enter name, email or phone"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6 relative">
            <input
              type={passwordVisible ? "text" : "password"} // Toggle between text and password
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <span
              onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {passwordVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12m0 3a3 3 0 1 0 0-6 3 3 0 1 0 0 6Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 6.93 5 10.5 5c2.664 0 4.833 1.25 6.243 3.164A5.502 5.502 0 0 1 21.5 12c-1.285 3.057-4.093 5-7.5 5a7.45 7.45 0 0 1-4.242-1.736A6.042 6.042 0 0 1 10.5 17c-2.66 0-4.837-1.262-6.243-3.164A5.502 5.502 0 0 1 2.458 12z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 6.93 5 10.5 5c2.664 0 4.833 1.25 6.243 3.164A5.502 5.502 0 0 1 21.5 12c-1.285 3.057-4.093 5-7.5 5a7.45 7.45 0 0 1-4.242-1.736A6.042 6.042 0 0 1 10.5 17c-2.66 0-4.837-1.262-6.243-3.164A5.502 5.502 0 0 1 2.458 12z"
                  />
                </svg>
              )}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default LoginPage;
