"use client";

import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  textColor?: "dark" | "white";
}

export default function Logo({
  size = "md",
  showText = true,
  textColor = "dark",
}: LogoProps) {
  const sizeMap = {
    sm: { icon: "w-8 h-8", title: "text-lg", sub: "text-[9px]" },
    md: { icon: "w-11 h-11 sm:w-12 sm:h-12", title: "text-2xl sm:text-3xl", sub: "text-[10px] sm:text-[11px]" },
    lg: { icon: "w-14 h-14 sm:w-16 sm:h-16", title: "text-3xl sm:text-4xl", sub: "text-xs sm:text-sm" },
  };

  const currentSize = sizeMap[size];

  return (
    <div className="flex items-center gap-2.5 sm:gap-3 select-none">
      {/* Official Circular Logo Icon (Razor-Sharp Vector) */}
      <div className={`relative ${currentSize.icon} flex items-center justify-center flex-shrink-0`}>
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

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col text-right">
          <span
            className={`font-black tracking-tight leading-none ${currentSize.title} ${
              textColor === "white" ? "text-white" : "text-gray-900"
            }`}
          >
            حدائق المستقبل
          </span>
          <span
            className={`font-bold leading-tight mt-1 whitespace-nowrap text-[#e07b22] ${currentSize.sub}`}
          >
            لتنسيق الحدائق في السعودية
          </span>
        </div>
      )}
    </div>
  );
}
