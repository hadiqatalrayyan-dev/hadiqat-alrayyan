import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import ProfileCard from "@/components/ProfileCard";
import { services, getServiceBySlug, siteConfig } from "@/data/content";
import { serviceArticles } from "@/data/serviceArticles";
import { marketingArticles } from "@/data/marketingArticles";
import { megaEncyclopedia } from "@/data/megaEncyclopedia";
import { serviceGalleries } from "@/data/serviceGalleries";
import { Image as ImageIcon } from "lucide-react";
import {
  Phone,
  MessageCircle,
  CheckCircle2,
  ShieldCheck,
  Star,
  Clock,
  ArrowLeft,
  Wrench,
  FileCheck2,
  HelpCircle,
  Award,
  BookOpen,
  User,
  ListOrdered,
  Info,
  Calendar,
  Eye,
  Tag,
  Lightbulb,
  Check,
  Compass,
  GraduationCap,
  Layers,
  AlertTriangle,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "الخدمة غير موجودة | مؤسسة حدائق الريان",
    };
  }

  const mkt = marketingArticles[slug];
  const pageTitle = mkt?.seoMetaTitle 
    ? `${mkt.seoMetaTitle} | مؤسسة حدائق الريان بالرياض`
    : `${service.title} بالرياض | مؤسسة حدائق الريان`;

  const pageDescription = `${service.shortDesc} أفضل أسعار توريد وتركيب مع ضمان معتمد يصل إلى 7 سنوات وتصميم 3D مجاناً بالرياض. اتصل الآن: ${siteConfig.phoneDisplay}`;

  const allKeywords = [
    service.title,
    `${service.title} بالرياض`,
    `${service.title} شمال الرياض`,
    `${service.title} شرق الرياض`,
    "تنسيق حدائق الرياض",
    "تصميم حدائق فلل وقصور",
    "اسعار تنسيق الحدائق 2026",
    "افضل شركة لاندسكيب",
    "مؤسسة حدائق الريان",
    ...(mkt?.targetKeywords || []),
  ];

  const canonicalUrl = `https://hadiqat-alrayan.com/services/${slug}/`;
  const imgUrl = service.image.startsWith("http") ? service.image : `https://hadiqat-alrayan.com${service.image}`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: allKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    authors: [{ name: "مؤسسة حدائق الريان لتنسيق الحدائق", url: "https://hadiqat-alrayan.com" }],
    creator: "مؤسسة حدائق الريان",
    publisher: "مؤسسة حدائق الريان لتنسيق الحدائق",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: "مؤسسة حدائق الريان لتنسيق الحدائق بالرياض",
      locale: "ar_SA",
      type: "website",
      images: [
        {
          url: imgUrl,
          width: 1200,
          height: 630,
          alt: `${service.title} بالرياض - مؤسسة حدائق الريان`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [imgUrl],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const article = serviceArticles[slug];
  const mkt = marketingArticles[slug];
  const encyclopedia = megaEncyclopedia[slug];
  const otherServices = services.filter((s) => s.slug !== slug).slice(0, 6);

  // Schema.org Structured Data (JSON-LD)
  const serviceImgUrl = service.image.startsWith("http")
    ? service.image
    : `https://hadiqat-alrayan.com${service.image}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "serviceType": service.category,
    "description": service.shortDesc,
    "image": serviceImgUrl,
    "url": `https://hadiqat-alrayan.com/services/${slug}`,
    "provider": {
      "@type": "HomeAndConstructionBusiness",
      "name": "مؤسسة حدائق الريان لتنسيق الحدائق بالرياض",
      "telephone": siteConfig.phone,
      "email": siteConfig.email,
      "url": "https://hadiqat-alrayan.com",
      "logo": "https://hadiqat-alrayan.com/logo.png",
      "image": "https://hadiqat-alrayan.com/images/og-image.webp",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "طريق الملك فهد، حي الصحافة",
        "addressCountry": "SA",
        "addressRegion": "Riyadh",
        "addressLocality": "الرياض"
      },
      "priceRange": "$$"
    },
    "areaServed": [
      { "@type": "City", "name": "الرياض" },
      { "@type": "City", "name": "جدة" },
      { "@type": "City", "name": "مكة المكرمة" },
      { "@type": "City", "name": "الدمام" },
      { "@type": "City", "name": "الخبر" },
      { "@type": "Country", "name": "المملكة العربية السعودية" }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "الرئيسية",
        "item": "https://hadiqat-alrayan.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "خدماتنا",
        "item": "https://hadiqat-alrayan.com/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": `https://hadiqat-alrayan.com/services/${slug}`
      }
    ]
  };

  const faqSchema = service.serviceFaqs && service.serviceFaqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.serviceFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  } : null;

  return (
    <div className="min-h-screen bg-[#edf7ea] text-gray-800 font-sans select-none">
      {/* Embedded Schema.org JSON-LD for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Header />

      {/* 1. Hero Banner matching user screenshot 100% */}
      <section className="relative bg-[#0b3414] text-white py-12 sm:py-16 border-b-4 border-[#e07b22] overflow-hidden">
        {/* Grass texture overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: "url('/images/why_choose_us_garden.webp')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07240d]/95 via-[#0b3414]/90 to-[#07240d]/95" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Right Column in RTL: Breadcrumb, Titles, Description & Call Button */}
            <div className="lg:col-span-7 space-y-4 text-right">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="text-xs sm:text-sm text-emerald-300/80 font-semibold space-x-2 space-x-reverse">
                <Link href="/" className="hover:text-white transition-colors">
                  حدائق الريان لتنسيق الحدائق
                </Link>
                <span>»</span>
                <Link href="/services" className="hover:text-white transition-colors">
                  خدماتنا
                </Link>
                <span>»</span>
                <span className="text-white">{service.title}</span>
              </nav>

              {/* Subheading in light lime */}
              <span className="block text-emerald-200 text-xs sm:text-sm font-semibold">
                {service.shortDesc}
              </span>

              {/* Main Heading */}
              <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight">
                {service.title}
              </h1>

              {/* Hero Paragraph matching screenshot */}
              <p className="text-emerald-100/95 text-xs sm:text-[13px] leading-relaxed">
                {service.heroParagraph}
              </p>

              {/* CTA Button matching screenshot */}
              <div className="pt-2">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex items-center gap-2 bg-[#e5a823] hover:bg-[#d49919] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Phone className="w-4 h-4" />
                  <span>اطلب/استفسر عن الخدمة</span>
                </a>
              </div>
            </div>

            {/* Left Column in RTL: Featured Service Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-none sm:rounded-lg overflow-hidden shadow-2xl border-2 border-white/20 bg-black">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-72 sm:h-96 object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="py-16 sm:py-20 bg-[#edf7ea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Main Content (Right 8 Cols in RTL) */}
            <div className="lg:col-span-8 space-y-8 text-right">
              
              {/* Comprehensive Long-Form Overview Paragraphs */}
              <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-gray-100 space-y-5">
                <h2 className="text-2xl font-black text-gray-900 pb-3 border-b border-gray-100 flex items-center gap-2">
                  <Award className="w-6 h-6 text-[#4d8834]" />
                  <span>دليل ومقدمة شاملة عن {service.title}</span>
                </h2>
                
                <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-loose">
                  {service.fullOverview.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Engineering Execution Guide */}
              <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-gray-100">
                <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2 pb-3 border-b border-gray-100">
                  <Wrench className="w-5 h-5 text-[#4d8834]" />
                  <span>مراحل وخطوات التنفيذ الهندسي</span>
                </h3>

                <div className="space-y-4">
                  {service.executionSteps.map((step) => (
                    <div
                      key={step.stepNum}
                      className="p-5 rounded-2xl bg-[#edf7ea] border border-[#4d8834]/20 flex items-start gap-4 transition-all hover:shadow-sm"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#4d8834] text-white font-black text-lg flex items-center justify-center flex-shrink-0 shadow">
                        {step.stepNum}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-gray-900">{step.title}</h4>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-gray-100">
                <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2 pb-3 border-b border-gray-100">
                  <FileCheck2 className="w-5 h-5 text-[#4d8834]" />
                  <span>المواصفات الفنية المعتمدة</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.specifications.map((spec, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-gray-50 border border-gray-200/80 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#4d8834] flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-bold text-gray-800">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

                            {/* Real Projects Photo Gallery for this Service */}
              {serviceGalleries[slug] && serviceGalleries[slug].length > 0 && (
                <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#edf7ea] text-[#4d8834] text-xs font-bold mb-2">
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>صور حية من الميدان</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-gray-900">
                        معرض سابقة أعمالنا في {service.title} بالرياض
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-gray-400">
                      {serviceGalleries[slug].length} صور
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                    {serviceGalleries[slug].map((imgSrc, imgIdx) => (
                      <div
                        key={imgIdx}
                        className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all aspect-square bg-gray-100 cursor-pointer border border-gray-100"
                      >
                        <img
                          src={imgSrc}
                          alt={`${service.title} - صورة ${imgIdx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-xs font-bold bg-[#4d8834] px-2.5 py-1 rounded-lg">
                            مشروع منفذ
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Deep 2000-Word Comprehensive In-Depth Article Section */}
              {article && (
                <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-gray-100 space-y-8">
                  {/* Article Header */}
                  <div className="border-b border-gray-100 pb-6 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#4d8834] text-xs font-bold">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>مقال وبحث تخصصي متكامل</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                      {article.articleTitle}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span>{article.metaReadTime}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-amber-500" />
                        <span>{article.authorTitle}</span>
                      </span>
                    </div>
                  </div>

                  {/* Intro Summary Box */}
                  <div className="bg-[#edf7ea] border-r-4 border-[#4d8834] p-5 rounded-2xl">
                    <p className="text-gray-800 text-sm sm:text-base font-semibold leading-relaxed">
                      {article.introSummary}
                    </p>
                  </div>

                  {/* Table of Contents */}
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                    <h4 className="font-bold text-gray-900 text-base mb-3 flex items-center gap-2">
                      <ListOrdered className="w-4 h-4 text-[#4d8834]" />
                      <span>فهرس ومحاور المقال:</span>
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-700">
                      {article.tableOfContents.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4d8834]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Article Body Sections */}
                  <div className="space-y-8">
                    {article.sections.map((sec, idx) => (
                      <div key={idx} className="space-y-4">
                        <h4 className="text-xl font-bold text-gray-900 text-[#0b3414] pb-2 border-b border-gray-100">
                          {sec.heading}
                        </h4>
                        
                        <div className="space-y-3 text-gray-700 text-sm sm:text-base leading-loose">
                          {sec.paragraphs.map((p, pIdx) => (
                            <p key={pIdx}>{p}</p>
                          ))}
                        </div>

                        {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                          <ul className="space-y-2 pr-4 bg-gray-50/70 p-4 rounded-xl">
                            {sec.bulletPoints.map((bp, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-800 font-medium">
                                <CheckCircle2 className="w-4 h-4 text-[#4d8834] flex-shrink-0 mt-0.5" />
                                <span>{bp}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {sec.calloutBox && (
                          <div className="bg-amber-50 border-r-4 border-[#e5a823] p-4 rounded-xl flex items-start gap-3">
                            <Info className="w-5 h-5 text-[#e5a823] flex-shrink-0 mt-0.5" />
                            <p className="text-xs sm:text-sm text-amber-900 font-semibold leading-relaxed">
                              {sec.calloutBox}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Conclusion */}
                  <div className="bg-[#0b3414] text-white p-6 sm:p-8 rounded-2xl space-y-3">
                    <h4 className="text-lg font-bold text-amber-400">خلاصة وتوصيات الخبراء:</h4>
                    <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                      {article.conclusion}
                    </p>
                  </div>
                </div>
              )}

              {/* 4. WordPress / Blogger SEO Marketing Article Section (~2000 Words) */}
              {mkt && (
                <article className="bg-white rounded-3xl p-6 sm:p-10 shadow-md border-2 border-emerald-100 space-y-8 text-right font-sans">
                  
                  {/* WordPress Header Meta Bar */}
                  <div className="space-y-4 pb-6 border-b border-gray-100">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#e07b22]/10 text-[#e07b22] text-xs font-black">
                        <span>دليل تسويقي واستشاري معتمد 2026</span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{mkt.postDate}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{mkt.viewsCount}</span>
                        </span>
                      </div>
                    </div>

                    <h2 className="text-2xl sm:text-4xl font-black text-gray-900 leading-tight">
                      {mkt.h1Title}
                    </h2>

                    {/* SEO Target Keywords Tags */}
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
                        <Tag className="w-3 h-3 text-[#4d8834]" />
                        <span>الكلمات الأكثر بحثاً:</span>
                      </span>
                      {mkt.targetKeywords.map((kw, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-semibold bg-gray-100 hover:bg-[#edf7ea] hover:text-[#4d8834] text-gray-700 px-2.5 py-1 rounded-md transition-colors"
                        >
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* WordPress Editorial Excerpt Callout */}
                  <div className="bg-gradient-to-r from-emerald-50 to-[#edf7ea] p-6 rounded-2xl border-r-4 border-[#4d8834] space-y-2">
                    <h3 className="text-base font-bold text-gray-900">نظرة عامة على المقال:</h3>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      {mkt.summaryBox}
                    </p>
                  </div>

                  {/* Key Takeaways Box (Blogger / WordPress Style) */}
                  <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-6 space-y-4">
                    <h3 className="text-lg font-bold text-amber-900 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-amber-600" />
                      <span>أبرز النقاط والمعلومات في سطور سريعة:</span>
                    </h3>
                    <ul className="space-y-2.5">
                      {mkt.keyTakeaways.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-amber-950 font-medium">
                          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* WordPress Article HTML Content */}
                  <div
                    className="prose prose-emerald max-w-none text-gray-700 leading-loose text-sm sm:text-base space-y-6"
                    dangerouslySetInnerHTML={{ __html: mkt.contentHtml }}
                  />

                  {/* Gutenberg Comparison Table */}
                  {mkt.comparisonTable && (
                    <div className="space-y-3 pt-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        مقارنة الأسعار والمواصفات المعتمدة:
                      </h3>
                      <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                        <table className="w-full text-right text-xs sm:text-sm">
                          <thead className="bg-[#4d8834] text-white">
                            <tr>
                              {mkt.comparisonTable.headers.map((th, idx) => (
                                <th key={idx} className="p-3.5 font-bold border-l border-white/20 last:border-l-0">
                                  {th}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {mkt.comparisonTable.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-[#edf7ea]/50 transition-colors">
                                {row.map((td, cIdx) => (
                                  <td key={cIdx} className="p-3.5 font-semibold text-gray-800 border-l border-gray-100 last:border-l-0">
                                    {td}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Pro Tips Box */}
                  {mkt.proTips && mkt.proTips.length > 0 && (
                    <div className="bg-emerald-900 text-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-lg">
                      <h3 className="text-lg sm:text-xl font-bold text-amber-400 flex items-center gap-2">
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <span>نصائح ذهبية من خبراء حدائق الريان قبل الشراء والتركيب:</span>
                      </h3>
                      <ul className="space-y-3">
                        {mkt.proTips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-emerald-100 font-medium">
                            <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                              {idx + 1}
                            </span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* In-Article High-Converting CTA Banner */}
                  <div className="bg-gradient-to-r from-[#e5a823] to-[#d49919] text-white p-6 sm:p-8 rounded-2xl shadow-xl text-center space-y-4">
                    <h3 className="text-xl sm:text-2xl font-black">
                      عرض خاص لزوار الموقع اليوم
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-50 max-w-2xl mx-auto leading-relaxed">
                      {mkt.ctaBannerText}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <a
                        href={`tel:${siteConfig.phone}`}
                        className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-6 py-3 rounded-xl shadow text-xs sm:text-sm transition-all"
                      >
                        اتصل بنا الآن: {siteConfig.phoneDisplay}
                      </a>
                      <a
                        href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`السلام عليكم، قرأت مقال: ${mkt.h1Title} وأرغب في عرض سعر`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#0b3414] hover:bg-[#07240d] text-white font-bold px-6 py-3 rounded-xl shadow text-xs sm:text-sm transition-all"
                      >
                        محادثة واتساب فورية
                      </a>
                    </div>
                  </div>

                </article>
              )}

              {/* 5. Massive Encyclopedic Knowledge Base (+3000 Words Section) */}
              {encyclopedia && (
                <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border-2 border-[#4d8834]/30 space-y-8 text-right font-sans relative overflow-hidden">
                  
                  {/* Watermark Decoration */}
                  <div className="absolute left-0 top-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

                  {/* Encyclopedia Header */}
                  <div className="border-b-2 border-[#4d8834]/20 pb-6 space-y-3 relative z-10">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b3414] text-amber-400 text-xs font-black">
                        <GraduationCap className="w-4 h-4" />
                        <span>الموسوعة الهندسية التخصصية المعتمدة</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 font-bold">
                        <span className="bg-emerald-100 text-[#4d8834] px-2.5 py-1 rounded-md">
                          {encyclopedia.metaWordsCount}
                        </span>
                        <span>•</span>
                        <span>{encyclopedia.readTime}</span>
                      </div>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                      {encyclopedia.mainTitle}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 font-medium">
                      {encyclopedia.subtitle}
                    </p>
                  </div>

                  {/* Encyclopedia Sections */}
                  <div className="space-y-10 relative z-10">
                    {encyclopedia.sections.map((sec, idx) => (
                      <div key={idx} className="space-y-4">
                        <div className="flex items-center gap-3">
                          {sec.badge && (
                            <span className="text-[11px] font-bold bg-[#edf7ea] text-[#4d8834] border border-[#4d8834]/30 px-3 py-0.5 rounded-full">
                              {sec.badge}
                            </span>
                          )}
                          <h3 className="text-xl sm:text-2xl font-black text-gray-900 text-[#0b3414]">
                            {sec.title}
                          </h3>
                        </div>

                        <div className="space-y-3 text-gray-700 text-sm sm:text-base leading-loose">
                          {sec.paragraphs.map((p, pIdx) => (
                            <p key={pIdx}>{p}</p>
                          ))}
                        </div>

                        {/* Subsections if any */}
                        {sec.subsections && sec.subsections.map((sub, sIdx) => (
                          <div key={sIdx} className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-2 mt-3">
                            <h4 className="text-base font-bold text-gray-900">{sub.subtitle}</h4>
                            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{sub.text}</p>
                            {sub.points && (
                              <ul className="space-y-1.5 pt-2">
                                {sub.points.map((pt, ptIdx) => (
                                  <li key={ptIdx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-800 font-medium">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4d8834] flex-shrink-0" />
                                    <span>{pt}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}

                        {/* Geological Table if present */}
                        {sec.tableData && (
                          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm mt-3">
                            <table className="w-full text-right text-xs sm:text-sm">
                              <thead className="bg-[#0b3414] text-white">
                                <tr>
                                  {sec.tableData.headers.map((th, thIdx) => (
                                    <th key={thIdx} className="p-3 font-bold border-l border-white/20 last:border-l-0">
                                      {th}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 bg-white">
                                {sec.tableData.rows.map((row, rIdx) => (
                                  <tr key={rIdx} className="hover:bg-[#edf7ea]/40 transition-colors">
                                    {row.map((td, cIdx) => (
                                      <td key={cIdx} className="p-3 font-semibold text-gray-800 border-l border-gray-100 last:border-l-0">
                                        {td}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* Highlight Box if present */}
                        {sec.highlightBox && (
                          <div className="bg-[#edf7ea] border-r-4 border-[#4d8834] p-4 rounded-xl space-y-1 mt-3">
                            <h5 className="font-bold text-[#0b3414] text-sm">{sec.highlightBox.title}</h5>
                            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{sec.highlightBox.content}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Encyclopedia Action Banner */}
                  <div className="bg-gradient-to-r from-[#0b3414] to-[#144820] text-white p-6 sm:p-8 rounded-2xl shadow-xl text-center space-y-3 relative z-10">
                    <h3 className="text-lg sm:text-xl font-bold text-amber-400">
                      {encyclopedia.actionBanner.heading}
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl mx-auto leading-relaxed">
                      {encyclopedia.actionBanner.desc}
                    </p>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="inline-block bg-[#e5a823] hover:bg-[#d49919] text-white font-bold px-8 py-3 rounded-xl shadow text-xs sm:text-sm transition-all"
                    >
                      {encyclopedia.actionBanner.buttonText}
                    </a>
                  </div>

                </section>
              )}

              {/* Key Features & Value */}
              <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-gray-100">
                <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2 pb-3 border-b border-gray-100">
                  <Star className="w-5 h-5 text-[#e5a823] fill-amber-400" />
                  <span>لماذا تختار حدائق الريان لهذه الخدمة؟</span>
                </h3>
                <ul className="space-y-3">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700 font-medium">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#e07b22] mt-1.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Service Specific FAQ */}
              {service.serviceFaqs && service.serviceFaqs.length > 0 && (
                <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2 pb-3 border-b border-gray-100">
                    <HelpCircle className="w-5 h-5 text-[#4d8834]" />
                    <span>الأسئلة الأكثر تكراراً حول الخدمة</span>
                  </h3>
                  <div className="space-y-4">
                    {service.serviceFaqs.map((faq, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
                        <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1.5 flex items-center gap-2">
                          <span className="text-[#4d8834]">س:</span> {faq.q}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mr-5">
                          <span className="font-bold text-gray-700">ج:</span> {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing & Warranty Note */}
              {service.pricingNote && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border-r-4 border-[#e07b22] flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#e07b22] flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base mb-1">الضمان والأسعار:</h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{service.pricingNote}</p>
                  </div>
                </div>
              )}

            </div>

            {/* Sidebar (Left 4 Cols in RTL) */}
            <div className="lg:col-span-4 space-y-6 sticky top-24">
              
              {/* Quick Inquiry Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#edf7ea] text-[#4d8834] mx-auto flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">طلب معاينة وتصميم 3D مجاناً</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  تواصل معنا الآن وسيقوم مهندس الموقع بزيارة حديقتك ورفع المقاسات وتقديم تصميم ثلاثي الأبعاد مجاناً.
                </p>
                <div className="space-y-2.5 pt-2">
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="w-full flex items-center justify-center gap-2 bg-[#4d8834] hover:bg-[#3d6e29] text-white font-bold py-3 rounded-xl shadow text-xs sm:text-sm transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>اتصال فوري: {siteConfig.phoneDisplay}</span>
                  </a>
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`السلام عليكم، أود طلب معاينة لخدمة: ${service.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#e5a823] hover:bg-[#d69919] text-white font-bold py-3 rounded-xl shadow text-xs sm:text-sm transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>محادثة واتساب سريعة</span>
                  </a>
                </div>
                <div className="pt-3 border-t border-gray-100 text-[11px] text-gray-500 flex items-center justify-between">
                  <span>ساعات الاستقبال:</span>
                  <span className="font-bold text-gray-700">{siteConfig.workingHours}</span>
                </div>
              </div>

              {/* Professional Profile Card */}
              <ProfileCard />

              {/* Other Services Navigation */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-900 text-base mb-4 pb-2 border-b border-gray-100">
                  خدمات تنسيق حدائق أخرى
                </h4>
                <ul className="space-y-2">
                  {otherServices.map((other) => (
                    <li key={other.id}>
                      <Link
                        href={`/services/${other.slug}`}
                        className="flex items-center justify-between p-2 rounded-lg text-xs font-semibold text-gray-700 hover:bg-[#edf7ea] hover:text-[#4d8834] transition-colors"
                      >
                        <span>{other.title}</span>
                        <ArrowLeft className="w-3.5 h-3.5 text-gray-400" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </div>
  );
}
