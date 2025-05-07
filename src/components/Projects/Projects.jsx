"use client ";
import React, { useState, useEffect } from "react";
import "@/styles/globals.css";
import { getProjects } from "@/app/api/Project";

// Reusable Project Component
const Project = ({ project, isReversed, indexVal }) => {
  return (
    <div
      className={`flex flex-col md:flex-row gap-10 md:gap-40 max-w-5xl w-full mt-28 ${
        isReversed ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Image Section */}
      <div className="flex justify-center md:justify-end w-90 my-auto md:w-[20rem] md:h-[20rem] relative">
        <div className="absolute inset-0 bg-gray-200 rounded-lg animate-spin-slow"></div>
        <img
          className="w-auto   md:w-90   object-fill rounded-lg relative z-10"
          src={project.images}
          alt={project.title}
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:w-2/4 text-white">
        <span className="text-[#5DE3A0]">— Project {indexVal + 1}</span>
        <h1 className="text-2xl md:text-3xl font-bold mb-4">{project.title}</h1>
        {/* <h5 className="text-sm text-gray-500">{project.title}</h5> */}
        <p className="text-sm md:text-base mb-4">
          <strong>Technologies: </strong>
          {project.technologies}
        </p>
        <p className="text-sm md:text-base mb-4">
          <strong>Team Members: </strong>
          {project.team.join(", ")}
        </p>

        <p className="text-sm md:text-base mb-4">{project.description}</p>
      </div>
    </div>
  );
};

const ProjectSection = () => {
  const [project, setProject] = useState([]);

  const fetchProject = async () => {
    try {
      const data = await getProjects();
      setProject(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen px-4 space-y-10">
      {project.map((project, index) => (
        <Project
          key={project.id}
          project={project}
          isReversed={index % 2 !== 0}
          indexVal={index}
        />
      ))}
    </div>
  );
};

export default ProjectSection;
