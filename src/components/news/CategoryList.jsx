// CategoryList.jsx
import React from "react";

const categories = [
  { name: "Policy Updates", count: 24 },
  { name: "Hiring News", count: 18 },
  { name: "Benefits", count: 12 },
  { name: "Training", count: 9 },
  { name: "Events", count: 6 },
];

const CategoryList = () => {
  return (
    <div className="border rounded-xl p-5 bg-white shadow-sm">
      <h3 className="font-semibold mb-4">Categories</h3>

      {categories.map((c) => (
        <div key={c.name} className="flex justify-between mb-3">
          <p>{c.name}</p>
          <span className="text-gray-500">{c.count}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
