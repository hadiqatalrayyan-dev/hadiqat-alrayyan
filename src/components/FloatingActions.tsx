"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/data/content";
import { ArrowUp } from "lucide-react";
import { FaWhatsapp, FaPhoneVolume } from "react-icons/fa6";

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-end gap-3 select-none">
      
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-11 h-11 rounded-full bg-white text-gray-800 shadow-xl border border-gray-200 flex items-center justify-center hover:bg-[#edf7ea] hover:text-[#4d8834] transition-all hover:scale-110 mb-1"
          aria-label="الرجوع للأعلى"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Floating Green WhatsApp Pill Button: تواصل معنا */}
      <a
        href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("السلام عليكم، أرغب في استفسار عن خدمات تنسيق الحدائق")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm px-5 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/30"
        aria-label="تواصل معنا عبر الواتساب"
      >
        <span>تواصل معنا</span>
        <FaWhatsapp className="w-5 h-5" />
      </a>

      {/* Floating Blue Call Pill Button: اتصل بنا */}
      <a
        href={`tel:${siteConfig.phone}`}
        className="inline-flex items-center gap-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-sm px-5 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-blue-500/30"
        aria-label="اتصل بنا هاتفياً"
      >
        <span>اتصل بنا</span>
        <FaPhoneVolume className="w-4 h-4" />
      </a>

    </div>
  );
}