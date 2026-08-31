"use client";

import React, { useState } from "react";
import LightboxModal from "@/components/LightboxModal";
import { PortfolioItem } from "@/data/content";
import { Maximize2, MapPin, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const portfolioData: PortfolioItem[] = [
  {
    "id": "p1",
    "title": "تنسيق حديقة فيلا سكنية مع عشب صناعي فاخر",
    "category": "عشب صناعي وطبيعي",
    "image": "/%D8%AA%D8%B1%D9%83%D9%8A%D8%A8%20%D8%A7%D9%84%D8%B9%D8%B4%D8%A8%20%28%D8%A7%D9%84%D8%AB%D9%8A%D9%84%29%20%D8%A7%D9%84%D8%B5%D9%86%D8%A7%D8%B9%D9%8A%20%D8%A7%D9%84%D9%81%D8%A7%D8%AE%D8%B1/synth-grass-gardens.webp",
    "location": "الرياض - حي النرجس",
    "year": "2025"
  },
  {
    "id": "p2",
    "title": "جلسة خارجية مع برجولة خشبية ومظلة مودرن",
    "category": "مظلات وبرجولات",
    "image": "/%D8%AA%D8%B1%D9%83%D9%8A%D8%A8%20%D8%A7%D9%84%D9%85%D8%B8%D9%84%D8%A7%D8%AA%20%D9%88%D8%A7%D9%84%D8%A8%D8%B1%D8%AC%D9%88%D9%84%D8%A7%D8%AA%20%D9%88%D8%A7%D9%84%D8%AC%D9%84%D8%B3%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AE%D8%A7%D8%B1%D8%AC%D9%8A%D8%A9/274367063_508548344170403_7360634211204686538_n.webp",
    "location": "الرياض - حي الملقا",
    "year": "2025"
  },
  {
    "id": "p3",
    "title": "شلال جداري رخامي مودرن مع إضاءات ليد غاطسة",
    "category": "شلالات ونوافير",
    "image": "/%D8%AA%D8%B5%D9%85%D9%8A%D9%85%20%D9%88%D8%A8%D9%86%D8%A7%D8%A1%20%D8%A7%D9%84%D8%B4%D9%84%D8%A7%D9%84%D8%A7%D8%AA%20%D9%88%D8%A7%D9%84%D9%86%D9%88%D8%A7%D9%81%D9%8A%D8%B1%20%D8%A7%D9%84%D9%85%D9%86%D8%B2%D9%84%D9%8A%D8%A9/IMG-20210323-WA0072.webp",
    "location": "الرياض - حي حطين",
    "year": "2025"
  },
  {
    "id": "p4",
    "title": "تكسيات عشب جداري وبديل خشب WPC للمداخل",
    "category": "عشب صناعي وطبيعي",
    "image": "/%D8%AA%D8%B5%D9%85%D9%8A%D9%85%20%D9%88%D8%AA%D8%B1%D9%83%D9%8A%D8%A8%20%D8%A7%D9%84%D8%B9%D8%B4%D8%A8%20%D8%A7%D9%84%D8%AC%D8%AF%D8%A7%D8%B1%D9%8A%20%D9%88%D8%A8%D8%AF%D9%8A%D9%84%20%D8%A7%D9%84%D8%AE%D8%B4%D8%A8/WhatsApp-Image-2024-11-26-at-15.29.11_2949ffe2.jpg",
    "location": "الرياض - حي الياسمين",
    "year": "2025"
  },
  {
    "id": "p5",
    "title": "ممرات حجرية وبحص ديكوري وتنسيق أشجار وزهور",
    "category": "ديكورات وممرات",
    "image": "/%D8%AA%D8%B5%D9%85%D9%8A%D9%85%20%D9%88%D8%AA%D9%86%D9%81%D9%8A%D8%B0%20%D8%A7%D9%84%D9%85%D9%85%D8%B1%D8%A7%D8%AA%20%D9%88%D8%A7%D9%84%D8%AF%D9%8A%D9%83%D9%88%D8%B1%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AD%D8%AC%D8%B1%D9%8A%D8%A9/%D8%AA%D8%B1%D9%83%D9%8A%D8%A8-%D8%AD%D8%AC%D8%B1-%D8%B9%D8%B4%D9%88%D8%A7%D8%A6%D9%8A-2-768x1024.jpg",
    "location": "الرياض - حي العارض",
    "year": "2025"
  },
  {
    "id": "p6",
    "title": "توريد وزراعة ثيل طبيعي طازج C2000 وباسبالم",
    "category": "عشب صناعي وطبيعي",
    "image": "/%D8%AA%D9%88%D8%B1%D9%8A%D8%AF%20%D9%88%D8%B2%D8%B1%D8%A7%D8%B9%D8%A9%20%D8%A7%D9%84%D8%AB%D9%8A%D9%84%20%28%D8%A7%D9%84%D8%B9%D8%B4%D8%A8%29%20%D8%A7%D9%84%D8%B7%D8%A8%D9%8A%D8%B9%D9%8A/%D8%AA%D8%B1%D9%83%D9%8A%D8%A8-%D8%AB%D9%8A%D9%84-%D8%B7%D8%A8%D9%8A%D8%B9%D9%8A-scaled.webp",
    "location": "الرياض - حي الصحافة",
    "year": "2025"
  },
  {
    "id": "p7",
    "title": "شلال مصب استيل مع حوض أسماك وصخور طبيعية",
    "category": "شلالات ونوافير",
    "image": "/%D8%AA%D8%B5%D9%85%D9%8A%D9%85%20%D9%88%D8%A8%D9%86%D8%A7%D8%A1%20%D8%A7%D9%84%D8%B4%D9%84%D8%A7%D9%84%D8%A7%D8%AA%20%D9%88%D8%A7%D9%84%D9%86%D9%88%D8%A7%D9%81%D9%8A%D8%B1%20%D8%A7%D9%84%D9%85%D9%86%D8%B2%D9%84%D9%8A%D8%A9/IMG-20210630-WA0015.webp",
    "location": "الدرعية - الرياض",
    "year": "2025"
  },
  {
    "id": "p8",
    "title": "برجولة جلسة ألمنيوم وخشب لكسان عازل للشمس",
    "category": "مظلات وبرجولات",
    "image": "/%D8%AA%D8%B1%D9%83%D9%8A%D8%A8%20%D8%A7%D9%84%D9%85%D8%B8%D9%84%D8%A7%D8%AA%20%D9%88%D8%A7%D9%84%D8%A8%D8%B1%D8%AC%D9%88%D9%84%D8%A7%D8%AA%20%D9%88%D8%A7%D9%84%D8%AC%D9%84%D8%B3%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AE%D8%A7%D8%B1%D8%AC%D9%8A%D8%A9/280278383_1226085614886105_5424349087872694590_n.webp",
    "location": "الرياض - حي الغدير",
    "year": "2025"
  },
  {
    "id": "p9",
    "title": "تمديد شبكة ري بالرشاشات الأوتوماتيكية الذكية",
    "category": "تصميم وتنسيق حدائق",
    "image": "/%D8%AA%D8%B1%D9%83%D9%8A%D8%A8%20%D9%88%D8%AA%D9%85%D8%AF%D9%8A%D8%AF%20%D8%B4%D8%A8%D9%83%D8%A7%D8%AA%20%D8%A7%D9%84%D8%B1%D9%8A%20%D8%A7%D9%84%D8%A3%D9%88%D8%AA%D9%88%D9%85%D8%A7%D8%AA%D9%8A%D9%83%D9%8A%D8%A9/%D8%AA%D8%B1%D9%83%D9%8A%D8%A8-%D8%B4%D8%A8%D9%83%D8%A7%D8%AA-%D8%A7%D9%84%D8%B1%D9%8A-%D9%84%D9%84%D8%AD%D8%AF%D8%A7%D8%A6%D9%82-%D8%A7%D9%84%D9%85%D9%86%D8%B2%D9%84%D9%8A%D8%A9.webp",
    "location": "الرياض - حي الرمال",
    "year": "2025"
  },
  {
    "id": "p10",
    "title": "تصميم حديقة مسبح لاندسكيب مودرن متكامل",
    "category": "تصميم وتنسيق حدائق",
    "image": "/images/service-garden-design-3d.webp",
    "location": "الرياض - حي المونسية",
    "year": "2025"
  },
  {
    "id": "p11",
    "title": "تنسيق عشب جداري ثلاثي الأبعاد مع بانوهات ليد",
    "category": "ديكورات وممرات",
    "image": "/%D8%AA%D8%B5%D9%85%D9%8A%D9%85%20%D9%88%D8%AA%D8%B1%D9%83%D9%8A%D8%A8%20%D8%A7%D9%84%D8%B9%D8%B4%D8%A8%20%D8%A7%D9%84%D8%AC%D8%AF%D8%A7%D8%B1%D9%8A%20%D9%88%D8%A8%D8%AF%D9%8A%D9%84%20%D8%A7%D9%84%D8%AE%D8%B4%D8%A8/WhatsApp-Image-2024-11-27-at-11.54.26-AM-1.jpeg",
    "location": "الرياض - حي قرطبة",
    "year": "2025"
  },
  {
    "id": "p12",
    "title": "ديكور ممرات حجرية مع مسطح ثيل صناعي فاخر",
    "category": "ديكورات وممرات",
    "image": "/%D8%AA%D8%B5%D9%85%D9%8A%D9%85%20%D9%88%D8%AA%D9%86%D9%81%D9%8A%D8%B0%20%D8%A7%D9%84%D9%85%D9%85%D8%B1%D8%A7%D8%AA%20%D9%88%D8%A7%D9%84%D8%AF%D9%8A%D9%83%D9%88%D8%B1%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AD%D8%AC%D8%B1%D9%8A%D8%A9/%D8%AA%D8%B1%D9%83%D9%8A%D8%A8-%D8%AD%D8%AC%D8%B1-%D8%B9%D8%B4%D9%88%D8%A7%D8%A6%D9%8A-3.webp",
    "location": "الرياض - حي لبن",
    "year": "2025"
  }
];

export default function PortfolioGallery() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [selectedPhoto, setSelectedPhoto] = useState<PortfolioItem | null>(null);

  const filterTabs = [
    { id: "all", label: "الكل" },
    { id: "garden", label: "تصميم وتنسيق حدائق" },
    { id: "turf", label: "عشب صناعي وطبيعي" },
    { id: "pergola", label: "مظلات وبرجولات" },
    { id: "water", label: "شلالات ونوافير" },
    { id: "decor", label: "ديكورات وممرات" },
  ];

  const filteredItems =
    activeCategory === "الكل"
      ? portfolioData
      : activeCategory === "عشب صناعي وطبيعي"
      ? portfolioData.filter((i) => i.category.includes("عشب"))
      : portfolioData.filter((i) => i.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-white relative select-none overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-[#4d8834]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-80 h-80 bg-[#e07b22]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#edf7ea] text-[#4d8834] text-xs sm:text-sm font-black border border-emerald-200 shadow-sm">
            <span>أبرز أعمالنا ومشروعاتنا المنجزة</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            أعمالنا في مجال <span className="text-[#4d8834]">تنسيق الحدائق</span>
          </h2>

          <div className="w-16 h-1.5 bg-[#e07b22] mx-auto rounded-full" />

          <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-4xl mx-auto">
            بخبرة أكثر من 10 أعوام في مجال تنسيق الحدائق، تمكنت مؤسسة حدائق المستقبل لتنسيق الحدائق في السعودية من القيام بما يتعدى اجمالي 1000 مشروع وعميل، قمنا بمشاريع تنسيق حدائق في كل أرجاء المملكة العربية السعودية (الرياض – جدة – المدينة المنورة – مكة المكرمة – الاحساء – الدمام – الطائف – بريدة – أبها – نجران – إلخ)، قمنا بمشاريع تنسيق حدائق للمنازل والفلل والقصور، ومشاريع العشب الطبيعي والصناعي والجداري، كما قمنا بتصميم وتركيب أفضل المظلات والسواتر والبرجولات بكافة أنواعها، إلخ.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.label)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeCategory === tab.label
                  ? "bg-[#4d8834] text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Portfolio Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer bg-gray-100 border border-gray-100 hover:-translate-y-1.5"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
                
                {/* Maximize Icon */}
                <div className="absolute top-4 left-4 w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                  <Maximize2 className="w-5 h-5" />
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-[#4d8834]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                  {item.category}
                </div>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5 text-white z-10 space-y-1.5">
                <h3 className="font-bold text-sm sm:text-base leading-snug group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-300 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#e5a823]" />
                    <span>{item.location}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#e5a823]" />
                    <span>{item.year}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="text-center mt-14">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-2xl shadow-lg transition-all hover:scale-105 group"
          >
            <span>استكشف جميع مشاريعنا الـ 60 بالرياض</span>
            <ArrowLeft className="w-4 h-4 text-[#e5a823] group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <LightboxModal
          item={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </section>
  );
}
