
import React from "react";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    window.open(`/job/${job._id}`, '_blank');
  };

  return (
    <div className="border rounded-xl p-4 lg:p-6 bg-white shadow-sm flex flex-col gap-3 cursor-pointer hover:shadow-md transition-shadow" onClick={handleViewDetails}>
      
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg text-lg lg:text-xl flex-shrink-0">
          🏛️
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-base lg:text-lg font-semibold truncate">{job.title}</h3>
          <p className="text-gray-500 text-sm truncate">{job.department}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 lg:gap-4 text-xs lg:text-sm text-gray-600 mt-2">
        <span>📂 {job.category}</span>
        <span>👥 {job.totalVacancies} vacancies</span>
        <span>💰 {job.salary?.min && job.salary?.max ? `₹${job.salary.min} - ₹${job.salary.max}` : 'As per rules'}</span>
        <span>📅 {job.applicationMode}</span>
      </div>

      <p className="text-gray-600 text-sm mt-1 line-clamp-2">
        {job.description || `Qualification: ${job.qualification}`}
      </p>

      <div className="flex flex-col sm:flex-row gap-2 mt-3">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            window.open(job.applyLink, '_blank');
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
        >
          Apply Now
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleViewDetails();
          }}
          className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm hover:bg-blue-50"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
