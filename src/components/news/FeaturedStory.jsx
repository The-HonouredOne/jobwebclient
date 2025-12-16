import React, { useState, useEffect } from "react";
import axios from "axios";

const FeaturedStory = () => {
  const [featuredNews, setFeaturedNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedNews = async () => {
      try {
        const response = await axios.get('https://jobwebserver.onrender.com/api/news');
        const newsData = response.data.data?.news || [];
        if (newsData.length > 0) {
          setFeaturedNews(newsData[0]); // Get the latest news as featured
        }
      } catch (error) {
        console.error('Error fetching featured news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedNews();
  }, []);

  if (loading) {
    return (
      <div className="border rounded-xl bg-white shadow-sm p-6">
        <div className="text-center">Loading featured story...</div>
      </div>
    );
  }

  if (!featuredNews) {
    return (
      <div className="border rounded-xl bg-white shadow-sm p-6">
        <div className="text-center text-gray-500">No featured story available</div>
      </div>
    );
  }

  return (
    <div className="border rounded-xl bg-white shadow-sm p-6">
      {/* Tags */}
      <div className="flex gap-2 mb-3">
        <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-md">
          {featuredNews.type}
        </span>
        <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-md">
          {featuredNews.status}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-xl lg:text-2xl font-semibold mb-3">
        {featuredNews.title}
      </h2>

      {/* Description */}
      <p className="text-gray-600 mb-4">
        {featuredNews.shortDescription}
      </p>

      {/* Meta Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-3">
        <div>
          <p className="font-medium text-sm">{featuredNews.department}</p>
          <p className="text-gray-500 text-sm">
            {new Date(featuredNews.publishDate).toLocaleDateString()}
          </p>
        </div>

        <a 
          href={featuredNews.officialLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
        >
          Read More →
        </a>
      </div>
    </div>
  );
};

export default FeaturedStory;
