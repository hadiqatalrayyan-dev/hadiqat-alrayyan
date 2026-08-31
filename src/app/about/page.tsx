import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { siteConfig } from "@/data/content";
import Logo from "@/components/Logo";
import {
  Phone,
  MessageCircle,
  CheckCircle2,
  ShieldCheck,
  Star,
  Award,
  Users,
  Building2,
  Calendar,
  Compass,
  ArrowLeft,
  Briefcase,
  Layers,
  Lightbulb,
  Check,
} from "lucide-react";

export const metadata: Metadata = {
  title: "من نحن | مؤسسة حدائق المستقبل لتنسيق الحدائق بالرياض",
  description: "تعرف على مؤسسة حدائق المستقبل، الرائدة في تصميم وتنسيق الحدائق المنزلية والعامة، توريد العشب الصناعي والطبيعي، الشلالات والمظلات في مدينة الرياض وكافة أحيائها.",
  keywords: [
    "من نحن حدائق المستقبل",
    "شركة تنسيق حدائق بالرياض",
    "افضل مؤسسة لاندسكيب بالرياض",
    "تاريخ حدائق المستقبل",
    "مهندسو تنسيق حدائق",
  ],
  alternates: {
    canonical: "https://futuregardens.sa/about",
  },
  openGraph: {
    title: "من نحن | مؤسسة حدائق المستقبل لتنسيق الحدائق",
    description: "خبرة تفوق 15 عاماً في تصميم وتنفيذ أرقى الحدائق السكنية والتجارية بالرياض بأعلى معايير الجودة والضمان.",
    url: "https://futuregardens.sa/about",
    siteName: "مؤسسة حدائق المستقبل لتنسيق الحدائق",
    locale: "ar_SA",
    type: "website",
  },
};

