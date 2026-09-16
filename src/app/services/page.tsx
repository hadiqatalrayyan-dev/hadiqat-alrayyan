import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { services, siteConfig } from "@/data/content";
import { Phone, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "جميع خدمات تنسيق الحدائق بالرياض | مؤسسة حدائق الريان",
  description: "دليلك الشامل لكافة خدمات تنسيق وتصميم الحدائق، توريد وتركيب العشب الصناعي والطبيعي، الشلالات، المظلات، البرجولات وشبكات الري بالرياض مع ضمان معتمد حتى 7 سنوات ومعاينة 3D مجانية. اتصل: 0556226376",
  keywords: [
    "خدمات تنسيق حدائق",
    "تنسيق حدائق بالرياض",
    "تصميم حدائق فلل",
    "عشب صناعي",
    "ثيل طبيعي",
    "شلالات جدارية",
    "مظلات وبرجولات",
    "مؤسسة حدائق الريان",
    "حدائق الفرسان",
    "مؤسسة حدائق الفرسان",
    "حدائق الفرسان التجارية للعشب الصناعي",
    "حدائق الفرسان التجارية",
    "حدائق الفرسان الرياض",
    "فرسان العشب الصناعي",
    "حدائق الفرسان الدمام",
    "عشب حدائق",
    "حدائق عشب صناعي",
    "عشب صناعي حدائق",
    "حدائق العشب الصناعي",
    "العشب الجداري",
    "جملة العشب الصناعي",
    "العشب الجداري الصناعي",
    "للعشب الصناعي",
    "ديكور العشب الصناعي",
    "حديقة عشب صناعي",
    "حدائق ثيل صناعي",
    "العشب الصناعى",
    "حدائق فرسان",
    "عشب صناعي جداري",
    "العشب الصناعي",
    "جملة الثيل الصناعي",
    "تركيب العشب الجداري",
    "عشب صناعي بالجملة",
    "العشب الصناعي الجداري",
    "عشب حديقة",
    "ديكور عشب جداري",
    "عشب جداري صناعي",
    "ارخص عشب صناعي",
    "عشب صناعي للجدران",
    "ديكورات عشب صناعي",
    "ديكورات عشب صناعي جداري",
    "عشب حوش",
    "جملة العشب الصناعي بالرياض",
    "ديكورات بالعشب الصناعي",
    "عشب صناعي جملة",
    "عشب صناعي جداري للبيع",
    "تنسيق العشب الصناعي",
    "عشب صناعي الرياض",
    "تركيب عشب جداري",
    "بيع عشب صناعي",
    "زرع صناعي جداري",
    "تصميم عشب صناعي",
    "العشب الصناعي الرياض",
    "تنسيق حدائق بالعشب الصناعي",
    "عشب الرياض",
    "ثيل صناعي للجدران",
    "العشب الصناعي بالرياض",
    "ثيل صناعي جداري",
    "عشب صناعي بالرياض",
    "حوش عشب",
    "سعر العشب الصناعي الجداري",
    "حوش مزروع صناعي",
    "ثيل صناعي الرياض",
    "تنسيق حدائق عشب صناعي",
    "عشب جداري",
    "عشب صناعي الدمام",
    "اشكال العشب الجداري",
    "زرع صناعي الرياض",
    "ارخص ثيل صناعي",
    "ثيل صناعي مخلوط",
    "العشب الصناعي للجدران",
    "ثيل صناعي للحوش",
    "زرع صناعي للحوش",
    "زرع صناعي للجدران",
    "صور العشب الصناعي",
    "بيع العشب الصناعي بالجملة",
    "العشب الصناعي بالدمام",
    "عشب للحوش",
    "الثيل الصناعي بالرياض",
    "عشب صناعي للحوش",
    "محلات عشب صناعي",
    "العشب الصناعي الدمام",
    "حوش عشب صناعي",
    "حوش زرع صناعي",
    "حشيش صناعي للحدائق",
    "بيع العشب الصناعي",
    "شركة العشب الصناعي",
    "ارخص ثيل صناعي بالرياض",
    "عشب صناعي بالدمام",
    "تزيين الجدران بالعشب الصناعي",
    "صور عشب صناعي",
    "عشب جداري الرياض",
    "زرع صناعي الدمام",
    "عشب صناعي للحدائق",
    "ثيل للحوش",
    "تصميم العشب الصناعي",
    "ديكورات ثيل صناعي",
    "عشب صناعي للسطح",
    "الزرع الصناعي",
    "شركة عشب صناعي",
    "عشب صناعي مخلوط",
    "العشب الصناعي للحوش",
    "افضل عشب صناعي في الدمام",
    "الثيل الجداري",
    "تنسيق زرع صناعي",
    "ثيل صناعي الدمام",
    "حشيش صناعي للجدران"
  ],
  alternates: {
    canonical: "https://hadiqat-alrayan.com/services/",
  },
  openGraph: {
    title: "خدمات تنسيق وتصميم الحدائق المنزلية بالرياض | مؤسسة حدائق الريان",
    description: "باقات وعروض متكاملة لتنسيق حدائق الفلل والقصور والاستراحات مع المعاينة والتصميم 3D مجاناً والضمان حتى 7 سنوات.",
    url: "https://hadiqat-alrayan.com/services/",
    siteName: "مؤسسة حدائق الريان لتنسيق الحدائق",
    locale: "ar_SA",
    type: "website",
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "كافة خدمات تنسيق وتصميم الحدائق بالرياض - مؤسسة حدائق الريان",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "خدمات تنسيق وتصميم الحدائق المنزلية بالرياض | مؤسسة حدائق الريان",
    description: "باقات وعروض متكاملة لتنسيق حدائق الفلل والقصور والاستراحات مع المعاينة والتصميم 3D مجاناً والضمان حتى 7 سنوات.",
    images: ["/images/og-image.webp"],
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#edf7ea] text-gray-800 font-sans select-none">
      <Header />

      {/* Hero Banner matching screenshot 100% */}
      <section className="relative py-20 sm:py-28 bg-emerald-950 text-white overflow-hidden text-center">
        {/* Background Image with Dark Green Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35 scale-105"
          style={{
            backgroundImage: "url('/images/why_choose_us_garden.webp')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a2012]/92 via-[#0d2e1a]/88 to-[#0a2012]/95" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          {/* Subtitle in light green */}
          <span className="block text-emerald-300/85 text-xs sm:text-sm font-semibold mb-2">
            أفضل شركة تنسيق حدائق بالرياض
          </span>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 tracking-tight leading-tight">
            خدمات <span className="text-white">تنسيق الحدائق</span>
          </h1>

          {/* Description Paragraph matching screenshot 100% */}
          <p className="text-emerald-100/90 text-xs sm:text-[13px] md:text-sm leading-relaxed max-w-4xl mx-auto">
            لدينا مجموعة متميزة من خدمات تنسيق وتصميم الحدائق، وتصميم الشلالات وبناء وتركيب النوافير وتركيب المظلات والسواتر والبرجولات، وتوريد وزراعة العشب الطبيعي، وتوريد وتركيب العشب الصناعي والجداري، وزراعة وتكريب النخيل والأشجار والورود، وعمل شبكات وتركيب شبكات ري، وتجهيز بيوت شعر، وعمل وتصميم ملاعب العشب بكافة أشكالها وملاعب كرة قدم وبادل، بالإضافة إلى مكافحة حشرات الحدائق المنزلية.
          </p>
        </div>
      </section>

      {/* 12 Services Cards Grid (3 Columns x 4 Rows) on Mint Green Background */}
      <section className="py-16 sm:py-24 bg-[#edf7ea] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-none shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between overflow-hidden border border-gray-100 group"
              >
                {/* Card Top: Image & Overlapping Floating Title */}
                <div>
                  {/* Image */}
                  <Link href={`/services/${item.slug}`} className="block relative h-60 w-full overflow-hidden bg-gray-100 cursor-pointer">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </Link>

                  {/* Overlapping Floating White Title Box */}
                  <div className="relative -mt-8 mx-6 bg-white shadow-md py-3.5 px-4 text-center border border-gray-100/80 z-10">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                      <Link href={`/services/${item.slug}`} className="hover:text-[#4d8834] transition-colors">
                        {item.title}
                      </Link>
                    </h2>
                  </div>

                  {/* Card Description Text */}
                  <div className="p-6 pt-4 text-center">
                    <p className="text-xs sm:text-[13px] md:text-sm text-gray-600 leading-relaxed line-clamp-4">
                      {item.shortDesc}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Green Call Button (Left in RTL) & Yellow Service Link (Right in RTL) */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between">
                  {/* Green Call Button */}
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="inline-flex items-center gap-1.5 bg-[#4d8834] hover:bg-[#3d6e29] text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-md shadow-sm transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>اتصل بنا</span>
                  </a>

                  {/* Yellow Service Link */}
                  <Link
                    href={`/services/${item.slug}`}
                    className="inline-flex items-center gap-1 text-[#e5a823] hover:text-[#d49919] font-bold text-xs sm:text-sm hover:underline transition-colors"
                  >
                    <span>تصفح الخدمة</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Decorative Gardeners & Nature Landscape Strip above Footer */}
      <div className="w-full bg-[#edf7ea] pt-6 pb-2 text-center overflow-hidden flex justify-center items-center">
        <div className="max-w-3xl w-full px-4 flex justify-center">
          <svg viewBox="0 0 800 160" className="w-full h-auto max-h-36 drop-shadow-sm">
            {/* Soft Green Trees in background */}
            <circle cx="280" cy="80" r="50" fill="#a7d89b" />
            <circle cx="520" cy="80" r="50" fill="#a7d89b" />
            <circle cx="400" cy="65" r="55" fill="#4d8834" />
            <rect x="393" y="110" width="14" height="40" rx="3" fill="#8d5b36" />
            <rect x="274" y="120" width="12" height="30" rx="3" fill="#8d5b36" />
            <rect x="514" y="120" width="12" height="30" rx="3" fill="#8d5b36" />

            {/* Grass & Hill Base */}
            <path d="M0 150 Q400 135 800 150 L800 160 L0 160 Z" fill="#71ad52" />

            {/* Middle Shovel in Earth Emblem */}
            <circle cx="400" cy="120" r="22" fill="#edf7ea" stroke="#4d8834" strokeWidth="2" />
            <path d="M400 108 L400 128" stroke="#e07b22" strokeWidth="3" strokeLinecap="round" />
            <path d="M394 125 C394 133 406 133 406 125 Z" fill="#e07b22" />

            {/* Stylized Gardeners */}
            {/* Gardener 1 (Left): Green Shirt, brown apron */}
            <circle cx="310" cy="95" r="9" fill="#fcd34d" />
            <path d="M302 110 Q310 106 318 110 L318 140 L302 140 Z" fill="#2563eb" />
            <path d="M298 120 L304 140" stroke="#fcd34d" strokeWidth="3" strokeLinecap="round" />

            {/* Gardener 2 (Right): Orange Shirt, watering */}
            <circle cx="490" cy="95" r="9" fill="#fcd34d" />
            <path d="M482 110 Q490 106 498 110 L498 140 L482 140 Z" fill="#e07b22" />
            <path d="M498 120 L510 135" stroke="#fcd34d" strokeWidth="3" strokeLinecap="round" />

            {/* Watering can / Plants */}
            <path d="M510 135 L525 142 L510 146 Z" fill="#10b981" />
            <circle cx="210" cy="142" r="8" fill="#ec4899" />
            <circle cx="590" cy="142" r="8" fill="#f59e0b" />
          </svg>
        </div>
      </div>

      <Footer />
      <FloatingActions />
    </div>
  );
}