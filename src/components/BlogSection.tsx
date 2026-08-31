"use client";

import React from "react";
import Link from "next/link";
import { siteConfig, articlesData } from "@/data/content";

export default function BlogSection() {
  return (
    <section id="blog" className="py-20 sm:py-24 bg-white relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header matching screenshot 100% */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <span className="block text-gray-400 text-sm sm:text-base font-semibold mb-2">
            أبرز المقالات من مدونة حدائق المستقبل لتنسيق الحدائق في السعودية
          </span>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3 tracking-tight leading-tight">
            معلومات ونصائح وأفكار <span className="text-[#4d8834]">تنسيق الحدائق</span>
          </h2>

          <p className="text-gray-600 text-xs sm:text-[13px] md:text-sm leading-relaxed max-w-3xl mx-auto mb-4">
            نقدم لكل أحدث وأهم المعلومات والأفكار عن تنسيق وتزيين الحدائق بالرياض.
          </p>

          {/* Orange underline accent */}
          <div className="w-12 h-1 bg-[#e07b22] mx-auto rounded-full" />
        </div>

        {/* 6 Article Cards Grid (3 Columns x 2 Rows) matching screenshot 100% */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articlesData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-none shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between overflow-hidden border border-gray-100/90 text-center group"
            >
              {/* Card Image with Date Badge and Floating Pill */}
              <div>
                <Link href={`/blog/${item.slug}`} className="block relative h-60 w-full overflow-hidden bg-gray-100 cursor-pointer">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Green Date Badge in Top Left */}
                  <div className="absolute top-2 left-2 bg-[#4d8834] text-white px-2.5 py-1 text-center shadow-md leading-tight">
                    <span className="block text-sm font-black">{item.day}</span>
                    <span className="block text-[10px] font-medium">{item.month}</span>
                  </div>

                  {/* White Pill on Bottom of Image */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center">
                    <span className="bg-white/95 backdrop-blur-sm text-gray-800 text-[11px] font-bold px-3.5 py-1 rounded-full shadow-md border border-gray-100">
                      {item.pillText}
                    </span>
                  </div>

                  {/* Watermark bar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-[#4d8834]/80 py-0.5 text-center">
                    <span className="text-[9px] font-bold text-white tracking-widest uppercase">
                      FUTUREGARDENS.SA
                    </span>
                  </div>
                </Link>

                {/* Title */}
                <div className="px-6 pt-5 pb-2">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug group-hover:text-[#4d8834] transition-colors line-clamp-2">
                    <Link href={`/blog/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h3>
                </div>

                {/* Excerpt */}
                <div className="px-6 pb-4">
                  <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              {/* Read More Button leading to dedicated article page */}
              <div className="px-6 pb-6 pt-1 flex justify-center">
                <Link
                  href={`/blog/${item.slug}`}
                  className="px-6 py-1.5 rounded-full border border-[#4d8834] text-[#4d8834] hover:bg-[#4d8834] hover:text-white font-bold text-xs transition-colors duration-200 shadow-sm inline-block"
                >
                  اقرأني الآن
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}