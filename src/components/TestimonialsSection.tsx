"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

export interface TestimonialSlide {
  id: number;
  rating: number;
  headline: string;
  comment: string;
  author: string;
}

const customerReviews: TestimonialSlide[] = [
  {
    id: 1,
    rating: 5,
    headline: "مؤسسة حدائق المستقبل لتنسيق الحدائق تمكنت من تصميم حديقة منزلي بشكل رائع في زمن قياسي",
    comment:
      "قامت مؤسسة حدائق المستقبل بعمل تصميم لحديقة منزلي واختباره قبل التركيب وعمل التعديلات التي طلبتها منهم بحرفية وإتقان. حقاً أفضل شركة تنسيق حدائق في السعودية!",
    author: "أحمد تركي / جدة",
  },
  {
    id: 2,
    rating: 5,
    headline: "تعامل راقي وشغل احترافي جداً في تركيب العشب الصناعي والشلال الجداري",
    comment:
      "ركبوا لي عشب صناعي فائق النعومة مع شلال رخامي فخم في حوش الفيلا. الالتزام بالمواعيد والنظافة بعد انتهاء العمل شيء يشكرون عليه وجودة الخامات ممتازة وضمان معتمد.",
    author: "سعود القحطاني / الرياض",
  },
  {
    id: 3,
    rating: 5,
    headline: "أفضل شركة نفذت لي شبكة ري ذكية وبرجولة خشبية ومظلات",
    comment:
      "مهندسون على أعلى مستوى من الكفاءة، وفروا لي أكثر من 50% من استهلاك المياه مع تصميم حديقة عصري ومبهر لجميع زوارنا مع خدمة وضمان بعد البيع.",
    author: "د. خالد المنصور / الدمام",
  },
];

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === customerReviews.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? customerReviews.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  const review = customerReviews[currentSlide];

  return (
    <section
      id="testimonials"
      className="relative py-20 sm:py-28 bg-emerald-950 text-white overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image with Dark Green Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: "url('/images/why_choose_us_garden.webp')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a2012]/90 via-[#0d2e1a]/85 to-[#0a2012]/95" />

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Section Header matching screenshot 100% */}
        <div className="max-w-3xl mx-auto mb-12">
          {/* Subheading */}
          <span className="block text-emerald-300/80 text-sm sm:text-base font-semibold mb-2">
            آراء العملاء
          </span>

          {/* Main Heading with Yellow Accent */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
            ماذا يقول عملاءنا عن خدماتنا في{" "}
            <span className="text-[#f59e0b]">تنسيق الحدائق؟</span>
          </h2>

          {/* Subtext */}
          <p className="text-emerald-100/90 text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed max-w-2xl mx-auto">
            هدفنا الأول هو رضاء العملاء عن جودة خدمات تنسيق الحدائق لدينا، هذا الذي يجعل عملاءنا سعداء بالخدمة ويوصون بنا لجيرانهم وأقاربهم.
          </p>
        </div>

        {/* Testimonial Card with Border Box matching screenshot */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-8">
          
          <div className="relative border border-white/40 bg-black/20 backdrop-blur-md rounded-3xl p-8 sm:p-12 text-center shadow-2xl transition-all duration-500">
            
            {/* Green Double Slash Quote Icon // */}
            <div className="text-2xl sm:text-3xl font-black text-[#65a30d] tracking-widest mb-3">
              {"//"}
            </div>

            {/* 5 Yellow Stars */}
            <div className="flex items-center justify-center gap-1.5 mb-5">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>

            {/* Bold Headline */}
            <h3 className="text-lg sm:text-2xl md:text-2xl font-black text-white mb-4 leading-snug tracking-wide">
              {review.headline}
            </h3>

            {/* Full Comment */}
            <p className="text-xs sm:text-sm md:text-base text-emerald-100/95 font-medium leading-relaxed max-w-2xl mx-auto mb-6">
              {review.comment}
            </p>

            {/* Author Name & City */}
            <div className="text-white font-bold text-sm sm:text-base tracking-wide">
              {review.author}
            </div>

          </div>

          {/* Navigation Arrow: Right (Previous in RTL) */}
          <button
            onClick={prevSlide}
            className="absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-white/60 text-white/90 hover:text-white hover:bg-white/20 flex items-center justify-center transition-all duration-200 focus:outline-none"
            aria-label="الرأي السابق"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Navigation Arrow: Left (Next in RTL) */}
          <button
            onClick={nextSlide}
            className="absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-white/60 text-white/90 hover:text-white hover:bg-white/20 flex items-center justify-center transition-all duration-200 focus:outline-none"
            aria-label="الرأي التالي"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

        </div>

        {/* 3 Dots Pagination Indicator */}
        <div className="flex items-center justify-center gap-1 mt-8">
          {customerReviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-full"
              aria-label={`الرأي رقم ${idx + 1}`}
            >
              <span
                className={`transition-all duration-300 rounded-full block ${
                  idx === currentSlide
                    ? "w-2.5 h-2.5 bg-white scale-125 shadow"
                    : "w-2 h-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}