import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { InquiryForm } from "@/components/inquiry-form";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "فروش عمده کیف چرم و همکاری با فروشگاه‌ها | کیف‌شاپ",
  description:
    "فروش عمده کیف چرم دست‌ساز از ۱۰ عدد به بالا با قیمت همکاری، امکان حکاکی لوگو و بسته‌بندی اختصاصی. فرم درخواست عمده کیف‌شاپ و شرایط همکاری.",
  alternates: { canonical: "/wholesale" },
};

const faqs = [
  {
    question: "حداقل تعداد سفارش عمده چقدر است؟",
    answer:
      "حداقل سفارش عمده ۱۰ عدد از یک مدل یا ۱۵ عدد ترکیبی است. برای سفارش‌های بالای ۵۰ عدد، قیمت و زمان‌بندی اختصاصی تعریف می‌شود.",
  },
  {
    question: "امکان حکاکی لوگوی فروشگاه وجود دارد؟",
    answer:
      "بله. برای سفارش‌های بالای ۲۵ عدد، حکاکی لوگو با مهر برنجی روی پلاک چرمی یا آستر داخلی انجام می‌شود. هزینه مهر اولیه یک‌بار دریافت می‌شود.",
  },
  {
    question: "زمان تحویل سفارش عمده چقدر است؟",
    answer:
      "برای مدل‌های موجود ۵ تا ۷ روز کاری و برای تولید سفارشی ۱۴ تا ۲۱ روز کاری. زمان‌بندی دقیق پس از تأیید نمونه اعلام می‌شود.",
  },
  {
    question: "شرایط پرداخت و ارسال عمده چگونه است؟",
    answer:
      "۵۰ درصد پیش‌پرداخت و مابقی پیش از ارسال. ارسال با باربری یا پست پیشتاز و بیمه‌ی محموله انجام می‌شود. برای مشتریان مستمر، شرایط اعتباری توافقی است.",
  },
];

export default function WholesalePage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "خانه", href: "/" },
            { name: "فروش عمده", href: "/wholesale" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "فروش عمده کیف چرم دست‌ساز",
            provider: { "@type": "Organization", name: "کیف‌شاپ" },
            areaServed: "IR",
            description: "تولید و عرضه عمده کیف چرم دست‌ساز برای فروشگاه‌ها و برندها",
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
            <span className="text-cream/70">فروش عمده</span>
          </nav>
          <p className="eyebrow mt-6">B2B & WHOLESALE</p>
          <h1 className="display mt-3 max-w-3xl text-[clamp(2rem,4.8vw,3.4rem)] leading-tight">
            همکاری با آتلیه: <span className="gold-text">کیف چرم برای کسب‌وکار شما</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-cream/55">
            اگر فروشگاه کیف، بوتیک، برند پوشاک یا فروشگاه آنلاین دارید، می‌توانید کیف‌های آتلیه را
            با قیمت همکاری، امکان حکاکی لوگو و بسته‌بندی اختصاصی سفارش دهید.
          </p>
        </div>
      </section>

      <section className="section !pt-10">
        <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "قیمت همکاری", text: "از ۱۰ عدد، با پله‌های تخفیف تا ۳۵٪" },
                { title: "حکاکی لوگو", text: "برای سفارش‌های بالای ۲۵ عدد" },
                { title: "بسته‌بندی اختصاصی", text: "جعبه، کارت و لیبل برند شما" },
                { title: "تولید سفارشی", text: "تغییر رنگ، یراق و ابعاد" },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-sand/12 bg-onyx/40 p-5">
                  <p className="text-sm font-bold text-goldsoft">{item.title}</p>
                  <p className="mt-2 text-xs leading-6 text-cream/50">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-sand/12">
              <table className="w-full text-right text-xs">
                <thead className="bg-onyx/70 text-cream/50">
                  <tr>
                    <th className="px-4 py-3 font-medium">تعداد سفارش</th>
                    <th className="px-4 py-3 font-medium">تخفیف همکاری</th>
                    <th className="px-4 py-3 font-medium">امکانات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand/10 text-cream/60">
                  {[
                    { qty: "۱۰ تا ۲۴ عدد", off: "۱۵٪", perks: "ارسال یکجا" },
                    { qty: "۲۵ تا ۴۹ عدد", off: "۲۲٪", perks: "حکاکی لوگو" },
                    { qty: "۵۰ تا ۹۹ عدد", off: "۲۸٪", perks: "بسته‌بندی اختصاصی" },
                    { qty: "۱۰۰ عدد و بیشتر", off: "تا ۳۵٪", perks: "تولید سفارشی" },
                  ].map((row) => (
                    <tr key={row.qty}>
                      <td className="px-4 py-3 text-cream">{row.qty}</td>
                      <td className="px-4 py-3 text-goldsoft">{row.off}</td>
                      <td className="px-4 py-3 text-cream/45">{row.perks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 rounded-2xl border border-gold/20 bg-gold/[0.05] p-4 text-xs leading-6 text-cream/60">
              برای دریافت کاتالوگ عمده، نمونه‌ی چرم و لیست قیمت، فرم روبه‌رو را تکمیل کنید. پاسخ
              حداکثر یک روز کاری.
            </div>
          </div>

          <div className="rounded-3xl border border-sand/12 bg-onyx/40 p-6 md:p-8">
            <h2 className="text-xl font-bold">فرم درخواست فروش عمده</h2>
            <p className="mt-1 text-xs text-cream/45">
              اطلاعات کسب‌وکار و تعداد تقریبی سفارش را بنویسید.
            </p>
            <div className="mt-5">
              <InquiryForm variant="wholesale" />
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-sand/10 !pt-12">
        <div className="shell grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">پرسش‌های متداول عمده</h2>
            <div className="mt-4 space-y-3">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-sand/12 bg-onyx/40 p-4">
                  <p className="text-sm font-semibold text-goldsoft">{faq.question}</p>
                  <p className="mt-1.5 text-xs leading-6 text-cream/55">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-sand/12 bg-onyx/40 p-6">
            <h2 className="text-xl font-bold">چه کسانی با ما همکاری می‌کنند؟</h2>
            <ul className="mt-4 space-y-3 text-xs text-cream/55">
              {[
                "فروشگاه‌های کیف و چرم در تهران و شهرستان‌ها",
                "بوتیک‌های پوشاک و اکسسوری",
                "برندهای هدیه و کالای لوکس",
                "فروشگاه‌های اینستاگرامی و آنلاین",
                "هتل‌ها و مجموعه‌های اقامتی برای هدیه مهمان",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/shop" className="btn btn-outline mt-6 !text-xs">
              مشاهده کاتالوگ محصولات
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
