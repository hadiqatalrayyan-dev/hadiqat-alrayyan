"use client";

import React from "react";

export default function StatsSection() {
  const statsList = [
    // Row 1 (Right to Left in RTL)
    { id: 1, number: "453", label: "طلب توريد عشب صناعي" },
    { id: 2, number: "367", label: "مشروع تنسيق حدائق" },
    { id: 3, number: "320", label: "نوافير وشلالات منزلية" },
    { id: 4, number: "300", label: "مشروع مظلات وبرجولات" },

    // Row 2 (Right to Left in RTL)
    { id: 5, number: "292", label: "طلبات زراعة نخيل" },
    { id: 6, number: "252", label: "مشروع ديكورات زراعية" },
    { id: 7, number: "221", label: "تركيبات عشب جداري" },
    { id: 8, number: "98", label: "تركيب شبكات ري" },
  ];

  return (
    <section className="relative py-14 sm:py-16 bg-[#4d8834] text-white overflow-hidden select-none">
      {/* Decorative Botanical Leaves Background Overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 15% 50%, rgba(255,255,255,0.4) 0%, transparent 45%), radial-gradient(circle at 85% 50%, rgba(255,255,255,0.4) 0%, transparent 45%)`,
        }}
      />

      {/* Subtle Leaf SVG background patterns on left and right */}
      <div className="absolute -left-12 top-0 bottom-0 w-64 opacity-15 pointer-events-none flex items-center">
        <svg viewBox="0 0 200 200" className="w-full h-full text-white fill-current">
          <path d="M40 100 C40 40, 100 20, 160 40 C180 100, 120 160, 40 100 Z" />
          <path d="M50 140 C70 80, 130 70, 180 90 C190 150, 130 190, 50 140 Z" />
        </svg>
      </div>

      <div className="absolute -right-12 top-0 bottom-0 w-64 opacity-15 pointer-events-none flex items-center">
        <svg viewBox="0 0 200 200" className="w-full h-full text-white fill-current">
          <path d="M160 100 C160 40, 100 20, 40 40 C20 100, 80 160, 160 100 Z" />
          <path d="M150 140 C130 80, 70 70, 20 90 C10 150, 70 190, 150 140 Z" />
        </svg>
      </div>

      {/* Content Grid: 8 Counters in 2 Rows x 4 Columns */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 sm:gap-y-12 gap-x-4 sm:gap-x-8 text-center">
          {statsList.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center justify-center">
              {/* Bold Large Number */}
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-2 drop-shadow-sm font-sans">
                {stat.number}
              </span>
              {/* Counter Label */}
              <span className="text-white/95 text-xs sm:text-sm md:text-[15px] font-medium leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}