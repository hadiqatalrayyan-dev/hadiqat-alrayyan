import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "كافة خدمات تنسيق الحدائق واللاندسكيب | حديقة الريان السعودية",
  },
  description: "استعرض كافة خدمات تصميم وتنسيق الحدائق، العشب الصناعي والطبيعي، الشلالات، البرجولات، وشبكات الري في السعودية من حديقة الريان مع ضمان يصل إلى 7 سنوات.",
  keywords: [
    "خدمات تنسيق حدائق",
    "تنسيق حدائق السعودية",
    "شركة لاندسكيب",
    "عشب صناعي وشلالات",
    "تصميم حدائق فلل"
  ],
  alternates: {
    canonical: "https://hadiqat-alrayan.com/services/",
  },
  openGraph: {
    title: "كافة خدمات تنسيق الحدائق واللاندسكيب | حديقة الريان السعودية",
    description: "استعرض كافة خدمات تصميم وتنسيق الحدائق، العشب الصناعي والطبيعي، الشلالات، البرجولات، وشبكات الري في السعودية من حديقة الريان مع ضمان يصل إلى 7 سنوات.",
    url: "https://hadiqat-alrayan.com/services/",
    siteName: "حديقة الريان السعودية",
    locale: "ar_SA",
    type: "website",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
