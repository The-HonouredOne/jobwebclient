// NewsletterBox.jsx
import React from "react";

const NewsletterBox = () => {
  return (
    <div className="bg-blue-600 text-white p-5 rounded-xl shadow-sm">
      <h3 className="font-semibold text-lg mb-2">Stay Informed</h3>
      <p className="text-sm mb-4">
        Get the latest government job news delivered to your inbox weekly.
      </p>

      <input
        type="email"
        placeholder="Enter your email"
        className="w-full px-3 py-2 rounded-md text-black mb-3"
      />

      <button className="bg-white text-blue-600 font-medium w-full py-2 rounded-md">
        Subscribe
      </button>
    </div>
  );
};

export default NewsletterBox;
