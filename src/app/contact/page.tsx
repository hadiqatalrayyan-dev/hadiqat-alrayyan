"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { siteConfig } from "@/data/content";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
  Award,
} from "lucide-react";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "تصميم وتنسيق حدائق",
    cityArea: "شمال الرياض",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // WhatsApp direct integration
    const text = `السلام عليكم، أود طلب خدمة من مؤسسة حدائق المستقبل بالرياض:
- الاسم: ${formData.name}
- الجوال: ${formData.phone}
- الخدمة: ${formData.service}
- الحي/المنطقة: ${formData.cityArea}
- ملاحظات: ${formData.message || "لا توجد"}`;
    window.open(
      `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans select-none">
      <Header />

      {/* 1. Hero Section matching screenshot 100% */}
      <section className="relative py-20 sm:py-24 text-center overflow-hidden">
        {/* Exact Wood Texture Background with Gardening Tools */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/contact-hero-bg.webp')",
          }}
        />
        {/* Dark contrast gradient overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-white space-y-4">
          
          {/* Breadcrumbs */}
          <div className="text-xs sm:text-sm text-emerald-300 font-semibold space-x-2 space-x-reverse">
            <Link href="/" className="hover:underline">
              حدائق المستقبل
            </Link>
            <span>»</span>
            <span>تواصل معنا</span>
          </div>

          {/* Main Hero Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight drop-shadow-md">
            تواصل مع مؤسسة حدائق المستقبل لتنسيق الحدائق بالرياض
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl mx-auto font-medium">
            نسعد باستقبال طلباتكم واستفساراتكم على مدار 24 ساعة لخدمة كافة أحياء ومناطق الرياض وضواحيها.
          </p>

        </div>
      </section>

      {/* 2. Two Large Action Cards matching screenshot 100% */}
      <section className="relative z-20 -mt-10 sm:-mt-14 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Right Card in RTL: Phone Call */}
          <div className="bg-[#edf7ea] rounded-3xl p-8 sm:p-10 border-2 border-[#4d8834]/20 shadow-lg text-center flex flex-col items-center justify-between space-y-6 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#4d8834] text-white flex items-center justify-center shadow-md">
                <Phone className="w-8 h-8" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                تواصل معنا عبر الهاتف الجوال
              </h2>
              <p className="text-xs text-gray-600 font-medium">
                متاحون للرد المباشر والفوري وتقديم الاستشارات الفنية
              </p>
            </div>

            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center justify-center w-full max-w-xs bg-[#4d8834] hover:bg-[#3d6e29] text-white font-black text-base sm:text-lg py-3.5 px-6 rounded-2xl shadow-md transition-all hover:shadow-lg"
              dir="ltr"
            >
              <span>{siteConfig.phoneDisplay}</span>
            </a>
          </div>

          {/* Left Card in RTL: WhatsApp */}
          <div className="bg-[#edf7ea] rounded-3xl p-8 sm:p-10 border-2 border-[#4d8834]/20 shadow-lg text-center flex flex-col items-center justify-between space-y-6 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#4d8834] text-white flex items-center justify-center shadow-md">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                تواصل معنا عبر تطبيق واتس آب
              </h2>
              <p className="text-xs text-gray-600 font-medium">
                أرسل مساحة حديقتك وصور الموقع للحصول على عرض سعر فوري
              </p>
            </div>

            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("السلام عليكم، أود الاستفسار عن خدمات تنسيق الحدائق بالرياض")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full max-w-xs bg-[#4d8834] hover:bg-[#3d6e29] text-white font-black text-base sm:text-lg py-3.5 px-6 rounded-2xl shadow-md transition-all hover:shadow-lg"
              dir="ltr"
            >
              <span>{siteConfig.phoneDisplay}</span>
            </a>
          </div>

        </div>
      </section>

      {/* 3. Direct Quick Quote Form & Working Details */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-right">
          
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 sm:p-10 space-y-8">
            
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-[#4d8834] bg-[#edf7ea] px-4 py-1.5 rounded-full">
                طلب معاينة وتصميم 3D مجاني
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                أرسل طلبك وسيتواصل معك مهندسنا فوراً
              </h2>
            </div>

            {formSubmitted ? (
              <div className="bg-[#edf7ea] border-2 border-[#4d8834] rounded-2xl p-8 text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-[#4d8834] mx-auto" />
                <h3 className="text-xl font-bold text-gray-900">تم إرسال طلبك بنجاح!</h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  تم فتح تطبيق واتساب للتأكيد. سيتواصل معك أحد مهندسينا خلال دقائق لترتيب موعد المعاينة المجانية.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-gray-700">الاسم الكريم:</label>
                    <input
                      type="text"
                      required
                      placeholder="أدخل اسمك"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4d8834] outline-none text-xs sm:text-sm bg-gray-50/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-gray-700">رقم الجوال (واتساب):</label>
                    <input
                      type="tel"
                      required
                      placeholder="05XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4d8834] outline-none text-xs sm:text-sm bg-gray-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-gray-700">نوع الخدمة المطلوبة:</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4d8834] outline-none text-xs sm:text-sm bg-gray-50/50 font-medium"
                    >
                      <option value="تصميم وتنسيق حدائق">تصميم وتنسيق حدائق متكامل</option>
                      <option value="توريد وتركيب عشب صناعي">توريد وتركيب عشب صناعي</option>
                      <option value="زراعة عشب وثيل طبيعي">زراعة عشب وثيل طبيعي</option>
                      <option value="تصميم شلالات ونوافير">تصميم شلالات ونوافير مودرن</option>
                      <option value="مظلات وبرجولات وجلسات">مظلات وبرجولات وجلسات خارجية</option>
                      <option value="شبكات ري أوتوماتيكية">شبكات ري أوتوماتيكية ذكية</option>
                      <option value="تكريب وزراعة نخيل">تكريب وزراعة نخيل وأشجار</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-gray-700">الحي في الرياض:</label>
                    <input
                      type="text"
                      placeholder="مثال: النرجس، الملقا، الياسمين، حطين..."
                      value={formData.cityArea}
                      onChange={(e) => setFormData({ ...formData, cityArea: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4d8834] outline-none text-xs sm:text-sm bg-gray-50/50"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700">ملاحظات أو تفاصيل إضافية (اختياري):</label>
                  <textarea
                    rows={3}
                    placeholder="اكتب مساحة الحديقة التقريبية أو أي تفاصيل ترغب بها..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4d8834] outline-none text-xs sm:text-sm bg-gray-50/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#4d8834] hover:bg-[#3d6e29] text-white font-bold py-4 rounded-xl shadow-md transition-all hover:shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال الطلب عبر الواتساب مباشرة</span>
                </button>
              </form>
            )}

          </div>

        </div>
      </section>

      {/* 4. Team Illustration Banner Strip matching screenshot 100% */}
      <div className="w-full bg-white py-8 border-t border-gray-100 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <img
            src="/images/about-team-banner.webp"
            alt="فريق عمل مؤسسة حدائق المستقبل لتنسيق الحدائق بالرياض"
            className="w-full max-h-56 sm:max-h-72 object-contain mx-auto"
          />
        </div>
      </div>

      <Footer />
      <FloatingActions />
    </div>
  );
}
