import React, { useState, useEffect } from "react";
import { useInView, InView } from "react-intersection-observer";
import CountUp from "react-countup";
import { clientCount, projectCount } from "@/app/api/Stats";

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [projectCounter, setProjectCount] = useState(1);
  const [clientCounter, setClientCount] = useState(1);
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const startYear = 2022;
  const currentYear = new Date().getFullYear();
  const years = currentYear - startYear;

  const fetchClientCount = async () => {
    try {
      const count = await clientCount();
      setClientCount(count);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    fetchClientCount();
  }, []);

  const fetchProjectCount = async () => {
    try {
      const count = await projectCount();
      setProjectCount(count);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    fetchProjectCount();
  }, []);

  // Array of counter data
  const stats = [
    {
      value: clientCounter,
      suffix: "",
      label: "Happy Clients",
    },
    {
      value: projectCounter,
      suffix: "",
      label: "Projects Done",
    },
    {
      value: years,
      suffix: "+",
      label: "Years Experience",
    },
  ];

  return (
    <div className="w-full py-20">
      <div className="relative flex items-center justify-center w-2/3 md:w-2/4 lg:w-auto mx-auto">
        {/* Left Circle Image */}
        <InView
          triggerOnce={true}
          onChange={(inView) => setIsVisible(inView)}
          threshold={0.5}
        >
          {({ inView, ref }) => (
            <div
              className={`absolute left-0 -bottom-12 lg:-bottom-14 -z-50 transition-all duration-1000 transform ${
                inView
                  ? "opacity-100 translate-x-52 md:-translate-x-14 lg:translate-x-5 xl:translate-x-56"
                  : "opacity-0 -translate-x-10"
              }`}
              ref={ref}
            >
              <img
                loading="lazy"
                decoding="async"
                width="130"
                height="131"
                src="https://kitpapa.net/freelancer/wp-content/uploads/2023/11/yellow-circle.png"
                alt="yellow circle"
              />
            </div>
          )}
        </InView>

        <div className="flex flex-wrap lg:flex-nowrap z-50 md:space-x-0 md:mx-auto gap-8">
          {/* Render counters dynamically */}
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`w-full text-center py-28 px-14 text-[#6ceead] ${
                index === 0
                  ? "rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none "
                  : ""
              } ${
                index === 2
                  ? "lg:rounded-r-3xl lg:rounded-bl-none rounded-b-3xl"
                  : ""
              } bg-[#25262A]`}
            >
              <div className="flex justify-center items-center text-6xl font-semibold">
                <CountUp
                  start={0}
                  end={stat.value}
                  duration={3}
                  separator=" "
                  decimal=","
                ></CountUp>
                {({ countUpRef, start }) => <span ref={countUpRef} />}
                {stat.suffix && (
                  <span className="text-6xl pb-2">{stat.suffix}</span>
                )}
              </div>
              <div className="text-2xl mt-2 font-semibold text-white">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Right Circle Image */}
        <InView
          triggerOnce={true}
          onChange={(inView) => setIsVisible(inView)}
          threshold={0.5}
        >
          {({ inView, ref }) => (
            <div
              className={` absolute right-0 -top-12 lg:-top-16 transition-all duration-1000 transform  ${
                inView
                  ? "opacity-100 -translate-x-40 md:translate-x-14 lg:-translate-x-5 xl:-translate-x-56"
                  : "opacity-0 -translate-x-0"
              }`}
              ref={ref}
            >
              <img
                loading="lazy"
                decoding="async"
                className="w-[128] h-[128] lg:w-[110] lg:h-[110]"
                src="https://kitpapa.net/freelancer/wp-content/uploads/2023/11/yellow-circle-round.png"
                alt="yellow circle round"
              />
            </div>
          )}
        </InView>
      </div>
    </div>
  );
};

export default StatsSection;
