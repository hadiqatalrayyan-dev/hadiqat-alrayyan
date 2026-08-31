"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesBar from "@/components/FeaturesBar";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import ServicesGrid from "@/components/ServicesGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { Calendar } from "lucide-react";

// Dynamic imports for below-the-fold & interactive modal components to reduce initial JS execution and TBT
const BeforeAfterSlider = dynamic(() => import("@/components/BeforeAfterSlider"), {
  ssr: false,
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-100 rounded-3xl" />,
});
const PortfolioGallery = dynamic(() => import("@/components/PortfolioGallery"), {
  ssr: false,
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-100 rounded-3xl" />,
});
const GardenCostCalculator = dynamic(() => import("@/components/GardenCostCalculator"), {
  ssr: false,
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-100 rounded-3xl" />,
});
const VideoSection = dynamic(() => import("@/components/VideoSection"), {
  ssr: false,
  loading: () => <div className="h-80 w-full animate-pulse bg-gray-100 rounded-3xl" />,
});
const BlogSection = dynamic(() => import("@/components/BlogSection"), {
  ssr: false,
  loading: () => <div className="h-80 w-full animate-pulse bg-gray-100 rounded-3xl" />,
});
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection"), {
  ssr: false,
  loading: () => <div className="h-80 w-full animate-pulse bg-gray-100 rounded-3xl" />,
});
const FaqSection = dynamic(() => import("@/components/FaqSection"), {
  ssr: false,
  loading: () => <div className="h-80 w-full animate-pulse bg-gray-100 rounded-3xl" />,
});
const ContactSection = dynamic(() => import("@/components/ContactSection"), {
  ssr: false,
  loading: () => <div className="h-80 w-full animate-pulse bg-gray-100 rounded-3xl" />,
});
const FreeInspectionModal = dynamic(() => import("@/components/FreeInspectionModal"), {
  ssr: false,
});

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Sticky Header with TopBar */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* 4 Feature Highlights */}
      <FeaturesBar />

      {/* Free Inspection Floating CTA Banner */}
      <div className="bg-[#edf7ea] border-y border-[#4d8834]/20 py-4 px-4 text-center">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-right">
            <span className="w-10 h-10 rounded-full bg-[#4d8834] text-white flex items-center justify-center font-bold text-lg shrink-0">
              🎁
            </span>
            <div>
              <h3 className="text-xs sm:text-sm font-black text-gray-900">
                عرض خاص: معاينة ورفع مقاسات وتصميم 3D مجاناً بالرياض
              </h3>
              <p className="text-[11px] text-gray-600">
                فريقنا الهندسي يزور موقعك خلال 24 ساعة لتقديم أفضل تصميم ومقايسة أسعار.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#4d8834] hover:bg-[#3d6e29] text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-md transition-all hover:scale-105 shrink-0"
          >
            <Calendar className="w-4 h-4" />
            <span>احجز موعد معاينتك الآن</span>
          </button>
        </div>
      </div>

      {/* About Company & Experience */}
      <AboutSection />

      {/* Statistics Counters Banner */}
      <StatsSection />

      {/* 12 Detailed Services with interactive modal */}
      <ServicesGrid />

      {/* Interactive Before / After Slider Showcase */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#fcfdfa] to-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <BeforeAfterSlider
            beforeImage="/images/garden-before.webp"
            afterImage="/images/garden-after.webp"
            beforeLabel="قبل التنسيق (أرض خرسانية صامتة)"
            afterLabel="بعد التنسيق والتصميم (واحة خضراء فخمة)"
            title="شاهد التحول الحقيقي: قبل وبعد التنسيق"
            subtitle="اسحب المقبض يميناً ويساراً لمشاهدة الفرق المذهل الذي تصنعه أيدي مهندسي حدائق المستقبل بالرياض"
          />
        </div>
      </section>

      {/* Portfolio Gallery with categories & Lightbox */}
      <PortfolioGallery />

      {/* Interactive Garden Cost Calculator */}
      <section className="py-16 sm:py-20 bg-gray-50/70 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <GardenCostCalculator />
        </div>
      </section>

      {/* Quality Guarantees & Values */}
      <WhyChooseUs />

      {/* Real Videos Section */}
      <VideoSection />

      {/* Agricultural Tips & Blog */}
      <BlogSection />

      {/* Real Customer Testimonials */}
      <TestimonialsSection />

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* Contact Form & Direct Booking */}
      <ContactSection />

      {/* Comprehensive Footer */}
      <Footer />

      {/* Floating Call & WhatsApp Buttons */}
      <FloatingActions />

      {/* Free Inspection Modal */}
      <FreeInspectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
