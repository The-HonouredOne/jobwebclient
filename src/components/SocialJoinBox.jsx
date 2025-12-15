import React from "react";
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaYoutube,
  FaFacebookF
} from "react-icons/fa";
import { SOCIAL_LINKS } from "../config/socialLinks";

const SocialJoinBox = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-3">
      <h3 className="font-semibold text-sm text-gray-800">
        Stay Updated
      </h3>

      <a
        href={SOCIAL_LINKS.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        <FaWhatsapp size={18} />
        Join WhatsApp Group
      </a>

      <a
        href={SOCIAL_LINKS.telegram}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        <FaTelegramPlane size={18} />
        Join Telegram Channel
      </a>

      <a
        href={SOCIAL_LINKS.youtube}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        <FaYoutube size={18} />
        Subscribe on YouTube
      </a>

      <a
        href={SOCIAL_LINKS.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900"
      >
        <FaFacebookF size={18} />
        Like on Facebook
      </a>
    </div>
  );
};

export default SocialJoinBox;
