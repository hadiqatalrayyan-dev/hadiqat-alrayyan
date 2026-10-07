import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "أعمال تنسيق حدائق ولاندسكيب | مشاريعنا | حديقة الريان السعودية",
  },
  description: "استكشف أعمالنا ومشاريعنا في تنسيق الحدائق واللاندسكيب والعشب الصناعي، وتعرّف على نماذج من التنفيذ والحلول التي نقدمها للمساحات والمشاريع المختلفة.",
  keywords: [
    "اعمال اللاند سكيب وتنسيق الحدائق",
    "مشاريع تنسيق حدائق",
    "أعمال لاندسكيب",
    "مشاريع عشب صناعي",
    "مشاريع حدائق"
  ],
  alternates: {
    canonical: "https://hadiqat-alrayan.com/portfolio/",
  },
  openGraph: {
    title: "أعمال تنسيق حدائق ولاندسكيب | مشاريعنا | حديقة الريان السعودية",
    description: "استكشف أعمالنا ومشاريعنا في تنسيق الحدائق واللاندسكيب والعشب الصناعي، وتعرّف على نماذج من التنفيذ والحلول التي نقدمها للمساحات والمشاريع المختلفة.",
    url: "https://hadiqat-alrayan.com/portfolio/",
    siteName: "حديقة الريان السعودية",
    locale: "ar_SA",
    type: "website",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
