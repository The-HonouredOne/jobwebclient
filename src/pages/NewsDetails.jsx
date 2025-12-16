import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SocialJoinBox from "../components/SocialJoinBox";

const NewsDetails = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/news/${id}`
        );
        setNews(res.data.data?.news);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading)
    return <div className="text-center py-16">Loading news...</div>;

  if (!news)
    return <div className="text-center py-16">News not found</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-6">

          {/* HEADER */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {news.image && (
              <div className="w-full h-64 md:h-80">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                  {news.type}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                  {news.status}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {news.title}
              </h1>

              <div className="mt-3 text-sm text-gray-600">
                <p>
                  <strong>Department:</strong> {news.department}
                </p>
                <p>
                  <strong>Published on:</strong>{" "}
                  {new Date(news.publishDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-3">
              News Summary
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              {news.shortDescription}
            </p>
          </div>

          {/* FULL DETAILS */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-3">
              Detailed Information
            </h2>
            <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
              {news.fullContent}
            </div>
          </div>

          {/* OFFICIAL LINK */}
          <div className="bg-white p-6 rounded-lg shadow">
            <a
              href={news.officialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              View Official Notification →
            </a>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-4 lg:sticky lg:top-6 h-fit">

          {/* SOCIAL LINKS */}
          <SocialJoinBox />

          {/* DISCLAIMER */}
          {/* <div className="bg-yellow-50 p-4 rounded text-xs text-gray-700 border border-yellow-200">
            <strong>Disclaimer:</strong>  
            This news is published for informational purposes only.  
            Candidates are advised to verify details from the official website.
          </div> */}

        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
