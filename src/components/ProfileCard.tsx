import React from "react";

interface ProfileCardProps {
  name?: string;
  title?: string;
  description?: string;
  imageSrc?: string;
  whatsappNumber?: string;
  className?: string;
}

export default function ProfileCard({
  name = "Rabea Shaban",
  title = "مهندس برمجيات Full Stack | MERN Stack Developer",
  description = "متخصص في تطوير تطبيقات الويب الحديثة والقابلة للتوسع باستخدام React.js و Next.js و TypeScript و Node.js و MongoDB، مع التركيز على بناء حلول عالية الأداء وتجربة مستخدم احترافية.",
  imageSrc = "/images/rabea-shaban-profile.jpg",
  whatsappNumber = "201156807072",
  className = "",
}: ProfileCardProps) {
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("السلام عليكم م. ربيع، أود الاستفسار عن خدمات تصميم وتطوير وبرمجة المواقع")}`;

  return (
    <div
      dir="rtl"
      className={`max-w-2xl w-full bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.05)] text-center flex flex-col items-center select-none font-sans transition-all duration-300 hover:shadow-[0_15px_45px_rgba(0,0,0,0.08)] ${className}`}
    >
      {/* 1. Circular Profile Photo with Elegant Green Border */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-0.5 border-2 border-[#4d8834] flex items-center justify-center mb-5 shadow-sm bg-white hover:scale-105 transition-transform duration-300 group"
        title="تواصل مباشرة عبر واتساب"
      >
        <div className="w-full h-full rounded-full overflow-hidden">
          <img
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover object-top"
          />
        </div>
        {/* Status Dot */}
        <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[#25D366] border-2 border-white shadow-xs" />
      </a>

      {/* 2. Main Bold Name */}
      <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-1.5">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#4d8834] transition-colors"
        >
          {name}
        </a>
      </h2>

      {/* 3. Professional Subtitle */}
      <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-4 tracking-normal">
        {title}
      </p>

      {/* 4. Description */}
      <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed max-w-lg mx-auto font-normal mb-5">
        {description}
      </p>

      {/* 5. Sleek Direct WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#edf7ea] hover:bg-[#4d8834] text-[#4d8834] hover:text-white font-bold text-xs px-5 py-2 rounded-full border border-[#4d8834]/30 shadow-xs hover:shadow-md transition-all duration-300 hover:scale-105"
      >
        <svg className="w-4 h-4 fill-current text-[#25D366] group-hover:text-white" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.13.559 4.129 1.536 5.869l-1.636 5.975 6.136-1.61c1.701.928 3.647 1.466 5.714 1.466 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
        </svg>
        <span>تواصل واتساب: 01156807072</span>
      </a>
    </div>
  );
}
