import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const { admin, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [news, setNews] = useState([]);
  const [activeTab, setActiveTab] = useState('jobs');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalNews, setTotalNews] = useState(0);

  useEffect(() => {
    if (authLoading) return; // Wait for auth to load

    if (!admin) {
      navigate('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [jobsResponse, newsResponse] = await Promise.all([
          axios.get(`https://jobwebserver.onrender.com/api/jobs?page=${currentPage}&limit=10`),
          axios.get('https://jobwebserver.onrender.com/api/news').catch(() => ({ data: [] }))
        ]);
        setJobs(Array.isArray(jobsResponse.data.data?.jobs) ? jobsResponse.data.data.jobs : []);
        setTotalPages(jobsResponse.data.totalPages || 1);
        setTotalJobs(jobsResponse.data.totalJobs || 0);
        const newsData = Array.isArray(newsResponse.data.data?.news) ? newsResponse.data.data.news : [];
        setNews(newsData);
        setTotalNews(newsResponse.data.totalNews || newsData.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [admin, navigate, authLoading, currentPage]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await axios.delete(`https://jobwebserver.onrender.com/api/jobs/${jobId}`);
        setJobs(jobs.filter(job => job._id !== jobId));
        setTotalJobs(totalJobs - 1);
      } catch (error) {
        console.error('Error deleting job:', error);
        alert('Error deleting job');
      }
    }
  };

  const handleDeleteNews = async (newsId) => {
    if (window.confirm('Are you sure you want to delete this news?')) {
      try {
        await axios.delete(`https://jobwebserver.onrender.com/api/news/${newsId}`);
        setNews(news.filter(article => article._id !== newsId));
        setTotalNews(totalNews - 1);
      } catch (error) {
        console.error('Error deleting news:', error);
        alert('Error deleting news');
      }
    }
  };

  const handleEditJob = (jobId) => {
    navigate(`/admin/edit-job/${jobId}`);
  };

  const handleEditNews = (newsId) => {
    navigate(`/admin/edit-news/${newsId}`);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!admin) return null;

  const renderJobsContent = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Jobs</h3>
          <p className="text-3xl font-bold text-blue-600">{totalJobs}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Active Jobs</h3>
          <p className="text-3xl font-bold text-green-600">
            {jobs.filter(job => job.status === 'Active').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Expired Jobs</h3>
          <p className="text-3xl font-bold text-red-600">
            {jobs.filter(job => job.status === 'Expired').length}
          </p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 lg:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h3 className="text-lg font-medium text-gray-900">All Jobs</h3>
          <button
            onClick={() => navigate('/admin/create-job')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm w-full sm:w-auto"
          >
            Add New Job
          </button>
        </div>
        <div className="overflow-x-auto -mx-4 lg:mx-0">
          {loading ? (
            <div className="p-6 text-center">Loading jobs...</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Department</th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Category</th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vacancies</th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {jobs.map((job) => (
                  <tr key={job._id}>
                    <td className="px-3 lg:px-6 py-4 text-sm font-medium text-gray-900">
                      <div className="truncate max-w-32 lg:max-w-none">{job.title}</div>
                    </td>
                    <td className="px-3 lg:px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">
                      <div className="truncate max-w-24">{job.department}</div>
                    </td>
                    <td className="px-3 lg:px-6 py-4 text-sm text-gray-500 hidden md:table-cell">
                      {job.category}
                    </td>
                    <td className="px-3 lg:px-6 py-4 text-sm text-gray-500">
                      {job.totalVacancies}
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${job.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                        }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-3 lg:px-6 py-4 text-xs font-medium">
                      <div className="flex flex-col lg:flex-row gap-1 lg:gap-3">
                        <button
                          onClick={() => handleEditJob(job._id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 px-6 pb-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded text-sm ${currentPage === page
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );

  const renderNewsContent = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total News</h3>
          <p className="text-3xl font-bold text-blue-600">{totalNews}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Published Today</h3>
          <p className="text-3xl font-bold text-green-600">0</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 lg:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h3 className="text-lg font-medium text-gray-900">All News</h3>
          <button
            onClick={() => navigate('/admin/create-news')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm w-full sm:w-auto"
          >
            Add New Article
          </button>
        </div>
        <div className="p-4 lg:p-6 max-w-full">
          {news.length === 0 ? (
            <div className="text-center text-gray-500">No news articles found</div>
          ) : (
            <div className="space-y-4 max-w-full">
              {news.map((article) => (
                <div key={article._id} className="border-b pb-4 last:border-b-0">
                  <h4 className="font-medium text-gray-900 text-sm lg:text-base truncate pr-2">{article.title}</h4>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2 break-words">{article.shortDescription}</p>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 gap-2">
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {new Date(article.publishDate).toLocaleDateString()}
                    </span>
                    <div className="flex gap-3 flex-shrink-0">
                      <button
                        onClick={() => handleEditNews(article._id)}
                        className="text-blue-600 hover:text-blue-900 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteNews(article._id)}
                        className="text-red-600 hover:text-red-900 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow">
        <div className="px-4 py-3 flex justify-between items-center">
          <h1 className="text-lg font-bold text-gray-800">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
          >
            Logout
          </button>
        </div>
        {/* Mobile Tab Buttons */}
        <div className="flex border-t">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'jobs'
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
                : 'text-gray-600 hover:bg-gray-50'
              }`}
          >
            📋 Jobs
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'news'
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
                : 'text-gray-600 hover:bg-gray-50'
              }`}
          >
            📰 News
          </button>
        </div>
      </div>

      <div className="lg:flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 bg-white shadow-lg">
          <div className="p-6">
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          </div>
          <nav className="mt-6">
            <button
              onClick={() => navigate('/')}
              className={`w-full text-left px-6 py-3 text-sm font-medium transition-colors ${activeTab === ''
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              Go to Home 🏠
            </button>

            <button
              onClick={() => setActiveTab('jobs')}
              className={`w-full text-left px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'jobs'
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              📋 Jobs Management
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`w-full text-left px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'news'
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              📰 News Management
            </button>

          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Desktop Top Navigation */}
          <nav className="hidden lg:block bg-white shadow">
            <div className="px-6">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <h2 className="text-lg font-semibold capitalize">
                    {activeTab} Management
                  </h2>
                </div>
                <div className="flex items-center">
                  <span className="mr-4 text-gray-700">Welcome, Admin</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* Content Area */}
          <div className="p-4 lg:p-6">
            {activeTab === 'jobs' ? renderJobsContent() : renderNewsContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;