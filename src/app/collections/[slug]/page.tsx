import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { ProductCard } from "@/components/product-card";
import { getCollectionBySlug, getProductsForCollection } from "@/lib/queries";
import { breadcrumbSchema, collectionSchema, faqSchema } from "@/lib/schema";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) return { title: "کالکشن یافت نشد" };
  return {
    title: `کالکشن ${collection.title} | ${collection.subtitle}`,
    description: collection.description.slice(0, 158),
    alternates: { canonical: `/collections/${collection.slug}` },
    openGraph: {
      title: `کالکشن ${collection.title} کیف‌شاپ`,
      description: collection.description,
      url: `/collections/${collection.slug}`,
      images: [{ url: collection.image, alt: `کالکشن ${collection.title}` }],
    },
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) notFound();
  const products = await getProductsForCollection(slug);
  const fromPrice = products.length ? Math.min(...products.map((item) => item.price)) : 0;

  const collectionFaqs = [
    {
      question: `کالکشن ${collection.title} شامل چه کیف‌هایی است؟`,
      answer: `${collection.description} در حال حاضر ${products.length} کیف در این کالکشن موجود است که قیمت آن‌ها از ${formatPrice(fromPrice)} شروع می‌شود.`,
    },
    {
      question: `آیا امکان انتخاب رنگ دیگری برای کیف‌های کالکشن ${collection.title} وجود دارد؟`,
      answer:
        "بله. بیشتر کیف‌ها در دو تا سه رنگ چرم تولید می‌شوند و در صفحه‌ی هر محصول رنگ‌های موجود مشخص شده است. برای رنگ سفارشی، از طریق فرم تماس درخواست خود را ثبت کنید.",
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          collectionSchema({ ...collection, products }),
          breadcrumbSchema([
            { name: "خانه", href: "/" },
            { name: "کالکشن‌ها", href: "/collections" },
            { name: collection.title, href: `/collections/${collection.slug}` },
          ]),
          faqSchema(collectionFaqs),
        ]}
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={collection.image}
            alt={`کالکشن ${collection.title} کیف چرم`}
            className="h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/50" />
        </div>
        <div className="shell relative py-16 md:py-24">
          <nav aria-label="مسیر صفحه" className="text-[0.68rem] text-cream/45">
            <Link href="/" className="hover:text-gold">
              خانه
            </Link>
            <span className="mx-2">/</span>
            <Link href="/collections" className="hover:text-gold">
              کالکشن‌ها
            </Link>
            <span className="mx-2">/</span>
            <span className="text-cream/75">{collection.title}</span>
          </nav>
          <p className="eyebrow mt-6">COLLECTION · {products.length} PIECES</p>
          <h1 className="display mt-3 text-[clamp(2.2rem,5vw,3.8rem)]">
            کالکشن <span className="gold-text">{collection.title}</span>
          </h1>
          <p className="mt-2 text-sm text-goldsoft">{collection.subtitle}</p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-cream/60">{collection.description}</p>
          {fromPrice > 0 && (
            <p className="mt-4 text-xs text-cream/45">
              قیمت از {formatPrice(fromPrice)} · ارسال رایگان بالای ۳ میلیون تومان
            </p>
          )}
        </div>
      </section>

      <section className="section !pt-10">
        <div className="shell">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard key={product.slug} product={product} index={index} />
            ))}
          </div>

          {products.length === 0 && (
            <p className="rounded-3xl border border-sand/12 bg-onyx/40 p-10 text-center text-sm text-cream/50">
              این کالکشن در حال بازطراحی است. کیف‌های موجود را در فروشگاه ببینید.
            </p>
          )}

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-sand/12 bg-onyx/40 p-6">
              <h2 className="text-lg font-bold">راهنمای انتخاب از کالکشن {collection.title}</h2>
              <p className="mt-2 text-xs leading-6 text-cream/55">
                اگر برای اولین بار از کیف‌شاپ خرید می‌کنید، پیشنهاد می‌کنیم ابتدا صفحه‌ی راهنمای سایز
                و سپس راهنمای نگهداری چرم را بخوانید. انتخاب درست سایز، مهم‌ترین عامل رضایت بلندمدت
                از کیف است.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/size-guide" className="btn btn-outline !py-2 !text-xs">
                  سایزبندی
                </Link>
                <Link href="/care" className="btn btn-outline !py-2 !text-xs">
                  نگهداری چرم
                </Link>
                <Link href="/buying-guide" className="btn btn-gold !py-2 !text-xs">
                  راهنمای خرید
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-gold/20 bg-gold/[0.05] p-6">
              <h2 className="text-lg font-bold">پرسش‌های متداول این کالکشن</h2>
              <div className="mt-3 space-y-3">
                {collectionFaqs.map((faq) => (
                  <div key={faq.question}>
                    <p className="text-xs font-semibold text-goldsoft">{faq.question}</p>
                    <p className="mt-1 text-xs leading-6 text-cream/55">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
