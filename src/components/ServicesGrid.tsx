"use client";

import React from "react";
import Link from "next/link";
import { siteConfig, services } from "@/data/content";
import { Phone, MessageCircle, ArrowUpRight, ShieldCheck } from "lucide-react";

export default function ServicesGrid() {
  return (
    <section id="services" className="py-20 sm:py-28 bg-[#edf7ea] relative select-none overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#4d8834]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#e5a823]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm text-[#4d8834] text-xs sm:text-sm font-black border border-[#4d8834]/20 shadow-sm">
            <span>باقة متكاملة من خدمات اللاندسكيب والتنسيق بالرياض</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">
            خدمات مؤسسة حدائق المستقبل لتنسيق وتصميم الحدائق
          </h2>

          <div className="w-16 h-1.5 bg-[#e07b22] mx-auto rounded-full" />

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            نقدم لكم أرقى خدمات اللاندسكيب والديكورات الزراعية بأفضل الأسعار وأعلى معايير الجودة، مع ضمان معتمد يمتد حتى 7 سنوات ومعاينة 3D مجانية في موقعك بالرياض.
          </p>
        </div>

        {/* 3-Column Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {services.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden border border-gray-200/80 group hover:-translate-y-1"
            >
              {/* Card Top: Image & Overlapping Floating Title */}
              <div>
                {/* Image Container with Badge */}
                <Link
                  href={`/services/${item.slug}`}
                  className="block relative h-64 w-full overflow-hidden bg-gray-100 cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Subtle Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Top Quality Badge */}
                  <div className="absolute top-3.5 right-3.5 z-10 bg-white/95 backdrop-blur-md text-[#4d8834] text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1 border border-emerald-100">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>ضمان معتمد</span>
                  </div>
                </Link>

                {/* Overlapping Floating White Title Box */}
                <div className="relative -mt-9 mx-6 bg-white rounded-2xl shadow-lg py-4 px-5 text-center border border-gray-100 z-10 transition-transform group-hover:scale-[1.02]">
                  <h3 className="text-base sm:text-lg font-black text-gray-900 leading-snug">
                    <Link
                      href={`/services/${item.slug}`}
                      className="hover:text-[#4d8834] transition-colors"
                    >
                      {item.title}
                    </Link>
                  </h3>
                </div>

                {/* Card Description Text */}
                <div className="p-6 pt-4 text-center">
                  <p className="text-xs sm:text-[13px] md:text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {item.shortDesc}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 pb-6 pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                {/* Direct Call & WhatsApp Buttons */}
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${siteConfig.phone}`}
                    aria-label={`اتصل بنا هاتفياً لخدمة ${item.title}`}
                    className="inline-flex items-center gap-1.5 bg-[#245f14] hover:bg-[#1a470e] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-sm transition-all hover:scale-105"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>اتصل بنا</span>
                  </a>

                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`السلام عليكم، أود الاستفسار وطلب معاينة لخدمة: ${item.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`تواصل واتساب مباشر لخدمة ${item.title}`}
                    className="inline-flex items-center justify-center w-9 h-9 bg-[#1ea851] hover:bg-[#16823e] text-white rounded-xl shadow-sm transition-all hover:scale-105"
                    title={`محادثة واتساب بخصوص ${item.title}`}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>

                {/* Yellow Service Link leading to dedicated service page */}
                <Link
                  href={`/services/${item.slug}`}
                  aria-label={`تصفح كافة تفاصيل وأسعار خدمة ${item.title}`}
                  className="inline-flex items-center gap-1 text-[#b45309] hover:text-[#92400e] font-bold text-xs sm:text-sm hover:underline transition-colors group/link"
                >
                  <span>تصفح الخدمة</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
