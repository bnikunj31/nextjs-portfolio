"use client";
import React, { useState } from "react";
import "@/styles/button.css";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact-us" },
];
const buttonText = "Download CV";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="flex items-center justify-between p-4 bg-[#25262A] text-white relative top-0 z-50">
        {/* Logo */}
        <div className="logo flex items-center">
          <img src="./logo.svg" alt="MyLogo" className="h-8 w-auto" />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex links px-5">
          <ul className="flex items-center justify-between">
            {navLinks.map((link, index) => (
              <li
                key={index}
                className="px-5 mx-5 hover:underline text-white text-lg"
              >
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Download CV Button for Desktop */}
        <div className="hidden md:block btn">
          <a href="/NikunjBansal_CV.pdf" download>
            <button className="btn-gradient">
              <span className="btn-text text-black font-medium">
                {buttonText}
              </span>
            </button>
          </a>
        </div>

        {/* Toggle Button for Mobile */}
        <button
          className="md:hidden p-2 focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu with Animation */}
      <div
        className={`md:hidden bg-gray-800 overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col items-center space-y-4 p-4">
          {navLinks.map((link, index) => (
            <li key={index} className="hover:underline text-white text-lg">
              <a href={link.href}>{link.name}</a>
            </li>
          ))}
          <li>
            <button className="btn-gradient w-full">
              <span className="btn-text">{buttonText}</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
