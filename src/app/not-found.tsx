import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DynamicBlogFallback from '@/components/DynamicBlogFallback';
import { siteConfig } from '@/data/content';
import {
  Home,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Trees,
  Waves,
  Umbrella,
  Compass,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';

export const metadata = {
  title: 'الصفحة غير موجودة 404 | حدائق الريان بالرياض',
  description: 'عفواً، الصفحة التي تبحث عنها غير موجودة. تصفح خدمات وتصاميم حدائق الريان لتنسيق الحدائق بالرياض.',
};

export default function NotFound() {
  const topServices = [
    {
      title: 'العشب الصناعي الفاخر',
      desc: 'توريد وتركيب عشب صناعي عالي الكثافة مع ضمان حتى 7 سنوات.',
      href: '/services/artificial-grass',
      icon: <Sparkles className="w-5 h-5 text-emerald-600" />,
    },
    {
      title: 'الشلالات والنوافير المنزلية',
      desc: 'شلالات جدارية مودرن ومصبات ستانلس ستيل مع إضاءات ليد غاطسة.',
      href: '/services/waterfalls-fountains',
      icon: <Waves className="w-5 h-5 text-cyan-600" />,
    },
    {
      title: 'المظلات والبرجولات الحديثة',
      desc: 'جلسات خارجية وبرجولات خشبية وحديدية معزولة ومقاومة للحرارة.',
      href: '/services/pergolas-canopies',
      icon: <Umbrella className="w-5 h-5 text-amber-600" />,
    },
    {
      title: 'تصميم حدائق 3D واللاندسكيب',
      desc: 'مخططات هندسية وتصاميم ثلاثية الأبعاد واقعية قبل البدء بالتنفيذ.',
      href: '/services/garden-design',
      icon: <Compass className="w-5 h-5 text-emerald-700" />,
    },
  ];

  return (
    <DynamicBlogFallback>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50/40 via-white to-gray-50 text-gray-800 font-sans selection:bg-emerald-600 selection:text-white">
        <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 sm:py-20 relative overflow-hidden">
        {/* Instant layout guard & parallel early API prefetch */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var p = window.location.pathname;
                if (p.startsWith('/blog/')) {
                  var c = document.getElementById('not-found-main-content');
                  if (c) c.style.display = 'none';
                  var parts = p.split('/').filter(Boolean);
                  if (parts.length >= 2) {
                    var s = decodeURIComponent(parts[1]);
                    var cached = sessionStorage.getItem('alrayan_full_article_' + s) || localStorage.getItem('alrayan_full_article_' + s) || sessionStorage.getItem('alrayan_raw_article_' + s) || localStorage.getItem('alrayan_raw_article_' + s);
                    if (!cached) {
                      var l = document.getElementById('not-found-blog-preloader');
                      if (l) l.style.display = 'block';
                    }
                    if (s && !window.__ALRAYAN_PREFETCH__) {
                      window.__ALRAYAN_PREFETCH__ = fetch('https://api.hadiqat-alrayan.com/api/v1/articles/' + encodeURIComponent(s) + '?_t=' + Date.now(), {
                        headers: { 'Accept': 'application/json' }
                      }).then(function(r) { return r.ok ? r.json() : null; }).catch(function() { return null; });
                    }
                  }
                }
              } catch(e) {}
            `,
          }}
        />

        {/* Decorative Background Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />

        {/* Pre-hydration blog skeleton */}
        <div
          id="not-found-blog-preloader"
          style={{ display: "none" }}
          className="relative z-10 max-w-4xl w-full mx-auto text-right py-8 sm:py-12 space-y-6 animate-pulse"
        >
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="h-3 w-14 bg-gray-200 rounded" />
            <span>/</span>
            <span className="h-3 w-16 bg-gray-200 rounded" />
            <span>/</span>
            <span className="h-3 w-28 bg-gray-200 rounded" />
          </div>

          <div className="space-y-3 pt-2">
            <div className="h-8 sm:h-12 w-4/5 bg-gray-200 rounded-xl" />
            <div className="h-5 sm:h-6 w-3/5 bg-gray-100 rounded-lg" />
          </div>

          <div className="flex items-center justify-between py-4 border-y border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gray-200 flex-shrink-0" />
              <div className="space-y-1.5 text-right">
                <div className="h-3.5 w-36 bg-gray-200 rounded" />
                <div className="h-2.5 w-24 bg-gray-100 rounded" />
              </div>
            </div>
            <div className="h-7 w-28 bg-emerald-50 rounded-full" />
          </div>

          <div className="w-full h-64 sm:h-96 bg-gradient-to-br from-gray-100 via-gray-200/80 to-gray-100 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-xs">
            <div className="flex items-center gap-2.5 text-[#4d8834] font-bold text-sm bg-white/95 backdrop-blur-xs px-5 py-2.5 rounded-full shadow-sm">
              <div className="w-4 h-4 border-2 border-[#4d8834] border-t-transparent rounded-full animate-spin" />
              <span>جاري تحميل وتجهيز المقال...</span>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <div className="h-4 w-full bg-gray-100 rounded" />
            <div className="h-4 w-11/12 bg-gray-100 rounded" />
            <div className="h-4 w-5/6 bg-gray-100 rounded" />
          </div>
        </div>

        {/* 404 Main Content Wrapper */}
        <div id="not-found-main-content" className="relative z-10 max-w-3xl w-full mx-auto text-center space-y-8">
          
          {/* 404 Hero Illustration & Badge */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold shadow-xs">
              <Trees className="w-4 h-4 text-emerald-600" />
              <span>رمز الخطأ: 404 - صفحة غير موجودة</span>
            </div>

            <div className="relative inline-block">
              <h1 className="text-8xl sm:text-9xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-[#4d8834] to-amber-600 drop-shadow-sm select-none">
                404
              </h1>
              <span className="absolute -bottom-2 right-1/2 translate-x-1/2 text-xs uppercase tracking-widest text-gray-400 font-semibold">
                Page Not Found
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 pt-4">
              عفواً، يبدو أن هذه الصفحة غير متوفرة!
            </h2>

            <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
              ربما تمت إزالة الصفحة أو تغيير الرابط أو أن العنوان كُتب بطريقة غير صحيحة. لا تقلق، يمكنك العودة للصفحة الرئيسية أو استكشاف خدماتنا ومقالاتنا المميزة.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#4d8834] hover:bg-[#3d6e29] text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <Home className="w-4 h-4" />
              <span>العودة للرئيسية</span>
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-white hover:bg-emerald-50 text-emerald-900 border-2 border-emerald-600/30 hover:border-emerald-600 font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-xs hover:shadow-md transition-all duration-300"
            >
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>تصفح جميع الخدمات</span>
            </Link>

            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("السلام عليكم، أود الاستفسار عن خدمات تنسيق الحدائق")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>محادثة واتساب مباشرة</span>
            </a>
          </div>

          {/* Quick Service Cards Section */}
          <div className="pt-8 border-t border-gray-200/80 text-right">
            <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-4 text-center">
              قد يهمك الاطلاع على أشهر خدماتنا في الرياض:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {topServices.map((srv, idx) => (
                <Link
                  key={idx}
                  href={srv.href}
                  className="group flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-gray-100 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all duration-300 text-right"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center flex-shrink-0 transition-colors">
                    {srv.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-emerald-700 transition-colors flex items-center justify-between">
                      <span>{srv.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 group-hover:-translate-x-1 transition-all" />
                    </h4>
                    <p className="text-[11px] sm:text-xs text-gray-500 mt-1 line-clamp-2">
                      {srv.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Direct Help Call Box */}
          <div className="pt-4">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-600 bg-white/80 backdrop-blur-xs px-4 py-2 rounded-full border border-gray-200 shadow-xs">
              <PhoneCall className="w-3.5 h-3.5 text-[#e07b22]" />
              <span>هل تحتاج مساعدة فورية؟ اتصل بنا مباشرة: </span>
              <a
                href={`tel:${siteConfig.phone}`}
                dir="ltr"
                className="font-bold text-[#4d8834] hover:underline"
              >
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>

        </div>
      </main>

      <Footer />
      </div>
    </DynamicBlogFallback>
  );
}
