import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/content";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} | تصميم وتنسيق حدائق وشلالات`,
  description: "أفضل شركة تنسيق وتصميم حدائق الفلل والقصور بمدينة الرياض. توريد وتركيب عشب طبيعي وصناعي، شلالات ونوافير، مظلات وبرجولات، شبكات ري أوتوماتيكية وضمان حتى 7 سنوات.",
  keywords: [
    "تنسيق حدائق",
    "تصميم حدائق",
    "عشب صناعي",
    "عشب طبيعي",
    "شلالات جدارية",
    "نوافير منزلية",
    "مظلات حدائق",
    "برجولات خشبية",
    "شبكات ري",
    "مؤسسة حدائق المستقبل لتنسيق الحدائق",
    "لاندسكيب الرياض",
    "تنسيق حدائق جدة",
    "تنسيق حدائق الشرقية"
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: `${siteConfig.name} | أفضل خدمات تنسيق الحدائق بالرياض`,
    description: "تصميم وتنفيذ حدائق الفلل والقصور، عشب صناعي وطبيعي، شلالات، نوافير ومظلات مع ضمان معتمد ومعاينة مجانية.",
    type: "website",
    locale: "ar_SA",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} scroll-smooth`}>
      <head>
        <meta name="theme-color" content="#064e3b" />
      </head>
      <body className="font-sans antialiased bg-gray-50 text-gray-900 selection:bg-emerald-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
