import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";
import { answerBlocks, site } from "@/lib/catalog";
import { getAllFaqs } from "@/lib/queries";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "پرسش‌های متداول خرید کیف چرم | کیف‌شاپ",
  description:
    "پاسخ شفاف به پرسش‌های متداول کیف‌شاپ: اصالت چرم، گارانتی ۵ ساله، هزینه و زمان ارسال، تعویض ۷ روزه، انتخاب سایز کیف و حکاکی نام.",
  alternates: { canonical: "/faq" },
};

export default async function FaqPage() {
  const faqs = await getAllFaqs();
  const groups = Array.from(new Set(faqs.map((faq) => faq.category)));

  return (
    <>
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "خانه", href: "/" },
            { name: "پرسش‌های متداول", href: "/faq" },
          ]),
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
            <span className="text-cream/70">پرسش‌های متداول</span>
          </nav>
          <p className="eyebrow mt-6">QUESTIONS, ANSWERED</p>
          <h1 className="display mt-3 text-[clamp(2rem,4.8vw,3.4rem)]">
            پرسش‌های متداول <span className="gold-text">کیف‌شاپ</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-cream/55">
            همه‌ی پاسخ‌ها کوتاه، دقیق و قابل استناد نوشته شده‌اند؛ هم برای خوانندگان و هم برای
            موتورهای پاسخ مبتنی بر هوش مصنوعی. آخرین بازبینی: بهار ۱۴۰۵.
          </p>
        </div>
      </section>

      <section className="section !pt-10">
        <div className="shell grid gap-10 lg:grid-cols-[0.4fr_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-gold/20 bg-gold/[0.05] p-5">
              <p className="eyebrow">QUICK ANSWERS</p>
              <div className="mt-3 space-y-4">
                {answerBlocks.map((block) => (
                  <div key={block.question}>
                    <p className="text-xs font-semibold text-goldsoft">{block.question}</p>
                    <p className="mt-1 text-[0.7rem] leading-6 text-cream/55">{block.answer}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 rounded-3xl border border-sand/12 bg-onyx/40 p-5 text-xs text-cream/50">
              <p className="font-semibold text-cream/80">پاسخ خود را نیافتید؟</p>
              <p className="mt-1 leading-6">
                تلفن {site.phone} یا فرم تماس؛ در ساعات کاری پاسخ می‌دهیم.
              </p>
              <Link href="/contact" className="mt-3 inline-block text-goldsoft">
                تماس با آتلیه ←
              </Link>
            </div>
          </aside>

          <div className="space-y-8">
            {groups.map((group) => (
              <div key={group}>
                <div className="mb-3 flex items-center gap-3">
                  <h2 className="text-lg font-bold">{group}</h2>
                  <span className="h-px flex-1 bg-sand/10" />
                  <span className="text-[0.65rem] text-cream/30">
                    {faqs.filter((faq) => faq.category === group).length} پرسش
                  </span>
                </div>
                <FaqAccordion
                  defaultOpen={null}
                  items={faqs.filter((faq) => faq.category === group)}
                />
              </div>
            ))}

            <div className="rounded-3xl border border-sand/12 bg-onyx/40 p-6">
              <h2 className="text-lg font-bold">راهنمای‌های مرتبط</h2>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {[
                  { href: "/buying-guide", label: "راهنمای خرید کیف" },
                  { href: "/size-guide", label: "سایزبندی کیف" },
                  { href: "/care", label: "نگهداری چرم" },
                  { href: "/shipping", label: "ارسال و گارانتی" },
                  { href: "/journal", label: "ژورنال کیف‌شاپ" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-sand/20 px-3 py-1.5 text-cream/60 transition-colors hover:border-gold/50 hover:text-goldsoft"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
