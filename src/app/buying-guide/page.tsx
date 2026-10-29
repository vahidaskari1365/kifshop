import type { Metadata } from "next";
import Link from "next/link";
import { GuideSelector } from "@/components/guide-selector";
import { JsonLd } from "@/components/json-ld";
import { ArrowLink, Reveal } from "@/components/motion";
import { ProductCard } from "@/components/product-card";
import { answerBlocks, categories, site } from "@/lib/catalog";
import { getAllProducts } from "@/lib/queries";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "راهنمای خرید کیف چرم؛ انتخاب درست در ۵ دقیقه",
  description:
    "راهنمای کامل خرید کیف چرم: انتخاب سایز، جنس چرم، کاربرد روزانه یا اداری، بودجه و اشتباه‌های رایج. با جدول تصمیم و آزمون ۶۰ ثانیه‌ای کیف‌شاپ.",
  alternates: { canonical: "/buying-guide" },
};

const decisionRows = [
  {
    use: "استفاده روزمره و خرید",
    pick: "توت یا کیف دستی ۳۰ سانتی",
    avoid: "کلاچ و کیف‌های کوچک‌تر از ۲۴ سانتی",
    href: "/shop?category=tote",
  },
  {
    use: "محیط کار و جلسه",
    pick: "کیف اداری با محفظه لپ‌تاپ",
    avoid: "توت نرم بدون ساختار",
    href: "/shop?category=office",
  },
  {
    use: "مهمانی و مراسم",
    pick: "کلاچ ۲۶ سانتی با زنجیر جداشدنی",
    avoid: "کیف‌های بزرگ و سنگین",
    href: "/shop?category=clutch",
  },
  {
    use: "سفر شهری و پیاده‌روی",
    pick: "کراس‌بادی با جیب مخفی",
    avoid: "کیف دستی بدون بند شانه",
    href: "/shop?category=crossbody",
  },
  {
    use: "هدیه و سفارش خاص",
    pick: "کیف دست‌دوز با حکاکی نام",
    avoid: "مدل‌های تولید انبوه",
    href: "/shop?category=artisan",
  },
];

