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

const siteTitle = `${siteConfig.name} | أفضل شركة تنسيق حدائق بالرياض`;
const siteDescription = "مؤسسة حدائق المستقبل الرائدة في تصميم وتنسيق الحدائق المنزلية والفلل بالرياض. توريد وتركيب عشب صناعي وطبيعي، شلالات ونوافير، مظلات وبرجولات، شبكات ري أوتوماتيكية وضمان حتى 7 سنوات مع معاينة وتصميم 3D مجاناً.";
const siteUrl = "https://futuregardens.vercel.app";
const ogImageUrl = "/images/og-image.webp";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteDescription,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    "تنسيق حدائق بالرياض",
    "شركة تنسيق حدائق بالرياض",
    "تصميم حدائق فلل بالرياض",
    "عشب صناعي الرياض",
    "عشب طبيعي الرياض",
    "شلالات جدارية الرياض",
    "نوافير منزلية بالرياض",
    "مظلات وبرجولات الرياض",
    "شبكات ري أوتوماتيكية",
    "مؤسسة حدائق المستقبل لتنسيق الحدائق",
    "اسعار تنسيق الحدائق بالرياض",
    "ارقام منسقي حدائق بالرياض",
  ],
  alternates: {
    canonical: siteUrl,
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
    creator: "@futuregardens",
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
    google: "HuV4p5UQHTwmSBauPVmJxeVUpw_74Hsv1wbASRvRsos",
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
    "alternateName": "مؤسسة حدائق المستقبل لتنسيق وتصميم الحدائق بالرياض",
    "image": `${siteUrl}/images/og-image.webp`,
    "logo": `${siteUrl}/images/official-circular-logo.png`,
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
        <meta name="google-site-verification" content="HuV4p5UQHTwmSBauPVmJxeVUpw_74Hsv1wbASRvRsos" />
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
