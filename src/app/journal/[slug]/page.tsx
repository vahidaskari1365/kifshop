import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody, getHeadings } from "@/components/article-body";
import { JsonLd } from "@/components/json-ld";
import { ProductCard } from "@/components/product-card";
import { getAllPosts, getAllProducts, getPostBySlug } from "@/lib/queries";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { faNum, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "مقاله یافت نشد" };
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.seoDescription || post.excerpt,
      url: `/journal/${post.slug}`,
      images: [{ url: post.cover, alt: post.title }],
      publishedTime: new Date(post.publishedAt).toISOString(),
      authors: [post.author],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const [posts, products] = await Promise.all([getAllPosts(), getAllProducts()]);
  const headings = getHeadings(post.content).filter((heading) => heading.level === "h2");
  const relatedPosts = posts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const featuredProducts = products.filter((product) => product.featured).slice(0, 3);

  const articleFaqs = [
    {
      question: `این مقاله چه چیزی را به من می‌آموزد؟`,
      answer: `${post.excerpt} مقاله در ${faNum(post.readMinutes)} دقیقه مطالعه، پاسخ کوتاه و گام‌های عملی را پوشش می‌دهد.`,
    },
    {
      question: "محتوای ژورنال کیف‌شاپ چگونه بازبینی می‌شود؟",
      answer:
        "هر مطلب توسط تیم آتلیه کیف‌شاپ و با تجربه‌ی ساخت کیف چرم نوشته می‌شود. اطلاعات مربوط به چرم و نگهداری با منابع دباغی و تجربه‌ی کارگاهی بازبینی شده و تاریخ آخرین بازبینی در انتهای مطلب ثبت می‌شود.",
    },
  ];

  return (
    <>
      <JsonLd data={[articleSchema(post), breadcrumbSchema([
        { name: "خانه", href: "/" },
        { name: "ژورنال", href: "/journal" },
        { name: post.title, href: `/journal/${post.slug}` },
      ]), faqSchema(articleFaqs)]} />

      <article>
        <header className="relative overflow-hidden">
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.cover} alt={post.title} className="h-full w-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />
          </div>
          <div className="shell relative py-14 md:py-20">
            <nav aria-label="مسیر صفحه" className="text-[0.68rem] text-cream/45">
              <Link href="/" className="hover:text-gold">
                خانه
              </Link>
              <span className="mx-2">/</span>
              <Link href="/journal" className="hover:text-gold">
                ژورنال
              </Link>
              <span className="mx-2">/</span>
              <span className="text-cream/70">{post.category}</span>
            </nav>
            <p className="eyebrow mt-6">{post.category}</p>
            <h1 className="display mt-3 max-w-4xl text-[clamp(1.9rem,4.2vw,3rem)] leading-tight">
              {post.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-[0.7rem] text-cream/50">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 text-gold">
                {post.author.charAt(0)}
              </span>
              <span className="text-cream/75">{post.author}</span>
              <span className="h-3 w-px bg-sand/20" />
              <span>{formatDate(post.publishedAt)}</span>
              <span className="h-3 w-px bg-sand/20" />
              <span>{faNum(post.readMinutes)} دقیقه مطالعه</span>
              <span className="h-3 w-px bg-sand/20" />
              <span className="rounded-full border border-sand/20 px-2 py-0.5">بازبینی‌شده</span>
            </div>
          </div>
        </header>

        <div className="shell grid gap-10 py-12 lg:grid-cols-[0.32fr_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-sand/12 bg-onyx/40 p-5">
              <p className="eyebrow">IN THIS ARTICLE</p>
              <ol className="mt-3 space-y-2 text-xs">
                {headings.map((heading, index) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      className="flex gap-2 text-cream/55 transition-colors hover:text-goldsoft"
                    >
                      <span className="font-latin text-gold/50">{String(index + 1).padStart(2, "0")}</span>
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-4 rounded-3xl border border-gold/20 bg-gold/[0.05] p-5">
              <p className="text-sm font-bold">پاسخ کوتاه در ابتدای مطلب</p>
              <p className="mt-2 text-xs leading-6 text-cream/55">
                در این مقاله بخش «پاسخ کوتاه» وجود دارد تا هم خوانندگان و هم موتورهای پاسخ هوش
                مصنوعی سریع به جواب برسند.
              </p>
              <Link href="/shop" className="mt-3 inline-block text-xs text-goldsoft">
                دیدن کیف‌ها ←
              </Link>
            </div>
          </aside>

          <div>
            <p className="rounded-2xl border border-sand/12 bg-onyx/40 p-5 text-sm leading-7 text-cream/70">
              {post.excerpt}
            </p>
            <div className="mt-7">
              <ArticleBody content={post.content} />
            </div>

            <div className="mt-8 rounded-3xl border border-gold/20 bg-gold/[0.05] p-6">
              <h2 className="text-base font-bold">پرسش‌های متداول درباره این مطلب</h2>
              <div className="mt-3 space-y-3">
                {articleFaqs.map((faq) => (
                  <div key={faq.question}>
                    <p className="text-xs font-semibold text-goldsoft">{faq.question}</p>
                    <p className="mt-1 text-xs leading-6 text-cream/55">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-sand/12 bg-onyx/40 px-5 py-4 text-xs text-cream/45">
              <span>
                نوشته‌ی {post.author} · آخرین بازبینی {formatDate(post.publishedAt)}
              </span>
              <Link href="/journal" className="text-goldsoft">
                بازگشت به ژورنال
              </Link>
            </div>
          </div>
        </div>
      </article>

      <section className="section border-t border-sand/10 !pt-12">
        <div className="shell">
          <h2 className="text-2xl font-bold">کیف‌های پیشنهادی ژورنال</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.slug} product={product} index={index} />
            ))}
          </div>

          <h2 className="mt-12 text-2xl font-bold">مقاله‌های مرتبط</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {relatedPosts.map((item) => (
              <Link
                key={item.slug}
                href={`/journal/${item.slug}`}
                className="group rounded-2xl border border-sand/12 bg-onyx/40 p-5 transition-colors hover:border-gold/40"
              >
                <p className="text-[0.62rem] text-gold/70">{item.category}</p>
                <p className="mt-2 text-sm font-bold leading-6 group-hover:text-goldsoft">
                  {item.title}
                </p>
                <p className="mt-2 text-[0.68rem] text-cream/35">
                  {faNum(item.readMinutes)} دقیقه · {formatDate(item.publishedAt)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
