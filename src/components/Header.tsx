"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig, services, articlesData } from "@/data/content";
import { getUnifiedArticles } from "@/lib/articles";
import { UnifiedArticle } from "@/types/article";
import Logo from "@/components/Logo";
import {
  Phone,
  Mail,
  Clock,
  Search,
  ChevronDown,
  Menu,
  X,
  ArrowUpRight,
  BookOpen,
  Layers,
  PhoneCall,
  FileText,
} from "lucide-react";
import {
  FaWhatsapp,
} from "react-icons/fa6";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [gardenDropdown, setGardenDropdown] = useState(false);
  const [grassDropdown, setGrassDropdown] = useState(false);
  const [mobileGardenOpen, setMobileGardenOpen] = useState(false);
  const [mobileGrassOpen, setMobileGrassOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState<UnifiedArticle[]>(articlesData as UnifiedArticle[]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    getUnifiedArticles()
      .then((unified) => {
        if (isMounted && unified && unified.length > 0) {
          setArticles(unified);
        }
      })
      .catch(() => {
        // Fallback to static articles
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside to close search
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    }
    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen]);

  const gardenDropdownItems = [
    { title: "تنسيق حدائق منزلية", href: "/blog/home-garden-landscaping-riyadh-ideas" },
    { title: "تصميم حدائق فلل", href: "/blog/garden-design-riyadh-latest-ideas-villas" },
    { title: "تنسيق حدائق قصور", href: "/blog/luxury-villa-landscaping-offers-riyadh-competitive-prices" },
    { title: "تنسيق حدائق استراحات", href: "/blog/landscaping-decorations-company-riyadh-villas-chalets" },
    { title: "تصميم لاندسكيب", href: "/blog/landscape-riyadh-ultimate-guide-companies" },
  ];

  const artificialGrassDropdownItems = [
    { title: "توريد عشب صناعي", href: "/blog/best-artificial-grass-company-riyadh" },
    { title: "تركيب عشب صناعي", href: "/blog/top-artificial-grass-company-riyadh-prices" },
    { title: "عشب صناعي للحدائق", href: "/services/artificial-grass" },
    { title: "عشب صناعي للملاعب", href: "/services/sport-turf" },
    { title: "عشب جداري", href: "/services/green-walls" },
  ];

  // Filter Services and Articles based on search query
  const trimmedQuery = searchQuery.trim().toLowerCase();

  const filteredServices = trimmedQuery
    ? services.filter(
        (s) =>
          s.title.toLowerCase().includes(trimmedQuery) ||
          s.shortDesc.toLowerCase().includes(trimmedQuery) ||
          s.category.toLowerCase().includes(trimmedQuery)
      )
    : [];

  const filteredArticles = trimmedQuery
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(trimmedQuery) ||
          a.excerpt.toLowerCase().includes(trimmedQuery) ||
          a.category.toLowerCase().includes(trimmedQuery) ||
          a.pillText.toLowerCase().includes(trimmedQuery) ||
          (a.keywords && a.keywords.some((k) => k.toLowerCase().includes(trimmedQuery)))
      )
    : [];

  const hasResults = filteredServices.length > 0 || filteredArticles.length > 0;

  return (
    <header className="w-full font-sans bg-white select-none relative z-50">
      
      {/* 1. Top Green Bar (Visible before scroll down) */}
      {!isScrolled && (
        <div className="bg-[#1d5512] text-white text-[13px] py-1.5 px-4 shadow-sm border-b border-black/5 transition-all duration-300">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
            
            {/* Tagline */}
            <div className="w-full md:w-auto text-center md:text-right font-bold text-white tracking-wide text-xs sm:text-[13px]">
              <span>{siteConfig.tagline}</span>
            </div>

            {/* Desktop Left Info & Social Links */}
            <div className="hidden md:flex items-center gap-3 sm:gap-4 flex-wrap text-xs sm:text-[13px]">
              {/* Email */}
              <a
                href={`mailto:${siteConfig.email}`}
                className="hidden lg:flex items-center gap-1.5 text-white hover:text-amber-200 transition-colors py-1"
              >
                <Mail className="w-3.5 h-3.5 text-white" />
                <span>راسلنا عبر البريد الإلكتروني</span>
              </a>

              {/* Working Hours */}
              <div className="flex items-center gap-1 text-white" dir="ltr">
                <Clock className="w-3.5 h-3.5 text-white" />
                <span>{siteConfig.workingHours}</span>
              </div>

              {/* Phone */}
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-1 text-white font-bold hover:underline py-1"
                dir="ltr"
              >
                <Phone className="w-3.5 h-3.5 text-white" />
                <span>{siteConfig.phoneDisplay}</span>
              </a>


            </div>
          </div>
        </div>
      )}

      {/* 2. Main White Navbar */}
      <div
        className={`w-full bg-white transition-all duration-300 z-50 ${
          isScrolled
            ? "fixed top-0 left-0 right-0 shadow-md py-2.5"
            : "relative py-3 shadow-sm border-b border-gray-100"
        }`}
      >
        <div className="max-w-[1550px] mx-auto px-2 sm:px-4 lg:px-6 flex items-center justify-between gap-2">
          
          {/* Right Side: Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <Logo size="sm" />
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 xl:gap-1.5 2xl:gap-2.5 text-[11.5px] 2xl:text-[13px] font-bold text-gray-800 whitespace-nowrap">
            <Link
              href="/"
              className="hover:text-[#4d8834] transition-colors px-1 py-1 border-b-2 border-transparent hover:border-[#4d8834]"
            >
              الرئيسية
            </Link>

            {/* تنسيق حدائق Dropdown */}
            <div
              className="relative group py-1 px-0.5"
              onMouseEnter={() => setGardenDropdown(true)}
              onMouseLeave={() => setGardenDropdown(false)}
            >
              <Link
                href="/services/garden-design"
                className="flex items-center gap-0.5 hover:text-[#4d8834] transition-colors"
              >
                <span>تنسيق حدائق</span>
                <ChevronDown className="w-3 h-3 text-gray-500 group-hover:text-[#4d8834] transition-transform group-hover:rotate-180" />
              </Link>

              {gardenDropdown && (
                <div className="absolute top-full right-0 w-60 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-fadeIn text-right">
                  <Link
                    href="/services/garden-design"
                    className="block px-4 py-2 text-xs font-bold text-[#4d8834] border-b border-gray-100 hover:bg-emerald-50"
                    onClick={() => setGardenDropdown(false)}
                  >
                    كافة خدمات تنسيق الحدائق ←
                  </Link>
                  {gardenDropdownItems.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      className="block px-4 py-1.5 text-xs text-gray-700 hover:bg-emerald-50 hover:text-[#4d8834] font-medium transition-colors"
                      onClick={() => setGardenDropdown(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* العشب الصناعي Dropdown */}
            <div
              className="relative group py-1 px-0.5"
              onMouseEnter={() => setGrassDropdown(true)}
              onMouseLeave={() => setGrassDropdown(false)}
            >
              <Link
                href="/services/artificial-grass"
                className="flex items-center gap-0.5 hover:text-[#4d8834] transition-colors"
              >
                <span>العشب الصناعي</span>
                <ChevronDown className="w-3 h-3 text-gray-500 group-hover:text-[#4d8834] transition-transform group-hover:rotate-180" />
              </Link>

              {grassDropdown && (
                <div className="absolute top-full right-0 w-60 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-fadeIn text-right">
                  <Link
                    href="/services/artificial-grass"
                    className="block px-4 py-2 text-xs font-bold text-[#4d8834] border-b border-gray-100 hover:bg-emerald-50"
                    onClick={() => setGrassDropdown(false)}
                  >
                    كافة خدمات العشب الصناعي ←
                  </Link>
                  {artificialGrassDropdownItems.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      className="block px-4 py-1.5 text-xs text-gray-700 hover:bg-emerald-50 hover:text-[#4d8834] font-medium transition-colors"
                      onClick={() => setGrassDropdown(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/services/natural-grass"
              className="hover:text-[#4d8834] transition-colors px-1 py-1 border-b-2 border-transparent hover:border-[#4d8834]"
            >
              العشب الطبيعي
            </Link>

            <Link
              href="/services/waterfalls-fountains"
              className="hover:text-[#4d8834] transition-colors px-1 py-1 border-b-2 border-transparent hover:border-[#4d8834]"
            >
              الشلالات والنوافير
            </Link>

            <Link
              href="/services/pergolas-canopies"
              className="hover:text-[#4d8834] transition-colors px-1 py-1 border-b-2 border-transparent hover:border-[#4d8834]"
            >
              البرجولات والمظلات
            </Link>

            <Link
              href="/services/irrigation-systems"
              className="hover:text-[#4d8834] transition-colors px-1 py-1 border-b-2 border-transparent hover:border-[#4d8834]"
            >
              شبكات الري
            </Link>

            <Link
              href="/services/sport-turf"
              className="hover:text-[#4d8834] transition-colors px-1 py-1 border-b-2 border-transparent hover:border-[#4d8834]"
            >
              الملاعب
            </Link>

            <Link
              href="/portfolio"
              className="hover:text-[#4d8834] transition-colors px-1 py-1 border-b-2 border-transparent hover:border-[#4d8834]"
            >
              أعمالنا
            </Link>

            <Link
              href="/blog"
              className="hover:text-[#4d8834] transition-colors px-1 py-1 border-b-2 border-transparent hover:border-[#4d8834]"
            >
              مدونة تنسيق الحدائق
            </Link>

            <Link
              href="/contact"
              className="hover:text-[#4d8834] transition-colors px-1 py-1 border-b-2 border-transparent hover:border-[#4d8834]"
            >
              تواصل معنا
            </Link>
          </nav>

          {/* Left Side: Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Desktop 'اتصل بنا' Button */}
            <a
              href={`tel:${siteConfig.phone}`}
              aria-label={`اتصل بنا هاتفياً على ${siteConfig.phoneDisplay}`}
              className="hidden sm:inline-flex bg-[#c27607] hover:bg-[#a36306] text-white font-bold text-[11px] 2xl:text-xs px-2.5 2xl:px-3 py-1.5 rounded-md shadow-sm transition-all hover:shadow hover:-translate-y-0.5 items-center gap-1"
            >
              <PhoneCall className="w-3 h-3" />
              <span>اتصل بنا</span>
            </a>

            {/* 'عرض أسعار' Button */}
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("السلام عليكم، أود الحصول على عرض سعر لتنسيق حديقة")}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="طلب عرض أسعار عبر الواتساب"
              className="hidden sm:inline-flex bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-[11px] 2xl:text-xs px-2.5 2xl:px-3 py-1.5 rounded-md shadow-sm transition-all hover:shadow hover:-translate-y-0.5 items-center gap-1"
            >
              <FaWhatsapp className="w-3 h-3" />
              <span>طلب عرض سعر</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden p-2 text-gray-700 hover:text-[#4d8834] focus:outline-none transition-colors"
              aria-label="القائمة"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 3. Off-Canvas Mobile Sidebar Drawer */}
      {/* Dark Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-[2px] z-50 transition-opacity duration-300 xl:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Slide-out Sidebar from Right */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-72 sm:w-80 bg-white z-50 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out xl:hidden font-sans ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top Section */}
        <div className="flex-1 overflow-y-auto">
          
          {/* Top Bar: Social Media Icons & Close Button */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            {/* Social Icons */}
            <div className="flex items-center gap-2 text-gray-500">
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center hover:text-[#4d8834] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.593 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center hover:text-[#4d8834] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                </svg>
              </a>
              <a
                href={siteConfig.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center hover:text-[#4d8834] transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={siteConfig.socials.pinterest}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center hover:text-[#4d8834] transition-colors"
                aria-label="Pinterest"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center hover:text-[#4d8834] transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
              <a
                href={siteConfig.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center hover:text-[#4d8834] transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors"
              aria-label="إغلاق القائمة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links in exact order */}
          <div className="py-2 text-right divide-y divide-gray-100">
            <Link
              href="/"
              className="block px-6 py-2.5 text-sm font-bold text-gray-800 hover:text-[#4d8834] hover:bg-emerald-50/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              الرئيسية
            </Link>

            {/* 1. تنسيق حدائق Accordion */}
            <div>
              <div
                className="flex items-center justify-between px-6 py-2.5 text-sm font-bold text-gray-800 hover:text-[#4d8834] hover:bg-emerald-50/50 transition-colors cursor-pointer"
                onClick={() => setMobileGardenOpen(!mobileGardenOpen)}
              >
                <span>تنسيق حدائق</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    mobileGardenOpen ? "rotate-180 text-[#4d8834]" : ""
                  }`}
                />
              </div>

              {mobileGardenOpen && (
                <div className="bg-gray-50/80 py-1.5 px-4 space-y-1">
                  <Link
                    href="/services/garden-design"
                    className="block px-4 py-1.5 text-xs font-bold text-[#4d8834] hover:underline"
                    onClick={() => {
                      setIsOpen(false);
                      setMobileGardenOpen(false);
                    }}
                  >
                    كافة خدمات تنسيق الحدائق ←
                  </Link>
                  {gardenDropdownItems.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      className="block px-4 py-1.5 text-xs text-gray-700 hover:text-[#4d8834] font-medium transition-colors"
                      onClick={() => {
                        setIsOpen(false);
                        setMobileGardenOpen(false);
                      }}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 2. العشب الصناعي Accordion */}
            <div>
              <div
                className="flex items-center justify-between px-6 py-2.5 text-sm font-bold text-gray-800 hover:text-[#4d8834] hover:bg-emerald-50/50 transition-colors cursor-pointer"
                onClick={() => setMobileGrassOpen(!mobileGrassOpen)}
              >
                <span>العشب الصناعي</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    mobileGrassOpen ? "rotate-180 text-[#4d8834]" : ""
                  }`}
                />
              </div>

              {mobileGrassOpen && (
                <div className="bg-gray-50/80 py-1.5 px-4 space-y-1">
                  <Link
                    href="/services/artificial-grass"
                    className="block px-4 py-1.5 text-xs font-bold text-[#4d8834] hover:underline"
                    onClick={() => {
                      setIsOpen(false);
                      setMobileGrassOpen(false);
                    }}
                  >
                    كافة خدمات العشب الصناعي ←
                  </Link>
                  {artificialGrassDropdownItems.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      className="block px-4 py-1.5 text-xs text-gray-700 hover:text-[#4d8834] font-medium transition-colors"
                      onClick={() => {
                        setIsOpen(false);
                        setMobileGrassOpen(false);
                      }}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 3. العشب الطبيعي */}
            <Link
              href="/services/natural-grass"
              className="block px-6 py-2.5 text-sm font-bold text-gray-800 hover:text-[#4d8834] hover:bg-emerald-50/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              العشب الطبيعي
            </Link>

            {/* 4. الشلالات والنوافير */}
            <Link
              href="/services/waterfalls-fountains"
              className="block px-6 py-2.5 text-sm font-bold text-gray-800 hover:text-[#4d8834] hover:bg-emerald-50/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              الشلالات والنوافير
            </Link>

            {/* 5. البرجولات والمظلات */}
            <Link
              href="/services/pergolas-canopies"
              className="block px-6 py-2.5 text-sm font-bold text-gray-800 hover:text-[#4d8834] hover:bg-emerald-50/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              البرجولات والمظلات
            </Link>

            {/* 6. شبكات الري */}
            <Link
              href="/services/irrigation-systems"
              className="block px-6 py-2.5 text-sm font-bold text-gray-800 hover:text-[#4d8834] hover:bg-emerald-50/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              شبكات الري
            </Link>

            {/* 7. الملاعب */}
            <Link
              href="/services/sport-turf"
              className="block px-6 py-2.5 text-sm font-bold text-gray-800 hover:text-[#4d8834] hover:bg-emerald-50/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              الملاعب
            </Link>

            {/* 8. أعمالنا */}
            <Link
              href="/portfolio"
              className="block px-6 py-2.5 text-sm font-bold text-gray-800 hover:text-[#4d8834] hover:bg-emerald-50/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              أعمالنا
            </Link>

            {/* 9. مدونة تنسيق الحدائق */}
            <Link
              href="/blog"
              className="block px-6 py-2.5 text-sm font-bold text-gray-800 hover:text-[#4d8834] hover:bg-emerald-50/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              مدونة تنسيق الحدائق
            </Link>

            {/* 10. تواصل معنا */}
            <Link
              href="/contact"
              className="block px-6 py-2.5 text-sm font-bold text-gray-800 hover:text-[#4d8834] hover:bg-emerald-50/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              تواصل معنا
            </Link>
          </div>

        </div>

        {/* Bottom Quick Contact Action in Sidebar */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 space-y-2">
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center justify-center gap-2 w-full bg-[#e5a823] hover:bg-[#d69919] text-white font-bold text-xs py-3 rounded-xl shadow-sm transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>اتصل بنا: {siteConfig.phoneDisplay}</span>
          </a>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="محادثة واتساب مباشرة مع المبيعات"
            className="flex items-center justify-center gap-2 w-full bg-[#4d8834] hover:bg-[#3d6e29] text-white font-bold text-xs py-3 rounded-xl shadow-sm transition-colors"
          >
            <span>واتساب مباشر</span>
          </a>
        </div>

      </div>
    </header>
  );
}
