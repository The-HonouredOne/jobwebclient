
import React from "react";

const Stats = () => {
  const stats = [
    { number: "12,450", label: "Active Job Listings" },
    { number: "850+", label: "Government Agencies" },
    { number: "50", label: "States & Territories" },
  ];

  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto flex justify-around text-center">
        
        {stats.map((item, index) => (
          <div key={index}>
            <h3 className="text-3xl font-bold text-blue-600">{item.number}</h3>
            <p className="text-gray-600">{item.label}</p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Stats;
