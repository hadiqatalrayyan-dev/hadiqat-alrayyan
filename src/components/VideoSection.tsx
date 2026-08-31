"use client";

import React, { useState } from "react";
import { siteConfig } from "@/data/content";
import { Play, Phone, FileText } from "lucide-react";

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="videos" className="relative py-20 sm:py-24 bg-emerald-950 text-white overflow-hidden select-none">
      {/* Background Image with Dark Green Overlay matching screenshot */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1592417817098-8f3d6eb228cc?q=80&w=1920&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a2012]/92 via-[#0d2e1a]/88 to-[#0a2012]/95" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Section Heading matching screenshot 100% */}
        <div className="mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight max-w-3xl mx-auto">
            فيديوهات من الواقع عن أعمالنا <br className="hidden sm:block" />
            في <span className="underline decoration-white/40 underline-offset-8">تنسيق</span> الحدائق
          </h2>
        </div>

        {/* Video Player Box matching screenshot */}
        <div className="max-w-3xl mx-auto rounded-none overflow-hidden shadow-2xl border-4 border-black/30 bg-black aspect-video relative group">
          {isPlaying ? (
            <iframe
              className="w-full h-full"
              src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="فيديو من أعمال مؤسسة حدائق المستقبل لتنسيق الحدائق"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="relative w-full h-full cursor-pointer" onClick={() => setIsPlaying(true)}>
              {/* Real Garden Video Thumbnail */}
              <img
                src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1200&auto=format&fit=crop"
                alt="تنسيق حديقة منزلية صغيرة - حدائق المستقبل لتنسيق الحدائق في السعودية"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Shade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60" />

              {/* YouTube Top Bar Header Overlay matching screenshot */}
              <div className="absolute top-3 right-3 left-3 flex items-center justify-between text-white text-right z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1 shadow">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <path d="M15 50 C15 78 35 90 50 90 C65 90 85 78 85 50 C75 58 65 62 50 62 C35 62 25 58 15 50 Z" fill="#4d8834" />
                      <rect x="46" y="24" width="8" height="28" rx="4" fill="#e07b22" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-xs sm:text-sm font-bold text-white leading-tight">
                      تنسيق حديقة منزلية صغيرة - حدائق المستقبل لتنسيق الحدائق في السعودية
                    </span>
                    <span className="block text-[10px] text-[#e5a823] font-semibold">
                      حدائق المستقبل لتنسيق الحدائق في السعودية
                    </span>
                  </div>
                </div>
              </div>

              {/* Red YouTube Center Play Button matching screenshot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-12 sm:w-20 sm:h-14 bg-[#ff0000] hover:bg-[#cc0000] rounded-2xl flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white fill-white ml-1" />
                </div>
              </div>

              {/* YouTube Bottom Bar info */}
              <div className="absolute bottom-3 right-4 left-4 flex items-center justify-between text-white text-xs opacity-90">
                <span className="bg-black/60 px-2.5 py-1 rounded text-[11px] font-bold">
                  المشاهدة على YouTube
                </span>
                <span className="text-[11px] text-white/70">
                  جودة عالية 4K
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Buttons Row Below Video matching screenshot */}
        <div className="mt-8 flex flex-row items-center justify-center gap-3">
          {/* White 'اتصل بنا' Button */}
          <a
            href={`tel:${siteConfig.phone}`}
            className="bg-white hover:bg-gray-100 text-gray-900 font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-md transition-all hover:scale-105"
          >
            اتصل بنا
          </a>

          {/* Dark Green Outline 'احصل على عرض سعر' Button */}
          <a
            href="#contact"
            className="border border-white/70 bg-[#1e3a1f]/80 hover:bg-[#2a4e2b] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-md transition-all hover:scale-105"
          >
            احصل على عرض سعر
          </a>
        </div>

      </div>
    </section>
  );
}