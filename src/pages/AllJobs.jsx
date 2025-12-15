import React, { useState, useEffect } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";
import SocialJoinBox from "../components/SocialJoinBox";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const params = {
          page: currentPage,
          limit: 10
        };

        if (filter) params.category = filter;

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("title")) params.title = urlParams.get("title");
        if (urlParams.get("state")) params.state = urlParams.get("state");
        if (urlParams.get("category")) params.category = urlParams.get("category");

        const response = await axios.get(
          "http://localhost:8080/api/jobs",
          { params }
        );

        const jobsData = Array.isArray(response.data.data?.jobs)
          ? response.data.data.jobs
          : [];

        setJobs(jobsData);
        setTotalPages(response.data.totalPages || 1);
        setTotalJobs(response.data.totalJobs || 0);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [currentPage, filter]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setLoading(true);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
    setLoading(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading jobs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-3">

          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              All Government Jobs
            </h1>
            <p className="text-gray-600">
              Browse all available government job opportunities
            </p>
          </div>

          {/* FILTER */}
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <select
              value={filter}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              <option value="Central Govt">Central Government</option>
              <option value="State Govt">State Government</option>
              <option value="Banking">Banking</option>
              <option value="Railway">Railway</option>
              <option value="Defence">Defence</option>
            </select>

            <p className="text-gray-600 text-sm">
              Showing {jobs.length} of {totalJobs} jobs
            </p>
          </div>

          {/* JOBS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>

          {jobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No jobs found for the selected category.
              </p>
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border rounded-md disabled:opacity-50"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 border rounded-md ${
                        currentPage === page
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-4 lg:sticky lg:top-70 h-fit">
          <SocialJoinBox />

          {/* <div className="bg-yellow-50 p-4 rounded text-xs text-gray-700 border border-yellow-200">
            <strong>Disclaimer:</strong>  
            This website is not affiliated with any government organization.
            Always verify details from the official notification.
          </div> */}
        </div>

      </div>
    </div>
  );
};

export default AllJobs;
