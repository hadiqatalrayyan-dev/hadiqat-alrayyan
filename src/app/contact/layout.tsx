import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "اتصل بنا | مؤسسة حدائق الريان لتنسيق الحدائق بالرياض 0556226376",
  },
  description: "تواصل مع مؤسسة حدائق الريان بالرياض لحجز معاينة موقعك المجانية وطلب عرض سعر وتصميم 3D لحديقة منزلك أو فيلتك. اتصل أو واتساب 0556226376 لكافة أحياء الرياض.",
  keywords: [
    "اتصل بنا حدائق الريان",
    "رقم شركة تنسيق حدائق بالرياض",
    "ارقام منسقي حدائق بالرياض",
    "طلب معاينة حدائق منزلية",
    "حجز تصميم حدائق فلل 3D",
    "تواصل مع حدائق الريان الرياض"
  ],
  alternates: {
    canonical: "https://hadiqat-alrayan.com/contact/",
  },
  openGraph: {
    title: "اتصل بنا | مؤسسة حدائق الريان لتنسيق الحدائق بالرياض 0556226376",
    description: "احجز موعد المعاينة الميدانية المجانية واحصل على تصميم ثلاثي الأبعاد 3D وعرض سعر فوري لحديقتك في الرياض.",
    url: "https://hadiqat-alrayan.com/contact/",
    siteName: "مؤسسة حدائق الريان بالرياض",
    locale: "ar_SA",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
