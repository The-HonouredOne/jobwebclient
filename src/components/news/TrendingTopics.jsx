// TrendingTopics.jsx
import React from "react";

const topics = [
  { id: 1, label: "Federal Hiring Reform" },
  { id: 2, label: "Remote Work Policy" },
  { id: 3, label: "Cybersecurity Training" },
  { id: 4, label: "Benefits Enhancement" },
  { id: 5, label: "Diversity Initiative" },
];

const TrendingTopics = () => {
  return (
    <div className="border rounded-xl p-5 bg-white shadow-sm">
      <h3 className="font-semibold mb-4">Trending Topics</h3>

      {topics.map((t) => (
        <div key={t.id} className="flex items-center gap-2 mb-3">
          <span className="text-white bg-blue-600 w-6 h-6 flex items-center justify-center rounded-md text-xs">
            {t.id}
          </span>
          <p className="text-gray-700">{t.label}</p>
        </div>
      ))}
    </div>
  );
};

export default TrendingTopics;
