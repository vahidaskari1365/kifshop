import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ArrowLink, Reveal } from "@/components/motion";
import { getAllCollections, getAllProducts } from "@/lib/queries";
import { breadcrumbSchema } from "@/lib/schema";
import { faNum, formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "کالکشن‌های کیف چرم | کلاسیک، شهری، آتلیه و مجلسی",
  description:
    "چهار کالکشن کیف‌شاپ برای چهار سبک زندگی: کلاسیک، شهری، آتلیه دست‌دوز و مجلسی. هر کالکشن با چرم طبیعی و طراحی مینیمال، از آتلیه تهران.",
  alternates: { canonical: "/collections" },
};

export default async function CollectionsPage() {
  const [collections, products] = await Promise.all([getAllCollections(), getAllProducts()]);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "خانه", href: "/" },
            { name: "کالکشن‌ها", href: "/collections" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "کالکشن‌های کیف‌شاپ",
            itemListElement: collections.map((collection, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: `کالکشن ${collection.title}`,
              url: `/collections/${collection.slug}`,
            })),
          },
        ]}
      />

      <section className="relative overflow-hidden border-b border-sand/10">
        <div className="pointer-events-none absolute inset-0 spotlight opacity-60" />
        <div className="shell relative py-14">
          <nav aria-label="مسیر صفحه" className="text-[0.68rem] text-cream/40">
            <Link href="/" className="hover:text-gold">
              خانه
            </Link>
            <span className="mx-2">/</span>
            <span className="text-cream/70">کالکشن‌ها</span>
          </nav>
          <p className="eyebrow mt-6">FOUR MOODS, ONE ATELIER</p>
          <h1 className="display mt-3 text-[clamp(2rem,4.8vw,3.4rem)]">
            کالکشن‌های <span className="gold-text">کیف‌شاپ</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-cream/55">
            ما کیف را بر اساس سبک زندگی دسته‌بندی می‌کنیم، نه فقط فرم. کالکشن کلاسیک برای محیط کار،
            شهری برای روزهای شلوغ، آتلیه برای دوست‌داران دست‌دوز و مجلسی برای شب‌های خاص.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell space-y-14">
          {collections.map((collection, index) => {
            const items = products.filter(
              (product) => product.collectionSlug === collection.slug && product.isActive,
            );
            const fromPrice = items.length ? Math.min(...items.map((item) => item.price)) : 0;
            return (
              <Reveal key={collection.slug} delay={index * 0.05}>
                <article
                  className={`grid items-center gap-8 lg:grid-cols-2 ${index % 2 === 1 ? "lg:[direction:ltr]" : ""}`}
                >
                  <div className="relative h-[22rem] overflow-hidden rounded-[2rem] border border-sand/12 lg:h-[28rem] [direction:rtl]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={collection.image}
                      alt={`کالکشن ${collection.title} کیف‌شاپ`}
                      loading={index === 0 ? "eager" : "lazy"}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                    <span className="absolute right-5 top-5 rounded-full border border-cream/25 px-3 py-1 text-[0.62rem] backdrop-blur">
                      {faNum(items.length)} کیف
                    </span>
                  </div>

                  <div className="[direction:rtl]">
                    <p className="eyebrow">COLLECTION 0{index + 1}</p>
                    <h2 className="display mt-3 text-3xl">{collection.title}</h2>
                    <p className="mt-2 text-sm text-goldsoft">{collection.subtitle}</p>
                    <p className="mt-4 text-sm leading-7 text-cream/55">{collection.description}</p>
                    {fromPrice > 0 && (
                      <p className="mt-4 text-xs text-cream/40">
                        قیمت از <span className="text-cream/75">{formatPrice(fromPrice)}</span>
                      </p>
                    )}
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link href={`/collections/${collection.slug}`} className="btn btn-gold">
                        مشاهده کالکشن
                      </Link>
                      <Link href="/size-guide" className="btn btn-outline">
                        راهنمای سایز
                      </Link>
                    </div>
                    {items.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {items.slice(0, 4).map((item) => (
                          <Link
                            key={item.slug}
                            href={`/shop/${item.slug}`}
                            className="flex items-center gap-2 rounded-full border border-sand/15 px-3 py-1.5 text-[0.65rem] text-cream/55 transition-colors hover:border-gold/50 hover:text-goldsoft"
                          >
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: item.colors[0]?.hex ?? "#c9a96a" }}
                            />
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="shell pb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-gold/20 bg-gold/[0.05] p-6">
          <div>
            <h2 className="text-lg font-bold">کالکشن سفارشی نمی‌خواهید؟</h2>
            <p className="mt-1 text-xs text-cream/55">
              راهنمای خرید کیف بر اساس کاربرد، سایز و بودجه را بخوانید.
            </p>
          </div>
          <ArrowLink href="/buying-guide">راهنمای خرید کیف</ArrowLink>
        </div>
      </section>
    </>
  );
}
