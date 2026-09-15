import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "مدونة تنسيق وتصميم الحدائق بالرياض | أفكار وأسعار 2026",
  },
  description: "أحدث مقالات ونصائح وأفكار تنسيق حدائق المنازل والفلل بالرياض لعام 2026. أسعار العشب الصناعي والطبيعي، شبكات الري الذكية، الشلالات، ودليل اللاندسكيب.",
  keywords: [
    "مدونة تنسيق الحدائق",
    "نصائح لاندسكيب الرياض",
    "افكار حدائق منزلية 2026",
    "اسعار العشب والري بالرياض",
    "دليل تصميم حدائق الفلل"
  ],
  alternates: {
    canonical: "https://hadiqat-alrayan.com/blog/",
  },
  openGraph: {
    title: "مدونة تنسيق وتصميم الحدائق بالرياض | أفكار وأسعار 2026",
    description: "دليلك الشامل ومقالات متخصصة في تنسيق وتصميم الحدائق المنزلية والفلل بالرياض لعام 2026 من خبراء مؤسسة حدائق الريان.",
    url: "https://hadiqat-alrayan.com/blog/",
    siteName: "مؤسسة حدائق الريان بالرياض",
    locale: "ar_SA",
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
