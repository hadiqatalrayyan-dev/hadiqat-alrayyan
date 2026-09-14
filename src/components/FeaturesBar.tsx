"use client";

import React from "react";
import { FaHandHoldingDollar, FaAward, FaCompassDrafting } from "react-icons/fa6";

export default function FeaturesBar() {
  const items = [
    {
      id: 1,
      title: "أفضل أسعار تنسيق حدائق بالسعودية",
      desc: "تضمن مؤسسة حدائق الريان لتنسيق الحدائق أفضل العروض و الأسعار بالرياض على جميع خدمات تنسيق وتصميم وصيانة الحدائق.",
      icon: (
        <div className="w-16 h-16 rounded-2xl bg-white text-[#4d8834] shadow-md border border-[#cce4c4] flex items-center justify-center hover:scale-110 transition-transform duration-300">
          <FaHandHoldingDollar className="w-8 h-8" />
        </div>
      ),
    },
    {
      id: 2,
      title: "خدمات تنسيق حدائق عالية الجودة",
      desc: "لدينا فريق متكامل من المهندسون الزراعيون والفنيين والعمال المتخصصين بخبرة 10 أعوام في تنسيق الحدائق وتصميمها بشكل احترافي.",
      icon: (
        <div className="w-16 h-16 rounded-2xl bg-white text-[#4d8834] shadow-md border border-[#cce4c4] flex items-center justify-center hover:scale-110 transition-transform duration-300">
          <FaAward className="w-8 h-8" />
        </div>
      ),
    },
    {
      id: 3,
      title: "اختبار تصميمات الحدائق قبل التركيب",
      desc: "تقوم مؤسسة حدائق الريان لتنسيق الحدائق باختبار أي ديكور لاي حديقة قبل التركيب لتكوين وجهة نظر شاملة عن الديكور المناسب لحديقتك و تنسيقها.",
      icon: (
        <div className="w-16 h-16 rounded-2xl bg-white text-[#4d8834] shadow-md border border-[#cce4c4] flex items-center justify-center hover:scale-110 transition-transform duration-300">
          <FaCompassDrafting className="w-8 h-8" />
        </div>
      ),
    },
  ];

  return (
    <section className="w-full bg-[#edf7ea] border-b-4 border-[#4d8834] py-10 sm:py-14 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-[#cce4c4]">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center text-center px-4 sm:px-8 py-6 md:py-2"
            >
              {/* Green Icon */}
              <div className="mb-4 flex items-center justify-center">
                {item.icon}
              </div>

              {/* Title */}
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-snug">
                {item.title}
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-[13px] md:text-sm text-gray-600 leading-relaxed max-w-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}