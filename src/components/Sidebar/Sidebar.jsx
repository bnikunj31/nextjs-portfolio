"use client";
import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaUserTie,
  FaProjectDiagram,
  FaEnvelope,
  FaUserSecret,
} from "react-icons/fa";
import { MdOutlineWorkHistory } from "react-icons/md";
import { GiSkills } from "react-icons/gi";
import { GrTechnology } from "react-icons/gr";
import { RiLogoutCircleLine } from "react-icons/ri";
import Cookies from "js-cookie";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    Cookies.remove("token");
    window.location.href = "/";
  };

  return (
    <div
      className={`z-50 fixed top-0 left-0 h-full bg-[#25262A] text-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Close/Open Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-[12px] bg-[#44464b] rounded-full p-2 text-white focus:outline-none"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar Content */}
      <div className="mt-16 flex flex-col items-center space-y-4">
        {isOpen ? (
          <a href="/">
            <img src="/logo.svg" alt="Logo" />
          </a>
        ) : (
          <a href="/">
            <img src="/logo-icon.svg" alt="Logo" />
          </a>
        )}
        <a
          href="/admin/skills"
          className="w-full flex items-center px-4 py-2 hover:bg-[#44464b]"
        >
          <GiSkills className="mr-4" />
          {isOpen && <span>Skills</span>}
        </a>
        <a
          href="/admin/technology"
          className="w-full flex items-center px-4 py-2 hover:bg-[#44464b]"
        >
          <GrTechnology className="mr-4" />
          {isOpen && <span>Technologies</span>}
        </a>
        <a
          href="/admin/experience"
          className="w-full flex items-center px-4 py-2 hover:bg-[#44464b]"
        >
          <FaUserTie className="mr-4" />
          {isOpen && <span>Experience</span>}
        </a>
        <a
          href="/admin/projects"
          className="w-full flex items-center px-4 py-2 hover:bg-[#44464b]"
        >
          <FaProjectDiagram className="mr-4" />
          {isOpen && <span>Projects</span>}
        </a>
        <a
          href="/admin/clients"
          className="w-full flex items-center px-4 py-2 hover:bg-[#44464b]"
        >
          <FaUserSecret className="mr-4" />
          {isOpen && <span>Clients</span>}
        </a>
        <a
          href="/admin/client-project"
          className="w-full flex items-center px-4 py-2 hover:bg-[#44464b]"
        >
          <MdOutlineWorkHistory className="mr-4" />
          {isOpen && <span>Client's Project</span>}
        </a>
        <a
          href="/admin/enquiry"
          className="w-full flex items-center px-4 py-2 hover:bg-[#44464b]"
        >
          <FaEnvelope className="mr-4" />
          {isOpen && <span>Enquries</span>}
        </a>
        <a
          onClick={(e) => handleLogout(e)}
          className="w-full flex items-center px-4 py-2 hover:bg-[#44464b]"
        >
          <RiLogoutCircleLine className="mr-4" />
          {isOpen && <span>Logout</span>}
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
