import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import ProfileCard from "@/components/ProfileCard";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import ArticleShareBar from "@/components/ArticleShareBar";
import { articlesData, getArticleBySlug, siteConfig } from "@/data/content";
import { detailedBlogArticles } from "@/data/blogArticlesDetailed";
import {
  Phone,
  MessageCircle,
  Clock,
  User,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Share2,
  Bookmark,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Layers,
  Award,
  BookOpen,
  MapPin,
  Flame,
  Check,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articlesData.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const detailed = detailedBlogArticles[slug];

  if (!article) {
    return {
      title: "المقال غير موجود | مؤسسة حدائق الريان بالرياض",
    };
  }

  const title = detailed ? `${detailed.title} | مدونة حدائق الريان بالرياض` : `${article.title} | مدونة حدائق الريان بالرياض`;
  const description = detailed ? (detailed.metaDescription || detailed.subtitle) : article.excerpt;
  const canonicalUrl = `https://hadiqat-alrayan.com/blog/${slug}`;
  const imgUrl = article.image.startsWith("http") ? article.image : `https://hadiqat-alrayan.com${article.image}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "مؤسسة حدائق الريان لتنسيق الحدائق بالرياض",
      locale: "ar_SA",
      type: "article",
      images: [
        {
          url: imgUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imgUrl],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const detailed = detailedBlogArticles[slug];
  const currentIndex = articlesData.findIndex((a) => a.slug === slug);
  const prevArticle = currentIndex > 0 ? articlesData[currentIndex - 1] : null;
  const nextArticle = currentIndex < articlesData.length - 1 ? articlesData[currentIndex + 1] : null;
  const relatedArticles = articlesData.filter((a) => a.slug !== slug).slice(0, 4);

  // SEO JSON-LD Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": detailed ? detailed.title : article.title,
    "description": detailed ? (detailed.metaDescription || detailed.subtitle) : article.excerpt,
    "image": `https://hadiqat-alrayan.com${article.image}`,
    "author": {
      "@type": "Organization",
      "name": "مؤسسة حدائق الريان لتنسيق الحدائق بالرياض",
      "url": "https://hadiqat-alrayan.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "مؤسسة حدائق الريان",
      "logo": {
        "@type": "ImageObject",
        "url": "https://hadiqat-alrayan.com/images/logo.png"
      }
    },
    "datePublished": "2026-01-15T08:00:00+03:00",
    "dateModified": new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://hadiqat-alrayan.com/blog/${slug}`
    }
  };

  const faqSchema = detailed?.faqs?.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": detailed.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <div className="min-h-screen bg-[#fcfdfa] text-[#1c2e17] font-sans antialiased">
      
      {/* Dynamic SEO JSON-LD Tags */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Reading Progress Indicator */}
      <ReadingProgressBar />

      <Header />

      {/* 1. Header Banner & Breadcrumbs */}
      <section className="relative bg-gradient-to-b from-[#0b3414] via-[#124d20] to-[#0b3414] text-white py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e5a823_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
          
          {/* Breadcrumb path */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold text-emerald-100 border border-white/10">
            <Link href="/" className="hover:text-amber-300 transition-colors">الرئيسية</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-amber-300 transition-colors">المدونة الزراعية</Link>
            <span>/</span>
            <span className="text-amber-300 truncate max-w-[200px] sm:max-w-xs">{article.category}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black leading-tight max-w-4xl mx-auto text-white">
            {detailed ? detailed.title : article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-emerald-100/90 font-medium">
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>{article.day} {article.month} 2026</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{detailed?.readTime || "12 دقيقة قراءة شاملة"}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
              <User className="w-4 h-4 text-amber-400" />
              <span>{detailed?.author?.name || "مؤسسة حدائق الريان"}</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Main Layout Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column in RTL: Sticky Sidebar */}
          <aside className="lg:col-span-4 space-y-8 order-2 lg:order-1 text-right sticky top-24">
            
            {/* Table of Contents Box */}
            {detailed && detailed.tableOfContents && (
              <div className="bg-[#edf7ea] rounded-3xl p-6 border border-[#4d8834]/20 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-gray-900 font-bold text-sm border-b border-[#4d8834]/20 pb-2">
                  <BookOpen className="w-4 h-4 text-[#4d8834]" />
                  <span>فهرس موضوعات المقال</span>
                </div>
                <ul className="space-y-2 text-xs font-semibold text-gray-700 max-h-[420px] overflow-y-auto pr-1">
                  {detailed.tableOfContents.map((toc, idx) => (
                    <li key={idx}>
                      <a
                        href={`#${toc.id}`}
                        className="flex items-center gap-2 hover:text-[#4d8834] transition-colors py-0.5"
                      >
                        <span className="text-[#4d8834] font-black text-xs">←</span>
                        <span>{toc.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Professional Author / Profile Card */}
            <ProfileCard />

            {/* Quick Call Action Card */}
            <div className="bg-[#0b3414] text-white rounded-3xl p-6 shadow-xl space-y-4 text-center">
              <span className="inline-block text-amber-400 font-bold text-xs">
                استشارة ومعاينة مجانية بالرياض
              </span>
              <h3 className="text-lg font-black leading-snug">
                هل تحتاج لمساعدة في تنسيق حديقة منزلك؟
              </h3>
              <p className="text-xs text-emerald-100/80">
                مهندسونا جاهزون لزيارة موقعك ورفع المقاسات وتقديم مخطط 3D مجاني.
              </p>
              <div className="space-y-2 pt-2">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center justify-center gap-2 w-full bg-[#4d8834] hover:bg-[#3d6e29] text-white font-bold text-xs py-3 rounded-xl shadow transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>اتصل بنا: {siteConfig.phoneDisplay}</span>
                </a>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`السلام عليكم، أود الاستفسار بخصوص مقال: ${article.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#e5a823] hover:bg-[#d69919] text-white font-bold text-xs py-3 rounded-xl shadow transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>محادثة واتساب فورية</span>
                </a>
              </div>
            </div>

            {/* Recent Articles in Sidebar */}
            <div className="space-y-4">
              <div className="relative pb-2">
                <h3 className="text-base font-black text-gray-900">مقالات ننصح بقراءتها</h3>
                <div className="w-12 h-1 bg-[#e07b22] mt-1 rounded-full" />
              </div>
              <div className="divide-y divide-gray-100 space-y-3">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/blog/${rel.slug}`}
                    className="pt-3 flex items-start gap-3 group text-right"
                  >
                    <div className="flex-1 space-y-1">
                      <h4 className="text-xs font-bold text-gray-800 group-hover:text-[#4d8834] transition-colors leading-snug line-clamp-2">
                        {rel.title}
                      </h4>
                      <span className="text-[10px] text-gray-400">{rel.day} {rel.month} 2026</span>
                    </div>
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-14 h-12 rounded-lg object-cover flex-shrink-0 border border-gray-100"
                    />
                  </Link>
                ))}
              </div>
            </div>

          </aside>

          {/* Right Column in RTL: Comprehensive Article Body */}
          <main className="lg:col-span-8 space-y-10 order-1 lg:order-2 text-right">
            
            {/* Featured Image */}
            <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100 aspect-[16/10] bg-gray-100">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Top Share Bar */}
            <ArticleShareBar
              title={detailed ? detailed.title : article.title}
              url={`https://hadiqat-alrayan.com/blog/${slug}`}
            />

            {/* Subtitle / Executive Summary Card */}
            {detailed && (
              <div className="bg-[#edf7ea] border-r-4 border-[#4d8834] p-6 rounded-2xl text-gray-800 space-y-2">
                <span className="text-xs font-bold text-[#4d8834] uppercase tracking-wider block">
                  دليل إرشادي معتمد بالرياض
                </span>
                <p className="text-sm sm:text-base leading-relaxed font-semibold">
                  {detailed.subtitle}
                </p>
              </div>
            )}

            {/* Key Takeaways Box */}
            {detailed && detailed.keyTakeaways && (
              <div className="bg-white border border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-[#4d8834] font-black text-base sm:text-lg border-b border-emerald-50 pb-3">
                  <span>أبرز النقاط الجوهرية في هذا الدليل:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {detailed.keyTakeaways.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 bg-[#fcfdfa] p-3 rounded-xl border border-gray-100">
                      <CheckCircle2 className="w-4 h-4 text-[#4d8834] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-medium text-gray-700 leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fallback for articles without detailed object */}
            {!detailed && article.fullContent && (
              <div className="space-y-6 text-gray-800 text-sm sm:text-base leading-loose prose prose-emerald max-w-none">
                {article.fullContent.split("\n\n").map((chunk, cIdx) => {
                  if (chunk.startsWith("### ")) {
                    return (
                      <h3 key={cIdx} className="text-lg sm:text-xl font-black text-[#0b3414] pt-4 border-t border-gray-100 flex items-center gap-2">
                        <span className="w-2 h-4 bg-[#4d8834] rounded-full inline-block" />
                        <span>{chunk.replace("### ", "")}</span>
                      </h3>
                    );
                  }
                  if (chunk.startsWith("## ")) {
                    return (
                      <h2 key={cIdx} className="text-xl sm:text-2xl font-black text-gray-900 pt-6 border-t border-gray-100 flex items-center gap-2">
                        <span className="w-2.5 h-6 bg-[#4d8834] rounded-full inline-block" />
                        <span>{chunk.replace("## ", "")}</span>
                      </h2>
                    );
                  }
                  if (chunk.startsWith("* ") || chunk.startsWith("- ")) {
                    const lines = chunk.split("\n").filter((l) => l.trim().length > 0);
                    return (
                      <ul key={cIdx} className="space-y-2 pt-2">
                        {lines.map((line, lIdx) => (
                          <li key={lIdx} className="flex items-start gap-2.5 bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs sm:text-sm">
                            <Check className="w-4 h-4 text-[#4d8834] shrink-0 mt-0.5" />
                            <span>{line.replace(/^[\*\-]\s+/, "")}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={cIdx} className="text-gray-700 leading-relaxed">
                      {chunk}
                    </p>
                  );
                })}
              </div>
            )}

            {/* Introduction Section */}
            {detailed && detailed.introduction && (
              <section id="intro" className="space-y-4 text-gray-700 text-sm sm:text-base leading-loose">
                {detailed.introduction.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </section>
            )}

            {/* Comprehensive Verbatim Sections (All 30 - 80 Sections) */}
            {detailed && detailed.sections && detailed.sections.map((sec, sIdx) => (
              <section key={sec.id || sIdx} id={sec.id} className="space-y-4 pt-6 border-t border-gray-100">
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-[#4d8834] rounded-full inline-block" />
                  <span>{sec.numTitle}</span>
                </h2>

                {sec.paragraphs && sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-gray-700 text-xs sm:text-sm md:text-base leading-loose">
                    {p}
                  </p>
                ))}

                {sec.bullets && sec.bullets.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {sec.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                        <Check className="w-4 h-4 text-[#4d8834] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-medium text-gray-800 leading-relaxed">{b}</span>
                      </div>
                    ))}
                  </div>
                )}

                {sec.subsections && sec.subsections.map((sub, subIdx) => (
                  <div key={subIdx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2 mt-4">
                    <h3 className="text-sm sm:text-base font-black text-[#0b3414]">
                      {sub.subtitle}
                    </h3>
                    {sub.paragraphs && sub.paragraphs.map((sp, spIdx) => (
                      <p key={spIdx} className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {sp}
                      </p>
                    ))}
                    {sub.bullets && sub.bullets.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                        {sub.bullets.map((sb, sbIdx) => (
                          <div key={sbIdx} className="flex items-start gap-2 text-xs text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                            <Check className="w-3.5 h-3.5 text-[#4d8834] shrink-0 mt-0.5" />
                            <span>{sb}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </section>
            ))}

            {/* Comparison Table */}
            {detailed && detailed.comparisonTable && (
              <section className="space-y-4 pt-6 border-t border-gray-100">
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
                  <Layers className="w-6 h-6 text-[#4d8834]" />
                  <span>{detailed.comparisonTable.title}</span>
                </h2>
                <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                  <table className="w-full text-right text-xs sm:text-sm">
                    <thead className="bg-[#0b3414] text-white">
                      <tr>
                        {detailed.comparisonTable.headers.map((h, hIdx) => (
                          <th key={hIdx} className="p-3.5 font-bold whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      {detailed.comparisonTable.rows.map((row, rIdx) => (
                        <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-gray-50/70"}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3.5 text-gray-700 font-medium">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Fatal Mistakes Warnings */}
            {detailed && detailed.fatalMistakes && detailed.fatalMistakes.length > 0 && (
              <section className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-amber-800 font-black text-base sm:text-lg">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <span>أخطاء شائعة وتحذيرات هندسية يجب تجنبها:</span>
                </div>
                <div className="space-y-2.5">
                  {detailed.fatalMistakes.map((mistake, mIdx) => (
                    <div key={mIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-amber-900 font-medium">
                      <span className="text-amber-600 font-bold">⚠️</span>
                      <span>{mistake}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQs Accordion / List */}
            {detailed && detailed.faqs && detailed.faqs.length > 0 && (
              <section id="faqs" className="space-y-4 pt-6 border-t border-gray-100">
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-[#4d8834]" />
                  <span>الأسئلة الشائعة وإجابات الخبراء</span>
                </h2>
                <div className="space-y-3">
                  {detailed.faqs.map((faq, fIdx) => (
                    <div key={fIdx} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-2">
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 flex items-center gap-2">
                        <span className="text-[#4d8834] font-black">س:</span>
                        <span>{faq.question}</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pr-5">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Conclusion Section */}
            {detailed && detailed.conclusion && (
              <section id="conclusion" className="bg-[#edf7ea] border border-[#4d8834]/20 rounded-3xl p-6 sm:p-8 space-y-4">
                <h2 className="text-xl font-black text-[#0b3414] flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#4d8834]" />
                  <span>الخلاصة والتوصيات الهندسية</span>
                </h2>
                <div className="space-y-3 text-gray-700 text-xs sm:text-sm leading-loose">
                  {detailed.conclusion.map((cp, cIdx) => (
                    <p key={cIdx}>{cp}</p>
                  ))}
                </div>
              </section>
            )}

            {/* Bottom Share Bar */}
            <ArticleShareBar
              title={detailed ? detailed.title : article.title}
              url={`https://hadiqat-alrayan.com/blog/${slug}`}
            />

            {/* Next / Previous Article Navigation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              {prevArticle ? (
                <Link
                  href={`/blog/${prevArticle.slug}`}
                  className="bg-white hover:bg-emerald-50/50 border border-gray-200 hover:border-[#4d8834] p-4 rounded-2xl transition-all group flex flex-col justify-between space-y-2 text-right"
                >
                  <span className="text-[11px] font-bold text-[#4d8834] flex items-center gap-1">
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span>المقال السابق</span>
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-[#4d8834] line-clamp-2">
                    {prevArticle.title}
                  </h4>
                </Link>
              ) : <div />}

              {nextArticle ? (
                <Link
                  href={`/blog/${nextArticle.slug}`}
                  className="bg-white hover:bg-emerald-50/50 border border-gray-200 hover:border-[#4d8834] p-4 rounded-2xl transition-all group flex flex-col justify-between space-y-2 text-left"
                >
                  <span className="text-[11px] font-bold text-[#4d8834] flex items-center justify-end gap-1">
                    <span>المقال التالي</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-[#4d8834] line-clamp-2 text-right">
                    {nextArticle.title}
                  </h4>
                </Link>
              ) : <div />}
            </div>

            {/* Summary Box & High-Converting CTA Banner */}
            <div className="bg-gradient-to-r from-[#0b3414] to-[#124d20] text-white p-8 sm:p-10 rounded-3xl shadow-xl text-center space-y-4">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                مؤسسة حدائق الريان لتنسيق الحدائق بالرياض
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black leading-tight">
                جاهز لتحويل حديقة منزلك إلى واحة أحلامك؟
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl mx-auto leading-relaxed">
                {detailed?.summaryBox || "احصل الآن على معاينة مجانية وتصميم 3D لحديقة منزلك مع ضمان معتمد حتى 7 سنوات وأسعار تنافسية تناسب ميزانيتك في كافة أحياء الرياض."}
              </p>
                <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="bg-[#e5a823] hover:bg-[#d69919] text-white font-bold px-8 py-3.5 rounded-xl shadow transition-all hover:scale-105 text-xs sm:text-sm flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>احجز معاينتك المجانية الآن</span>
                  </a>
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#4d8834] hover:bg-[#3d6e29] text-white font-bold px-8 py-3.5 rounded-xl shadow transition-all hover:scale-105 text-xs sm:text-sm flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>محادثة واتساب مباشرة</span>
                  </a>
                </div>
              </div>

          </main>

        </div>
      </div>

      {/* 3. Team Illustration Banner Strip before Footer */}
      <div className="w-full bg-white py-8 border-t border-gray-100 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <img
            src="/images/about-team-banner.webp"
            alt="فريق عمل مؤسسة حدائق الريان لتنسيق الحدائق بالرياض"
            className="w-full max-h-56 sm:max-h-72 object-contain mx-auto"
          />
        </div>
      </div>

      <Footer />
      <FloatingActions />
    </div>
  );
}
