// Hero.jsx
import React from "react";

const Hero = () => {
  return (
    <section className="text-center py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Find Your Government Career
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-8">
        Search thousands of federal and state government job opportunities.
        Start your public service career today.
      </p>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto bg-white shadow-md border rounded-lg flex items-center p-2">
        
        <input
          type="text"
          placeholder="Job Title or Keywords"
          className="flex-1 px-4 py-2 outline-none"
        />

        <select className="px-3 py-2 bg-white border-l outline-none">
          <option>All States</option>
          <option>California</option>
          <option>Texas</option>
        </select>

        <button className="bg-blue-600 text-white px-6 py-2 rounded-md ml-2">
          Search Jobs
        </button>
      </div>
    </section>
  );
};

export default Hero;
