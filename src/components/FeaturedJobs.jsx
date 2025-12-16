import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import NewsCard from "./NewsCard";
import axios from "axios";

const FeaturedSection = () => {
  const [jobs, setJobs] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsResponse, newsResponse] = await Promise.all([
          axios.get('https://jobwebserver.onrender.com/api/jobs'),
          axios.get('https://jobwebserver.onrender.com/api/news').catch(() => ({ data: { data: { news: [] } } }))
        ]);
        
        const jobsData = Array.isArray(jobsResponse.data.data?.jobs) ? jobsResponse.data.data.jobs : [];
        const newsData = Array.isArray(newsResponse.data.data?.news) ? newsResponse.data.data.news : [];
        
        setJobs(jobsData.slice(0, 9));
        setNews(newsData.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
        setJobs([]);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto py-12 px-4">
        <div className="text-center">Loading jobs...</div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto py-8 lg:py-12 px-4">

      {/* Title Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <div>
          <h2 className="text-lg lg:text-xl font-semibold">Featured Positions</h2>
          <p className="text-gray-500 text-sm">Latest government job opportunities</p>
        </div>

        <p className="text-gray-500 text-sm">
          Showing 12 of 12,450 jobs
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mt-6">

        {/* Left Column: Featured Jobs */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 lg:gap-6">
            {jobs.map(job => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
          
          {/* View More Jobs Button */}
          {jobs.length >= 9 && (
            <div className="text-center mt-8">
              <a 
                href="/jobs" 
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                View More Jobs →
              </a>
            </div>
          )}
        </div>

        {/* Right Column: Latest News */}
        <div className="space-y-4 lg:space-y-6 mt-8 lg:mt-0">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Latest News</h2>
            <a href="/news" className="text-blue-600 text-sm hover:text-blue-800">View All →</a>
          </div>

          {news.length > 0 ? (
            <>
              {news.map(article => (
                <NewsCard
                  key={article._id}
                  newsId={article._id}
                  date={new Date(article.publishDate).toLocaleDateString()}
                  title={article.title}
                  description={article.shortDescription}
                />
              ))}
              {news.length >= 3 && (
                <div className="text-center mt-6">
                  <a 
                    href="/news" 
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                  >
                    View More News →
                  </a>
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-500 py-8">
              No news articles available
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default FeaturedSection;
