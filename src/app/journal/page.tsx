import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion";
import { getAllPosts } from "@/lib/queries";
import { breadcrumbSchema } from "@/lib/schema";
import { faNum, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ژورنال کیف‌شاپ | راهنمای خرید، نگهداری و شناخت چرم",
  description:
    "مقالات آموزشی کیف‌شاپ درباره تشخیص چرم اصل، نگهداری کیف چرم، انتخاب سایز، کیف لپ‌تاپ و ترندهای کیف. راهنمای کاربردی برای خرید بهتر.",
  alternates: { canonical: "/journal" },
};

export default async function JournalPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "خانه", href: "/" },
            { name: "ژورنال", href: "/journal" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "ژورنال کیف‌شاپ",
            description: "راهنمای خرید، نگهداری و شناخت چرم",
            blogPost: posts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              datePublished: new Date(post.publishedAt).toISOString(),
              url: `/journal/${post.slug}`,
              author: { "@type": "Person", name: post.author },
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
            <span className="text-cream/70">ژورنال</span>
          </nav>
          <p className="eyebrow mt-6">KIFSHOP JOURNAL</p>
          <h1 className="display mt-3 text-[clamp(2rem,4.8vw,3.4rem)]">
            دانش <span className="gold-text">چرم و کیف</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-cream/55">
            هر مقاله توسط تیم آتلیه نوشته و بازبینی می‌شود: از تشخیص چرم اصل تا برنامه‌ی نگهداری
            فصلی. هدف ما این است که پیش از خرید، تصمیم درست بگیرید.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-sand/20 px-3 py-1.5 text-[0.65rem] text-cream/55"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section !pt-10">
        <div className="shell">
          {featured && (
            <Reveal>
              <article className="group grid overflow-hidden rounded-[2rem] border border-sand/12 bg-onyx/40 lg:grid-cols-2">
                <Link href={`/journal/${featured.slug}`} className="relative block h-64 overflow-hidden lg:h-auto">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featured.cover}
                    alt={featured.title}
                    className="zoom-img h-full w-full object-cover"
                  />
                  <span className="absolute right-4 top-4 rounded-full bg-ink/75 px-3 py-1 text-[0.62rem] text-goldsoft backdrop-blur">
                    مقاله ویژه
                  </span>
                </Link>
                <div className="flex flex-col justify-center p-6 md:p-10">
                  <p className="eyebrow">{featured.category}</p>
                  <h2 className="mt-3 text-2xl font-extrabold leading-9 md:text-3xl">
                    <Link href={`/journal/${featured.slug}`} className="hover:text-goldsoft">
                      {featured.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-cream/55">{featured.excerpt}</p>
                  <div className="mt-5 flex items-center gap-3 text-[0.68rem] text-cream/40">
                    <span>{featured.author}</span>
                    <span className="h-3 w-px bg-sand/20" />
                    <span>{formatDate(featured.publishedAt)}</span>
                    <span className="h-3 w-px bg-sand/20" />
                    <span>{faNum(featured.readMinutes)} دقیقه</span>
                  </div>
                  <Link
                    href={`/journal/${featured.slug}`}
                    className="btn btn-outline mt-6 w-fit !text-xs"
                  >
                    خواندن مقاله
                  </Link>
                </div>
              </article>
            </Reveal>
          )}

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.06}>
                <article className="group h-full overflow-hidden rounded-3xl border border-sand/12 bg-onyx/40">
                  <Link href={`/journal/${post.slug}`}>
                    <div className="relative h-48 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.cover}
                        alt={post.title}
                        loading="lazy"
                        className="zoom-img h-full w-full object-cover"
                      />
                      <span className="absolute right-3 top-3 rounded-full bg-ink/75 px-3 py-1 text-[0.6rem] text-goldsoft backdrop-blur">
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

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-gold/20 bg-gold/[0.05] p-6">
            <p className="text-sm text-cream/65">
              سؤال تخصصی دارید؟ کارشناس آتلیه در ساعات کاری پاسخ می‌دهد.
            </p>
            <div className="flex gap-2">
              <Link href="/faq" className="btn btn-outline !py-2 !text-xs">
                پرسش‌های متداول
              </Link>
              <Link href="/contact" className="btn btn-gold !py-2 !text-xs">
                پرسیدن سؤال
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
