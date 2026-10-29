import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { brandImages } from "@/lib/catalog";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "نگهداری کیف چرم | برنامه فصلی، رفع لکه و اشتباه‌های رایج",
  description:
    "آموزش نگهداری کیف چرم: واکس و گردگیری، کنترل رطوبت، رفع لکه چربی و آب، ذخیره‌سازی درست و اشتباه‌هایی که چرم را برای همیشه پیر می‌کند.",
  alternates: { canonical: "/care" },
};

const faqs = [
  {
    question: "کیف چرم را چند وقت یک‌بار واکس بزنیم؟",
    answer:
      "برای استفاده روزمره، دو بار در سال (ابتدای بهار و ابتدای پاییز) واکس بی‌رنگ با موم طبیعی کافی است. مقدار کم و حرکت دورانی با پارچه نرم، سپس پرداخت با پارچه خشک.",
  },
  {
    question: "لکه چربی روی کیف چرم را چطور پاک کنیم؟",
    answer:
      "روی لکه پودر تالک بزنید، ۳۰ دقیقه صبر کنید و با برس نرم بردارید. از صابون و دستمال مرطوب الکلی استفاده نکنید؛ این مواد پوشش محافظ چرم را از بین می‌برند.",
  },
  {
    question: "کیف چرم را در کمد آویزان کنیم یا در جعبه بگذاریم؟",
    answer:
      "در کیسه پارچه‌ای (نه پلاستیک) و در جای خشک و دور از نور مستقیم نگه دارید. داخل کیف را با کاغذ بی‌اسید یا پارچه پر کنید تا فرم آن حفظ شود.",
  },
];

const schedule = [
  { season: "بهار", task: "گردگیری کامل، واکس بی‌رنگ، بررسی دوخت و یراق" },
  { season: "تابستان", task: "دوری از آفتاب مستقیم، کنترل رطوبت، پاک کردن عرق و ضدآفتاب" },
  { season: "پاییز", task: "واکس دوم سال، تمیز کردن لبه‌ها، بررسی زیپ و آستر" },
  { season: "زمستان", task: "دوری از بخاری و باران، خشک کردن طبیعی در دمای اتاق" },
];

