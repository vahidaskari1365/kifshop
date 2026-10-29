import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { CartProvider } from "@/components/cart-context";
import { JsonLd } from "@/components/json-ld";
import { CinematicIntro, ScrollProgress } from "@/components/motion";
import { SiteChrome } from "@/components/site-chrome";
import { SiteHeader } from "@/components/site-header";
import { brandImages, site } from "@/lib/catalog";
import { organizationSchema, storeSchema, websiteSchema } from "@/lib/schema";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "کیف‌شاپ | کیف چرم دست‌ساز ایرانی؛ دستی، دوشی، اداری و مجلسی",
    template: "%s | کیف‌شاپ",
  },
  description: site.description,
  keywords: [
    "کیف چرم",
    "کیف دست‌ساز",
    "کیف دستی زنانه",
    "کیف دوشی",
    "کیف اداری مردانه",
    "توت چرم",
    "کیف مجلسی",
    "خرید کیف چرم اصل",
    "کیف‌شاپ",
    "چرم طبیعی دباغی گیاهی",
  ],
  applicationName: site.name,
  authors: [{ name: "آتلیه کیف‌شاپ", url: site.url }],
  creator: "KIFSHOP Atelier",
  publisher: "کیف‌شاپ",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "/",
    siteName: site.name,
    title: "کیف‌شاپ | کیف چرم دست‌ساز ایرانی با گارانتی ۵ ساله",
    description: site.description,
    images: [
      {
        url: brandImages.handbagBrown,
        width: 940,
        height: 940,
        alt: "کیف دستی چرم طبیعی کیف‌شاپ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "کیف‌شاپ | کیف چرم دست‌ساز ایرانی",
    description: site.description,
    images: [brandImages.handbagBrown],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "shopping",
  other: {
    "ai-content-declaration": "human-authored, editorially reviewed",
    "geo-position": "35.6892;51.3890",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a09",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-ink text-cream antialiased">
        <JsonLd data={[organizationSchema, websiteSchema, storeSchema]} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
        >
          پرش به محتوای اصلی
        </a>
        <CartProvider>
          <CinematicIntro />
          <ScrollProgress />
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteChrome />
        </CartProvider>
      </body>
    </html>
  );
}
