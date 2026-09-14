"use client";

import React, { useState, useEffect, useCallback } from "react";
import { siteConfig } from "@/data/content";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaWhatsapp, FaPhoneVolume } from "react-icons/fa6";

export interface HeroSlide {
  id: number;
  tag: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
}

const slides: HeroSlide[] = [
  {
    id: 1,
    tag: "شلالات ونوافير مودرن",
    title: "تصميم وبناء الشلالات والنوافير المنزلية بالرياض",
    description:
      "مؤسسة حدائق الريان لتنسيق الحدائق بالرياض توفر خدمة تصميم وتركيب وصيانة النوافير العصرية والحديثة والشلالات الجدارية والرخامية المزودة بأقوى المضخات الإيطالية وإضاءات ليد غاطسة هادئة مع ضمان شامل.",
    image: "/images/service-waterfalls-fountains.webp",
    buttonText: "اتصل بنا للتفاصيل والأسعار",
  },
  {
    id: 2,
    tag: "مظلات وبرجولات فاخرة",
    title: "تصميم وتركيب مظلات حدائق وسواتر وبرجولات",
    description:
      "نقوم بتصميم وتنفيذ كافة أنواع ومقاسات المظلات والبرجولات الخشبية والحديد والألمنيوم، مع تغطيات لكسان معالجة عازلة للشمس والأمطار وجلسات عائلية خارجية راقية بأيدي أمهر الفنيين والنجارين بالرياض.",
    image: "/images/service-pergolas-canopies.webp",
    buttonText: "اتصل بنا للتفاصيل والأسعار",
  },
  {
    id: 3,
    tag: "تصميم 3D ومعاينة مجانية",
    title: "مؤسسة حدائق الريان لتنسيق وتصميم الحدائق العامة والخاصة بالرياض",
    description:
      "نقدم أرقى خدمات تصميم وتنسيق حدائق الفلل والقصور والاستراحات بأحدث أساليب اللاندسكيب والديكورات الزراعية المبتكرة مع المعاينة الموقعية والمخطط ثلاثي الأبعاد 3D مجاناً للعملاء.",
    image: "/images/service-garden-design-3d.webp",
    buttonText: "اتصل بنا للتفاصيل والأسعار",
  },
  {
    id: 4,
    tag: "عشب صناعي وجداري",
    title: "توريد وتركيب العشب الصناعي الفاخر والجداري",
    description:
      "توريد وتركيب أفضل أنواع النجيل والعشب الصناعي المعتمد والمقاوم لحرارة الشمس والأشعة فوق البنفسجية UV بكثافات متعددة للمنازل والملاعب والجدران وبديل الخشب مع ضمان معتمد يصل إلى 7 سنوات.",
    image: "/images/service-artificial-grass.webp",
    buttonText: "اتصل بنا للتفاصيل والأسعار",
  },
  {
    id: 5,
    tag: "شبكات ري ذكية",
    title: "تمديد وصيانة شبكات الري الأوتوماتيكية بالتنقيط والرشاشات",
    description:
      "تركيب وتمديد شبكات ري حديثة موفرة للمياه تعمل بمحابس كهربائية وتايمر إلكتروني ذكي لضبط مواعيد الري بدقة وحماية المزروعات من الجفاف، مع توفير عقود صيانة دورية ومتابعة مستمرة.",
    image: "/images/service-automatic-irrigation.webp",
    buttonText: "اتصل بنا للتفاصيل والأسعار",
  },
  {
    id: 6,
    tag: "تشجير ونخيل عربي",
    title: "زراعة وتكريب النخيل والأشجار والزهور الموسمية",
    description:
      "غرس وتوريد كافة أنواع أشجار الزينة والنخيل العربي والواشنطوني وتكريب وتنظيف النخيل وتلقيحه، وزراعة الورود والزهور المتفتحة، مع معالجة ومكافحة سوسة النخيل وآفات الحدائق.",
    image: "/images/service-palm-planting.webp",
    buttonText: "اتصل بنا للتفاصيل والأسعار",
  },
  {
    id: 7,
    tag: "ديكورات حجرية وممرات",
    title: "أعمال الديكور الحجري والبحص وممرات الحدائق المودرن",
    description:
      "تنفيذ ممرات الحدائق الحجرية العصرية وبحص وادي ناصع البياض وأحواض نباتات صحراوية وأضواء أرضية ليلية تضفي لمسة أوروبية راقية على فناء الفيلا والمداخل.",
    image: "/images/service-pebble-stone-decor.webp",
    buttonText: "اتصل بنا للتفاصيل والأسعار",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loadedSlides, setLoadedSlides] = useState<number[]>([0]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      const next = prev === slides.length - 1 ? 0 : prev + 1;
      setLoadedSlides((loaded) => (loaded.includes(next) ? loaded : [...loaded, next]));
      return next;
    });
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      const prevIdx = prev === 0 ? slides.length - 1 : prev - 1;
      setLoadedSlides((loaded) => (loaded.includes(prevIdx) ? loaded : [...loaded, prevIdx]));
      return prevIdx;
    });
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  const slide = slides[currentSlide];

  return (
    <section
      id="hero"
      className="relative w-full min-h-[580px] sm:min-h-[660px] md:min-h-[720px] flex items-center justify-center overflow-hidden bg-gray-950 text-white select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides with Cross-Fade & On-Demand Image Loading */}
      {slides.map((s, idx) => {
        const isCurrent = idx === currentSlide;
        const isLoaded = loadedSlides.includes(idx);

        if (!isLoaded && !isCurrent) return null;

        return (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isCurrent ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105 pointer-events-none"
            }`}
          >
            <img
              src={s.image}
              alt={s.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading={idx === 0 ? "eager" : "lazy"}
              decoding={idx === 0 ? "sync" : "async"}
              fetchPriority={idx === 0 ? "high" : "auto"}
            />
            {/* Subtle Dark Gradient Overlay for Maximum Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/70 z-10" />
          </div>
        );
      })}

      {/* Main Slide Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-12 py-16 text-center flex flex-col items-center justify-center space-y-6">
        
        {/* Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-emerald-300 text-xs sm:text-sm font-black border border-white/20 shadow-lg">
          <span>{slide.tag}</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-wide drop-shadow-2xl max-w-4xl">
          {slide.title}
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-white/95 font-medium max-w-3xl leading-relaxed drop-shadow-md">
          {slide.description}
        </p>

        {/* CTA Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
          <a
            href={`tel:${siteConfig.phone}`}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-gray-900 font-black text-sm sm:text-base bg-white hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:scale-105"
          >
            <FaPhoneVolume className="w-4 h-4 text-[#4d8834]" />
            <span>{slide.buttonText}</span>
          </a>

          <a
            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`السلام عليكم، أود الاستفسار وطلب معاينة لخدمة: ${slide.title}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`تواصل واتساب لطلب معاينة ${slide.title}`}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-white font-black text-sm sm:text-base bg-[#25D366] hover:bg-[#1EBE5D] transition-all duration-300 shadow-2xl hover:scale-105"
          >
            <FaWhatsapp className="w-5 h-5 text-white" />
            <span>واتساب مباشر</span>
          </a>
        </div>

      </div>

      {/* Navigation Arrow: Right (Previous in RTL) */}
      <button
        onClick={prevSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2 text-white/70 hover:text-white transition-all hover:scale-125 focus:outline-none"
        aria-label="الشريحة السابقة"
      >
        <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10" />
      </button>

      {/* Navigation Arrow: Left (Next in RTL) */}
      <button
        onClick={nextSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2 text-white/70 hover:text-white transition-all hover:scale-125 focus:outline-none"
        aria-label="الشريحة التالية"
      >
        <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10" />
      </button>

      {/* Slide Pagination Dots */}
      <div className="absolute bottom-6 inset-x-0 z-30 flex items-center justify-center gap-1">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentSlide(idx);
              setLoadedSlides((loaded) => (loaded.includes(idx) ? loaded : [...loaded, idx]));
            }}
            className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-full"
            aria-label={`الانتقال إلى الشريحة ${idx + 1}`}
          >
            <span
              className={`transition-all duration-300 rounded-full block ${
                idx === currentSlide
                  ? "w-8 h-2.5 bg-[#4d8834] shadow-md"
                  : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
