import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 spotlight" />
      <div className="shell relative flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <p className="eyebrow">404 · LOST IN THE ATELIER</p>
        <h1 className="display mt-4 text-[clamp(3rem,10vw,7rem)] leading-none">
          <span className="gold-text">۴۰۴</span>
        </h1>
        <p className="mt-4 max-w-md text-sm leading-7 text-cream/55">
          این صفحه پیدا نشد؛ شاید کیف مورد نظر شما در کالکشن دیگری باشد. از فروشگاه شروع کنید یا
          راهنمای خرید کیف را ببینید.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="btn btn-gold">
            دیدن کیف‌ها
          </Link>
          <Link href="/buying-guide" className="btn btn-outline">
            راهنمای خرید
          </Link>
          <Link href="/" className="btn btn-outline">
            صفحه اصلی
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-2 text-[0.68rem] text-cream/35">
          {[
            { href: "/faq", label: "پرسش‌های متداول" },
            { href: "/size-guide", label: "سایزبندی" },
            { href: "/care", label: "نگهداری چرم" },
            { href: "/journal", label: "ژورنال" },
            { href: "/contact", label: "تماس" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-sand/15 px-3 py-1.5 hover:border-gold/50 hover:text-goldsoft"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