export default function CarePage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "خانه", href: "/" },
            { name: "نگهداری چرم", href: "/care" },
          ]),
        ]}
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={brandImages.handStitch}
            alt="نگهداری و دوخت کیف چرم"
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/60" />
        </div>
        <div className="shell relative py-14">
          <nav aria-label="مسیر صفحه" className="text-[0.68rem] text-cream/45">
            <Link href="/" className="hover:text-gold">
              خانه
            </Link>
            <span className="mx-2">/</span>
            <span className="text-cream/70">نگهداری چرم</span>
          </nav>
          <p className="eyebrow mt-6">LEATHER CARE</p>
          <h1 className="display mt-3 text-[clamp(2rem,4.8vw,3.4rem)]">
            کیف چرم را <span className="gold-text">پیر اما زیبا</span> نگه داریم
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-cream/60">
            چرم یک ماده‌ی زنده در زمان است؛ با نگهداری درست تیره‌تر و براق‌تر می‌شود. این برنامه‌ی
            ساده، عمر کیف شما را از ۵ سال به بیش از ۱۲ سال می‌رساند.
          </p>
        </div>
      </section>

      <section className="section !pt-12">
        <div className="shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="eyebrow">THE RULES</p>
            <h2 className="display mt-3 text-2xl">پنج قانون طلایی</h2>
            <div className="mt-5 space-y-3">
              {[
                {
                  title: "رطوبت را کنترل کنید",
                  text: "چرم در رطوبت بالای ۶۰ درصد کپک می‌زند. در سفر از ساشه جاذب رطوبت استفاده کنید و کیف نمناک را در کمد بسته نگه ندارید.",
                },
                {
                  title: "از نور مستقیم دوری کنید",
                  text: "UV رنگ چرم را می‌برد. کیف را پشت شیشه ماشین یا نزدیک پنجره آفتاب‌گیر نگه ندارید.",
                },
                {
                  title: "واکس، کم و منظم",
                  text: "سال دو بار واکس بی‌رنگ با موم طبیعی. مقدار زیاد واکس، منافذ چرم را می‌بندد.",
                },
                {
                  title: "فرم را حفظ کنید",
                  text: "داخل کیف را با کاغذ بی‌اسید پر کنید و در کیسه پارچه‌ای نگه دارید، نه نایلون.",
                },
                {
                  title: "لکه را درست بردارید",
                  text: "چربی با تالک، آب با پارچه خشک، جوهر با پاک‌کننده مخصوص چرم. مالیدن لکه، آن را بزرگ‌تر می‌کند.",
                },
              ].map((rule, index) => (
                <div key={rule.title} className="flex gap-4 rounded-2xl border border-sand/12 bg-onyx/40 p-4">
                  <span className="font-latin mt-0.5 text-xs text-gold/70">0{index + 1}</span>
                  <div>
                    <p className="text-sm font-semibold">{rule.title}</p>
                    <p className="mt-1 text-xs leading-6 text-cream/50">{rule.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="rounded-3xl border border-sand/12 bg-onyx/40 p-5">
              <p className="eyebrow">SEASONAL CALENDAR</p>
              <div className="mt-3 divide-y divide-sand/10">
                {schedule.map((row) => (
                  <div key={row.season} className="flex gap-4 py-3">
                    <span className="w-14 shrink-0 text-xs font-semibold text-goldsoft">{row.season}</span>
                    <span className="text-xs leading-6 text-cream/55">{row.task}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-sage/30 bg-sage/[0.07] p-4">
                <p className="text-xs font-bold text-sage">درست</p>
                <ul className="mt-2 space-y-1.5 text-[0.7rem] text-cream/60">
                  <li>پارچه میکروفایبر نرم</li>
                  <li>واکس بی‌رنگ موم طبیعی</li>
                  <li>خشک کردن در دمای اتاق</li>
                  <li>کیسه پارچه‌ای برای نگهداری</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-clay/30 bg-clay/[0.07] p-4">
                <p className="text-xs font-bold text-clay">اشتباه</p>
                <ul className="mt-2 space-y-1.5 text-[0.7rem] text-cream/60">
                  <li>سشوار و بخاری</li>
                  <li>دستمال مرطوب الکلی</li>
                  <li>وایتکس و شوینده ظرف</li>
                  <li>کیسه پلاستیکی و آفتاب</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-sand/10 !pt-12">
        <div className="shell grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="text-2xl font-bold">پرسش‌های متداول نگهداری</h2>
            <div className="mt-4 space-y-3">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-sand/12 bg-onyx/40 p-4">
                  <p className="text-sm font-semibold text-goldsoft">{faq.question}</p>
                  <p className="mt-1.5 text-xs leading-6 text-cream/55">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-gold/20 bg-gold/[0.05] p-6">
            <h2 className="text-xl font-bold">تعمیر و بازسازی کیف</h2>
            <p className="mt-3 text-xs leading-7 text-cream/60">
              اگر دوخت کیف باز شده، زیپ خراب شده یا رنگ لبه‌ها رفته است، لازم نیست کیف را کنار
              بگذارید. آتلیه کیف‌شاپ کیف‌های خودش را تا ۱۰ سال تعمیر می‌کند: تعویض زیپ، دوخت مجدد
              دسته، پرداخت لبه و رنگ‌آمیزی.
            </p>
            <ul className="mt-3 space-y-2 text-xs text-cream/55">
              {[
                "تعویض زیپ و یراق برنجی",
                "دوخت مجدد درزها و دسته‌ها",
                "پرداخت و رنگ لبه‌ها",
                "تعویض آستر داخلی",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn btn-gold mt-5 !text-xs">
              درخواست تعمیر
            </Link>
            <Link href="/shipping" className="mt-3 block text-[0.68rem] text-cream/40">
              شرایط گارانتی و ارسال →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
