"use client";

import React from "react";
import Link from "next/link";
import { siteConfig, services } from "@/data/content";
import Logo from "@/components/Logo";

export default function Footer() {
  const currentYear = 2026;

  const contactList = [
    {
      label: "0560877272",
      href: "tel:0560877272",
      icon: (
        <svg className="w-4 h-4 text-[#e07b22] fill-current" viewBox="0 0 24 24">
          <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1v3.5a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.72 11.72 0 00.59 3.68 1 1 0 01-.24 1.02l-2.23 2.09z" />
        </svg>
      ),
    },
    {
      label: "966560877272",
      href: "tel:+966560877272",
      icon: (
        <svg className="w-4 h-4 text-[#e07b22] fill-current" viewBox="0 0 24 24">
          <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1v3.5a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.72 11.72 0 00.59 3.68 1 1 0 01-.24 1.02l-2.23 2.09z" />
        </svg>
      ),
    },
    {
      label: "info@futuregardens.sa",
      href: "mailto:info@futuregardens.sa",
      icon: (
        <svg className="w-4 h-4 text-[#e07b22] fill-current" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
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
              مؤسسة حدائق المستقبل هي أفضل شركة لتنسيق الحدائق بالرياض، حيث نقوم بتصميم وتنسيق الحدائق المنزلية والعامة، وتوريد وتركيب العشب الصناعي للحدائق والملاعب وكذلك زراعة العشب الطبيعي وزراعة الاشجار والورود والنخيل، وتركيب شلالات ونوافير منزلية، وعمل ديكورات زراعية متنوعة، بالإضافة إلى تصميم وتركيب مظلات وبرجولات على أعلى مستوى.
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
              <div className="flex items-center justify-start gap-2.5">
                
                {/* Facebook */}
                <a
                  href={siteConfig.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-700 hover:bg-[#4d8834] hover:text-white shadow-sm transition-all hover:-translate-y-0.5"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.593 0 9 1.583 9 4.615V8z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-700 hover:bg-[#4d8834] hover:text-white shadow-sm transition-all hover:-translate-y-0.5"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                  </svg>
                </a>

                {/* Twitter / X */}
                <a
                  href={siteConfig.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-700 hover:bg-[#4d8834] hover:text-white shadow-sm transition-all hover:-translate-y-0.5"
                  aria-label="Twitter"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* Pinterest */}
                <a
                  href={siteConfig.socials.pinterest}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-700 hover:bg-[#4d8834] hover:text-white shadow-sm transition-all hover:-translate-y-0.5"
                  aria-label="Pinterest"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-700 hover:bg-[#4d8834] hover:text-white shadow-sm transition-all hover:-translate-y-0.5"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href={siteConfig.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-700 hover:bg-[#4d8834] hover:text-white shadow-sm transition-all hover:-translate-y-0.5"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
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
                    className="flex items-center gap-2 text-gray-600 hover:text-[#4d8834] transition-colors py-0.5 group"
                  >
                    <span className="text-[#4d8834] font-black text-xs group-hover:-translate-x-1 transition-transform flex-shrink-0">
                      &gt;
                    </span>
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
                    className="flex items-center gap-2 text-gray-600 hover:text-[#4d8834] transition-colors py-0.5 group"
                  >
                    <span className="text-[#4d8834] font-black text-xs group-hover:-translate-x-1 transition-transform flex-shrink-0">
                      &gt;
                    </span>
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
            <span className="font-bold text-[#4d8834]">مؤسسة حدائق المستقبل</span>
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
