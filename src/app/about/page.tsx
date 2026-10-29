import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ArrowLink, Counter, Parallax, Reveal } from "@/components/motion";
import { brandImages, craftSteps, site, stats } from "@/lib/catalog";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "درباره آتلیه کیف‌شاپ | دوازده سال کیف چرم دست‌ساز",
  description:
    "داستان آتلیه کیف‌شاپ از سال ۱۳۹۲: چرم طبیعی دباغی گیاهی، دوخت دست، یراق برنجی و تعمیر بلندمدت. با فرایند ساخت کیف و ارزش‌های ما آشنا شوید.",
  alternates: { canonical: "/about" },
};

const timeline = [
  { year: "۱۳۹۲", title: "آغاز در یک کارگاه کوچک", text: "کیف‌شاپ با سه چرخ خیاطی و یک میز برش در تهران شروع شد." },
  { year: "۱۳۹۶", title: "نخستین کالکشن آتلیه", text: "قطعه‌های شماره‌دار دست‌دوز با شماره سریال و مهر آتلیه عرضه شد." },
  { year: "۱۳۹۹", title: "گارانتی ۵ ساله", text: "سیاست گارانتی و تعمیر بلندمدت برای همه کیف‌ها اجرایی شد." },
  { year: "۱۴۰۲", title: "چرم دباغی گیاهی", text: "همه‌ی پوست‌ها به دباغی گیاهی شناخته‌شده تغییر کرد." },
  { year: "۱۴۰۵", title: "۲۴ هزار کیف", text: "بیش از ۲۴ هزار کیف تحویل و بیش از ۶۰۰ نظر ثبت‌شده‌ی مشتریان." },
];

const values = [
  { title: "شفافیت", text: "نوع چرم، نوع دباغی و منبع تأمین را در صفحه‌ی هر محصول می‌نویسیم." },
  { title: "تعمیرپذیری", text: "کیف را طوری می‌سازیم که قابل تعمیر باشد، نه قابل دور انداختن." },
  { title: "طراحی ماندگار", text: "فرم‌های ساده که پس از پنج سال هم درست به نظر می‌رسند." },
  { title: "قیمت منصفانه", text: "تولید مستقیم و بدون واسطه، با حاشیه‌ی سود شفاف." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          organizationSchema,
          breadcrumbSchema([
            { name: "خانه", href: "/" },
            { name: "درباره ما", href: "/about" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "درباره آتلیه کیف‌شاپ",
            description: "داستان دوازده سال ساخت کیف چرم دست‌ساز در تهران",
            publisher: { "@id": `${site.url}/#organization` },
          },
        ]}
      />

      <section className="relative overflow-hidden border-b border-sand/10">
        <div className="pointer-events-none absolute inset-0 spotlight opacity-70" />
        <div className="shell relative grid items-center gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <nav aria-label="مسیر صفحه" className="text-[0.68rem] text-cream/40">
              <Link href="/" className="hover:text-gold">
                خانه
              </Link>
              <span className="mx-2">/</span>
              <span className="text-cream/70">درباره ما</span>
            </nav>
            <p className="eyebrow mt-6">OUR STORY · SINCE 2014</p>
            <h1 className="display mt-3 text-[clamp(2rem,4.8vw,3.4rem)] leading-tight">
              دوازده سال، یک ایده:
              <br />
              <span className="gold-text">کیف خوب، همراه زندگی</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-8 text-cream/60">
              کیف‌شاپ از یک کارگاه کوچک در تهران شروع شد؛ جایی که سه نفر تصمیم گرفتند کیف چرم
              ایرانی را از کلیشه‌ی «کالای لوکس گران» بیرون بیاورند و آن را به یک همراه روزمره‌ی
              بادوام تبدیل کنند. امروز هم همان باور را داریم: کیف باید ساده، محکم و قابل تعمیر باشد.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/shop" className="btn btn-gold">
                دیدن کیف‌ها
              </Link>
              <Link href="/contact" className="btn btn-outline">
                گفت‌وگو با آتلیه
              </Link>
            </div>
          </div>
          <Parallax distance={28} className="relative h-72 overflow-hidden rounded-[2rem] border border-sand/12 lg:h-[26rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brandImages.shopScene}
              alt="آتلیه کیف‌شاپ در تهران"
              className="h-[112%] w-full object-cover"
            />
          </Parallax>
        </div>
      </section>

      <section className="section">
        <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">TIMELINE</p>
            <h2 className="display mt-3 text-3xl">مسیر آتلیه در یک نگاه</h2>
            <dl className="mt-6 grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-sand/12 bg-onyx/40 p-4">
                  <dt className="text-xs text-cream/45">{stat.label}</dt>
                  <dd className="font-latin mt-1 text-2xl text-goldsoft">
                    <Counter value={stat.number} decimals={stat.decimals ?? 0} suffix={stat.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <ol className="relative space-y-5 border-r border-sand/15 pr-6">
            {timeline.map((item, index) => (
              <Reveal key={item.year} delay={index * 0.06}>
                <li className="relative">
                  <span className="absolute -right-[1.85rem] top-1.5 h-2.5 w-2.5 rounded-full border border-gold bg-ink" />
                  <p className="font-latin text-xs text-gold">{item.year}</p>
                  <p className="mt-1 text-sm font-bold">{item.title}</p>
                  <p className="mt-1 text-xs leading-6 text-cream/50">{item.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section border-y border-sand/10 bg-coal/40">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="eyebrow">HOW WE WORK</p>
              <h2 className="display mt-3 text-3xl">
                هر کیف، <span className="gold-text">چهار مرحله دست</span>
              </h2>
              <p className="mt-4 text-sm leading-7 text-cream/55">
                هیچ کیف کیف‌شاپ بدون عبور از این چهار مرحله از آتلیه خارج نمی‌شود. میانگین زمان ساخت
                یک کیف دستی ۱۱ ساعت کار دست است.
              </p>
              <ArrowLink href="/buying-guide" className="mt-5">
                راهنمای انتخاب کیف
              </ArrowLink>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {craftSteps.map((step) => (
                <div key={step.id} className="rounded-2xl border border-sand/12 bg-onyx/40 p-4">
                  <p className="font-latin text-[0.62rem] tracking-[0.3em] text-gold/70">STEP {step.step}</p>
                  <p className="mt-2 text-sm font-bold">{step.title}</p>
                  <p className="mt-1 text-[0.7rem] leading-6 text-cream/45">{step.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl border border-sand/12 p-5">
                <p className="text-sm font-bold text-goldsoft">{value.title}</p>
                <p className="mt-2 text-xs leading-6 text-cream/50">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-14">
        <div className="flex flex-wrap items-center justify-between gap-5 rounded-3xl border border-gold/20 bg-gold/[0.05] p-7">
          <div>
            <h2 className="text-xl font-bold">دوست دارید آتلیه را از نزدیک ببینید؟</h2>
            <p className="mt-2 text-xs leading-6 text-cream/55">
              {site.address} · {site.hours} · بازدید با هماهنگی قبلی
            </p>
          </div>
          <Link href="/contact" className="btn btn-gold">
            هماهنگی بازدید
          </Link>
        </div>
      </section>
    </>
  );
}
