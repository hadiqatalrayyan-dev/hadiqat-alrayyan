"use client";

import React from "react";
import { siteConfig } from "@/data/content";
import { Phone, CheckCircle2 } from "lucide-react";
import Logo from "@/components/Logo";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column in RTL: Gardener Mascot & Floating Logo Badge (Larger & More Prominent) */}
          <div className="lg:col-span-5 xl:col-span-6 flex items-center justify-center relative order-2 lg:order-1">
            <div className="relative w-full max-w-md sm:max-w-lg xl:max-w-xl flex items-center justify-center">
              
              {/* Mascot Image (Enlarged) */}
              <div className="relative z-10 w-full flex items-center justify-center">
                <img
                  src="/images/gardener_mascot.webp"
                  alt="فني ومهندس مؤسسة حدائق المستقبل لتنسيق الحدائق"
                  className="w-full max-h-[560px] sm:max-h-[620px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  width={665}
                  height={891}
                />

                {/* Floating Emblem Logo */}
                <div className="absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl shadow-2xl border border-gray-100 flex flex-col items-center animate-bounce duration-1000 z-20">
                  <Logo size="lg" showText={false} />
                  <span className="text-xs font-black text-gray-900 mt-2">حدائق المستقبل</span>
                  <span className="text-[10px] font-bold text-[#e07b22]">ضمان 7 سنوات</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column in RTL: Title, Text Paragraphs & Contact Button */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-6 text-right order-1 lg:order-2">
            
            {/* Heading */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-3">
                نبذة عن حدائق المستقبل: أفضل شركة تنسيق حدائق بالرياض
              </h2>
              {/* Orange underline accent matching screenshot */}
              <div className="w-16 h-1.5 bg-[#e07b22] rounded-full" />
            </div>

            {/* Paragraph 1 */}
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              مؤسسة حدائق المستقبل هي أفضل شركة لتنسيق الحدائق بالرياض، حيث نقوم بتصميم وتنسيق الحدائق المنزلية والعامة، وتوريد وتركيب العشب الصناعي للحدائق والملاعب وكذلك زراعة العشب الطبيعي وزراعة الاشجار والورود والنخيل، وتركيب شلالات ونوافير منزلية، وعمل ديكورات زراعية متنوعة، بالإضافة إلى تصميم وتركيب مظلات وبرجولات على أعلى مستوى.
            </p>

            {/* Paragraph 2 */}
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              توفر مؤسسة حدائق المستقبل لتنسيق الحدائق في السعودية أيضاً خدمة صيانة الحدائق والإشراف عليها ومكافحة حشرات وآفات الحدائق بأحدث الأساليب والمواد والأجهزة. نقوم أيضاً بنقل الشلالات والنوافير والمظلات والبرجولات من مكان لآخر مع ضمان عدم تعرضها لأي ضرر أو خدوش.
            </p>

            {/* Paragraph 3 */}
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              كل هذه من خدمات تنسيق وتصميم وصيانة الحدائق وأكثر يتم تقديمه بواسطة فريق متكامل ومتخصص من مهندسين زراعيين وفنيين وعمال ذوي خبرة أكثر من 10 أعوام في هذا المجال.
            </p>

            {/* Contact Button */}
            <div className="pt-2">
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-2.5 bg-[#4d8834] hover:bg-[#3d6e29] text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-105"
              >
                <Phone className="w-4 h-4 text-white" />
                <span dir="ltr">{siteConfig.phoneDisplay}</span>
                <span>تواصل معنا</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
