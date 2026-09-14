"use client";

const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


import React, { useState } from "react";
import { Calculator, CheckCircle2, RefreshCw } from "lucide-react";
import { FaWhatsapp, FaPhoneVolume } from "react-icons/fa6";
import { siteConfig } from "@/data/content";

export default function GardenCostCalculator() {
  const [area, setArea] = useState<number>(60);
  const [grassType, setGrassType] = useState<string>("artificial-35"); // artificial-35, artificial-45, natural, none
  const [wallGrassArea, setWallGrassArea] = useState<number>(15);
  const [waterfall, setWaterfall] = useState<string>("wall"); // none, wall, luxury
  const [pergola, setPergola] = useState<string>("wood-iron"); // none, wood-iron, luxury-aluminum
  const [irrigation, setIrrigation] = useState<boolean>(true);
  const [lighting, setLighting] = useState<boolean>(true);

  // Price calculations (Estimated realistic Riyadh market rates in SAR)
  const calculateTotal = () => {
    let minPrice = 0;
    let maxPrice = 0;

    // Base Flooring
    if (grassType === "artificial-35") {
      minPrice += area * 40;
      maxPrice += area * 55;
    } else if (grassType === "artificial-45") {
      minPrice += area * 50;
      maxPrice += area * 65;
    } else if (grassType === "natural") {
      minPrice += area * 25;
      maxPrice += area * 35;
    }

    // Wall Grass
    if (wallGrassArea > 0) {
      minPrice += wallGrassArea * 45;
      maxPrice += wallGrassArea * 65;
    }

    // Waterfall / Fountain
    if (waterfall === "wall") {
      minPrice += 1800;
      maxPrice += 3200;
    } else if (waterfall === "luxury") {
      minPrice += 3500;
      maxPrice += 6500;
    }

    // Pergola
    if (pergola === "wood-iron") {
      minPrice += 2800;
      maxPrice += 4500;
    } else if (pergola === "luxury-aluminum") {
      minPrice += 4500;
      maxPrice += 7500;
    }

    // Automatic Irrigation
    if (irrigation && grassType !== "none") {
      minPrice += 800;
      maxPrice += 1500;
    }

    // Garden Lighting
    if (lighting) {
      minPrice += 600;
      maxPrice += 1200;
    }

    return { minPrice, maxPrice };
  };

  const { minPrice, maxPrice } = calculateTotal();

  const handleWhatsAppQuote = () => {
    const grassName =
      grassType === "artificial-35"
        ? "عشب صناعي 35 ملم"
        : grassType === "artificial-45"
        ? "عشب صناعي 45 ملم كثيف"
        : grassType === "natural"
        ? "ثيل طبيعي C2000"
        : "بدون عشب أرضي";

    const waterfallName =
      waterfall === "wall"
        ? "شلال جداري انسيابي"
        : waterfall === "luxury"
        ? "شلال مودرن فاخر / نافورة"
        : "بدون شلال";

    const pergolaName =
      pergola === "wood-iron"
        ? "برجولة حديد مع بديل خشب"
        : pergola === "luxury-aluminum"
        ? "برجولة ألمنيوم مودرن فاخرة"
        : "بدون برجولة";

    const message = `السلام عليكم ورحمة الله وبركاته،
أود الاستفسار وطلب معاينة لتقدير تكلفة تنسيق حديقتي بالرياض:
📐 المساحة الأرضية: ${area} متر مربع
🌿 نوع الثيل: ${grassName}
🧱 العشب الجداري: ${wallGrassArea} متر مربع
💧 الشلال/النافورة: ${waterfallName}
🏡 البرجولة والمظلة: ${pergolaName}
⏱️ شبكة ري أوتوماتيكية: ${irrigation ? "نعم" : "لا"}
💡 الإضاءة الليلية: ${lighting ? "نعم" : "لا"}
📊 التكلفة التقديرية بالحاسبة: من ${formatNumber(minPrice)} إلى ${formatNumber(maxPrice)} ريال

يرجى التواصل لتأكيد موعد المعاينة المجانية في موقعي بالرياض.`;

    const url = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-[#4d8834]/30 shadow-2xl p-6 sm:p-10 text-right space-y-8">
      
      {/* Header */}
      <div className="space-y-2 border-b border-gray-100 pb-6 text-center sm:text-right">
        <div className="inline-flex items-center gap-2 bg-[#edf7ea] text-[#4d8834] text-xs font-bold px-3 py-1.5 rounded-full">
          <Calculator className="w-4 h-4" />
          <span>أداة تفاعلية فورية</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
          حاسبة تكلفة تنسيق وتصميم الحدائق بالرياض
        </h2>
        <p className="text-xs sm:text-sm text-gray-600">
          حدد مواصفات ومساحة حديقتك واحصل على تقدير فوري للتكلفة شاملة التوريد والتركيب والضمان.
        </p>
      </div>

      {/* Grid of Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. Ground Area */}
        <div className="space-y-2 bg-gray-50 p-4 rounded-2xl border border-gray-200">
          <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-gray-800">
            <label htmlFor="calc-ground-area">مساحة الأرضية (حوش / سطح):</label>
            <span className="text-[#1d5512] font-black text-base">{area} م²</span>
          </div>
          <input
            id="calc-ground-area"
            type="range"
            min={10}
            max={300}
            step={5}
            value={area}
            aria-label="مساحة الأرضية بالمتر المربع"
            onChange={(e) => setArea(Number(e.target.value))}
            className="w-full accent-[#1d5512] cursor-pointer"
          />
          <div className="flex justify-between text-[11px] font-bold text-gray-600">
            <span>10 م²</span>
            <span>150 م²</span>
            <span>300 م²</span>
          </div>
        </div>

        {/* 2. Turf Type */}
        <div className="space-y-2 bg-gray-50 p-4 rounded-2xl border border-gray-200">
          <label htmlFor="calc-turf-type" className="block text-xs sm:text-sm font-bold text-gray-800">
            نوع الثيل / العشب الأرضي:
          </label>
          <select
            id="calc-turf-type"
            aria-label="نوع الثيل أو العشب الأرضي"
            value={grassType}
            onChange={(e) => setGrassType(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-xl p-2.5 text-xs sm:text-sm text-gray-800 font-semibold focus:outline-none focus:border-[#1d5512]"
          >
            <option value="artificial-35">عشب صناعي 35 ملم (الأكثر طلباً)</option>
            <option value="artificial-45">عشب صناعي 45 ملم سوبر كثيف</option>
            <option value="natural">ثيل طبيعي C2000 أمريكي معتمد</option>
            <option value="none">بدون عشب أرضي (بلاط/حجر فقط)</option>
          </select>
        </div>

        {/* 3. Wall Grass Area */}
        <div className="space-y-2 bg-gray-50 p-4 rounded-2xl border border-gray-200">
          <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-gray-800">
            <label htmlFor="calc-wall-area">مساحة العشب الجداري / السور:</label>
            <span className="text-[#1d5512] font-black text-base">{wallGrassArea} م²</span>
          </div>
          <input
            id="calc-wall-area"
            type="range"
            min={0}
            max={100}
            step={5}
            value={wallGrassArea}
            aria-label="مساحة العشب الجداري بالمتر المربع"
            onChange={(e) => setWallGrassArea(Number(e.target.value))}
            className="w-full accent-[#1d5512] cursor-pointer"
          />
          <div className="flex justify-between text-[11px] font-bold text-gray-600">
            <span>0 م²</span>
            <span>50 م²</span>
            <span>100 م²</span>
          </div>
        </div>

        {/* 4. Waterfall */}
        <div className="space-y-2 bg-gray-50 p-4 rounded-2xl border border-gray-200">
          <label htmlFor="calc-waterfall-type" className="block text-xs sm:text-sm font-bold text-gray-800">
            إضافة شلال أو نافورة مائية:
          </label>
          <select
            id="calc-waterfall-type"
            aria-label="إضافة شلال أو نافورة مائية"
            value={waterfall}
            onChange={(e) => setWaterfall(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-xl p-2.5 text-xs sm:text-sm text-gray-800 font-semibold focus:outline-none focus:border-[#4d8834]"
          >
            <option value="none">بدون شلال</option>
            <option value="wall">شلال جداري انسيابي كلاسيك (مصب ستيل)</option>
            <option value="luxury">شلال مودرن فاخر متعدد المستويات / نافورة</option>
          </select>
        </div>

        {/* 5. Pergola */}
        <div className="space-y-2 bg-gray-50 p-4 rounded-2xl border border-gray-200">
          <label htmlFor="calc-pergola-type" className="block text-xs sm:text-sm font-bold text-gray-800">
            جلسة مظللة / برجولة خارجية:
          </label>
          <select
            id="calc-pergola-type"
            aria-label="جلسة مظللة أو برجولة خارجية"
            value={pergola}
            onChange={(e) => setPergola(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-xl p-2.5 text-xs sm:text-sm text-gray-800 font-semibold focus:outline-none focus:border-[#4d8834]"
          >
            <option value="none">بدون برجولة</option>
            <option value="wood-iron">برجولة حديد مع تكسية بديل خشب WPC</option>
            <option value="luxury-aluminum">برجولة ألمنيوم مودرن مع سقف لكسان</option>
          </select>
        </div>

        {/* 6. Irrigation & Lighting Switches */}
        <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-200 flex flex-col justify-center">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={irrigation}
              onChange={(e) => setIrrigation(e.target.checked)}
              className="w-4 h-4 accent-[#4d8834] rounded"
            />
            <span className="text-xs sm:text-sm font-bold text-gray-800">
              تمديد شبكة ري أوتوماتيكية مبرمجة بالتايمر
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={lighting}
              onChange={(e) => setLighting(e.target.checked)}
              className="w-4 h-4 accent-[#4d8834] rounded"
            />
            <span className="text-xs sm:text-sm font-bold text-gray-800">
              توزيع إضاءة لاندسكيب ليد دافئة (سبوتات وغرس)
            </span>
          </label>
        </div>

      </div>

      {/* Result Box & Action */}
      <div className="bg-gradient-to-br from-[#0b3414] to-[#124d20] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-right">
          <span className="text-amber-400 font-bold text-xs uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5">
            <span>التكلفة التقديرية الشاملة للتوريد والتركيب:</span>
          </span>
          <div className="text-3xl sm:text-4xl font-black text-white" suppressHydrationWarning>
            {formatNumber(minPrice)} - {formatNumber(maxPrice)} <span className="text-lg text-emerald-300">ريال سعودي</span>
          </div>
          <p className="text-[11px] text-emerald-200/80">
            * السعر تقريبي ويشمل المواد وضمان الجودة، وتحدد التكلفة النهائية بدقة بعد المعاينة الميدانية المجانية.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={handleWhatsAppQuote}
            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all hover:scale-105"
          >
            <FaWhatsapp className="w-4 h-4" />
            <span>إرسال المقايسة لواتساب</span>
          </button>
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl border border-white/20 transition-all"
          >
            <FaPhoneVolume className="w-3.5 h-3.5" />
            <span>اتصال بالمهندس</span>
          </a>
        </div>
      </div>

    </div>
  );
}