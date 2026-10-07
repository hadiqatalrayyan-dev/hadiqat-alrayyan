import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "مدونة تنسيق الحدائق | أفكار ونصائح | حديقة الريان السعودية",
  },
  description: "اكتشف أفكار ونصائح عملية لتنسيق الحدائق واختيار العشب والري والتصميم ، مع محتوى يساعدك على التخطيط لمشروع حديقتك واتخاذ قرار أفضل قبل التنفيذ.",
  keywords: [
    "تنسيق حدائق",
    "أفكار تنسيق حدائق",
    "أسعار تنسيق الحدائق",
    "أنواع العشب الصناعي",
    "نصائح تنسيق الحدائق"
  ],
  alternates: {
    canonical: "https://hadiqat-alrayan.com/blog/",
  },
  openGraph: {
    title: "مدونة تنسيق الحدائق | أفكار ونصائح | حديقة الريان السعودية",
    description: "اكتشف أفكار ونصائح عملية لتنسيق الحدائق واختيار العشب والري والتصميم ، مع محتوى يساعدك على التخطيط لمشروع حديقتك واتخاذ قرار أفضل قبل التنفيذ.",
    url: "https://hadiqat-alrayan.com/blog/",
    siteName: "حديقة الريان السعودية",
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
