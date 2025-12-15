// NewsFilters.jsx
import React from "react";

const NewsFilters = () => {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm flex flex-col md:flex-row gap-4">

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search articles..."
        className="flex-1 border rounded-md px-4 py-2"
      />

      {/* Category */}
      <select className="border rounded-md px-4 py-2">
        <option>All Categories</option>
        <option>Policy Updates</option>
        <option>Hiring News</option>
        <option>Benefits</option>
      </select>

      {/* Department */}
      <select className="border rounded-md px-4 py-2">
        <option>All Departments</option>
        <option>Department of State</option>
        <option>Homeland Security</option>
        <option>Health Department</option>
      </select>

      <button className="bg-blue-600 text-white px-6 py-2 rounded-md">
        Filter
      </button>
    </div>
  );
};

export default NewsFilters;
