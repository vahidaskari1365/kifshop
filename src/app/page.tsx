import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Award, MoveDown, RefreshCcw, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { CollectionsRail } from "@/components/collections-rail";
import { CraftStory } from "@/components/craft-story";
import { FaqAccordion } from "@/components/faq-accordion";
import { HeroStage } from "@/components/hero-stage";
import { JsonLd } from "@/components/json-ld";
import {
  ArrowLink,
  Counter,
  Marquee,
  Parallax,
  Reveal,
  RevealWords,
} from "@/components/motion";
import { NewsletterForm } from "@/components/newsletter-form";
import { ProductCard } from "@/components/product-card";
import {
  answerBlocks,
  brandImages,
  craftSteps,
  materials,
  site,
  stats,
  testimonials,
} from "@/lib/catalog";
import { getAllCollections, getAllFaqs, getAllPosts, getAllProducts } from "@/lib/queries";
import { faqSchema } from "@/lib/schema";
import { faNum, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "کیف‌شاپ | کیف چرم دست‌ساز ایرانی؛ دستی، دوشی، اداری و مجلسی",
  description:
    "خرید کیف چرم دست‌ساز از آتلیه کیف‌شاپ: کیف دستی زنانه، کیف دوشی، توت، کیف اداری مردانه و کلاچ مجلسی با چرم طبیعی دباغی گیاهی، گارانتی ۵ ساله، ارسال رایگان و تعویض ۷ روزه.",
  alternates: { canonical: "/" },
};

const trustIcons = [ShieldCheck, RefreshCcw, Truck, Sparkles];

