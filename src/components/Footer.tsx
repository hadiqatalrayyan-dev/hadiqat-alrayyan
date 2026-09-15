"use client";

import React from "react";
import Link from "next/link";
import { siteConfig, services } from "@/data/content";
import Logo from "@/components/Logo";
import { ChevronLeft } from "lucide-react";
import {
  FaPhoneVolume,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaPinterestP,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa6";

export default function Footer() {
  const currentYear = 2026;

  const contactList = [
    {
      label: "0556226376",
      href: "tel:0556226376",
      icon: <FaPhoneVolume className="w-3.5 h-3.5 text-[#e07b22]" />,
    },
    {
      label: "966556226376",
      href: "tel:+966556226376",
      icon: <FaWhatsapp className="w-4 h-4 text-[#25D366]" />,
    },
    {
      label: "info@hadiqat-alrayan.com",
      href: "mailto:info@hadiqat-alrayan.com",
      icon: <FaEnvelope className="w-3.5 h-3.5 text-[#e07b22]" />,
    },
  ];

  const serviceLinks = services.slice(0, 7).map((s) => ({
    label: s.title,
    href: `/services/${s.slug}`,
  }));

  const importantLinks = [
    { label: "من نحن", href: "/about" },
    { label: "خدماتنا", href: "/services" },
    { label: "معلومات ونصائح عن تنسيق الحدائق", href: "/blog" },
    { label: "أعمالنا في تنسيق الحدائق", href: "/portfolio" },
    { label: "أفضل شركات تنسيق حدائق", href: "/about" },
    { label: "أسعار تنسيق الحدائق", href: "/contact" },
  ];

  return (
    <footer className="relative bg-[#edf7ea] text-gray-700 pt-16 pb-10 border-t-2 border-[#4d8834]/20 select-none overflow-hidden font-sans">
      
      {/* Subtle Botanical Leaf Watermark on Left & Right */}
      <div className="absolute left-0 top-0 bottom-0 w-80 opacity-10 pointer-events-none flex items-center">
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#4d8834] fill-current">
          <path d="M40 100 C40 40, 100 20, 160 40 C180 100, 120 160, 40 100 Z" />
          <path d="M50 140 C70 80, 130 70, 180 90 C190 150, 130 190, 50 140 Z" />
        </svg>
      </div>

      <div className="absolute right-0 top-0 bottom-0 w-80 opacity-10 pointer-events-none flex items-center">
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#4d8834] fill-current">
          <path d="M160 100 C160 40, 100 20, 40 40 C20 100, 80 160, 160 100 Z" />
          <path d="M150 140 C130 80, 70 70, 20 90 C10 150, 70 190, 150 140 Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 items-start text-right">
          
          {/* Col 1: Brand Logo & About */}
          <div className="lg:col-span-4 space-y-4 text-right">
            <Link href="/" className="inline-block group">
              <Logo size="md" textColor="dark" />
            </Link>

            <p className="text-gray-600 text-xs sm:text-[13px] leading-relaxed">
              مؤسسة حدائق الريان هي أفضل شركة لتنسيق الحدائق بالرياض، حيث نقوم بتصميم وتنسيق الحدائق المنزلية والعامة، وتوريد وتركيب العشب الصناعي للحدائق والملاعب وكذلك زراعة العشب الطبيعي وزراعة الاشجار والورود والنخيل، وتركيب شلالات ونوافير منزلية، وعمل ديكورات زراعية متنوعة، بالإضافة إلى تصميم وتركيب مظلات وبرجولات على أعلى مستوى.
            </p>
          </div>

          {/* Col 2: Contact Information & Social Links */}
          <div className="lg:col-span-3 space-y-4 text-right">
            <h3 className="font-bold text-gray-900 text-lg mb-4">
              معلومات التواصل
            </h3>

            {/* Contact Items aligned in RTL */}
            <div className="space-y-3">
              {contactList.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="flex items-center gap-2.5 text-gray-700 hover:text-[#4d8834] transition-colors text-xs sm:text-sm font-semibold"
                >
                  <span className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                    {item.icon}
                  </span>
                  <span dir="ltr" className="font-bold text-gray-800 hover:text-[#4d8834]">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>

            {/* Social Media Links */}
            <div className="pt-3">
              <span className="block text-gray-800 font-bold text-sm mb-3 text-right">
                تابعنا على:
              </span>
              <div className="flex items-center justify-start gap-2">
                
                {/* Facebook */}
                <a
                  href={siteConfig.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-700 hover:bg-[#1877F2] hover:text-white shadow-sm transition-all hover:-translate-y-0.5"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="w-3.5 h-3.5" />
                </a>

                {/* Instagram */}
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-700 hover:bg-[#E4405F] hover:text-white shadow-sm transition-all hover:-translate-y-0.5"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-3.5 h-3.5" />
                </a>

                {/* Twitter / X */}
                <a
                  href={siteConfig.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-700 hover:bg-black hover:text-white shadow-sm transition-all hover:-translate-y-0.5"
                  aria-label="Twitter"
                >
                  <FaXTwitter className="w-3.5 h-3.5" />
                </a>

                {/* Pinterest */}
                <a
                  href={siteConfig.socials.pinterest}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-700 hover:bg-[#BD081C] hover:text-white shadow-sm transition-all hover:-translate-y-0.5"
                  aria-label="Pinterest"
                >
                  <FaPinterestP className="w-3.5 h-3.5" />
                </a>

                {/* LinkedIn */}
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-700 hover:bg-[#0A66C2] hover:text-white shadow-sm transition-all hover:-translate-y-0.5"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="w-3.5 h-3.5" />
                </a>

                {/* YouTube */}
                <a
                  href={siteConfig.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-700 hover:bg-[#FF0000] hover:text-white shadow-sm transition-all hover:-translate-y-0.5"
                  aria-label="YouTube"
                >
                  <FaYoutube className="w-3.5 h-3.5" />
                </a>

              </div>
            </div>
          </div>

          {/* Col 3: Services Links with arrow on the right */}
          <div className="lg:col-span-2 space-y-3 text-right">
            <h3 className="font-bold text-gray-900 text-lg mb-4">
              خدمات تنسيق حدائق
            </h3>
            <ul className="space-y-2 text-xs sm:text-[13px]">
              {serviceLinks.map((s, idx) => (
                <li key={idx}>
                  <Link
                    href={s.href}
                    className="flex items-center gap-1.5 text-gray-600 hover:text-[#4d8834] transition-colors py-0.5 group"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 text-[#4d8834] group-hover:-translate-x-1 transition-transform flex-shrink-0" />
                    <span className="leading-snug">{s.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Important Links with arrow on the right */}
          <div className="lg:col-span-3 space-y-3 text-right">
            <h3 className="font-bold text-gray-900 text-lg mb-4">
              روابط هامة
            </h3>
            <ul className="space-y-2 text-xs sm:text-[13px]">
              {importantLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 text-gray-600 hover:text-[#4d8834] transition-colors py-0.5 group"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 text-[#4d8834] group-hover:-translate-x-1 transition-transform flex-shrink-0" />
                    <span className="leading-snug">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 border-t border-[#4d8834]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-gray-600">
          <div>
            <span>© {currentYear} جميع الحقوق محفوظة لصالح </span>
            <span className="font-bold text-[#4d8834]">مؤسسة حدائق الريان</span>
          </div>
          <div className="text-xs text-gray-500 font-medium flex items-center gap-2">
            <span>تصميم وتطوير الموقع:</span>
            <a
              href="https://wa.me/201156807072?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D9%85.%20%D8%B1%D8%A8%D9%8A%D8%B9%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D8%AA%D8%B5%D9%85%D9%8A%D9%85%20%D9%88%D8%AA%D8%B7%D9%88%D9%8A%D8%B1%20%D8%A7%D9%84%D9%85%D9%88%D8%A7%D9%82%D8%B9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-gray-900 bg-white hover:bg-[#edf7ea] hover:text-[#4d8834] px-3 py-1 rounded-full border border-[#4d8834]/30 shadow-xs hover:shadow-md transition-all duration-300 hover:scale-105 group"
              title="تواصل واتساب مع المطور م. ربيع شعبان"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>م. ربيع شعبان (Rabea Shaban)</span>
              <svg className="w-3.5 h-3.5 fill-[#25D366] group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.13.559 4.129 1.536 5.869l-1.636 5.975 6.136-1.61c1.701.928 3.647 1.466 5.714 1.466 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
