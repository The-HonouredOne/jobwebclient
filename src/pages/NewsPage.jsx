// NewsPage.jsx
import React from "react";
import NewsFilters from "../components/news/NewsFilters";
import FeaturedStory from "../components/news/FeaturedStory";
import TrendingTopics from "../components/news/TrendingTopics";
import NewsletterBox from "../components/news/NewsletterBox";
import CategoryList from "../components/news/CategoryList";
import RelatedJobs from "../components/news/RelatedJobs";

const NewsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 mb-4">Home / News</p>

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-2">Government Jobs News</h1>
      <p className="text-gray-600 mb-6">
        Stay updated with the latest news, policy changes, and announcements affecting government employment.
      </p>

      {/* Search Filters */}
      <NewsFilters />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-8">
          <FeaturedStory />
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          <TrendingTopics />
          <NewsletterBox />
          <CategoryList />
          <RelatedJobs />
        </div>

      </div>
    </div>
  );
};

export default NewsPage;
