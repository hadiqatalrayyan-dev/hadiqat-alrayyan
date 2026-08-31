"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig, services, articlesData } from "@/data/content";
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
} from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

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

  const navServices = services.slice(0, 7);

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
    ? articlesData.filter(
        (a) =>
          a.title.toLowerCase().includes(trimmedQuery) ||
          a.excerpt.toLowerCase().includes(trimmedQuery)
      )
    : [];

  const hasResults = filteredServices.length > 0 || filteredArticles.length > 0;

  return (
    <header className="w-full font-sans bg-white select-none relative z-50">
      
      {/* 1. Top Green Bar (Visible before scroll down) */}
      {!isScrolled && (
        <div className="bg-[#4d8834] text-white text-[13px] py-1.5 px-4 shadow-sm border-b border-black/5 transition-all duration-300">
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
                className="hidden lg:flex items-center gap-1.5 text-white/95 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-white" />
                <span>راسلنا عبر البريد الإلكتروني</span>
              </a>

              {/* Working Hours */}
              <div className="flex items-center gap-1 text-white/95" dir="ltr">
                <Clock className="w-3.5 h-3.5 text-white" />
                <span>{siteConfig.workingHours}</span>
              </div>

              {/* Phone */}
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-1 text-white font-bold hover:underline"
                dir="ltr"
              >
                <Phone className="w-3.5 h-3.5 text-white" />
                <span>{siteConfig.phoneDisplay}</span>
              </a>

              <span className="text-white/40 hidden sm:inline">|</span>

              {/* Social Icons */}
              <div className="flex items-center gap-2 text-white">
                <a
                  href={siteConfig.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 transition-colors"
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
                  className="hover:text-amber-300 transition-colors"
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
                  className="hover:text-amber-300 transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href={siteConfig.socials.pinterest}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 transition-colors font-bold text-xs"
                  aria-label="Pinterest"
                >
                  <span>P</span>
                </a>
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 transition-colors"
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
                  className="hover:text-amber-300 transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Main White Navbar */}
      <div
        className={`w-full bg-white transition-all duration-300 z-50 ${
          isScrolled
            ? "fixed top-0 left-0 right-0 shadow-md py-3"
            : "relative py-3.5 sm:py-4 shadow-sm border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Right Side: Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Logo />
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-[14px] font-bold text-gray-700">
            <Link
              href="/"
              className="hover:text-[#4d8834] transition-colors py-2 border-b-2 border-transparent hover:border-[#4d8834]"
            >
              الرئيسية
            </Link>

            <Link
              href="/about"
              className="hover:text-[#4d8834] transition-colors py-2 border-b-2 border-transparent hover:border-[#4d8834]"
            >
              من نحن
            </Link>

            <Link
              href="/portfolio"
              className="hover:text-[#4d8834] transition-colors py-2 border-b-2 border-transparent hover:border-[#4d8834]"
            >
              أعمالنا
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative group py-2"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <Link
                href="/services"
                className="flex items-center gap-1 hover:text-[#4d8834] transition-colors"
              >
                <span>خدماتنا</span>
                <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-[#4d8834] transition-transform group-hover:rotate-180" />
              </Link>

              {servicesDropdown && (
                <div className="absolute top-full right-0 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 animate-fadeIn">
                  <Link
                    href="/services"
                    className="block px-4 py-2.5 text-sm font-bold text-[#4d8834] border-b border-gray-50 hover:bg-emerald-50"
                    onClick={() => setServicesDropdown(false)}
                  >
                    تصفح كافة الخدمات ←
                  </Link>
                  {navServices.map((srv) => (
                    <Link
                      key={srv.id}
                      href={`/services/${srv.slug}`}
                      className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-emerald-50 hover:text-[#4d8834] font-medium transition-colors"
                      onClick={() => setServicesDropdown(false)}
                    >
                      {srv.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className="hover:text-[#4d8834] transition-colors py-2"
            >
              تواصل معنا
            </Link>

            <Link href="/blog" className="hover:text-[#4d8834] transition-colors py-2">
              مدونة تنسيق الحدائق
            </Link>

            {/* Live Interactive Search Box & Popup */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
                  searchOpen ? "bg-[#e07b22] text-white rotate-90" : "bg-[#4d8834] text-white hover:bg-[#3d6e29]"
                }`}
                aria-label="بحث في الموقع"
              >
                {searchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
              </button>

              {searchOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 z-50 animate-fadeIn text-right font-sans">
                  
                  {/* Search Input Box */}
                  <div className="flex items-center gap-2 border-2 border-[#4d8834] focus-within:border-[#e07b22] rounded-xl px-3 py-2 bg-gray-50 transition-colors shadow-inner">
                    <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="ابحث عن خدمة، شلال، عشب، مظلات..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-xs sm:text-sm outline-none bg-transparent text-gray-800 font-medium placeholder:text-gray-400"
                      autoFocus
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Results Container */}
                  <div className="mt-3 max-h-80 overflow-y-auto divide-y divide-gray-100">
                    {trimmedQuery === "" ? (
                      <div className="py-4 text-center text-xs text-gray-500 space-y-2">
                        <p className="font-semibold text-gray-700">عمليات البحث الشائعة:</p>
                        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                          {["عشب صناعي", "شلالات", "برجولات", "ثيل طبيعي", "شبكات ري", "تصميم حدائق"].map(
                            (term, idx) => (
                              <button
                                key={idx}
                                onClick={() => setSearchQuery(term)}
                                className="text-[11px] bg-[#edf7ea] text-[#4d8834] hover:bg-[#4d8834] hover:text-white px-2.5 py-1 rounded-md transition-colors font-medium"
                              >
                                {term}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    ) : hasResults ? (
                      <div className="space-y-3 py-2">
                        
                        {/* Matching Services */}
                        {filteredServices.length > 0 && (
                          <div className="space-y-1.5">
                            <span className="text-[11px] font-bold text-[#4d8834] flex items-center gap-1 px-1">
                              <Layers className="w-3 h-3" />
                              <span>الخدمات ({filteredServices.length}):</span>
                            </span>
                            {filteredServices.map((srv) => (
                              <Link
                                key={srv.id}
                                href={`/services/${srv.slug}`}
                                onClick={() => {
                                  setSearchOpen(false);
                                  setSearchQuery("");
                                }}
                                className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#edf7ea] transition-all group"
                              >
                                <img
                                  src={srv.image}
                                  alt={srv.title}
                                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-gray-200"
                                />
                                <div className="flex-1 min-w-0 text-right">
                                  <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#4d8834] truncate">
                                    {srv.title}
                                  </h4>
                                  <p className="text-[11px] text-gray-500 truncate">
                                    {srv.shortDesc}
                                  </p>
                                </div>
                                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#4d8834] flex-shrink-0" />
                              </Link>
                            ))}
                          </div>
                        )}

                        {/* Matching Articles */}
                        {filteredArticles.length > 0 && (
                          <div className="space-y-1.5 pt-2">
                            <span className="text-[11px] font-bold text-[#e07b22] flex items-center gap-1 px-1">
                              <BookOpen className="w-3 h-3" />
                              <span>المقالات ({filteredArticles.length}):</span>
                            </span>
                            {filteredArticles.map((art) => (
                              <Link
                                key={art.id}
                                href={`/blog/${art.slug}`}
                                onClick={() => {
                                  setSearchOpen(false);
                                  setSearchQuery("");
                                }}
                                className="flex items-center gap-3 p-2 rounded-xl hover:bg-amber-50 transition-all group"
                              >
                                <img
                                  src={art.image}
                                  alt={art.title}
                                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-gray-200"
                                />
                                <div className="flex-1 min-w-0 text-right">
                                  <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#e07b22] truncate">
                                    {art.title}
                                  </h4>
                                  <p className="text-[11px] text-gray-500 truncate">
                                    {art.excerpt}
                                  </p>
                                </div>
                                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#e07b22] flex-shrink-0" />
                              </Link>
                            ))}
                          </div>
                        )}

                      </div>
                    ) : (
                      <div className="py-6 text-center text-xs text-gray-500 space-y-1">
                        <p className="font-bold text-gray-800">لا توجد نتائج مطابقة لـ "{searchQuery}"</p>
                        <p className="text-[11px] text-gray-400">جرب البحث بكلمات أخرى مثل: عشب، شلال، نخيل، مظلات</p>
                      </div>
                    )}
                  </div>

                </div>
              )}
            </div>
          </nav>

          {/* Left Side: Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop 'اتصل بنا' Button */}
            <a
              href={`tel:${siteConfig.phone}`}
              className="hidden sm:inline-flex bg-[#e5a823] hover:bg-[#d69919] text-white font-bold text-xs px-3.5 py-1.5 rounded-md shadow-sm transition-all hover:shadow hover:-translate-y-0.5 items-center gap-1"
            >
              <span>اتصل بنا</span>
            </a>

            {/* 'عرض أسعار' Button */}
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("السلام عليكم، أود الحصول على عرض سعر لتنسيق حديقة")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex bg-[#4d8834] hover:bg-[#3d6e29] text-white font-bold text-xs px-3.5 py-1.5 rounded-md shadow-sm transition-all hover:shadow hover:-translate-y-0.5 items-center gap-1"
            >
              <span>عرض أسعار</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-[#4d8834] focus:outline-none transition-colors"
              aria-label="القائمة"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 3. Off-Canvas Mobile Sidebar Drawer matching screenshot 100% */}
      {/* Dark Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-[2px] z-50 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Slide-out Sidebar from Right */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-72 sm:w-80 bg-white z-50 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out lg:hidden font-sans ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top Section */}
        <div className="flex-1 overflow-y-auto">
          
          {/* Top Bar: Social Media Icons & Close Button */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            {/* Social Icons matching screenshot */}
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

          {/* Navigation Links matching screenshot */}
          <div className="py-2 text-right divide-y divide-gray-100">
            <Link
              href="/"
              className="block px-6 py-3 text-sm font-bold text-gray-800 hover:text-[#4d8834] hover:bg-emerald-50/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              الرئيسية
            </Link>

            <Link
              href="/about"
              className="block px-6 py-3 text-sm font-bold text-gray-800 hover:text-[#4d8834] hover:bg-emerald-50/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              من نحن
            </Link>

            <Link
              href="/portfolio"
              className="block px-6 py-3 text-sm font-bold text-gray-800 hover:text-[#4d8834] hover:bg-emerald-50/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              أعمالنا
            </Link>

            {/* Services with Dropdown Accordion */}
            <div>
              <div
                className="flex items-center justify-between px-6 py-3 text-sm font-bold text-gray-800 hover:text-[#4d8834] hover:bg-emerald-50/50 transition-colors cursor-pointer"
                onClick={() => setServicesDropdown(!servicesDropdown)}
              >
                <span>خدماتنا</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    servicesDropdown ? "rotate-180 text-[#4d8834]" : ""
                  }`}
                />
              </div>

              {servicesDropdown && (
                <div className="bg-gray-50/80 py-1.5 px-4 space-y-1">
                  <Link
                    href="/services"
                    className="block px-4 py-2 text-xs font-bold text-[#4d8834] hover:underline"
                    onClick={() => {
                      setIsOpen(false);
                      setServicesDropdown(false);
                    }}
                  >
                    تصفح كافة الخدمات ←
                  </Link>
                  {navServices.map((srv) => (
                    <Link
                      key={srv.id}
                      href={`/services/${srv.slug}`}
                      className="block px-4 py-2 text-xs text-gray-700 hover:text-[#4d8834] font-medium transition-colors"
                      onClick={() => {
                        setIsOpen(false);
                        setServicesDropdown(false);
                      }}
                    >
                      {srv.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className="block px-6 py-3 text-sm font-bold text-gray-800 hover:text-[#4d8834] hover:bg-emerald-50/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              تواصل معنا
            </Link>

            <Link
              href="/blog"
              className="block px-6 py-3 text-sm font-bold text-gray-800 hover:text-[#4d8834] hover:bg-emerald-50/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              مدونة تنسيق الحدائق
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
