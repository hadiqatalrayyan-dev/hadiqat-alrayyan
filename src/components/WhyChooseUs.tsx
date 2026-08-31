"use client";

import React from "react";
import { siteConfig } from "@/data/content";
import {
  ShieldCheck,
  Trophy,
  Star,
  CheckCircle2,
  Clock,
  Phone,
  MessageCircle,
  Eye,
  BadgePercent,
} from "lucide-react";

export default function WhyChooseUs() {
  const reasons = [
    {
      id: 1,
      title: "خبرة هندسية وكفاءة تتجاوز 10 أعوام",
      desc: "طاقم متكامل من المهندسين الزراعيين والفنيين المتخصصين في تصميم وتنفيذ أرقى ديكورات اللاندسكيب.",
      icon: <Trophy className="w-5 h-5 text-[#4d8834]" />,
    },
    {
      id: 2,
      title: "تصاميم ثلاثية الأبعاد 3D قبل البدء بالتنفيذ",
      desc: "نمكنك من معاينة حديقة منزلك والتعديل على تفاصيلها مجاناً لضمان مطابقة النتيجة النهائية لتطلعاتك.",
      icon: <Eye className="w-5 h-5 text-[#4d8834]" />,
    },
    {
      id: 3,
      title: "خامات أصلية وضمان معتمد يصل إلى 7 سنوات",
      desc: "نستخدم أفضل أنواع العشب الصناعي وشبكات الري ومضخات الشلالات المقاومة للشمس وحرارة الصيف.",
      icon: <ShieldCheck className="w-5 h-5 text-[#4d8834]" />,
    },
    {
      id: 4,
      title: "التزام صارم بالمواعيد وتسليم مفتاح",
      desc: "نحترم وقت العميل ونلتزم بتسليم المشروع في الموعد المحدد دون أي تأخير مع تشطيبات متقنة ونظيفة.",
      icon: <Clock className="w-5 h-5 text-[#4d8834]" />,
    },
    {
      id: 5,
      title: "أفضل الأسعار بالرياض ومعاينة مجانية",
      desc: "نوفر عروض أسعار تنافسية وباقات مخصصة تناسب مساحة حديقتك مع زيارة موقعية مجانية للمعاينة.",
      icon: <BadgePercent className="w-5 h-5 text-[#4d8834]" />,
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-white via-[#f4faf2] to-white relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="block text-gray-400 text-sm sm:text-base font-semibold mb-2">
            الجودة والمصداقية
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            لماذا تختار شركة <span className="text-[#4d8834]">حدائق المستقبل</span> لتنسيق حديقتك؟
          </h2>
          <div className="w-14 h-1 bg-[#e07b22] mx-auto rounded-full mb-4" />
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            نقدم لك حلولاً هندسية مبتكرة وديكورات زراعية فاخرة تجمع بين روعة التصميم ودقة التنفيذ بأيدي أفضل الخبراء.
          </p>
        </div>

        {/* 2-Column Layout: Text & Points on Right, Visual Image on Left */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Right Column in RTL: Reasons List & CTA */}
          <div className="lg:col-span-7 space-y-5 order-2 lg:order-1">
            {reasons.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#4d8834]/40 transition-all duration-300 flex items-start gap-4"
              >
                {/* Green Icon Box */}
                <div className="w-11 h-11 rounded-xl bg-[#edf7ea] flex items-center justify-center flex-shrink-0 mt-0.5">
                  {item.icon}
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* Direct Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={`tel:${siteConfig.phone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#4d8834] hover:bg-[#3d6e29] text-white font-bold px-7 py-3.5 rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <Phone className="w-4 h-4" />
                <span>اتصل بنا لطلب المعاينة: {siteConfig.phoneDisplay}</span>
              </a>

              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("السلام عليكم، أود الاستفسار عن عروض تنسيق الحدائق وضمان الـ 7 سنوات")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#e5a823] hover:bg-[#d69919] text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <MessageCircle className="w-4 h-4" />
                <span>استشارة واتساب فورية</span>
              </a>
            </div>
          </div>

          {/* Left Column in RTL: Luxury Landscape Image with Floating Badges */}
          <div className="lg:col-span-5 relative order-1 lg:order-2">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Decorative Subtle Background Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#4d8834]/20 to-[#e5a823]/20 rounded-3xl blur-2xl opacity-60" />

              {/* Main Luxury Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gray-900">
                <img
                  src="/images/why_choose_us_garden.jpg"
                  alt="تنسيق حدائق فلل مؤسسة حدائق المستقبل"
                  className="w-full h-[440px] sm:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                {/* Floating Badge 1: 7 Years Warranty (Top Right) */}
                <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#4d8834] text-white flex items-center justify-center shadow-md">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-gray-500 font-semibold leading-tight">شهادة معتمدة</span>
                    <span className="block text-sm font-black text-gray-900 leading-tight">ضمان حتى 7 سنوات</span>
                  </div>
                </div>

                {/* Floating Badge 2: 1000+ Projects (Bottom Left) */}
                <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#e5a823] text-white flex items-center justify-center shadow-md">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-black text-gray-900 leading-tight">+1000 مشروع</span>
                    <span className="block text-[11px] text-gray-500 font-semibold leading-tight">في كافة أحياء الرياض</span>
                  </div>
                </div>

                {/* Floating Badge 3: 4.9 Rating (Bottom Right) */}
                <div className="absolute bottom-5 right-5 bg-[#4d8834]/90 backdrop-blur-md px-3.5 py-2 rounded-xl text-white text-xs font-bold shadow-lg flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                  <span>4.9 / 5 تقييم العملاء</span>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}