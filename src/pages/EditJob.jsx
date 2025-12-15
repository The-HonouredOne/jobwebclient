import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditJob = () => {
  const { admin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    category: 'Central Govt',
    qualification: '',
    totalVacancies: '',
    ageLimit: { min: '', max: '' },
    salary: { min: '', max: '' },
    applicationMode: 'Online',
    applicationStartDate: '',
    applicationEndDate: '',
    officialNotificationUrl: '',
    applyLink: '',
    description: ''
  });

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
      return;
    }

    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/jobs/${id}`);
        const job = response.data.data?.job;
        if (job) {
          setFormData({
            title: job.title || '',
            department: job.department || '',
            category: job.category || 'Central Govt',
            qualification: job.qualification || '',
            totalVacancies: job.totalVacancies || '',
            ageLimit: job.ageLimit || { min: '', max: '' },
            salary: job.salary || { min: '', max: '' },
            applicationMode: job.applicationMode || 'Online',
            applicationStartDate: job.applicationStartDate ? job.applicationStartDate.split('T')[0] : '',
            applicationEndDate: job.applicationEndDate ? job.applicationEndDate.split('T')[0] : '',
            officialNotificationUrl: job.officialNotificationUrl || '',
            applyLink: job.applyLink || '',
            description: job.description || ''
          });
        }
      } catch (error) {
        console.error('Error fetching job:', error);
        alert('Error loading job data');
      }
    };

    fetchJob();
  }, [admin, navigate, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('ageLimit.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        ageLimit: { ...prev.ageLimit, [field]: value }
      }));
    } else if (name.includes('salary.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        salary: { ...prev.salary, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`http://localhost:8080/api/jobs/${id}`, formData);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error updating job:', error);
      alert('Error updating job');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-4 lg:py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Edit Job</h1>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back to Dashboard
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <input
                  type="text"
                  name="department"
                  required
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Central Govt">Central Govt</option>
                  <option value="State Govt">State Govt</option>
                  <option value="Banking">Banking</option>
                  <option value="Railway">Railway</option>
                  <option value="Defence">Defence</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Vacancies</label>
                <input
                  type="number"
                  name="totalVacancies"
                  required
                  value={formData.totalVacancies}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  required
                  value={formData.qualification}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Application Mode</label>
                <select
                  name="applicationMode"
                  value={formData.applicationMode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                onClick={() => navigate('/admin/dashboard')}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Job'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditJob;