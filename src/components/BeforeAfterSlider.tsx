"use client";

import React, { useState } from "react";
import { MoveHorizontal } from "lucide-react";

interface Props {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  subtitle?: string;
}

export default function BeforeAfterSlider({
  beforeImage = "/images/garden-before.jpg",
  afterImage = "/images/garden-after.jpg",
  beforeLabel = "قبل التنسيق (أرض خرسانية)",
  afterLabel = "بعد التنسيق والتصميم (واحة خضراء)",
  title = "شاهد الفرق المذهل: قبل وبعد التنسيق",
  subtitle = "اسحب المقبض يميناً ويساراً لمشاهدة تحول الفناء الكامل بأيدي مهندسي حدائق المستقبل بالرياض",
}: Props) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const position = (x / rect.width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, position)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.touches[0].clientX, rect);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging && e.buttons !== 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  return (
    <div className="space-y-4 text-right">
      {title && (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#4d8834] font-bold text-xs">
            <span>مقارنة بصرية حية</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-gray-900">{title}</h3>
          {subtitle && <p className="text-xs sm:text-sm text-gray-600">{subtitle}</p>}
        </div>
      )}

      {/* Slider Container */}
      <div
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border-4 border-white cursor-ew-resize select-none bg-gray-100"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
      >
        {/* After Image (Full Background) */}
        <img
          src={afterImage}
          alt={afterLabel}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Before Image (Clipped Left) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none max-w-none"
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-[#4d8834] text-white rounded-full flex items-center justify-center shadow-xl border-2 border-white">
            <MoveHorizontal className="w-5 h-5 animate-pulse" />
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-xl border border-white/20">
          {beforeLabel}
        </div>
        <div className="absolute top-4 left-4 z-10 bg-[#4d8834]/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-xl border border-white/20">
          {afterLabel}
        </div>
      </div>
    </div>
  );
}
