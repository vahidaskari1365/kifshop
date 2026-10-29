import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, RefreshCcw, ShieldCheck, Star, Truck } from "lucide-react";
import { AddToCart } from "@/components/add-to-cart";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";
import { ArrowLink } from "@/components/motion";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { brandImages, categoryLabel, site, testimonials } from "@/lib/catalog";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/lib/queries";
import { breadcrumbSchema, faqSchema, productSchema } from "@/lib/schema";
import { discountPercent, faNum, formatDate, formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "کیف یافت نشد" };

  return {
    title: product.seoTitle || `${product.name} | خرید کیف چرم`,
    description: product.seoDescription || product.description.slice(0, 158),
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      type: "website",
      title: product.seoTitle || product.name,
      description: product.seoDescription || product.description.slice(0, 158),
      url: `/shop/${product.slug}`,
      images: [{ url: product.images[0], alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [related, all] = await Promise.all([getRelatedProducts(product), getAllProducts()]);
  const discount = discountPercent(product.price, product.compareAtPrice);
  const productFaqs = [
    {
      question: `آیا ${product.name} چرم طبیعی است؟`,
      answer: `بله. ${product.name} از ${product.material} ساخته شده و همراه آن کارت اصالت چرم، مهر آتلیه و شماره سریال ارسال می‌شود. در صورت درخواست، مشخصات دباغی و آزمون چرم نیز ارائه می‌شود.`,
    },
    {
      question: `ابعاد و وزن ${product.name} چقدر است؟`,
      answer: `ابعاد این کیف ${product.dimensions} و وزن آن حدود ${faNum(product.weight)} گرم است. اگر لپ‌تاپ شما بزرگ‌تر از ۱۴ اینچ است، پیش از خرید با پشتیبانی کیف‌شاپ مشورت کنید.`,
    },
    {
      question: "ارسال و تعویض این کیف چگونه است؟",
      answer:
        "ارسال در تهران ۲۴ تا ۴۸ ساعت کاری و در شهرستان‌ها ۲ تا ۴ روز کاری است. سفارش‌های بالای ۳ میلیون تومان ارسال رایگان دارند. تا ۷ روز پس از دریافت، در صورت استفاده‌نشدن، تعویض رنگ یا مدل انجام می‌شود.",
    },
  ];

  const productReviews = testimonials.slice(0, 3);
  const relatedToCollection = all.filter(
    (item) => item.collectionSlug === product.collectionSlug && item.slug !== product.slug,
  );

  return (
    <>
      <JsonLd
        data={[
          productSchema(product),
          breadcrumbSchema([
            { name: "خانه", href: "/" },
            { name: "فروشگاه", href: "/shop" },
            { name: categoryLabel(product.category), href: `/shop?category=${product.category}` },
            { name: product.name, href: `/shop/${product.slug}` },
          ]),
          faqSchema(productFaqs),
        ]}
      />

      <div className="shell pt-6">
        <nav aria-label="مسیر صفحه" className="text-[0.68rem] text-cream/40">
          <Link href="/" className="hover:text-gold">
            خانه
          </Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-gold">
            فروشگاه
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-gold">
            {categoryLabel(product.category)}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-cream/70">{product.name}</span>
        </nav>
      </div>

      <section className="section !pt-6">
        <div className="shell grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <ProductGallery images={product.images} name={product.name} badge={product.badge} />

          <div>
            <p className="eyebrow">{categoryLabel(product.category)}</p>
            <h1 className="display mt-3 text-[clamp(1.9rem,3.6vw,2.9rem)]">{product.name}</h1>
            <p className="mt-2 text-sm text-cream/50">{product.subtitle}</p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-cream/50">
              <span className="flex items-center gap-1.5">
                <Star size={13} className="fill-gold text-gold" />
                <span className="text-cream/80">{faNum(product.rating)}</span>
                <span>({faNum(product.reviewsCount)} نظر)</span>
              </span>
              <span className="h-3 w-px bg-sand/20" />
              <span>{product.stock > 0 ? "موجود در انبار" : "پیش‌سفارش"}</span>
              <span className="h-3 w-px bg-sand/20" />
              <span>کد کالا: KIF-{product.id.toString().padStart(3, "0")}</span>
            </div>

            <div className="mt-5 flex flex-wrap items-end gap-3 border-y border-sand/10 py-5">
              <p className="text-2xl font-extrabold text-goldsoft">{formatPrice(product.price)}</p>
              {product.compareAtPrice && (
                <>
                  <p className="text-sm text-cream/35 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </p>
                  <span className="rounded-full bg-clay px-2.5 py-1 text-[0.62rem] font-bold text-cream">
                    {faNum(discount ?? 0)}٪ تخفیف
                  </span>
                </>
              )}
            </div>

            <p className="mt-5 text-sm leading-7 text-cream/60">{product.description}</p>

            <div className="mt-6">
              <AddToCart product={product} />
            </div>

            <ul className="mt-6 grid gap-2 text-[0.72rem] text-cream/55 sm:grid-cols-2">
              {[
                { icon: ShieldCheck, text: "گارانتی ۵ ساله دوخت و یراق" },
                { icon: Truck, text: "ارسال رایگان بالای ۳ میلیون" },
                { icon: RefreshCcw, text: "تعویض ۷ روزه بدون پرسش" },
                { icon: Check, text: "کارت اصالت و شماره سریال" },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-2">
                  <item.icon size={14} className="text-gold" />
                  {item.text}
                </li>
              ))}
            </ul>

            <dl className="mt-7 divide-y divide-sand/10 overflow-hidden rounded-2xl border border-sand/12 bg-onyx/40 text-xs">
              {[
                { label: "جنس", value: product.material },
                { label: "ابعاد", value: product.dimensions },
                { label: "وزن", value: `${faNum(product.weight)} گرم` },
                { label: "رنگ‌ها", value: product.colors.map((color) => color.name).join("، ") },
                { label: "کالکشن", value: product.collectionSlug ?? "—" },
              ].map((row) => (
                <div key={row.label} className="flex items-start justify-between gap-4 px-4 py-3">
                  <dt className="text-cream/40">{row.label}</dt>
                  <dd className="text-left text-cream/75">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section border-y border-sand/10 bg-coal/40 !py-12">
        <div className="shell grid items-center gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div className="relative h-64 overflow-hidden rounded-3xl border border-sand/12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brandImages.handStitch}
              alt="دوخت دست کیف چرم در آتلیه کیف‌شاپ"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">THE STORY</p>
            <h2 className="mt-2 text-2xl font-bold">داستان ساخت {product.name}</h2>
            <p className="mt-3 text-sm leading-7 text-cream/60">{product.story}</p>
            <p className="mt-3 text-[0.7rem] text-cream/35">
              آخرین بازبینی اطلاعات محصول: {formatDate(product.createdAt)} · نویسنده: تیم آتلیه کیف‌شاپ
            </p>
          </div>
        </div>
      </section>

      <section className="section !pt-12">
        <div className="shell grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="eyebrow">REVIEWS</p>
            <h2 className="mt-2 text-2xl font-bold">نظر مشتریان درباره‌ی {product.name}</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {productReviews.map((review) => (
                <figure key={review.name} className="rounded-2xl border border-sand/12 bg-onyx/40 p-4">
                  <div className="flex items-center justify-between text-[0.68rem]">
                    <span className="text-gold">{"★".repeat(review.rating)}</span>
                    <span className="text-cream/35">خرید تأییدشده</span>
                  </div>
                  <blockquote className="mt-2 text-xs leading-6 text-cream/60">
                    «{review.text}»
                  </blockquote>
                  <figcaption className="mt-3 text-[0.66rem] text-cream/45">
                    {review.name} · {review.city}
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-gold/20 bg-gold/[0.05] p-4 text-xs text-cream/60">
              <span className="font-latin text-2xl text-gold">{faNum(product.rating)}</span>
              <span>
                میانگین امتیاز از {faNum(product.reviewsCount)} نظر ثبت‌شده؛ همه‌ی نظرات از خریداران
                واقعی کیف‌شاپ است.
              </span>
            </div>
          </div>

          <div>
            <p className="eyebrow">PRODUCT FAQ</p>
            <h2 className="mt-2 text-2xl font-bold">پرسش‌های متداول این کیف</h2>
            <div className="mt-5">
              <FaqAccordion items={productFaqs} defaultOpen={null} />
            </div>
            <Link href="/contact" className="mt-4 inline-block text-xs text-goldsoft">
              سؤال دیگری دارید؟ با آتلیه تماس بگیرید ←
            </Link>
          </div>
        </div>
      </section>

      <section className="section border-t border-sand/10 !pt-12">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">YOU MAY ALSO LIKE</p>
              <h2 className="mt-2 text-2xl font-bold">کیف‌های مرتبط</h2>
            </div>
            {relatedToCollection.length > 0 && (
              <ArrowLink href={`/collections/${product.collectionSlug}`}>
                کالکشن {product.collectionSlug}
              </ArrowLink>
            )}
          </div>
          <div className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {related.map((item, index) => (
              <ProductCard key={item.slug} product={item} index={index} />
            ))}
          </div>
          <p className="mt-8 text-[0.7rem] leading-6 text-cream/30">
            قیمت‌ها به تومان و شامل مالیات بر ارزش افزوده است. {site.name} تولیدکننده‌ی مستقیم
            کیف چرم دست‌ساز است؛ خرید از آتلیه یعنی حذف واسطه و امکان تعمیر بلندمدت.
          </p>
        </div>
      </section>
    </>
  );
}
