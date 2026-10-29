import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion";
import { ProductCard } from "@/components/product-card";
import { ShopControls } from "@/components/shop-controls";
import { categories, site } from "@/lib/catalog";
import { getAllProducts } from "@/lib/queries";
import { breadcrumbSchema } from "@/lib/schema";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "فروشگاه کیف چرم دست‌ساز | کیف دستی، دوشی، توت و اداری",
  description:
    "خرید آنلاین کیف چرم دست‌ساز از کیف‌شاپ: کیف دستی زنانه، کیف دوشی، توت جادار، کیف اداری مردانه و کلاچ مجلسی. چرم طبیعی، دوخت دست، گارانتی ۵ ساله و ارسال رایگان بالای ۳ میلیون تومان.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "فروشگاه کیف چرم دست‌ساز کیف‌شاپ",
    description: "همه کیف‌های آتلیه کیف‌شاپ با چرم طبیعی، دوخت دست و گارانتی ۵ ساله.",
    url: "/shop",
  },
};

type SearchParams = Promise<{ category?: string; sort?: string; q?: string }>;

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const products = await getAllProducts();

  let filtered = products.filter((product) => product.isActive);

  if (params.category) {
    filtered = filtered.filter((product) => product.category === params.category);
  }
  if (params.q) {
    const query = params.q.trim();
    filtered = filtered.filter((product) =>
      `${product.name} ${product.description} ${product.material} ${product.colors
        .map((color) => color.name)
        .join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    );
  }

  switch (params.sort) {
    case "price-asc":
      filtered = [...filtered].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered = [...filtered].sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
      break;
    case "new":
      filtered = [...filtered].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      break;
    default:
      filtered = [...filtered].sort(
        (a, b) => Number(b.featured) - Number(a.featured) || b.reviewsCount - a.reviewsCount,
      );
  }

  const activeCategory = categories.find((category) => category.key === params.category);
  const lowest = Math.min(...products.map((product) => product.price));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "خانه", href: "/" },
            { name: "فروشگاه", href: "/shop" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "کیف‌های چرم کیف‌شاپ",
            numberOfItems: filtered.length,
            itemListElement: filtered.map((product, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${site.url}/shop/${product.slug}`,
              name: product.name,
            })),
          },
        ]}
      />

      <section className="relative overflow-hidden border-b border-sand/10">
        <div className="pointer-events-none absolute inset-0 spotlight opacity-70" />
        <div className="shell relative py-12 md:py-16">
          <nav aria-label="مسیر صفحه" className="text-[0.68rem] text-cream/40">
            <Link href="/" className="hover:text-gold">
              خانه
            </Link>
            <span className="mx-2">/</span>
            <span className="text-cream/70">فروشگاه</span>
          </nav>
          <p className="eyebrow mt-6">ALL BAGS · {products.length} PIECES</p>
          <h1 className="display mt-3 text-[clamp(2rem,4.8vw,3.4rem)]">
            {activeCategory ? activeCategory.label : "همه کیف‌های چرم دست‌ساز"}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-cream/55">
            {activeCategory
              ? activeCategory.description
              : `از کیف دستی روزمره تا کیف اداری و کلاچ مجلسی؛ همه با چرم طبیعی دباغی گیاهی، دوخت دست و گارانتی ۵ ساله. قیمت‌ها از ${formatPrice(lowest)} شروع می‌شود.`}
          </p>
        </div>
      </section>

      <section className="section !pt-8">
        <div className="shell">
          <ShopControls total={filtered.length} />

          {filtered.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-sand/12 bg-onyx/40 p-12 text-center">
              <p className="text-lg font-bold">برای این فیلتر کیف فعالی نداریم.</p>
              <p className="mt-2 text-sm text-cream/50">
                دسته یا عبارت جست‌وجو را تغییر دهید؛ یا برای سفارش اختصاصی با آتلیه تماس بگیرید.
              </p>
              <Link href="/shop" className="btn btn-gold mt-6">
                دیدن همه کیف‌ها
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
              {filtered.map((product, index) => (
                <ProductCard key={product.slug} product={product} index={index} />
              ))}
            </div>
          )}

          <div className="mt-14 grid gap-6 rounded-3xl border border-sand/12 bg-onyx/30 p-6 md:grid-cols-3 md:p-8">
            <div>
              <p className="eyebrow">BUYING GUIDE</p>
              <h2 className="mt-2 text-lg font-bold">کدام کیف برای شما مناسب است؟</h2>
              <p className="mt-2 text-xs leading-6 text-cream/50">
                اگر بین چند مدل مانده‌اید، راهنمای خرید ما بر اساس کاربرد، سایز و جنس چرم نوشته شده
                است.
              </p>
              <Link href="/buying-guide" className="mt-4 inline-block text-xs text-goldsoft">
                راهنمای خرید کیف ←
              </Link>
            </div>
            <div>
              <p className="eyebrow">SIZE & FIT</p>
              <h2 className="mt-2 text-lg font-bold">سایز کیف را درست انتخاب کنید</h2>
              <p className="mt-2 text-xs leading-6 text-cream/50">
                جدول ابعاد کیف دستی، توت، اداری و کلاچ بر اساس وسایل روزمره و لپ‌تاپ.
              </p>
              <Link href="/size-guide" className="mt-4 inline-block text-xs text-goldsoft">
                جدول سایزبندی ←
              </Link>
            </div>
            <div>
              <p className="eyebrow">CARE</p>
              <h2 className="mt-2 text-lg font-bold">کیف چرم را چطور نگه داریم؟</h2>
              <p className="mt-2 text-xs leading-6 text-cream/50">
                برنامه‌ی نگهداری فصلی، روش تمیز کردن لکه و اشتباه‌هایی که چرم را پیر می‌کند.
              </p>
              <Link href="/care" className="mt-4 inline-block text-xs text-goldsoft">
                نگهداری چرم ←
              </Link>
            </div>
          </div>

          <Reveal className="mt-10">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gold/20 bg-gold/[0.05] px-5 py-4">
              <p className="text-sm text-cream/70">
                سیزده کیف در آتلیه داریم و هر فصل چند قطعه‌ی محدود اضافه می‌شود. کالکشن‌ها را ببینید.
              </p>
              <Link href="/collections" className="btn btn-outline !py-2 !text-xs">
                کالکشن‌ها
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
