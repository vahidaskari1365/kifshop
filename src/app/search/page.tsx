import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { SearchClient } from "@/components/search-client";
import { getAllProducts } from "@/lib/queries";
import { breadcrumbSchema } from "@/lib/schema";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "جست‌وجوی کیف چرم",
  description: "جست‌وجو در کیف‌های چرم کیف‌شاپ بر اساس نام، رنگ، جنس و دسته‌بندی.",
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true },
};

export default async function SearchPage() {
  const products = await getAllProducts();
  const active = products.filter((product) => product.isActive);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "خانه", href: "/" },
            { name: "جست‌وجو", href: "/search" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "SearchResultsPage",
            about: { "@type": "Thing", name: "کیف چرم دست‌ساز" },
          },
        ]}
      />

      <section className="relative overflow-hidden border-b border-sand/10">
        <div className="pointer-events-none absolute inset-0 spotlight opacity-50" />
        <div className="shell relative py-12">
          <nav aria-label="مسیر صفحه" className="text-[0.68rem] text-cream/40">
            <Link href="/" className="hover:text-gold">
              خانه
            </Link>
            <span className="mx-2">/</span>
            <span className="text-cream/70">جست‌وجو</span>
          </nav>
          <p className="eyebrow mt-6">SEARCH THE ATELIER</p>
          <h1 className="display mt-3 text-[clamp(1.8rem,4.2vw,2.9rem)]">
            چه کیفی <span className="gold-text">می‌خواهید؟</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-cream/55">
            با نام مدل، رنگ یا جنس جست‌وجو کنید. اگر مطمئن نیستید، راهنمای خرید کیف یا آزمون
            ۶۰ ثانیه‌ای ما را امتحان کنید.
          </p>
        </div>
      </section>

      <section className="section !pt-8">
        <div className="shell">
          <SearchClient products={active} />
        </div>
      </section>
    </>
  );
}
