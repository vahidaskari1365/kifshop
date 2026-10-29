import type { Metadata } from "next";
import Link from "next/link";
import { Package, RefreshCcw, ShieldCheck, Truck } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { FaqAccordion } from "@/components/faq-accordion";
import { site } from "@/lib/catalog";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "ارسال، تعویض و گارانتی کیف چرم | کیف‌شاپ",
  description:
    "شرایط ارسال کیف‌شاپ: ارسال رایگان بالای ۳ میلیون تومان، تحویل ۲۴ تا ۴۸ ساعته تهران، ۲ تا ۴ روز کاری شهرستان. تعویض ۷ روزه و گارانتی ۵ ساله دوخت و یراق.",
  alternates: { canonical: "/shipping" },
};

const shippingRows = [
  { destination: "تهران (پیک و پست پیشتاز)", time: "۲۴ تا ۴۸ ساعت کاری", cost: "رایگان بالای ۳ میلیون / ۶۵٬۰۰۰ تومان" },
  { destination: "مراکز استان‌ها (تیپاکس)", time: "۲ تا ۳ روز کاری", cost: "رایگان بالای ۳ میلیون / ۶۵٬۰۰۰ تومان" },
  { destination: "سایر شهرها (پست پیشتاز)", time: "۳ تا ۴ روز کاری", cost: "رایگان بالای ۳ میلیون / ۶۵٬۰۰۰ تومان" },
  { destination: "سفارش‌های حکاکی و سفارشی", time: "۲ روز آماده‌سازی + ارسال", cost: "بر اساس مقصد" },
];

const faqs = [
  {
    question: "هزینه ارسال چقدر است؟",
    answer:
      "برای سفارش‌های بالای ۳ میلیون تومان ارسال رایگان است. برای سفارش‌های کمتر، هزینه ارسال ۶۵٬۰۰۰ تومان محاسبه می‌شود و در صفحه پرداخت نمایش داده می‌شود.",
  },
  {
    question: "چه مدت زمان تحویل طول می‌کشد؟",
    answer:
      "در تهران ۲۴ تا ۴۸ ساعت کاری، در مراکز استان‌ها ۲ تا ۳ روز کاری و در سایر شهرها ۳ تا ۴ روز کاری. سفارش‌های سفارشی و حکاکی‌شده ۲ روز آماده‌سازی بیشتر دارند.",
  },
  {
    question: "شرایط تعویض و بازگشت کالا چیست؟",
    answer:
      "تا ۷ روز پس از دریافت، اگر کیف استفاده نشده و پلمب آن باز نشده باشد، تعویض رنگ یا مدل انجام می‌شود. هزینه ارسال برگشت با خریدار است، مگر در صورت ایراد تولیدی.",
  },
  {
    question: "گارانتی ۵ ساله چه چیزهایی را پوشش می‌دهد؟",
    answer:
      "دوخت، درزها و یراق (زیپ، سگک، حلقه) در گارانتی ۵ ساله پوشش داده می‌شوند. فرسایش طبیعی چرم، پارگی ناشی از ضربه و تماس با مواد شیمیایی مشمول گارانتی نیست. تعمیر کیف‌های آتلیه تا ۱۰ سال انجام می‌شود.",
  },
];

export default function ShippingPage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "خانه", href: "/" },
            { name: "ارسال و گارانتی", href: "/shipping" },
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
            <span className="text-cream/70">ارسال و گارانتی</span>
          </nav>
          <p className="eyebrow mt-6">SHIPPING & PROMISE</p>
          <h1 className="display mt-3 text-[clamp(2rem,4.8vw,3.4rem)]">
            از آتلیه تا <span className="gold-text">دست شما</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-cream/55">
            هر کیف با جعبه‌ی مهر‌دار، کیسه‌ی پارچه‌ای، کارت اصالت و راهنمای نگهداری ارسال می‌شود.
            بسته‌بندی ضدضربه است و سفارش‌ها با کد رهگیری پیامک می‌شوند.
          </p>
        </div>
      </section>

      <section className="section !pt-10">
        <div className="shell">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: Truck, title: "ارسال سریع", text: "پست پیشتاز، تیپاکس و پیک تهران" },
              { icon: RefreshCcw, title: "تعویض ۷ روزه", text: "بدون پرسش، در صورت استفاده‌نشدن" },
              { icon: ShieldCheck, title: "گارانتی ۵ ساله", text: "دوخت، درز و یراق" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-sand/12 bg-onyx/40 p-5">
                <item.icon size={18} className="text-gold" />
                <p className="mt-3 text-sm font-bold">{item.title}</p>
                <p className="mt-1 text-xs text-cream/45">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-sand/12">
            <table className="w-full min-w-[40rem] text-right text-xs">
              <thead className="bg-onyx/70 text-cream/50">
                <tr>
                  <th className="px-4 py-3 font-medium">مقصد</th>
                  <th className="px-4 py-3 font-medium">زمان تحویل</th>
                  <th className="px-4 py-3 font-medium">هزینه</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand/10 text-cream/65">
                {shippingRows.map((row) => (
                  <tr key={row.destination}>
                    <td className="px-4 py-3 font-medium text-cream">{row.destination}</td>
                    <td className="px-4 py-3">{row.time}</td>
                    <td className="px-4 py-3 text-cream/50">{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold">فرایند تعویض و بازگشت</h2>
              <ol className="mt-4 space-y-3 text-xs leading-7 text-cream/55">
                {[
                  "درخواست خود را از طریق فرم تماس یا واتس‌اپ تا ۷ روز پس از دریافت ثبت کنید.",
                  "کارشناس ما وضعیت کیف و پلمب را بررسی و کد بازگشت ارسال می‌کند.",
                  "کیف را در بسته‌بندی اصلی و بدون استفاده ارسال کنید.",
                  "پس از بررسی، کیف جدید ارسال یا مبلغ بازگشت داده می‌شود.",
                ].map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="font-latin mt-0.5 text-gold/70">0{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-sand/12 bg-onyx/40 p-4 text-xs text-cream/55">
                <Package size={16} className="mt-0.5 shrink-0 text-gold" />
                <span>
                  کیف‌های حکاکی‌شده و سفارشی قابل تعویض نیستند، مگر ایراد تولیدی داشته باشند.
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold">پرسش‌های متداول ارسال</h2>
              <div className="mt-4">
                <FaqAccordion items={faqs} />
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-gold/20 bg-gold/[0.05] p-6">
            <p className="text-sm text-cream/70">
              سؤال دیگری درباره ارسال دارید؟ تلفن {site.phone}
            </p>
            <Link href="/contact" className="btn btn-gold !text-xs">
              تماس با پشتیبانی
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
