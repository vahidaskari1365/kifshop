import Link from "next/link";
import { Camera, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { categories, site } from "@/lib/catalog";
import { NewsletterForm } from "./newsletter-form";

const columns = [
  {
    title: "فروشگاه",
    links: [
      { href: "/shop", label: "همه کیف‌ها" },
      ...categories.slice(0, 4).map((category) => ({
        href: `/shop?category=${category.key}`,
        label: category.label,
      })),
      { href: "/collections", label: "کالکشن‌ها" },
    ],
  },
  {
    title: "راهنمای خرید",
    links: [
      { href: "/buying-guide", label: "راهنمای کامل خرید کیف" },
      { href: "/size-guide", label: "سایزبندی و ابعاد کیف" },
      { href: "/care", label: "نگهداری چرم" },
      { href: "/shipping", label: "ارسال، تعویض و گارانتی" },
      { href: "/faq", label: "پرسش‌های متداول" },
      { href: "/journal", label: "ژورنال کیف‌شاپ" },
    ],
  },
  {
    title: "کیف‌شاپ",
    links: [
      { href: "/about", label: "درباره آتلیه" },
      { href: "/contact", label: "تماس و مشاوره" },
      { href: "/wholesale", label: "فروش عمده و B2B" },
      { href: "/privacy", label: "حریم خصوصی" },
      { href: "/admin", label: "پنل مدیریت محتوا" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-10 overflow-hidden border-t border-sand/10 bg-coal">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 spotlight opacity-60" />
      <div className="shell relative py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 font-latin text-xl text-gold">
                K
              </span>
              <div>
                <p className="text-xl font-extrabold">کیف‌شاپ</p>
                <p className="font-latin text-[0.55rem] tracking-[0.32em] text-gold/70">
                  KIFSHOP ATELIER · TEHRAN
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-cream/60">
              آتلیه کیف چرم دست‌ساز از سال ۱۳۹۲. چرم طبیعی دباغی گیاهی، دوخت دست، یراق برنجی و
              گارانتی ۵ ساله؛ کیف‌هایی که با شما پیر می‌شوند.
            </p>
            <ul className="mt-6 space-y-2.5 text-xs text-cream/60">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-gold" />
                <a href={`tel:${site.phoneRaw}`} className="hover:text-goldsoft">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-gold" />
                <a href={`mailto:${site.email}`} className="hover:text-goldsoft">
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-1 shrink-0 text-gold" />
                <span className="leading-6">{site.address}</span>
              </li>
            </ul>
            <div className="mt-5 flex items-center gap-2">
              <a
                href={site.instagram}
                aria-label="اینستاگرام کیف‌شاپ"
                className="grid h-9 w-9 place-items-center rounded-full border border-sand/20 text-cream/70 transition-colors hover:border-gold hover:text-gold"
              >
                <Camera size={15} />
              </a>
              <a
                href={site.whatsapp}
                aria-label="واتس‌اپ کیف‌شاپ"
                className="grid h-9 w-9 place-items-center rounded-full border border-sand/20 text-cream/70 transition-colors hover:border-gold hover:text-gold"
              >
                <MessageCircle size={15} />
              </a>
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="eyebrow mb-4">{column.title}</h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/60 transition-colors hover:text-goldsoft"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 grid gap-6 rounded-3xl border border-sand/10 bg-onyx/50 p-6 md:grid-cols-[1fr_1.1fr] md:items-center md:p-8">
          <div>
            <p className="eyebrow">NEWSLETTER</p>
            <h2 className="mt-2 text-lg font-bold">
              ماهی یک نامه، بدون تبلیغات؛ فقط چرم و نگهداری.
            </h2>
            <p className="mt-2 text-xs leading-6 text-cream/50">
              تخفیف‌های آتلیه، قطعه‌های محدود و راهنماهای نگهداری کیف را اول از همه دریافت کنید.
            </p>
          </div>
          <NewsletterForm compact />
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-sand/10 pt-6 text-[0.7rem] text-cream/40 md:flex-row md:items-center md:justify-between">
          <p>© ۱۴۰۵ کیف‌شاپ. تمام حقوق محفوظ است. ساخت دست آتلیه در تهران.</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-sand/15 px-3 py-1">پرداخت امن زرین‌پال</span>
            <span className="rounded-full border border-sand/15 px-3 py-1">ارسال پست پیشتاز و تیپاکس</span>
            <span className="rounded-full border border-sand/15 px-3 py-1">نماد اعتماد الکترونیکی</span>
          </div>
        </div>
        <p className="mt-4 text-[0.65rem] leading-5 text-cream/25">
          کیف‌شاپ برای دیده‌شدن در موتورهای جست‌وجو و موتورهای پاسخ مبتنی بر هوش مصنوعی (ChatGPT،
          Perplexity، Gemini و Google AI Overviews) بهینه‌سازی شده است؛ اطلاعات محصولات، پاسخ‌های
          کوتاه و داده‌های ساختاریافته در همه صفحات قابل بازیابی است.
        </p>
      </div>
    </footer>
  );
}
