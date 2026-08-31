"use client";

import React, { useState } from "react";
import { MessageCircle, Share2, Copy, Check, Printer } from "lucide-react";

interface Props {
  title: string;
  url: string;
}

export default function ArticleShareBar({ title, url }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const shareWhatsAppUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title}\n${url}`)}`;
  const shareTwitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const shareFacebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-gray-800 font-bold text-xs sm:text-sm">
        <Share2 className="w-4 h-4 text-[#4d8834]" />
        <span>شارك هذا الدليل مع أصدقائك:</span>
      </div>

      <div className="flex items-center gap-2">
        {/* WhatsApp */}
        <a
          href={shareWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm hover:scale-105"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>واتساب</span>
        </a>

        {/* X / Twitter */}
        <a
          href={shareTwitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-black hover:bg-gray-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm hover:scale-105"
        >
          <span>منصة X</span>
        </a>

        {/* Facebook */}
        <a
          href={shareFacebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-[#1877F2] hover:bg-[#166FE5] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm hover:scale-105"
        >
          <span>فيسبوك</span>
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-600" />
              <span className="text-green-600">تم النسخ!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-gray-600" />
              <span>نسخ الرابط</span>
            </>
          )}
        </button>

        {/* Print PDF */}
        <button
          onClick={handlePrint}
          className="hidden sm:flex items-center gap-1.5 bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm"
          title="طباعة المقال أو حفظه PDF"
        >
          <Printer className="w-3.5 h-3.5 text-gray-600" />
          <span>طباعة</span>
        </button>
      </div>
    </div>
  );
}
