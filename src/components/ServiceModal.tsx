"use client";

import React from "react";
import { ServiceItem, siteConfig } from "@/data/content";
import { X, CheckCircle2, ArrowRight } from "lucide-react";
import { FaWhatsapp, FaPhoneVolume } from "react-icons/fa6";

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-emerald-100 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2.5 rounded-full bg-black/40 text-white hover:bg-black/70 transition-colors backdrop-blur-md"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge & Title */}
          <div className="absolute bottom-4 right-4 left-4 text-white">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500 text-xs font-bold mb-2">
              {service.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-black">{service.title}</h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div>
            <h4 className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-2">تفاصيل الخدمة</h4>
            <p className="text-gray-700 leading-relaxed text-base">
              {service.fullDesc}
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-3">أهم مميزات الخدمة مع حدائق الريان:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100/60 text-sm text-emerald-950 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Row */}
          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#4d8834] hover:bg-[#3d6e29] text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-colors"
            >
              <FaPhoneVolume className="w-4 h-4" />
              <span>طلب الخدمة هاتفياً</span>
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`السلام عليكم، أود طلب خدمة: ${service.title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-colors"
            >
              <FaWhatsapp className="w-5 h-5" />
              <span>طلب عبر الواتساب</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