export default function AboutPage() {
  const steps = [
    {
      num: "الخطوة الأولى",
      title: "استقبال طلب العميل",
      desc: "إدارة الاتصال للرد الفوري على مدار 24 ساعة، استلام الاستفسارات وتحديد الموعد المناسب لزيارة الموقع ورفع المتطلبات عبر الهاتف أو الواتساب.",
    },
    {
      num: "الخطوة الثانيه",
      title: "رفع الموقع وعرض سعر",
      desc: "يقوم فريقنا الهندسي بمعاينة الموقع ورفع القياسات الدقيقة بالليزر وإعداد مخطط 3D واقعي وتقديم عرض سعر تفصيلي منافس.",
    },
    {
      num: "الخطوة الثالثه",
      title: "بدء تنفيذ المشروع",
      desc: "بعد موافقة العميل واعتماد المواد، تبدأ أعمال التأسيس الإنشائي وتمديد السباكة والكهرباء والتركيب بأعلى مستويات الدقة والمعايير.",
    },
    {
      num: "الخطوة الرابعه",
      title: "تسليم المشروع النهائي",
      desc: "معاينة شاملة للموقع بحضور العميل، التشغيل التجريبي للنوافير والإنارة، وتسليم شهادة الضمان المعتمد والمتابعة الدورية.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans select-none">
      <Header />

      {/* 1. Top Breadcrumbs & Hero Intro */}
      <section className="pt-10 pb-6 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Breadcrumb */}
          <div className="text-xs sm:text-sm text-gray-500 font-semibold space-x-2 space-x-reverse mb-2">
            <Link href="/" className="text-[#4d8834] hover:underline">
              حدائق المستقبل
            </Link>
            <span>»</span>
            <span>من نحن</span>
          </div>

          <span className="block text-xs sm:text-sm text-gray-500 font-medium mb-1">
            معلومات عن حدائق المستقبل لتنسيق الحدائق بالرياض
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6">
            من نحن
          </h1>

          {/* Cartoon Landscaping Team Illustration Banner matching screenshot 100% */}
          <div className="max-w-3xl mx-auto flex items-center justify-center">
            <img
              src="/images/about-team-banner.png"
              alt="فريق عمل مؤسسة حدائق المستقبل لتنسيق الحدائق"
              className="w-full max-h-[380px] object-contain "
            />
          </div>

        </div>
      </section>

      {/* 2. Company Story & Main Overview Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Side Gallery in RTL (Visual Grid) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=600&auto=format&fit=crop"
                  alt="تنسيق وصيانة الحدائق"
                  className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-md border-2 border-emerald-100"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1592417817098-8f3d6eb228cc?q=80&w=600&auto=format&fit=crop"
                  alt="مشتل وزراعة نباتات"
                  className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-md border-2 border-emerald-100"
                />
              </div>
            </div>

            {/* Right Side in RTL: Text & Overview */}
            <div className="lg:col-span-7 space-y-5 text-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#edf7ea] text-[#4d8834] text-xs font-bold">
                <Award className="w-4 h-4" />
                <span>الريادة والتميز في اللاندسكيب</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                أفضل شركة تنسيق حدائق بالرياض
              </h2>

              <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-loose">
                <p>
                  <strong>مؤسسة حدائق المستقبل</strong> هي الشركة الرائدة والموثوقة في مجال تصميم وتنسيق وتطوير الحدائق المنزلية والقصور والاستراحات والمشاريع التجارية في كافة أنحاء الرياض العربية السعودية.
                </p>
                <p>
                  حيث نقوم بتصميم وتنسيق الحدائق بأسلوب معماري عصري، وتوريد وتركيب أجود أنواع العشب الصناعي عالي الكثافة المعتمد والمقاوم للحرارة، وزراعة الثيل الطبيعي المروي بأنظمة ري أوتوماتيكية موفرة للمياه، إلى جانب زراعة وتكريب النخيل والأشجار والورود العطرية.
                </p>
                <p>
                  كما نبدع في تصميم وبناء الشلالات والنوافير الجدارية المودرن بمصبات الستانلس ستيل والإضاءات الغاطسة، وتنفيذ المظلات والبرجولات والجلسات الخارجية ببديل الخشب والحديد المعزول، وعمل ديكورات زراعية وتكسيات عشب جداري تمنح الفناء طابع المنتجعات السياحية الفاخرة.
                </p>
                <p className="font-semibold text-gray-800">
                  كل هذه الخدمات تنفذ بإشراف هندسي ميداني يومي بواسطة فريق متكامل من أمهر المهندسين والفنيين والعمالة المدربة ذات الخبرة الطويلة لأكثر من 15 عاماً في هذا المجال.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex items-center gap-2 bg-[#4d8834] hover:bg-[#3d6e29] text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Phone className="w-4 h-4" />
                  <span>تواصل معنا: {siteConfig.phoneDisplay}</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Why Choose Us Section matching screenshot 100% */}
      <section className="py-20 bg-[#edf7ea] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          
          {/* Subtitle */}
          <span className="block text-xs sm:text-sm text-gray-500 font-semibold mb-2">
            مميزات مؤسسة حدائق المستقبل لتنسيق الحدائق
          </span>

          {/* Main Heading with Orange Dash Underline */}
          <div className="relative inline-block mb-16">
            <h2 className="text-2xl sm:text-4xl font-black text-[#0b3414] leading-tight">
              لماذا تختار <span className="text-[#4d8834] relative">مؤسسة حدائق المستقبل</span> لتنسيق الحدائق؟
            </h2>
            <div className="w-16 h-1 bg-[#e07b22] mx-auto mt-2 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            
            {/* Right Column in RTL: 2 Features */}
            <div className="lg:col-span-4 space-y-12 text-center">
              
              {/* Feature 1 (Top Right) */}
              <div className="space-y-3 max-w-sm mx-auto">
                <div className="w-14 h-14 rounded-full bg-white border-2 border-[#4d8834] text-[#4d8834] mx-auto flex items-center justify-center shadow-sm">
                  </div>
                <h3 className="text-lg font-bold text-gray-900">
                  اختيار تصميمات الحدائق قبل التركيب
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                  تقوم مؤسسة حدائق المستقبل باختيار وتوفير أي ديكور لأي حديقة قبل التركيب لتكوين وجهة نظر شاملة عن الديكور المناسب لحديقتك وتنسيقها.
                </p>
              </div>

              {/* Feature 2 (Bottom Right) */}
              <div className="space-y-3 max-w-sm mx-auto">
                <div className="w-14 h-14 rounded-full bg-white border-2 border-[#4d8834] text-[#4d8834] mx-auto flex items-center justify-center shadow-sm">
                  <Building2 className="w-7 h-7 text-[#4d8834]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  أكثر من 1000 مشروع تم انجازه بنجاح
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                  قامت المؤسسة بتنفيذ أكثر من 1000 مشروع بالفعل بالرياض تتنوع بين تنسيق وتصميم وصيانة الحدائق وتوريد كافة الخامات المتعلقة بذلك.
                </p>
              </div>

            </div>

            {/* Center Graphic: Official Circular Logo with Typography */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center py-4 space-y-4">
              {/* Circular Emblem Vector */}
              <div className="w-36 h-36 sm:w-44 sm:h-44 relative flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
                  {/* Outer Green Ring */}
                  <circle cx="50" cy="50" r="46" fill="#ffffff" stroke="#437b2d" strokeWidth="4.5" />
                  
                  {/* Orange Semi-circle / Sun at Top Center */}
                  <path d="M40 32 Q50 20 60 32 Z" fill="#e6881c" />
                  
                  {/* Orange Vertical Stem */}
                  <rect x="47.5" y="24" width="5" height="24" rx="2" fill="#e6881c" />

                  {/* Left Leaf (Light Vibrant Green) */}
                  <path
                    d="M50 76 C32 64 24 46 32 34 C38 24 50 32 50 48 Z"
                    fill="#6ca843"
                  />

                  {/* Right Leaf (Dark Emerald Green) */}
                  <path
                    d="M50 76 C68 64 76 46 68 34 C62 24 50 32 50 48 Z"
                    fill="#3c6c27"
                  />

                  {/* Bottom Curved Crescent Smile Arc */}
                  <path
                    d="M32 68 Q50 82 68 68 Q50 76 32 68 Z"
                    fill="#3c6c27"
                  />
                </svg>
              </div>

              {/* Brand Typography */}
              <div className="text-center space-y-1">
                <h3 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight">
                  حدائق المستقبل
                </h3>
                <p className="text-sm sm:text-base font-bold text-[#e07b22]">
                  لتنسيق الحدائق بالرياض
                </p>
              </div>
            </div>

            {/* Left Column in RTL: 2 Features */}
            <div className="lg:col-span-4 space-y-12 text-center">
              
              {/* Feature 3 (Top Left) */}
              <div className="space-y-3 max-w-sm mx-auto">
                <div className="w-14 h-14 rounded-full bg-white border-2 border-[#4d8834] text-[#4d8834] mx-auto flex items-center justify-center shadow-sm">
                  <ShieldCheck className="w-7 h-7 text-[#4d8834]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  أفضل أسعار تنسيق حدائق بالرياض
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                  تضمن مؤسسة حدائق المستقبل أفضل العروض والأسعار بالرياض على جميع خدمات تنسيق وتصميم وصيانة الحدائق.
                </p>
              </div>

              {/* Feature 4 (Bottom Left) */}
              <div className="space-y-3 max-w-sm mx-auto">
                <div className="w-14 h-14 rounded-full bg-white border-2 border-[#4d8834] text-[#4d8834] mx-auto flex items-center justify-center shadow-sm">
                  <Award className="w-7 h-7 text-[#4d8834]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  خدمات تنسيق حدائق عالية الجودة
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                  لدينا فريق متكامل من المهندسون الزراعيون والفنيين والعمال المتخصصين بخبرة 15 عاماً في تنسيق الحدائق وتصميمها بشكل احترافي.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. Workflow Section (كيف نقوم بتنفيذ مشاريع تنسيق الحدائق؟) */}
      <section className="relative py-20 bg-[#07240d] text-white overflow-hidden">
        {/* Grass texture overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1558904541-efa8c4a08931?q=80&w=1920&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07240d]/95 via-[#0b3414]/90 to-[#07240d]/95" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          
          <span className="block text-xs sm:text-sm text-amber-400 font-bold mb-2">
            خطوات تنفيذ وتنسيق الحدائق
          </span>

          <h2 className="text-2xl sm:text-4xl font-black text-white mb-14">
            كيف نقوم بتنفيذ مشاريع تنسيق الحدائق؟
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-right">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md border border-white/15 p-6 rounded-2xl flex flex-col justify-between hover:bg-white/15 transition-all space-y-4 hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <span className="inline-block text-xs font-black text-amber-400 border-b border-amber-400/40 pb-1">
                    {step.num}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-emerald-100/80 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold text-xs transition-colors"
                  >
                    <span>تواصل معنا</span>
                    <span>←</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Team Illustration Strip before Footer matching screenshot */}
      <div className="w-full bg-white py-8 border-t border-gray-100 flex items-center justify-center">
        <div className="max-w-xl mx-auto">
          <img
            src="/images/about-team-banner.png"
            alt="فريق حدائق المستقبل"
            className="w-full max-h-48 object-contain opacity-90"
          />
        </div>
      </div>

      <Footer />
      <FloatingActions />
    </div>
  );
}
