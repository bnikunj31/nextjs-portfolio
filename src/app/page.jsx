"use client";
import React from "react";
import Home from "@/components/Home/Home";
import Skill from "@/components/Skills/Skills";
import Projects from "@/components/Projects/Projects";
import Stats from "@/components/StatsSection/StatsSection";

const Page = () => {
  return (
    <>
      <div className="overflow-x-hidden">
        {/* Main intro Section */}
        <Home />
        {/* Skills Section */}
        <Skill />
        {/* Projects Section */}
        <Projects />
        {/* Stats Section */}
        <Stats />
      </div>
    </>
  );
};

export default Page;
