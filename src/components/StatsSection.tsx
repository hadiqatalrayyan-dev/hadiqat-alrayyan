"use client";

import React from "react";
import {
  FaSeedling,
  FaTree,
  FaWater,
  FaUmbrellaBeach,
  FaLeaf,
  FaLayerGroup,
  FaDroplet,
} from "react-icons/fa6";
import { Sparkles } from "lucide-react";

export default function StatsSection() {
  const statsList = [
    // Row 1 (Right to Left in RTL)
    { id: 1, number: "453", label: "طلب توريد عشب صناعي", icon: <FaSeedling className="w-5 h-5 text-amber-300" /> },
    { id: 2, number: "367", label: "مشروع تنسيق حدائق", icon: <FaTree className="w-5 h-5 text-amber-300" /> },
    { id: 3, number: "320", label: "نوافير وشلالات منزلية", icon: <FaWater className="w-5 h-5 text-amber-300" /> },
    { id: 4, number: "300", label: "مشروع مظلات وبرجولات", icon: <FaUmbrellaBeach className="w-5 h-5 text-amber-300" /> },

    // Row 2 (Right to Left in RTL)
    { id: 5, number: "292", label: "طلبات زراعة نخيل", icon: <FaTree className="w-5 h-5 text-amber-300" /> },
    { id: 6, number: "252", label: "مشروع ديكورات زراعية", icon: <FaLeaf className="w-5 h-5 text-amber-300" /> },
    { id: 7, number: "221", label: "تركيبات عشب جداري", icon: <FaLayerGroup className="w-5 h-5 text-amber-300" /> },
    { id: 8, number: "98", label: "تركيب شبكات ري", icon: <FaDroplet className="w-5 h-5 text-amber-300" /> },
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

      {/* Content Grid: 8 Counters in 2 Rows x 4 Columns */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 sm:gap-y-12 gap-x-4 sm:gap-x-8 text-center">
          {statsList.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center justify-center group">
              {/* Icon Badge */}
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center mb-3 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300 shadow-sm">
                {stat.icon}
              </div>
              {/* Bold Large Number */}
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-2 drop-shadow-sm font-sans">
                {stat.number}
              </span>
              {/* Counter Label */}
              <span className="text-white/95 text-xs sm:text-sm md:text-[15px] font-medium leading-tight max-w-[160px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}