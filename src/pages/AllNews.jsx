import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from '../components/NewsCard';

const AllNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
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
        
        const response = await axios.get('http://localhost:8080/api/news', { params });
        const newsData = Array.isArray(response.data.data?.news) ? response.data.data.news : [];
        setNews(newsData);
        setTotalPages(response.data.totalPages || 1);
        setTotalNews(response.data.totalNews || 0);
      } catch (error) {
        console.error('Error fetching news:', error);
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
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Government News</h1>
          <p className="text-gray-600">Stay updated with the latest government news and notifications</p>
        </div>

        {/* Filter */}
        <div className="mb-6 flex justify-between items-center">
          <select
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map(article => (
            <NewsCard
              key={article._id}
              newsId={article._id}
              date={new Date(article.publishDate).toLocaleDateString()}
              title={article.title}
              description={article.shortDescription}
            />
          ))}
        </div>

        {news.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No news found for the selected type.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
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
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllNews;