import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import SocialJoinBox from "../components/SocialJoinBox";

const AllNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalNews, setTotalNews] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const params = {
          page: currentPage,
          limit: 10
        };
        if (filter) params.type = filter;

        const response = await axios.get(
          "https://jobwebserver.onrender.com/api/news",
          { params }
        );

        const newsData = Array.isArray(response.data.data?.news)
          ? response.data.data.news
          : [];

        setNews(newsData);
        setTotalPages(response.data.totalPages || 1);
        setTotalNews(response.data.totalNews || 0);
      } catch (error) {
        console.error("Error fetching news:", error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
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
        <div className="text-xl">Loading news...</div>
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
              All Government News
            </h1>
            <p className="text-gray-600">
              Stay updated with the latest government news and notifications
            </p>
          </div>

          {/* FILTER */}
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <select
              value={filter}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              <option value="Notification">Notification</option>
              <option value="Admit Card">Admit Card</option>
              <option value="Result">Result</option>
              <option value="Exam Date">Exam Date</option>
              <option value="Answer Key">Answer Key</option>
              <option value="Application Update">Application Update</option>
            </select>

            <p className="text-gray-600 text-sm">
              Showing {news.length} of {totalNews} articles
            </p>
          </div>

          {/* NEWS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article) => (
              <NewsCard
                key={article._id}
                newsId={article._id}
                date={new Date(article.publishDate).toLocaleDateString()}
                title={article.title}
                description={article.shortDescription}
              />
            ))}
          </div>

          {news.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No news found for the selected type.
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
            News is published for informational purposes only.
          </div> */}
        </div>

      </div>
    </div>
  );
};

export default AllNews;
