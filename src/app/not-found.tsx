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
        {/* Decorative Background Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl w-full mx-auto text-center space-y-8">
          
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
