"use client";
import React, { useState, useEffect } from "react";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white text-2xl p-2 rounded-full hover:bg-opacity-75"
        onClick={goToPrevious}
      >
        &lt;
      </button>
      <div
        className="w-full h-full bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      ></div>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white text-2xl p-2 rounded-full hover:bg-opacity-75"
        onClick={goToNext}
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
