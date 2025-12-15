// Hero.jsx
import React from "react";
import JobSearch from "./JobSearch";

const Hero = () => {
  return (
    <section className="text-center pt-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Find Your Government Career
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-8">
        Search thousands of federal and state government job opportunities.
        Start your public service career today.
      </p>

      <JobSearch/>


    </section>
  );
};

export default Hero;
