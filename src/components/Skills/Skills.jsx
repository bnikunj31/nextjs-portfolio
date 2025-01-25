import { getSkills } from "@/app/api/Skill";
import React, { useState, useEffect } from "react";
import "@/styles/button.css";
import { Atom } from "react-loading-indicators";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await getSkills();
        setSkills(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Atom color="#5de3a0" size="large" text="Incoming" textColor="" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="skills-main mt-14 flex items-center justify-center gap-5 px-5 flex-col-reverse lg:flex-row ">
      <div className="flex flex-wrap justify-center w-30 text-center mb-3">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="group lg:w-[25vw] md:w-[40vw] w-full m-2 p-4 py-16 text-white flex flex-col justify-between bg-[#25262A] hover:bg-gradient-to-t hover:from-[#2ead6e] hover:via-[#5de3a0] hover:to-[#5de3a0] rounded-3xl 
  shadow-xl transition-shadow duration-300 ease-in-out hover:shadow-[4px_2px_50px_rgba(93,227,160,0.7)] "
          >
            <div
              className="border-[#5de3a0] group-hover:border-white group-hover:border-1 group-hover:bg-gradient-to-b hover:from-[#2ead6e] hover:via-[#5de3a0] hover:to-[#5de3a0] svg-icon mb-4 mx-auto border-2 rounded-full p-6 w-24 h-24 flex items-center justify-center"
              dangerouslySetInnerHTML={{ __html: skill.svg }}
            />

            <div className="flex items-center space-x-4 justify-center">
              <div>
                <h3 className="text-lg font-bold">{skill.name}</h3>
                <p className="text-sm text-wrap">{skill.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Why Hire Me Section */}
      <div className="text-white w-[70vw] lg:p-5 md:p-0">
        <span className="text-[#5de3a0]">— Skills</span>
        <h2 className="text-3xl font-semibold mb-4">
          Why Hire Me For Next Project?
        </h2>
        <ul className="list-inside list-[square] mb-5">
          <li>
            <strong>Expertise & Skills:</strong> Proven experience in building
            web apps, with a strong command of full-stack development.
          </li>
          <li>
            <strong>Proven Track Record:</strong> Successful past projects with
            measurable results.
          </li>
          <li>
            <strong>Creative Problem Solver:</strong> Ability to tackle
            challenges and deliver innovative solutions.
          </li>
          <li>
            <strong>Effective Communication:</strong> Clear, responsive, and
            collaborative throughout the project.
          </li>
          <li>
            <strong>Passion & Dedication:</strong> Enthusiastic and fully
            invested in every project.
          </li>
          <li>
            <strong>Value-Oriented:</strong> Providing high value through
            creativity, cost-efficiency, and excellence.
          </li>
        </ul>

        {/* Download CV Button */}
        <a href="/NikunjBansal_CV.pdf" download>
          <button className="btn-gradient">
            <span className="btn-text text-black">Download CV</span>
          </button>
        </a>
      </div>
    </div>
  );
};

export default Skills;
