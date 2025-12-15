import React from "react";
import { useNavigate } from "react-router-dom";

const NewsCard = ({ date, title, description, newsId }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    if (newsId) {
      navigate(`/news/${newsId}`);
    }
  };

  return (
    <div className="border rounded-xl p-5 bg-white shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={handleReadMore}>
      
      <p className="text-gray-500 text-sm flex items-center gap-2">
        📅 {date}
      </p>

      <h3 className="font-semibold text-lg mt-2">{title}</h3>

      <p className="text-gray-600 text-sm mt-2">{description}</p>

      <button 
        onClick={(e) => {
          e.stopPropagation();
          handleReadMore();
        }}
        className="text-blue-600 mt-3 text-sm hover:text-blue-800 transition-colors"
      >
        Read More →
      </button>
    </div>
  );
};

export default NewsCard;
