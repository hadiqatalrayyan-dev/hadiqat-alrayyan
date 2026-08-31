"use client";

import React from "react";
import { PortfolioItem, siteConfig } from "@/data/content";
import { X, MapPin, Calendar, Phone, MessageCircle } from "lucide-react";

interface LightboxModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export default function LightboxModal({ item, onClose }: LightboxModalProps) {
  if (!item) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Display */}
        <div className="relative max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain max-h-[65vh]"
          />
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Caption & Info */}
        <div className="p-6 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1.5">
              {item.category}
            </span>
            <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
            <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                {item.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                {item.year}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`السلام عليكم، أرغب في تنفيذ مشروع مشابه لـ: ${item.title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>طلب مثل هذا العمل</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
