"use client";
import { getExperience } from '@/app/api/Experience';
import React, { useEffect, useState } from 'react';

const ExperienceTimeline = () => {
    const [experiences, setExperiences] = useState([]);

    const fetchExperience = async () => {
        try {
          const experienceData = await getExperience();
    
          setExperiences(experienceData);
        } catch (error) {
          console.error("Error fetching experience:", error);
        }
      };

      useEffect(() => {
        fetchExperience();
      }, []);

 return (
    <div className="text-white p-6 flex flex-col items-center">
      <p className="text-[#5de3a0] mb-10 text-left w-full px-10">— Experience</p>
      <div className="relative w-full max-w-3xl">
        {/* Vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#5de3a0]"></div>

        {/* Timeline items */}
        {experiences.map((exp, idx) => (
          <div key={exp.id} className="relative mb-16 flex justify-between items-center w-full">
            {/* Left content */}
            <div className="w-5/12 text-right pr-6 hidden sm:block">
              <h3 className="text-xl font-semibold">{exp.role}</h3>
              <p className="text-[#5de3a0]">{exp.company_name}</p>
              <p className="text-sm mt-1 text-gray-300">{exp.description}</p>
            </div>

            {/* Middle dot with year */}
            <div className="z-10 flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-[#5de3a0] border-4 border-[#196d43]"></div>
              <span className="mt-2 text-sm text-gray-400 whitespace-nowrap">
                {`${String(new Date(exp.joining_date).getMonth() + 1).padStart(2, '0')}-${new Date(exp.joining_date).getFullYear()}`} – {exp.ending_date ? `${String(new Date(exp.ending_date).getMonth() + 1).padStart(2, '0')}-${new Date(exp.ending_date).getFullYear()}` : 'Present'}
              </span>
            </div>

            {/* Right content (for mobile or alternate layout) */}
            <div className="w-5/12 text-left pl-6 sm:hidden">
              <h3 className="text-lg font-semibold">{exp.role}</h3>
              <p className="text-[#5de3a0]">{exp.company_name}</p>
              <p className="text-sm mt-1 text-gray-300">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;
