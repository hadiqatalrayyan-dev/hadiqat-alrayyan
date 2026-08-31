"use client";

import React, { useState } from "react";
import { X, Calendar, User, Phone, MapPin, CheckCircle2, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/content";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function FreeInspectionModal({ isOpen, onClose }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [preferredDay, setPreferredDay] = useState("اليوم أو غداً");
  const [service, setService] = useState("تنسيق حديقة متكامل");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `السلام عليكم ورحمة الله،
أود حجز موعد معاينة ميدانية مجانية لرفع المقاسات وتقديم عرض سعر:
👤 الاسم: ${name || "عميل كريم"}
📱 رقم الجوال: ${phone || "غير محدد"}
📍 الحي / الموقع بالرياض: ${district || "الرياض"}
📅 الموعد المفضل: ${preferredDay}
🌿 الخدمة المطلوبة: ${service}

أرجو التواصل لتأكيد الموعد المناسب.`;

    const url = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8 text-right relative space-y-6 border border-gray-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 text-gray-400 hover:text-gray-700 bg-gray-100 p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="space-y-1">
          <div className="inline-block bg-[#edf7ea] text-[#4d8834] text-xs font-bold px-3 py-1 rounded-full">
            مجاناً 100% وبدون أي التزام
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-gray-900">
            احجز زيارة مهندس ومعاينة لموقعك بالرياض
          </h3>
          <p className="text-xs text-gray-600">
            سنقوم بزيارة موقعك، رفع المقاسات الدقيقة، وتقديم مخطط وتصميم 3D مع مقايسة أسعار معتمدة.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          
          <div className="space-y-1">
            <label className="font-bold text-gray-700 block">الاسم الكريم:</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="أدخل اسمك"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:border-[#4d8834]"
              />
              <User className="w-4 h-4 text-gray-400 absolute top-3.5 right-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-700 block">رقم الجوال:</label>
            <div className="relative">
              <input
                type="tel"
                required
                placeholder="05xxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:border-[#4d8834]"
              />
              <Phone className="w-4 h-4 text-gray-400 absolute top-3.5 right-3.5" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-gray-700 block">الحي بالرياض:</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="مثال: النرجس، الملقا..."
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full p-3 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:border-[#4d8834]"
                />
                <MapPin className="w-4 h-4 text-gray-400 absolute top-3.5 right-3.5" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700 block">الموعد المفضل:</label>
              <select
                value={preferredDay}
                onChange={(e) => setPreferredDay(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#4d8834] bg-white font-semibold text-gray-700"
              >
                <option value="اليوم (فترة مسائية)">اليوم (فترة مسائية)</option>
                <option value="غداً صباحاً">غداً صباحاً</option>
                <option value="غداً مساءً">غداً مساءً</option>
                <option value="نهاية الأسبوع">نهاية الأسبوع</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-700 block">الخدمة المطلوبة:</label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#4d8834] bg-white font-semibold text-gray-700"
            >
              <option value="تنسيق حديقة فيلا متكاملة">تنسيق حديقة فيلا متكاملة</option>
              <option value="تركيب ثيل صناعي وطبيعي">تركيب ثيل صناعي وطبيعي</option>
              <option value="تصميم شلالات ونوافير ومصبات">تصميم شلالات ونوافير ومصبات</option>
              <option value="تركيب مظلات وبرجولات خشبية وحديد">تركيب مظلات وبرجولات خشبية وحديد</option>
              <option value="تكسية جدران بعشب وبديل خشب">تكسية جدران بعشب وبديل خشب</option>
              <option value="تمديد شبكات ري أوتوماتيكية">تمديد شبكات ري أوتوماتيكية</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#4d8834] hover:bg-[#3d6e29] text-white font-bold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm mt-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>تأكيد طلب المعاينة عبر واتساب</span>
          </button>
        </form>

      </div>
    </div>
  );
}
