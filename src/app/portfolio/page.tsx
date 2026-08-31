"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { portfolioProjects, portfolioCategories, PortfolioProject } from "@/data/portfolioData";
import { siteConfig } from "@/data/content";
import {
  Phone,
  MessageCircle,
  MapPin,
  X,
  Maximize2,
  CheckCircle2,
  Award,
} from "lucide-react";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const filteredProjects =
    activeCategory === "all"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans select-none">
      <Header />

      {/* 1. Top Section / Page Title */}
      <section className="pt-12 pb-6 text-center bg-gradient-to-b from-[#edf7ea]/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <span className="inline-block text-[#4d8834] font-bold text-xs bg-[#edf7ea] px-3.5 py-1.5 rounded-full mb-3 border border-[#4d8834]/20">
            سابقة أعمال معتمدة في فلل وقصور الرياض
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-8 tracking-tight">
            معرض أعمالنا ومشاريعنا المنجزة
          </h1>

          {/* Interactive Before & After Slider */}
          <div className="max-w-4xl mx-auto mb-12">
            <BeforeAfterSlider
              beforeImage="/images/garden-before.jpg"
              afterImage="/images/garden-after.jpg"
              beforeLabel="قبل التنسيق (أرض خرسانية صامتة)"
              afterLabel="بعد التنسيق والتصميم (واحة خضراء فخمة)"
              title="مقارنة حية: قبل وبعد التنسيق"
              subtitle="اسحب المقبض لتشاهد كيف نحول المساحات الصامتة إلى جنة خضراء متكاملة"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
            {portfolioCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count =
                cat.id === "all"
                  ? portfolioProjects.length
                  : portfolioProjects.filter((p) => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#4d8834] text-white shadow-md scale-105"
                      : "bg-[#edf7ea] text-gray-700 hover:bg-[#4d8834]/20 hover:text-[#4d8834]"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-gray-200/80 text-gray-600"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Gallery Grid */}
      <section className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-gray-100 aspect-[4/3]"
              >
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                {/* Project Title Banner */}
                <div className="absolute bottom-0 inset-x-0 p-4 text-center space-y-1 z-10">
                  <h3 className="text-white font-bold text-sm sm:text-base drop-shadow-md">
                    {project.title}
                  </h3>
                  <p className="text-[11px] text-emerald-200/90 font-medium flex items-center justify-center gap-1">
                    <MapPin className="w-3 h-3 text-[#e07b22]" />
                    <span>{project.location}</span>
                  </p>
                </div>

                {/* Hover Zoom Icon */}
                <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Project Statistics Strip */}
          <div className="mt-16 bg-[#edf7ea] rounded-3xl p-8 border border-[#4d8834]/20 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-1">
                <span className="text-3xl sm:text-4xl font-black text-[#4d8834]">+1000</span>
                <p className="text-xs sm:text-sm font-bold text-gray-700">مشروع منجز بنجاح</p>
              </div>
              <div className="space-y-1">
                <span className="text-3xl sm:text-4xl font-black text-[#e07b22]">15+</span>
                <p className="text-xs sm:text-sm font-bold text-gray-700">عاماً من الخبرة</p>
              </div>
              <div className="space-y-1">
                <span className="text-3xl sm:text-4xl font-black text-[#4d8834]">100%</span>
                <p className="text-xs sm:text-sm font-bold text-gray-700">رضا العملاء المعتمد</p>
              </div>
              <div className="space-y-1">
                <span className="text-3xl sm:text-4xl font-black text-[#e07b22]">7</span>
                <p className="text-xs sm:text-sm font-bold text-gray-700">سنوات ضمان شامل</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Lightbox Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-scaleUp text-right"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="relative aspect-[16/10] bg-black">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-4 font-sans">
              <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#edf7ea] text-[#4d8834] text-xs font-bold">
                  <Award className="w-3.5 h-3.5" />
                  <span>{selectedProject.categoryName}</span>
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#e07b22]" />
                  <span>{selectedProject.location}</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-gray-900">
                {selectedProject.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {selectedProject.description}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center justify-center gap-2 bg-[#4d8834] hover:bg-[#3d6e29] text-white font-bold py-3 rounded-xl shadow text-xs sm:text-sm transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>اطلب تنفيذ مثل هذا المشروع</span>
                </a>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`السلام عليكم، أود الاستفسار عن مشروع: ${selectedProject.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#e5a823] hover:bg-[#d69919] text-white font-bold py-3 rounded-xl shadow text-xs sm:text-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>محادثة واتساب سريعة</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4. Team Illustration Banner Strip before Footer */}
      <div className="w-full bg-white py-10 border-t border-gray-100 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <img
            src="/images/about-team-banner.png"
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
