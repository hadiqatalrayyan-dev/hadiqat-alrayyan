"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCmsArticleBySlug } from "@/lib/api";
import { normalizeCmsArticle } from "@/lib/articles";
import { UnifiedArticle, CmsSeo } from "@/types/article";
import { DetailedBlogArticle } from "@/data/blogArticlesDetailed";
import { siteConfig } from "@/data/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import ProfileCard from "@/components/ProfileCard";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import ArticleShareBar from "@/components/ArticleShareBar";
import {
  Phone,
  MessageCircle,
  Clock,
  User,
  Calendar,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Award,
  Layers,
  Check,
} from "lucide-react";

export default function DynamicBlogFallback({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [resolvedArticle, setResolvedArticle] = useState<{
    article: UnifiedArticle;
    detailed: DetailedBlogArticle;
    seo: CmsSeo;
  } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const pathname = window.location.pathname;
    const match = pathname.match(/^\/blog\/(.+?)\/?$/);

    if (!match || !match[1]) {
      setLoading(false);
      return;
    }

    const rawSlug = match[1];
    const decodedSlug = decodeURIComponent(rawSlug);

    // Fetch from CMS API
    getCmsArticleBySlug(decodedSlug)
      .then((cmsDetail) => {
        if (cmsDetail) {
          const { article, detailed } = normalizeCmsArticle(cmsDetail);
          setResolvedArticle({
            article,
            detailed,
            seo: cmsDetail.seo,
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfdfa] flex flex-col justify-between">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
          <div className="w-16 h-16 border-4 border-[#4d8834] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-600 font-bold text-base">جاري تحميل المقال...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // If not a blog article or not found in CMS, render standard 404 page
  if (!resolvedArticle) {
    return <>{children}</>;
  }

  const { article, detailed } = resolvedArticle;

  return (
    <div className="min-h-screen bg-[#fcfdfa] text-[#1c2e17] font-sans antialiased">
      <ReadingProgressBar />
      <Header />

      {/* Header Banner */}
      <section className="relative bg-gradient-to-b from-[#0b3414] via-[#124d20] to-[#0b3414] text-white py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e5a823_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold text-emerald-100 border border-white/10">
            <Link href="/" className="hover:text-amber-300 transition-colors">الرئيسية</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-amber-300 transition-colors">المدونة الزراعية</Link>
            <span>/</span>
            <span className="text-amber-300 truncate max-w-[200px] sm:max-w-xs">{article.category}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black leading-tight max-w-4xl mx-auto text-white">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-emerald-100/90 font-medium">
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>{article.day} {article.month} 2026</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{article.readTime || "8 دقائق"}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
              <User className="w-4 h-4 text-amber-400" />
              <span>{article.author || "مؤسسة حدائق الريان"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8 order-2 lg:order-1 text-right sticky top-24">
            {detailed && detailed.tableOfContents && detailed.tableOfContents.length > 0 && (
              <div className="bg-[#edf7ea] rounded-3xl p-6 border border-[#4d8834]/20 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-gray-900 font-bold text-sm border-b border-[#4d8834]/20 pb-2">
                  <BookOpen className="w-4 h-4 text-[#4d8834]" />
                  <span>فهرس موضوعات المقال</span>
                </div>
                <ul className="space-y-2 text-xs font-semibold text-gray-700 max-h-[420px] overflow-y-auto pr-1">
                  {detailed.tableOfContents.map((toc, idx) => (
                    <li key={idx}>
                      <a href={`#${toc.id}`} className="flex items-center gap-2 hover:text-[#4d8834] transition-colors py-0.5">
                        <span className="text-[#4d8834] font-black text-xs">←</span>
                        <span>{toc.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <ProfileCard />

            <div className="bg-[#0b3414] text-white rounded-3xl p-6 shadow-xl space-y-4 text-center">
              <span className="inline-block text-amber-400 font-bold text-xs">استشارة ومعاينة مجانية بالرياض</span>
              <h3 className="text-lg font-black leading-snug">هل تحتاج لمساعدة في تنسيق حديقة منزلك؟</h3>
              <p className="text-xs text-emerald-100/80">مهندسونا جاهزون لزيارة موقعك ورفع المقاسات وتقديم مخطط 3D مجاني.</p>
              <div className="space-y-2 pt-2">
                <a href={`tel:${siteConfig.phone}`} className="flex items-center justify-center gap-2 w-full bg-[#4d8834] hover:bg-[#3d6e29] text-white font-bold text-xs py-3 rounded-xl shadow transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>اتصل بنا: {siteConfig.phoneDisplay}</span>
                </a>
                <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-[#e5a823] hover:bg-[#d69919] text-white font-bold text-xs py-3 rounded-xl shadow transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>محادثة واتساب فورية</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Main Article Body */}
          <main className="lg:col-span-8 space-y-10 order-1 lg:order-2 text-right">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100 aspect-[16/10] bg-gray-100">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            </div>

            <ArticleShareBar title={article.title} url={typeof window !== "undefined" ? window.location.href : ""} />

            {article.excerpt && (
              <div className="bg-[#edf7ea] border-r-4 border-[#4d8834] p-6 rounded-2xl text-gray-800 space-y-2">
                <span className="text-xs font-bold text-[#4d8834] uppercase tracking-wider block">دليل إرشادي معتمد بالرياض</span>
                <p className="text-sm sm:text-base leading-relaxed font-semibold">{article.excerpt}</p>
              </div>
            )}

            {/* Rich HTML Content */}
            {article.htmlContent && (
              <div
                className="article-rich-content space-y-6 text-gray-800 text-sm sm:text-base leading-relaxed text-right prose prose-emerald max-w-none [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:pb-2 [&_h2]:border-b [&_h2]:border-gray-100 [&_h3]:text-lg sm:[&_h3]:text-xl [&_h3]:font-black [&_h3]:text-[#0b3414] [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-gray-700 [&_p]:leading-loose [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pr-6 [&_ul]:space-y-2 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pr-6 [&_ol]:space-y-2 [&_ol]:mb-4 [&_li]:text-gray-700 [&_blockquote]:border-r-4 [&_blockquote]:border-[#4d8834] [&_blockquote]:bg-[#edf7ea] [&_blockquote]:p-4 [&_blockquote]:rounded-l-xl [&_blockquote]:italic [&_blockquote]:my-6 [&_img]:rounded-2xl [&_img]:shadow-md [&_img]:mx-auto [&_img]:max-w-full [&_img]:h-auto [&_img]:my-6 [&_a]:text-[#4d8834] [&_a]:font-bold [&_a]:underline hover:[&_a]:text-[#3d6e29] [&_strong]:font-black [&_strong]:text-gray-900"
                dangerouslySetInnerHTML={{ __html: article.htmlContent }}
              />
            )}

            {/* Structured Sections if available */}
            {detailed && detailed.sections && detailed.sections.map((sec, sIdx) => (
              <section key={sec.id || sIdx} id={sec.id} className="space-y-4 pt-6 border-t border-gray-100">
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-[#4d8834] rounded-full inline-block" />
                  <span>{sec.numTitle}</span>
                </h2>
                {sec.paragraphs && sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-gray-700 text-xs sm:text-sm md:text-base leading-loose">{p}</p>
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
              </section>
            ))}

            {/* CTA Box */}
            <div className="bg-gradient-to-r from-[#0b3414] to-[#124d20] text-white p-8 sm:p-10 rounded-3xl shadow-xl text-center space-y-4">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">مؤسسة حدائق الريان لتنسيق الحدائق بالرياض</span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black leading-tight">جاهز لتحويل حديقة منزلك إلى واحة أحلامك؟</h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl mx-auto leading-relaxed">
                احصل الآن على معاينة مجانية وتصميم 3D لحديقة منزلك مع ضمان معتمد حتى 7 سنوات وأسعار تنافسية تناسب ميزانيتك في كافة أحياء الرياض.
              </p>
              <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                <a href={`tel:${siteConfig.phone}`} className="bg-[#e5a823] hover:bg-[#d69919] text-white font-bold px-8 py-3.5 rounded-xl shadow transition-all hover:scale-105 text-xs sm:text-sm flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>احجز معاينتك المجانية الآن</span>
                </a>
                <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="bg-[#4d8834] hover:bg-[#3d6e29] text-white font-bold px-8 py-3.5 rounded-xl shadow transition-all hover:scale-105 text-xs sm:text-sm flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>محادثة واتساب مباشرة</span>
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />
      <FloatingActions />
    </div>
  );
}