export default async function BuyingGuidePage() {
  const products = await getAllProducts();
  const active = products.filter((product) => product.isActive);
  const budgetTiers = [
    { label: "زیر ۳ میلیون تومان", items: active.filter((p) => p.price < 3_000_000) },
    { label: "۳ تا ۴٫۵ میلیون تومان", items: active.filter((p) => p.price >= 3_000_000 && p.price < 4_500_000) },
    { label: "بالای ۴٫۵ میلیون تومان", items: active.filter((p) => p.price >= 4_500_000) },
  ];
  const picks = active.filter((product) => product.featured).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          faqSchema(answerBlocks),
          breadcrumbSchema([
            { name: "خانه", href: "/" },
            { name: "راهنمای خرید کیف", href: "/buying-guide" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "چگونه کیف چرم مناسب انتخاب کنیم؟",
            description:
              "راهنمای گام‌به‌گام انتخاب کیف چرم بر اساس کاربرد، سایز، جنس و بودجه.",
            totalTime: "PT5M",
            step: [
              { "@type": "HowToStep", name: "کاربرد را مشخص کنید", text: "روزمره، اداری، مجلسی یا سفر؛ هر کاربرد سایز و ساختار متفاوتی می‌خواهد." },
              { "@type": "HowToStep", name: "سایز و وسایل را بسنجید", text: "عرض داخلی کیف باید ۲ سانتی‌متر از بزرگ‌ترین وسیله‌ی شما بیشتر باشد." },
              { "@type": "HowToStep", name: "جنس چرم را بررسی کنید", text: "چرم طبیعی دباغی گیاهی برای کیف ساختاری و چرم کروم نرم برای کیف‌های روزمره مناسب است." },
              { "@type": "HowToStep", name: "گارانتی و تعمیر را بپرسید", text: "گارانتی باید دوخت، یراق و درز را پوشش دهد و امکان تعمیر بلندمدت وجود داشته باشد." },
            ],
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
            <span className="text-cream/70">راهنمای خرید</span>
          </nav>
          <p className="eyebrow mt-6">THE BUYING GUIDE</p>
          <h1 className="display mt-3 max-w-3xl text-[clamp(2rem,4.8vw,3.4rem)] leading-tight">
            راهنمای خرید کیف چرم؛ <span className="gold-text">انتخاب درست در ۵ دقیقه</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-cream/55">
            این راهنما از تجربه‌ی دوازده‌ساله‌ی آتلیه و بازخورد بیش از ۶۰۰ مشتری نوشته شده است.
            در پایان می‌دانید چه سایز، چه جنسی و چه ساختاری برای شما مناسب است.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/shop" className="btn btn-gold">
              دیدن کیف‌ها
            </Link>
            <Link href="/size-guide" className="btn btn-outline">
              جدول سایزبندی
            </Link>
          </div>
        </div>
      </section>

      <section className="section !pt-12">
        <div className="shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow">QUICK ANSWERS</p>
            <h2 className="display mt-3 text-2xl">پاسخ کوتاه به ۴ سؤال اصلی</h2>
            <div className="mt-5 grid gap-3">
              {answerBlocks.map((block, index) => (
                <Reveal key={block.question} delay={index * 0.05}>
                  <div className="rounded-2xl border border-sand/12 bg-onyx/40 p-4">
                    <p className="text-sm font-semibold text-goldsoft">{block.question}</p>
                    <p className="mt-1.5 text-xs leading-6 text-cream/55">{block.answer}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <GuideSelector />
        </div>
      </section>

      <section className="section border-y border-sand/10 bg-coal/40">
        <div className="shell">
          <p className="eyebrow">DECISION TABLE</p>
          <h2 className="display mt-3 text-2xl">کدام کیف برای کدام کاربرد؟</h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-sand/12">
            <table className="w-full min-w-[42rem] text-right text-xs">
              <thead className="bg-onyx/70 text-cream/50">
                <tr>
                  <th className="px-4 py-3 font-medium">کاربرد</th>
                  <th className="px-4 py-3 font-medium">انتخاب پیشنهادی</th>
                  <th className="px-4 py-3 font-medium">پرهیز کنید از</th>
                  <th className="px-4 py-3 font-medium">مشاهده</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand/10">
                {decisionRows.map((row) => (
                  <tr key={row.use} className="text-cream/70">
                    <td className="px-4 py-3 font-medium text-cream">{row.use}</td>
                    <td className="px-4 py-3 text-cream/60">{row.pick}</td>
                    <td className="px-4 py-3 text-cream/40">{row.avoid}</td>
                    <td className="px-4 py-3">
                      <Link href={row.href} className="text-goldsoft">
                        کیف‌ها ←
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {budgetTiers.map((tier) => (
              <div key={tier.label} className="rounded-2xl border border-sand/12 bg-onyx/40 p-5">
                <p className="text-xs text-cream/40">بودجه</p>
                <p className="mt-1 text-sm font-bold text-goldsoft">{tier.label}</p>
                <ul className="mt-3 space-y-2 text-xs text-cream/55">
                  {tier.items.slice(0, 4).map((item) => (
                    <li key={item.slug} className="flex items-center justify-between gap-2">
                      <Link href={`/shop/${item.slug}`} className="hover:text-goldsoft">
                        {item.name}
                      </Link>
                      <span className="shrink-0 text-[0.65rem] text-cream/35">
                        {formatPrice(item.price)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">MATERIALS</p>
            <h2 className="display mt-3 text-2xl">جنس چرم را چطور انتخاب کنیم؟</h2>
            <div className="mt-4 space-y-3 text-xs leading-7 text-cream/55">
              <p>
                <span className="font-semibold text-cream/80">چرم دباغی گیاهی:</span> سخت‌تر،
                ساختاری و با پتینه‌ی طبیعی. بهترین انتخاب برای کیف اداری، توت و کیف‌های ساختاری که
                سال‌ها باید فرم نگه دارند.
              </p>
              <p>
                <span className="font-semibold text-cream/80">چرم کروم:</span> نرم‌تر، رنگ‌پذیرتر و
                مناسب کیف‌های روزمره‌ی نرم. کیفیت آن به ضخامت و پرداخت سطح بستگی دارد.
              </p>
              <p>
                <span className="font-semibold text-cream/80">چرم بازسازی‌شده:</span> از تکه‌های
                چرم فشرده ساخته می‌شود؛ ارزان‌تر است اما عمر کوتاه‌تری دارد و در آتلیه کیف‌شاپ
                استفاده نمی‌شود.
              </p>
            </div>
            <ArrowLink href="/journal/charm-giyahi-ya-krom" className="mt-5">
              مقاله کامل چرم گیاهی و کروم
            </ArrowLink>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category.key}
                href={`/shop?category=${category.key}`}
                className="rounded-2xl border border-sand/12 bg-onyx/40 p-5 transition-colors hover:border-gold/40"
              >
                <p className="text-sm font-bold">{category.label}</p>
                <p className="mt-2 text-[0.7rem] leading-6 text-cream/45">{category.description}</p>
                <span className="mt-3 inline-block text-[0.68rem] text-goldsoft">مشاهده ←</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-sand/10">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">EDITOR&apos;S PICKS</p>
              <h2 className="display mt-3 text-2xl">انتخاب سردبیر برای شروع</h2>
            </div>
            <ArrowLink href="/shop">همه کیف‌ها</ArrowLink>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {picks.map((product, index) => (
              <ProductCard key={product.slug} product={product} index={index} />
            ))}
          </div>
          <p className="mt-8 text-[0.7rem] leading-6 text-cream/30">
            اطلاعات این راهنما بر اساس تجربه‌ی ساخت کیف در آتلیه {site.name} و بازخورد مشتریان نوشته
            شده و در بهار ۱۴۰۵ بازبینی شده است.
          </p>
        </div>
      </section>
    </>
  );
}
