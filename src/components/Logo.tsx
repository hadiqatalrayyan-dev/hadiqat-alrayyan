"use client";

import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  textColor?: "dark" | "white";
  className?: string;
}

export default function Logo({
  size = "md",
  className = "",
}: LogoProps) {
  const sizeMap = {
    sm: "h-10 sm:h-12",
    md: "h-14 sm:h-16 lg:h-18",
    lg: "h-20 sm:h-24",
  };

  const heightClass = sizeMap[size] || sizeMap.md;

  return (
    <div className={`relative flex items-center select-none ${className}`}>
      <img
        src="/logo.png"
        alt="حدائق الريان لتنسيق الحدائق والديكورات"
        className={`${heightClass} w-auto object-contain drop-shadow-sm max-w-[260px] sm:max-w-[340px] md:max-w-[400px] transition-transform duration-300 group-hover:scale-105`}
        width={360}
        height={110}
        loading="eager"
      />
    </div>
  );
}
