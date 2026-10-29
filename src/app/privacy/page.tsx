import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "حریم خصوصی و شرایط استفاده | کیف‌شاپ",
  description:
    "سیاست حریم خصوصی کیف‌شاپ: داده‌هایی که جمع‌آوری می‌کنیم، نحوه استفاده از کوکی‌ها، نگهداری اطلاعات سفارش و حقوق کاربران.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: "چه اطلاعاتی جمع‌آوری می‌شود؟",
    body: "برای پردازش سفارش، نام، شماره تماس، نشانی و در صورت نیاز ایمیل شما را ذخیره می‌کنیم. اطلاعات پرداخت کارت بانکی هرگز در سرورهای کیف‌شاپ ذخیره نمی‌شود و در درگاه بانکی انجام می‌گیرد. پیام‌های فرم تماس و ایمیل خبرنامه نیز برای پاسخ‌گویی و اطلاع‌رسانی نگه‌داری می‌شوند.",
  },
  {
    title: "چرا این اطلاعات را نیاز داریم؟",
    body: "برای ارسال سفارش، پیگیری، پشتیبانی گارانتی و اطلاع‌رسانی وضعیت سفارش. ایمیل خبرنامه فقط برای ارسال نامه‌ی ماهانه استفاده می‌شود و هر زمان قابل لغو است.",
  },
  {
    title: "کوکی‌ها و تحلیل بازدید",
    body: "کیف‌شاپ از کوکی‌های ضروری برای نگه‌داری سبد خرید استفاده می‌کند. آمار بازدید به‌صورت تجمیعی و بدون شناسه شخصی بررسی می‌شود. داده‌های ساختاریافته و محتوای صفحات برای موتورهای جست‌وجو و موتورهای پاسخ هوش مصنوعی قابل خواندن است اما این موضوع شامل اطلاعات شخصی شما نمی‌شود.",
  },
  {
    title: "اشتراک‌گذاری اطلاعات",
    body: "اطلاعات ارسال سفارش تنها با شرکت پست یا پیک برای تحویل بسته به اشتراک گذاشته می‌شود. اطلاعات شما به شخص ثالث برای تبلیغات فروخته نمی‌شود.",
  },
  {
    title: "مدت نگه‌داری",
    body: "سوابق سفارش برای پشتیبانی گارانتی تا ۵ سال و اطلاعات گارانتی و تعمیر تا ۱۰ سال نگه‌داری می‌شود. پس از این مدت، داده‌ها حذف یا بی‌نام می‌شوند.",
  },
  {
    title: "حقوق شما",
    body: "می‌توانید درخواست اصلاح یا حذف اطلاعات شخصی، لغو عضویت خبرنامه و دریافت نسخه‌ای از اطلاعات ثبت‌شده‌ی خود را از طریق ایمیل یا فرم تماس ثبت کنید. پاسخ حداکثر تا ۷ روز کاری داده می‌شود.",
  },
  {
    title: "امنیت",
    body: "دسترسی به پنل مدیریت با رمز اختصاصی محدود شده و ارتباطات سایت روی پروتکل امن انجام می‌شود. با این حال، هیچ سامانه‌ای امنیت مطلق ندارد؛ در صورت مشاهده‌ی فعالیت مشکوک به ما اطلاع دهید.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-sand/10">
        <div className="pointer-events-none absolute inset-0 spotlight opacity-50" />
        <div className="shell relative py-14">
          <nav aria-label="مسیر صفحه" className="text-[0.68rem] text-cream/40">
            <Link href="/" className="hover:text-gold">
              خانه
            </Link>
            <span className="mx-2">/</span>
            <span className="text-cream/70">حریم خصوصی</span>
          </nav>
          <p className="eyebrow mt-6">PRIVACY & TERMS</p>
          <h1 className="display mt-3 text-[clamp(2rem,4.6vw,3rem)]">حریم خصوصی شما</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-cream/55">
            آخرین بازبینی: بهار ۱۴۰۵. این صفحه سیاست کیف‌شاپ برای نگه‌داری و استفاده از اطلاعات
            شما و شرایط استفاده از سایت را توضیح می‌دهد.
          </p>
        </div>
      </section>

      <section className="section !pt-10">
        <div className="shell grid gap-10 lg:grid-cols-[0.34fr_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-sand/12 bg-onyx/40 p-5">
              <p className="eyebrow">ON THIS PAGE</p>
              <ol className="mt-3 space-y-2 text-xs text-cream/55">
                {sections.map((section, index) => (
                  <li key={section.title}>
                    <a href={`#s-${index}`} className="flex gap-2 hover:text-goldsoft">
                      <span className="font-latin text-gold/50">{String(index + 1).padStart(2, "0")}</span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
          <div className="space-y-6">
            {sections.map((section, index) => (
              <div key={section.title} id={`s-${index}`} className="scroll-mt-28">
                <h2 className="text-lg font-bold">{section.title}</h2>
                <p className="mt-2 text-sm leading-8 text-cream/60">{section.body}</p>
              </div>
            ))}
            <div className="rounded-3xl border border-gold/20 bg-gold/[0.05] p-6 text-sm text-cream/65">
              برای هر پرسش درباره‌ی حریم خصوصی با {site.email} یا تلفن {site.phone} تماس بگیرید.
              <Link href="/contact" className="mr-2 text-goldsoft">
                فرم تماس ←
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
