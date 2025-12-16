
import React, { useState, useEffect } from "react";
import axios from "axios";

const Stats = () => {
  const [jobCount, setJobCount] = useState(0);

  useEffect(() => {
    const fetchJobCount = async () => {
      try {
        const response = await axios.get('https://jobwebserver.onrender.com/api/jobs');
        const jobs = response.data.data?.jobs || [];
        setJobCount(jobs.length);
      } catch (error) {
        console.error('Error fetching job count:', error);
      }
    };

    fetchJobCount();
  }, []);

  const stats = [
    { number: jobCount.toString(), label: "Active Job Listings" },
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
