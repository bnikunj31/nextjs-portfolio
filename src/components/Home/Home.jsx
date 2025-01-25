import React from "react";
import "@/styles/button.css";

const startYear = 2022;
const currentYear = new Date().getFullYear();
const years = currentYear - startYear;

const Home = () => {
  return (
    <>
      {/* Main intro part */}
      <div className=" bg-[#25262A] flex flex-col md:flex-row justify-between items-center h-auto gap-5 p-5 w-screen">
        <div className="text p-4 w-full md:w-3/4 relative">
          <p className="pl-5 ml-5 text-[#a6ffd2]">— Introducing</p>
          <h1
            className="text-white text-4xl pl-3 lg:text-6xl md:text-4xl md:pl-4 font-bold"
            id="introName"
          >
            Hello I'm <span className="text-yellow-400">Nikunj Bansal</span>
          </h1>
          <p className="w-full md:w-5/6 m-5 text-lg text-white">
            Since beginning my journey as a web developer nearby {years} years
            ago, I’ve done remote work for organizations, freelancing, and
            collaborated with talented people to create web applications.
          </p>
          <button className="ml-5 btn-gradient w-1/2">
            <span className="btn-text">Contact Us</span>
          </button>
        </div>

        <div className="image relative w-full md:w-1/2 mt-10 md:mt-0 flex justify-center items-center mb-20 md:mb-0">
          <img
            src="https://kitpapa.net/freelancer/wp-content/uploads/2023/11/green-border-2.png"
            alt="Green Border"
            className="w-full h-auto"
            id="image-bg"
          />
          <img
            src="./DP.png"
            alt="Profile"
            className="absolute top-10 left-1/2 transform -translate-x-1/2 w-auto h-auto md:top-10"
            id="image-dp"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
