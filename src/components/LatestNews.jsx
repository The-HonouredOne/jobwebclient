
import React from "react";
import NewsCard from "./NewsCard";

const LatestNews = () => {
  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-xl font-semibold mb-4">Latest News</h2>
      <NewsCard />
    </section>
  );
};

export default LatestNews;
