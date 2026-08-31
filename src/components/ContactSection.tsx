"use client";

import React, { useState } from "react";
import { siteConfig } from "@/data/content";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "تصميم وتنسيق حدائق",
    city: "الرياض",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `طلب عرض سعر ومعاينة من موقع حدائق المستقبل:
الاسم: ${formData.name}
رقم الجوال: ${formData.phone}
المدينة: ${formData.city}
الخدمة المطلوبة: ${formData.service}
تفاصيل إضافية: ${formData.message || "لا يوجد"}`;

    const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-[#edf7ea] relative overflow-hidden select-none">
      
      {/* Subtle Botanical Leaf Watermarks on Background */}
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
        
        {/* Section Header with Brand Colors */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="block text-gray-500 text-sm sm:text-base font-semibold mb-2">
            احجز موعدك الآن
          </span>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3 tracking-tight leading-tight">
            تواصل معنا الآن لتحصل على <span className="text-[#4d8834]">أفضل عرض سعر</span>
          </h2>

          <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-4">
            فريقنا الهندسي جاهز لزيارة موقعك وتقديم معاينة وتصميم ثلاثي الأبعاد 3D وعرض سعر فوري مجاناً.
          </p>

          {/* Orange underline accent matching brand */}
          <div className="w-12 h-1 bg-[#e07b22] mx-auto rounded-full" />
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Right Column in RTL: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Phone Card */}
            <a
              href={`tel:${siteConfig.phone}`}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#4d8834] transition-all duration-300 flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#edf7ea] text-[#4d8834] flex items-center justify-center group-hover:bg-[#4d8834] group-hover:text-white transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <span className="block text-xs text-gray-500 font-semibold">اتصال هاتفي مباشر</span>
                  <span className="text-lg font-black text-gray-900 group-hover:text-[#4d8834] transition-colors" dir="ltr">
                    {siteConfig.phoneDisplay}
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#4d8834] bg-[#edf7ea] px-3 py-1.5 rounded-lg">
                اتصل الآن
              </span>
            </a>

            {/* WhatsApp Card */}
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("السلام عليكم، أرغب في طلب معاينة وعرض سعر لتنسيق حديقة")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#22c55e] transition-all duration-300 flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#10b981] flex items-center justify-center group-hover:bg-[#10b981] group-hover:text-white transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <span className="block text-xs text-gray-500 font-semibold">محادثة واتساب فورية</span>
                  <span className="text-base font-bold text-gray-900 group-hover:text-[#10b981] transition-colors">
                    متاحون للرد 24/7
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#10b981] bg-emerald-50 px-3 py-1.5 rounded-lg">
                راسلنا
              </span>
            </a>

            {/* Working Hours Card */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 text-right">
              <div className="w-12 h-12 rounded-xl bg-[#edf7ea] text-[#4d8834] flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-xs text-gray-500 font-semibold">أوقات العمل اليومية</span>
                <span className="text-sm font-bold text-gray-900 leading-tight">
                  {siteConfig.workingHours} (طوال أيام الأسبوع)
                </span>
              </div>
            </div>

            {/* Coverage Card */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 text-right">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#e07b22] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-xs text-gray-500 font-semibold">نطاق التغطية والخدمة</span>
                <span className="text-sm font-bold text-gray-900 leading-tight">
                  {siteConfig.coverage}
                </span>
              </div>
            </div>

            {/* Trust Banner */}
            <div className="bg-gradient-to-r from-[#4d8834] to-[#3d6e29] text-white p-4 rounded-2xl shadow-sm flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-lime-300 flex-shrink-0" />
              <p className="text-xs font-medium leading-relaxed">
                معاينة مجانية للموقع وتصميم 3D مع ضمان معتمد يصل إلى 7 سنوات لكافة المشاريع.
              </p>
            </div>

          </div>

          {/* Left Column in RTL: Quote Request Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border-t-4 border-[#4d8834] text-right">
              
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                  طلب معاينة وتصميم وعرض سعر مجاني
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  املأ البيانات أدناه وسيتم تحويل طلبك مباشرة لمهندس الموقع للتواصل معك فوراً.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-8 text-center bg-[#edf7ea] rounded-2xl border border-[#4d8834]/30 space-y-3 animate-fadeIn">
                  <CheckCircle2 className="w-12 h-12 text-[#4d8834] mx-auto" />
                  <h4 className="text-xl font-bold text-gray-900">تم إرسال طلبك بنجاح!</h4>
                  <p className="text-gray-700 text-sm">
                    تم فتح محادثة الواتساب لنقل التفاصيل. سيتواصل معك أحد مهندسينا خلال دقائق لتأكيد موعد المعاينة.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-[#4d8834] text-white text-sm font-bold hover:bg-[#3d6e29] transition-colors"
                  >
                    إرسال طلب جديد
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-bold text-gray-700 mb-1.5">
                        الاسم الكريم *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="مثال: محمد الشمري"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4d8834] focus:ring-2 focus:ring-[#4d8834]/20 outline-none text-sm bg-gray-50/50"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-bold text-gray-700 mb-1.5">
                        رقم الجوال *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="05XXXXXXXX"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4d8834] focus:ring-2 focus:ring-[#4d8834]/20 outline-none text-sm text-right bg-gray-50/50"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  {/* City & Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-city" className="block text-xs font-bold text-gray-700 mb-1.5">
                        المدينة / الحي *
                      </label>
                      <select
                        id="contact-city"
                        aria-label="المدينة أو الحي"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4d8834] focus:ring-2 focus:ring-[#4d8834]/20 outline-none text-sm bg-white"
                      >
                        <option value="الرياض">الرياض</option>
                        <option value="جدة">جدة</option>
                        <option value="مكة المكرمة">مكة المكرمة</option>
                        <option value="الدمام والخبر">الدمام والخبر</option>
                        <option value="المدينة المنورة">المدينة المنورة</option>
                        <option value="الطائف">الطائف</option>
                        <option value="الاحساء">الاحساء</option>
                        <option value="مدينة أخرى">مدينة أخرى</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-service" className="block text-xs font-bold text-gray-700 mb-1.5">
                        الخدمة المطلوبة *
                      </label>
                      <select
                        id="contact-service"
                        aria-label="الخدمة المطلوبة"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4d8834] focus:ring-2 focus:ring-[#4d8834]/20 outline-none text-sm bg-white"
                      >
                        <option value="تصميم وتنسيق حدائق">تصميم وتنسيق حدائق</option>
                        <option value="تركيب عشب صناعي وطبيعي">تركيب عشب صناعي وطبيعي</option>
                        <option value="شلالات ونوافير منزلية">شلالات ونوافير منزلية</option>
                        <option value="مظلات وبرجولات وسواتر">مظلات وبرجولات وسواتر</option>
                        <option value="عشب جداري وبديل خشب">عشب جداري وبديل خشب</option>
                        <option value="تركيب شبكات ري أوتوماتيكية">تركيب شبكات ري أوتوماتيكية</option>
                        <option value="زراعة نخيل وأشجار وزهور">زراعة نخيل وأشجار وزهور</option>
                        <option value="ديكورات وممرات حجرية">ديكورات وممرات حجرية</option>
                      </select>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label htmlFor="contact-notes" className="block text-xs font-bold text-gray-700 mb-1.5">
                      مساحة الحديقة أو ملاحظات إضافية (اختياري)
                    </label>
                    <textarea
                      id="contact-notes"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="اكتب المساحة التقريبية للحديقة أو أي تفاصيل خاصة..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4d8834] focus:ring-2 focus:ring-[#4d8834]/20 outline-none text-sm resize-none bg-gray-50/50"
                    />
                  </div>

                  {/* Submit Button with Green Brand Color */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#4d8834] hover:bg-[#3d6e29] text-white font-bold text-base shadow-md transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <Send className="w-5 h-5" />
                    <span>ارسل طلب المعاينة وعرض السعر مجاناً</span>
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}