"use client";

import React from "react";

export default function FeaturesBar() {
  const items = [
    {
      id: 1,
      title: "أفضل أسعار تنسيق حدائق بالسعودية",
      desc: "تضمن مؤسسة حدائق المستقبل لتنسيق الحدائق أفضل العروض و الأسعار بالرياض على جميع خدمات تنسيق وتصميم وصيانة الحدائق.",
      icon: (
        <svg className="w-12 h-12 text-[#4d8834] fill-current" viewBox="0 0 24 24">
          {/* Wallet with money / cards */}
          <path d="M21 7.28V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-2.28c.59-.35 1-.98 1-1.72V9c0-.74-.41-1.37-1-1.72zM20 9v6h-3c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3zM5 19V5h14v2h-6c-1.66 0-3 1.34-3 3v4c0 1.66 1.34 3 3 3h6v2H5z" />
          <circle cx="17.5" cy="12" r="1.5" />
          <path d="M7 7h8v1.5H7z" opacity="0.6" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "خدمات تنسيق حدائق عالية الجودة",
      desc: "لدينا فريق متكامل من المهندسون الزراعيون والفنيين والعمال المتخصصين بخبرة 10 أعوام في تنسيق الحدائق وتصميمها بشكل احترافي.",
      icon: (
        <svg className="w-12 h-12 text-[#4d8834] fill-current" viewBox="0 0 24 24">
          {/* Quality Ribbon Badge with Star */}
          <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V22l4-2 4 2v-7.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm0 10.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 5.5 12 5.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
          <path d="M12 6.5l.85 1.72 1.9.28-1.38 1.34.33 1.89L12 10.84l-1.7.89.33-1.89-1.38-1.34 1.9-.28z" fill="#ffffff" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "اختبار تصميمات الحدائق قبل التركيب",
      desc: "تقوم مؤسسة حدائق المستقبل لتنسيق الحدائق باختبار أي ديكور لاي حديقة قبل التركيب لتكوين وجهة نظر شاملة عن الديكور المناسب لحديقتك و تنسيقها.",
      icon: (
        <svg className="w-12 h-12 text-[#4d8834] fill-current" viewBox="0 0 24 24">
          {/* Engineer with safety helmet & blueprint */}
          <path d="M12 2a5 5 0 00-5 5c0 1.25.46 2.39 1.22 3.28C6.18 11.24 4.5 13.42 4 16v4h16v-4c-.5-2.58-2.18-4.76-4.22-5.72A4.98 4.98 0 0017 7a5 5 0 00-5-5zm0 2c1.66 0 3 1.34 3 3 0 .42-.09.81-.25 1.17l-1.38-.8a2.98 2.98 0 00-2.74 0l-1.38.8C9.09 7.81 9 7.42 9 7c0-1.66 1.34-3 3-3zm-6 14c.48-2.07 2.12-3.71 4.2-4.24l1.8 1.04 1.8-1.04c2.08.53 3.72 2.17 4.2 4.24H6z" />
          <path d="M4 8h2v12H4z" opacity="0.7" />
          <path d="M5 6a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        </svg>
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
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-snug">
                {item.title}
              </h3>

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