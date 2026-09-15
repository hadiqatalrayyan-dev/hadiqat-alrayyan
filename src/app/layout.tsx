import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/content";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
  preload: true,
});

const siteTitle = "مؤسسة حدائق الريان | أفضل شركة تنسيق حدائق بالرياض";
const siteDescription = "مؤسسة حدائق الريان لتصميم وتنسيق الحدائق المنزلية والفلل بالرياض. عشب صناعي وطبيعي، شلالات جدارية، مظلات وبرجولات، شبكات ري، تصميم 3D مجاني وضمان 7 سنوات 0556226376.";
const siteUrl = "https://hadiqat-alrayan.com";
const ogImageUrl = "/images/og-image.webp";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | حدائق الريان بالرياض`,
  },
  description: siteDescription,
  applicationName: "مؤسسة حدائق الريان",
  authors: [{ name: "مؤسسة حدائق الريان لتنسيق الحدائق", url: siteUrl }],
  creator: "مؤسسة حدائق الريان",
  publisher: "مؤسسة حدائق الريان",
  keywords: [
    "تنسيق حدائق بالرياض",
    "شركة تنسيق حدائق بالرياض",
    "افضل شركة تنسيق حدائق بالرياض",
    "تصميم حدائق فلل بالرياض",
    "تركيب عشب صناعي بالرياض",
    "توريد ثيل طبيعي بالرياض",
    "شلالات جدارية بالرياض",
    "نوافير منزلية بالرياض",
    "مظلات وبرجولات حدائق بالرياض",
    "شبكات ري اوتوماتيكية بالرياض",
    "مؤسسة حدائق الريان",
    "اسعار تنسيق الحدائق بالرياض 2026",
    "ارقام شركات تنسيق حدائق بالرياض",
    "لاندسكيب الرياض",
    "عشب جداري وبديل خشب بالرياض",
  ],
  alternates: {
    canonical: "https://hadiqat-alrayan.com/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: siteConfig.name,
    locale: "ar_SA",
    type: "website",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - لاندسكيب وتنسيق حدائق فاخر بالرياض`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImageUrl],
    creator: "@hadiqat_alrayan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.name,
  },
  verification: {
    google: "IIp7Th_4N5vVBGytCbONXYH77cuOxjvXSkAkGibSEHw",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaOrgLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": siteConfig.name,
    "alternateName": "مؤسسة حدائق الريان لتنسيق وتصميم الحدائق بالرياض",
    "image": `${siteUrl}/images/og-image.webp`,
    "logo": `${siteUrl}/logo.png`,
    "@id": `${siteUrl}/#business`,
    "url": siteUrl,
    "telephone": siteConfig.phone,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "طريق الملك فهد، حي الصحافة",
      "addressLocality": "الرياض",
      "addressRegion": "منطقة الرياض",
      "addressCountry": "SA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 24.7136,
      "longitude": 46.6753
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "08:00",
      "closes": "23:00"
    },
    "areaServed": [
      { "@type": "City", "name": "الرياض" },
      { "@type": "City", "name": "الدرعية" }
    ],
    "sameAs": [
      siteConfig.socials.facebook,
      siteConfig.socials.instagram,
      siteConfig.socials.twitter
    ]
  };

  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#064e3b" />
        <meta name="google-site-verification" content="IIp7Th_4N5vVBGytCbONXYH77cuOxjvXSkAkGibSEHw" />
        <link rel="preload" as="image" href="/images/service-waterfalls-fountains.webp" fetchPriority="high" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/future-gardens-logo-icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgLocalBusiness) }}
        />
      </head>
      <body
        className="font-sans antialiased bg-gray-50 text-gray-900 selection:bg-emerald-600 selection:text-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
