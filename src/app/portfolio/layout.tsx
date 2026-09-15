import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "معرض أعمالنا ومشاريعنا بالرياض | مؤسسة حدائق الريان",
  },
  description: "شاهد صور وفيديوهات سابقة أعمال مؤسسة حدائق الريان في تنسيق حدائق الفلل، تركيب العشب الصناعي والطبيعي، الشلالات، البرجولات، والمظلات المنفذة بالرياض.",
  keywords: [
    "معرض اعمال حدائق الريان",
    "مشاريع تنسيق حدائق فلل بالرياض",
    "صور حدائق منزلية قبل وبعد بالرياض",
    "نماذج شلالات وبرجولات الرياض",
    "صور لاندسكيب فلل وقصور"
  ],
  alternates: {
    canonical: "https://hadiqat-alrayan.com/portfolio/",
  },
  openGraph: {
    title: "معرض أعمالنا ومشاريعنا بالرياض | مؤسسة حدائق الريان",
    description: "أحدث مشاريع اللاندسكيب وتنسيق حدائق الفلل والاستراحات بالرياض مع صور المقارنة قبل وبعد.",
    url: "https://hadiqat-alrayan.com/portfolio/",
    siteName: "مؤسسة حدائق الريان بالرياض",
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
