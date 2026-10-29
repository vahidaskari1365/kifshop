import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { FaqAccordion } from "@/components/faq-accordion";
import { InquiryForm } from "@/components/inquiry-form";
import { brandImages, site } from "@/lib/catalog";
import { getAllFaqs } from "@/lib/queries";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "تماس با کیف‌شاپ | مشاوره خرید کیف چرم",
  description:
    "تماس با آتلیه کیف‌شاپ: مشاوره انتخاب کیف، سفارش اختصاصی، پیگیری سفارش و گارانتی. تلفن، ایمیل، آدرس و ساعات کاری آتلیه در تهران.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const faqs = await getAllFaqs();
  const contactFaqs = faqs.slice(0, 4);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "خانه", href: "/" },
            { name: "تماس با ما", href: "/contact" },
          ]),
          faqSchema(contactFaqs),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "تماس با کیف‌شاپ",
            mainEntity: { "@id": `${site.url}/#organization` },
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
            <span className="text-cream/70">تماس با ما</span>
          </nav>
          <p className="eyebrow mt-6">TALK TO THE ATELIER</p>
          <h1 className="display mt-3 text-[clamp(2rem,4.8vw,3.4rem)]">
            یک سؤال دارید؟ <span className="gold-text">ما پاسخ می‌دهیم</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-cream/55">
            پیش از خرید کیف، سایز و کاربرد روزانه‌تان را بگویید تا دقیق راهنمایی کنیم. برای سفارش
            اختصاصی، حکاکی نام یا تعمیر کیف هم از همین صفحه درخواست ثبت کنید.
          </p>
        </div>
      </section>

      <section className="section !pt-10">
        <div className="shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            {[
              {
                icon: Phone,
                title: "تلفن آتلیه",
                value: site.phone,
                href: `tel:${site.phoneRaw}`,
                note: "شنبه تا پنجشنبه، ۱۰ تا ۱۹",
              },
              {
                icon: Mail,
                title: "ایمیل",
                value: site.email,
                href: `mailto:${site.email}`,
                note: "پاسخ حداکثر یک روز کاری",
              },
              {
                icon: MessageCircle,
                title: "واتس‌اپ",
                value: "پیام مستقیم به آتلیه",
                href: site.whatsapp,
                note: "ارسال عکس و انتخاب رنگ",
              },
              {
                icon: MapPin,
                title: "نشانی",
                value: site.address,
                href: "/shipping",
                note: "بازدید با هماهنگی قبلی",
              },
            ].map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="flex gap-4 rounded-2xl border border-sand/12 bg-onyx/40 p-5 transition-colors hover:border-gold/40"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/30 text-gold">
                  <item.icon size={17} />
                </span>
                <span>
                  <span className="block text-[0.68rem] text-cream/40">{item.title}</span>
                  <span className="mt-1 block text-sm text-cream/85">{item.value}</span>
                  <span className="mt-1 block text-[0.65rem] text-cream/35">{item.note}</span>
                </span>
              </a>
            ))}

            <div className="flex items-center gap-2 rounded-2xl border border-sand/12 p-4 text-[0.7rem] text-cream/45">
              <Clock size={14} className="text-gold" />
              ساعات پاسخگویی: {site.hours} · جمعه‌ها تعطیل
            </div>

            <div className="relative h-48 overflow-hidden rounded-2xl border border-sand/12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={brandImages.manOffice}
                alt="مشاوره خرید کیف در آتلیه کیف‌شاپ"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
              <p className="absolute bottom-3 right-4 text-[0.68rem] text-cream/70">
                مشاوره‌ی خرید، رایگان و بدون تعهد به خرید
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-sand/12 bg-onyx/40 p-6 md:p-8">
            <h2 className="text-xl font-bold">فرم تماس و مشاوره</h2>
            <p className="mt-1 text-xs text-cream/45">
              فیلدهای ستاره‌دار الزامی است. پاسخ در ساعات کاری ارسال می‌شود.
            </p>
            <div className="mt-5">
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-sand/10 !pt-12">
        <div className="shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">BEFORE YOU ASK</p>
            <h2 className="display mt-3 text-2xl">پاسخ چند سؤال رایج</h2>
            <p className="mt-3 text-xs leading-6 text-cream/50">
              بیشتر سؤال‌های مشتریان درباره‌ی ارسال، تعویض، اصالت چرم و سایزبندی است. اگر پاسخ
              سؤال‌تان اینجا نبود، فرم را پر کنید.
            </p>
            <Link href="/faq" className="mt-4 inline-block text-xs text-goldsoft">
              همه پرسش‌های متداول ←
            </Link>
          </div>
          <FaqAccordion items={contactFaqs} />
        </div>
      </section>
    </>
  );
}
