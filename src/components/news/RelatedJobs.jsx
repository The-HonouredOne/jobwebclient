// RelatedJobs.jsx
import React from "react";

const jobs = [
  {
    title: "Policy Analyst",
    dept: "Department of Health",
    location: "Washington, DC",
  },
];

const RelatedJobs = () => {
  return (
    <div className="border rounded-xl p-5 bg-white shadow-sm">
      <h3 className="font-semibold mb-4">Related Job Openings</h3>

      {jobs.map((j, i) => (
        <div key={i} className="mb-4">
          <h4 className="font-medium">{j.title}</h4>
          <p className="text-gray-500 text-sm">{j.dept}</p>
          <p className="text-gray-500 text-sm">{j.location}</p>
        </div>
      ))}
    </div>
  );
};

export default RelatedJobs;
