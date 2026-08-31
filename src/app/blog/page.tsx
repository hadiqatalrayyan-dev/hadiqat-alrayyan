"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { articlesData, siteConfig } from "@/data/content";
import {
  Search,
  Calendar,
  User,
  Clock,
  ArrowLeft,
  X,
  BookOpen,
} from "lucide-react";

export default function BlogIndexPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return articlesData;
    return articlesData.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.pillText.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Smooth scroll to results
    const resultsElem = document.getElementById("articles-feed");
    if (resultsElem) {
      resultsElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans select-none">
      <Header />

      {/* Main 2-Column Section matching screenshot 100% */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column in RTL: Sidebar (Active Search Box + Recent Articles) - lg:col-span-4 */}
          <aside className="lg:col-span-4 space-y-8 order-2 lg:order-1 text-right sticky top-24">
            
            {/* 1. Sidebar Search Box with Live Search matching screenshot */}
            <form onSubmit={handleSearchSubmit} className="space-y-2">
              <div className="flex items-stretch border-2 border-gray-300 focus-within:border-[#e5a823] rounded-xl overflow-hidden shadow-sm transition-colors bg-white">
                <input
                  type="text"
                  placeholder="...Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-3 text-xs sm:text-sm text-right outline-none bg-transparent text-gray-900 placeholder:text-gray-400 font-medium"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="px-2.5 text-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center"
                    aria-label="مسح البحث"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-[#e5a823] hover:bg-[#d69919] text-white px-5 flex items-center justify-center transition-colors flex-shrink-0"
                  aria-label="بحث"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Search Chips when active */}
              {searchQuery && (
                <div className="flex items-center justify-between text-xs px-1 text-gray-500">
                  <span>تم العثور على <strong>{filteredArticles.length}</strong> نتيجة</span>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-[#e07b22] hover:underline font-bold"
                  >
                    إعادة ضبط
                  </button>
                </div>
              )}
            </form>

            {/* 2. Recent Articles Widget matching screenshot */}
            <div className="space-y-4">
              <div className="relative pb-2">
                <h3 className="text-base sm:text-lg font-black text-gray-900">
                  أحدث المعلومات عن تنسيق الحدائق
                </h3>
                <div className="w-14 h-1 bg-[#e07b22] mt-1.5 rounded-full" />
              </div>

              <div className="divide-y divide-gray-100 space-y-3 pt-1">
                {articlesData.map((item) => (
                  <div key={item.id} className="pt-3 flex items-start gap-3 group">
                    <div className="flex-1 text-right space-y-1">
                      <Link
                        href={`/blog/${item.slug}`}
                        className="block text-xs sm:text-[13px] font-bold text-gray-800 group-hover:text-[#4d8834] transition-colors leading-snug"
                      >
                        {item.title}
                      </Link>
                      <span className="block text-[10px] text-gray-400 font-medium">
                        التعليقات
                      </span>
                    </div>

                    <Link
                      href={`/blog/${item.slug}`}
                      className="w-16 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200 group-hover:opacity-90 transition-opacity"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

          </aside>

          {/* Right Column in RTL: Main Articles Feed - lg:col-span-8 */}
          <main id="articles-feed" className="lg:col-span-8 space-y-16 order-1 lg:order-2 text-center">
            
            {/* Search Active Notification Bar */}
            {searchQuery && (
              <div className="bg-[#edf7ea] border border-[#4d8834]/30 rounded-2xl p-4 flex items-center justify-between text-xs sm:text-sm font-bold text-gray-800">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#4d8834]" />
                  <span>نتائج البحث عن: <span className="text-[#4d8834]">"{searchQuery}"</span></span>
                </div>
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-[#e07b22] hover:underline font-bold text-xs"
                >
                  إلغاء التصفية (عرض الكل)
                </button>
              </div>
            )}

            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <article key={article.id} className="space-y-4 pb-14 border-b border-gray-200 last:border-b-0 text-center animate-fadeIn">
                  
                  {/* 1. Category Tag */}
                  <span className="block text-xs font-bold text-[#4d8834]">
                    معلومات عن تنسيق الحدائق
                  </span>

                  {/* 2. Main Title with Orange Dash Underline matching screenshot */}
                  <div className="space-y-2">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 hover:text-[#4d8834] transition-colors leading-snug px-2">
                      <Link href={`/blog/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h2>
                    <div className="w-14 h-1 bg-[#e07b22] mx-auto rounded-full" />
                  </div>

                  {/* 3. Meta info */}
                  <div className="text-[11px] sm:text-xs text-gray-500 font-medium space-x-2 space-x-reverse">
                    <span>منشور في: {article.day} {article.month} 2026</span>
                    <span>•</span>
                    <span>بواسطة: {article.author || "مؤسسة حدائق المستقبل"}</span>
                  </div>

                  {/* 4. Featured Image with Date Badge & Custom Overlay matching screenshot */}
                  <div className="relative rounded-2xl overflow-hidden shadow-md group border border-gray-100 max-w-2xl mx-auto">
                    <Link href={`/blog/${article.slug}`}>
                      <div className="relative aspect-[16/10] w-full bg-gray-100">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Top Right Green Date Badge matching screenshot */}
                        <div className="absolute top-4 right-4 bg-white/95 border-2 border-[#4d8834] rounded-xl px-3 py-1.5 text-center shadow-md leading-tight">
                          <span className="block text-base font-black text-[#4d8834]">{article.day}</span>
                          <span className="block text-[10px] font-bold text-gray-600">{article.month}</span>
                        </div>

                        {/* Bottom Banner Title Overlay */}
                        <div className="absolute bottom-4 inset-x-4 flex flex-col items-center">
                          <div className="bg-white/95 backdrop-blur-sm px-6 py-1.5 rounded-full shadow-md border border-gray-200">
                            <span className="text-xs sm:text-sm font-bold text-gray-900">
                              {article.title}
                            </span>
                          </div>
                          <span className="mt-1 text-[10px] text-white/90 bg-black/60 px-3 py-0.5 rounded-full">
                            futuregardens.sa
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* 5. Rich Excerpt Paragraph */}
                  <p className="text-xs sm:text-sm text-gray-600 leading-loose max-w-2xl mx-auto px-4 text-center">
                    {article.excerpt}
                  </p>

                  {/* 6. Green Outline 'متابعة القراءة' Button matching screenshot */}
                  <div className="pt-2">
                    <Link
                      href={`/blog/${article.slug}`}
                      className="inline-flex items-center gap-2 border-2 border-[#4d8834] text-[#4d8834] hover:bg-[#4d8834] hover:text-white font-bold text-xs sm:text-sm px-8 py-2.5 rounded-xl transition-all shadow-sm"
                    >
                      <span>متابعة القراءة</span>
                      <span>←</span>
                    </Link>
                  </div>

                  {/* 7. Bottom Note */}
                  <div className="pt-1 text-[11px] text-gray-400">
                    <span>منشور في: معلومات عن تنسيق الحدائق</span>
                  </div>

                </article>
              ))
            ) : (
              /* No Results State with Quick Suggestions */
              <div className="bg-gray-50 rounded-3xl p-10 text-center space-y-4 border border-gray-200 animate-fadeIn">
                <Search className="w-12 h-12 text-gray-400 mx-auto" />
                <h3 className="text-lg font-bold text-gray-800">
                  لا توجد مقالات مطابقة لـ "{searchQuery}"
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  جرب البحث بكلمات أخرى مثل:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  {["تنسيق", "عشب", "شتلات", "نمل", "حشرات", "مخطط", "جدار"].map((tag, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSearchQuery(tag)}
                      className="text-xs bg-[#edf7ea] text-[#4d8834] hover:bg-[#4d8834] hover:text-white font-bold px-3 py-1.5 rounded-lg transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </main>

        </div>
      </div>

      {/* 3. Team Illustration Banner Strip before Footer */}
      <div className="w-full bg-white py-8 border-t border-gray-100 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <img
            src="/images/about-team-banner.webp"
            alt="فريق عمل مؤسسة حدائق المستقبل لتنسيق الحدائق بالرياض"
            className="w-full max-h-56 sm:max-h-72 object-contain mx-auto"
          />
        </div>
      </div>

      <Footer />
      <FloatingActions />
    </div>
  );
}