export default async function HomePage() {
  const [products, collections, posts, faqs] = await Promise.all([
    getAllProducts(),
    getAllCollections(),
    getAllPosts(),
    getAllFaqs(),
  ]);

  const activeProducts = products.filter((product) => product.isActive);
  const featured = activeProducts.filter((product) => product.featured);
  const showcase = [
    ...featured,
    ...activeProducts.filter((product) => !product.featured),
  ].slice(0, 8);
  const heroProducts = [...activeProducts].sort((a, b) => b.reviewsCount - a.reviewsCount).slice(0, 6);
  const counts = collections.reduce<Record<string, number>>((accumulator, collection) => {
    accumulator[collection.slug] = activeProducts.filter(
      (product) => product.collectionSlug === collection.slug,
    ).length;
    return accumulator;
  }, {});
  const featuredPosts = posts.slice(0, 3);
  const homeFaqs = faqs.slice(0, 6);

  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />

      {/* ---------------- hero ---------------- */}
      <section className="grain relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 spotlight" />
        <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full border border-gold/10" />
        <div className="pointer-events-none absolute -left-20 top-36 h-48 w-48 rounded-full border border-gold/15" />
        <div className="shell relative grid gap-10 pb-14 pt-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-4 lg:pb-24 lg:pt-16">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.07] px-4 py-2 text-[0.7rem] text-goldsoft">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
                </span>
                کالکشن بهار ۱۴۰۵ · ارسال رایگان بالای ۳ میلیون
              </span>
            </Reveal>

            <h1 className="display mt-6 text-[clamp(2.3rem,5.6vw,4.4rem)] leading-[1.16]">
              <RevealWords text="کیف چرمی که" />
              <br />
              <span className="gold-text">
                <RevealWords text="با تو پیر می‌شود" delay={0.18} />
              </span>
            </h1>

            <Reveal delay={0.35}>
              <p className="mt-6 max-w-lg text-sm leading-8 text-cream/62 md:text-base">
                آتلیه کیف‌شاپ از سال ۱۳۹۲ کیف چرم طبیعی را با دوخت دست و یراق برنجی می‌سازد.
                هر کیف شماره سریال و گارانتی ۵ ساله دارد؛ چون معتقدیم کیف خوب، همراه سال‌های
                شماست، نه یک خرید فصلی.
              </p>
            </Reveal>

            <Reveal delay={0.45}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/shop" className="btn btn-gold">
                  دیدن همه کیف‌ها
                  <ArrowUpRight size={17} />
                </Link>
                <Link href="/buying-guide" className="btn btn-outline">
                  راهنمای انتخاب کیف
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.55}>
              <dl className="mt-10 grid max-w-lg grid-cols-2 gap-x-4 gap-y-5 border-t border-sand/10 pt-6 sm:grid-cols-4">
                {[
                  { value: "۵ سال", label: "گارانتی" },
                  { value: "۷ روز", label: "تعویض" },
                  { value: "۲۴ ساعت", label: "ارسال تهران" },
                  { value: "۴.۹", label: "رضایت مشتری" },
                ].map((item) => (
                  <div key={item.label}>
                    <dt className="text-sm font-bold text-goldsoft">{item.value}</dt>
                    <dd className="mt-1 text-[0.66rem] text-cream/45">{item.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.2} y={40}>
            <HeroStage products={heroProducts} />
          </Reveal>
        </div>

        <div className="shell relative flex items-center justify-between pb-8 text-[0.65rem] text-cream/35">
          <span className="flex items-center gap-2">
            <MoveDown size={13} className="animate-bounce text-gold" />
            اسکرول کنید؛ سفر ساخت کیف را ببینید
          </span>
          <span className="font-latin hidden tracking-[0.35em] sm:block">TEHRAN · IRAN</span>
        </div>
      </section>

      {/* ---------------- marquee ---------------- */}
      <div className="border-y border-sand/15 bg-sand py-3 text-ink">
        <Marquee
          items={[
            "چرم طبیعی دباغی گیاهی",
            "دوخت دست با نخ موم‌اندود",
            "گارانتی ۵ ساله دوخت و یراق",
            "تعمیر تا ۱۰ سال",
            "حکاکی نام با مهر برنجی",
            "ارسال رایگان بالای ۳ میلیون",
          ]}
        />
      </div>

      {/* ---------------- trust points ---------------- */}
      <section className="border-b border-sand/10">
        <div className="shell grid grid-cols-2 gap-px overflow-hidden lg:grid-cols-4">
          {[
            { title: "گارانتی ۵ ساله", text: "دوخت، یراق و درزها" },
            { title: "تعویض ۷ روزه", text: "بدون پرسش و دردسر" },
            { title: "ارسال سریع", text: "پست پیشتاز و تیپاکس" },
            { title: "مشاوره واقعی", text: "انتخاب سایز و رنگ" },
          ].map((item, index) => {
            const Icon = trustIcons[index];
            return (
              <Reveal key={item.title} delay={index * 0.06} className="bg-ink px-4 py-6">
                <Icon size={18} className="text-gold" strokeWidth={1.5} />
                <p className="mt-3 text-sm font-semibold">{item.title}</p>
                <p className="mt-1 text-[0.7rem] text-cream/40">{item.text}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------------- featured products ---------------- */}
      <section className="section">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">SIGNATURE SELECTION</p>
              <h2 className="display mt-3 text-3xl md:text-4xl">
                منتخب آتلیه، <span className="gold-text">برای هر روز شما</span>
              </h2>
            </div>
            <ArrowLink href="/shop">مشاهده همه کیف‌ها</ArrowLink>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
            {showcase.map((product, index) => (
              <ProductCard key={product.slug} product={product} index={index} />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-sand/10 bg-onyx/40 px-5 py-4 text-xs text-cream/50">
            <span className="flex items-center gap-2">
              <Award size={15} className="text-gold" />
              همه‌ی کیف‌ها با کارت اصالت، شماره سریال و گارانتی ۵ ساله ارسال می‌شوند.
            </span>
            <Link href="/size-guide" className="text-goldsoft hover:text-gold">
              انتخاب سایز درست ←
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- collections (pinned horizontal) ---------------- */}
      <section className="relative">
        <CollectionsRail collections={collections} counts={counts} />
      </section>

      {/* ---------------- craft story (sticky scroll) ---------------- */}
      <section className="section border-y border-sand/10 bg-coal/40">
        <div className="shell">
          <CraftStory steps={craftSteps} />
        </div>
      </section>

      {/* ---------------- materials + stats ---------------- */}
      <section className="section">
        <div className="shell grid items-center gap-12 lg:grid-cols-2">
          <Parallax distance={40} className="relative h-[26rem] overflow-hidden rounded-[2rem] border border-sand/15 md:h-[34rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brandImages.artisanLeather}
              alt="انتخاب چرم طبیعی در آتلیه کیف‌شاپ"
              loading="lazy"
              className="h-[115%] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
            <div className="glass absolute bottom-5 right-5 left-5 rounded-2xl p-4">
              <p className="text-xs text-cream/60">
                هر پوست پیش از برش با دست بررسی می‌شود؛ رگه، ضخامت و کشسانی، سه معیار انتخاب.
              </p>
            </div>
          </Parallax>

          <div>
            <p className="eyebrow">MATERIALS & PROMISE</p>
            <h2 className="display mt-3 text-3xl md:text-4xl">
              کیفیت را در <span className="gold-text">جزئیات نامرئی</span> می‌سازیم
            </h2>
            <p className="mt-4 text-sm leading-7 text-cream/55">
              آستر ضدآب، یراق برنجی و دوخت دوبل چیزهایی هستند که در عکس دیده نمی‌شوند اما سال‌ها بعد
              تفاوت را می‌سازند. این سه، تعریف ما از یک کیف خوب است.
            </p>

            <ul className="mt-8 space-y-4">
              {materials.map((material, index) => (
                <Reveal key={material.title} delay={index * 0.08}>
                  <li className="flex gap-4 rounded-2xl border border-sand/10 bg-onyx/40 p-4">
                    <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/30 font-latin text-[0.6rem] text-gold">
                      0{index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{material.title}</p>
                      <p className="mt-1 text-xs leading-6 text-cream/50">{material.text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>

            <dl className="mt-8 grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-sand/10 px-4 py-4">
                  <dt className="text-xs text-cream/45">{stat.label}</dt>
                  <dd className="font-latin mt-1 text-2xl text-goldsoft">
                    <Counter value={stat.number} decimals={stat.decimals ?? 0} suffix={stat.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------------- testimonials ---------------- */}
      <section className="section border-y border-sand/10 bg-coal/50">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">REAL CUSTOMERS</p>
              <h2 className="display mt-3 text-3xl md:text-4xl">
                از زبان <span className="gold-text">۲۴ هزار مشتری</span>
              </h2>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-sand/15 px-4 py-2">
              <span className="font-latin text-lg text-gold">4.9</span>
              <span className="text-[0.68rem] text-cream/50">میانگین ۶۱۲ نظر ثبت‌شده</span>
            </div>
          </div>

          <div className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2">
            {testimonials.map((testimonial) => (
              <figure
                key={testimonial.name + testimonial.product}
                className="w-[19rem] shrink-0 snap-start rounded-3xl border border-sand/12 bg-onyx/60 p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gold" aria-label={`${faNum(testimonial.rating)} از ۵`}>
                    {"★".repeat(testimonial.rating)}
                    <span className="text-cream/20">{"★".repeat(5 - testimonial.rating)}</span>
                  </span>
                  <span className="text-[0.62rem] text-cream/35">{testimonial.city}</span>
                </div>
                <blockquote className="mt-3 text-xs leading-7 text-cream/65">
                  «{testimonial.text}»
                </blockquote>
                <figcaption className="mt-4 border-t border-sand/10 pt-3 text-[0.68rem]">
                  <span className="font-semibold text-cream/80">{testimonial.name}</span>
                  <span className="text-cream/35"> · {testimonial.product}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- journal ---------------- */}
      <section className="section">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">JOURNAL</p>
              <h2 className="display mt-3 text-3xl md:text-4xl">
                بخوانید، <span className="gold-text">بهتر انتخاب کنید</span>
              </h2>
            </div>
            <ArrowLink href="/journal">همه مقاله‌ها</ArrowLink>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featuredPosts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.08}>
                <article className="group h-full overflow-hidden rounded-3xl border border-sand/12 bg-onyx/40">
                  <Link href={`/journal/${post.slug}`} className="block">
                    <div className="relative h-48 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.cover}
                        alt={post.title}
                        loading="lazy"
                        className="zoom-img h-full w-full object-cover"
                      />
                      <span className="absolute right-3 top-3 rounded-full bg-ink/75 px-3 py-1 text-[0.62rem] text-goldsoft backdrop-blur">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <p className="text-[0.62rem] text-cream/35">
                        {formatDate(post.publishedAt)} · {faNum(post.readMinutes)} دقیقه
                      </p>
                      <h3 className="mt-2 text-base font-bold leading-7 transition-colors group-hover:text-goldsoft">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-6 text-cream/45">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- AEO answers + FAQ ---------------- */}
      <section className="section border-t border-sand/10">
        <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">QUICK ANSWERS</p>
            <h2 className="display mt-3 text-3xl md:text-4xl">
              پاسخ کوتاه به <span className="gold-text">سؤال‌های پرتکرار</span>
            </h2>
            <p className="mt-4 text-sm leading-7 text-cream/55">
              این پاسخ‌ها برای خوانندگان و همچنین موتورهای پاسخ مبتنی بر هوش مصنوعی نوشته شده‌اند:
              کوتاه، دقیق و قابل استناد. اگر پاسخ سؤال‌تان را نیافتید، پیش از خرید مشاوره بگیرید.
            </p>
            <div className="mt-6 grid gap-3">
              {answerBlocks.map((block) => (
                <div
                  key={block.question}
                  className="rounded-2xl border border-gold/20 bg-gold/[0.05] p-4"
                >
                  <p className="text-sm font-semibold text-goldsoft">{block.question}</p>
                  <p className="mt-1.5 text-xs leading-6 text-cream/60">{block.answer}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/faq" className="btn btn-outline !text-xs">
                همه پرسش‌ها
              </Link>
              <Link href="/contact" className="btn btn-gold !text-xs">
                مشاوره خرید
              </Link>
            </div>
          </div>
          <div>
            <FaqAccordion items={homeFaqs} />
            <p className="mt-4 text-[0.68rem] leading-6 text-cream/35">
              پاسخ‌ها توسط تیم آتلیه کیف‌شاپ بازبینی می‌شوند و در هر بازبینی به‌روزرسانی می‌شوند.
              آخرین بازبینی: بهار ۱۴۰۵.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- final CTA ---------------- */}
      <section className="relative overflow-hidden border-t border-sand/10 bg-gradient-to-b from-mocha/60 via-coal to-ink">
        <div className="pointer-events-none absolute inset-0 spotlight opacity-70" />
        <div className="shell relative grid items-center gap-10 py-16 lg:grid-cols-[1.2fr_1fr] lg:py-24">
          <div>
            <p className="eyebrow">FIND YOUR FOREVER BAG</p>
            <h2 className="display mt-3 text-[clamp(2rem,4.6vw,3.4rem)] leading-tight">
              یک کیف خوب، <span className="gold-text">بیست سال همراه</span>
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-cream/55">
              اگر بین دو مدل مانده‌اید، سایز و کاربرد روزانه‌تان را برای ما بنویسید؛ کارشناس آتلیه
              در ساعات کاری پاسخ می‌دهد و راهنمایی می‌کند کدام کیف برای شما مناسب‌تر است.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/shop" className="btn btn-gold">
                شروع خرید
              </Link>
              <a href={`tel:${site.phoneRaw}`} className="btn btn-outline">
                تماس با آتلیه
              </a>
            </div>
          </div>
          <div className="rounded-3xl border border-sand/12 bg-onyx/60 p-6">
            <p className="eyebrow">MONTHLY LETTER</p>
            <h3 className="mt-2 text-lg font-bold">خبرنامه چرم و نگهداری</h3>
            <p className="mt-2 text-xs leading-6 text-cream/45">
              هر ماه یک نامه: قطعه‌های محدود، راهنمای نگهداری و پاسخ به سؤال‌های مشتریان.
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
            <p className="mt-3 text-[0.65rem] text-cream/30">
              بدون تبلیغات مزاحم؛ هر زمان بخواهید لغو کنید.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
