"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Search, ShoppingBag, X } from "lucide-react";
import { categories, site } from "@/lib/catalog";
import { cn, faNum } from "@/lib/utils";
import { useCart } from "./cart-context";

const mainLinks = [
  { href: "/shop", label: "فروشگاه" },
  { href: "/collections", label: "کالکشن‌ها" },
  { href: "/journal", label: "ژورنال" },
  { href: "/buying-guide", label: "راهنمای خرید" },
  { href: "/about", label: "درباره ما" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-[60]">
      <div className="hidden items-center justify-between bg-onyx px-6 py-2 text-[0.68rem] text-cream/55 md:flex">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-sage" />
          ارسال رایگان بالای ۳ میلیون تومان
        </span>
        <div className="flex items-center gap-5">
          <span>گارانتی ۵ ساله دوخت و یراق</span>
          <span className="text-gold/60">|</span>
          <span>تعویض ۷ روزه</span>
          <span className="text-gold/60">|</span>
          <a href={`tel:${site.phoneRaw}`} className="transition-colors hover:text-gold">
            {site.phone}
          </a>
        </div>
      </div>

      <div
        className={cn(
          "border-b transition-all duration-500",
          scrolled
            ? "border-sand/15 bg-ink/85 backdrop-blur-xl"
            : "border-transparent bg-ink/40 backdrop-blur-md",
        )}
      >
        <div className="shell flex h-[4.4rem] items-center justify-between gap-4 md:h-20">
          <Link href="/" className="group flex items-center gap-3" aria-label="کیف‌شاپ، صفحه اصلی">
            <span className="relative grid h-11 w-11 place-items-center rounded-full border border-gold/45 text-gold transition-transform duration-500 group-hover:rotate-[10deg]">
              <span className="font-latin text-lg font-semibold">K</span>
              <span className="absolute -inset-1 rounded-full border border-gold/15" />
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-extrabold tracking-tight">کیف‌شاپ</span>
              <span className="font-latin block text-[0.54rem] tracking-[0.34em] text-gold/70">
                KIFSHOP ATELIER
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="ناوبری اصلی">
            <Link
              href="/"
              className={cn(
                "rounded-full px-4 py-2 text-sm transition-colors hover:text-goldsoft",
                pathname === "/" ? "text-gold" : "text-cream/80",
              )}
            >
              خانه
            </Link>
            <div className="group relative">
              <Link
                href="/shop"
                className={cn(
                  "flex items-center gap-1 rounded-full px-4 py-2 text-sm transition-colors hover:text-goldsoft",
                  pathname.startsWith("/shop") ? "text-gold" : "text-cream/80",
                )}
              >
                فروشگاه
                <ChevronDown size={13} className="transition-transform group-hover:rotate-180" />
              </Link>
              <div className="invisible absolute right-0 top-full w-[42rem] pt-4 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="glass grid grid-cols-[1.4fr_1fr] gap-6 rounded-3xl p-6 shadow-2xl">
                  <div>
                    <p className="eyebrow mb-4">CATEGORIES</p>
                    <ul className="grid grid-cols-2 gap-1">
                      {categories.map((category) => (
                        <li key={category.key}>
                          <Link
                            href={`/shop?category=${category.key}`}
                            className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-cream/75 transition-colors hover:bg-gold/10 hover:text-goldsoft"
                          >
                            {category.label}
                            <span className="text-gold/50">←</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href="/collections/atelier"
                    className="relative flex flex-col justify-end overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-t from-mocha via-onyx to-coal p-5"
                  >
                    <span className="absolute inset-0 spotlight" />
                    <p className="eyebrow relative">NEW SEASON</p>
                    <p className="relative mt-2 text-lg font-bold leading-snug">
                      کالکشن آتلیه؛
                      <br />
                      دست‌دوز و شماره‌دار
                    </p>
                    <span className="relative mt-3 text-xs text-goldsoft">مشاهده کالکشن ←</span>
                  </Link>
                </div>
              </div>
            </div>
            {mainLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition-colors hover:text-goldsoft",
                  pathname.startsWith(link.href) ? "text-gold" : "text-cream/80",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/search"
              aria-label="جست‌وجوی کیف"
              className="grid h-10 w-10 place-items-center rounded-full border border-sand/15 text-cream/75 transition-colors hover:border-gold hover:text-gold"
            >
              <Search size={17} />
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label={`سبد خرید، ${count} کالا`}
              className="relative grid h-10 w-10 place-items-center rounded-full border border-sand/15 text-cream/75 transition-colors hover:border-gold hover:text-gold"
            >
              <ShoppingBag size={17} />
              {count > 0 && (
                <span className="absolute -left-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[0.6rem] font-bold text-ink">
                  {faNum(count)}
                </span>
              )}
            </button>
            <Link href="/contact" className="btn btn-gold hidden !px-5 !py-2.5 !text-xs xl:inline-flex">
              مشاوره خرید
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="منو"
              className="grid h-10 w-10 place-items-center rounded-full border border-sand/15 text-cream/80 lg:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[95] overflow-y-auto bg-ink pb-10 lg:hidden"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="text-lg font-extrabold">کیف‌شاپ</span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="بستن منو"
                className="grid h-10 w-10 place-items-center rounded-full border border-sand/20"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-4" aria-label="ناوبری موبایل">
              <Link href="/" className="rounded-xl px-4 py-3 text-lg hover:bg-gold/10">
                خانه
              </Link>
              <Link href="/shop" className="rounded-xl px-4 py-3 text-lg hover:bg-gold/10">
                فروشگاه
              </Link>
              <div className="grid grid-cols-2 gap-1 py-2">
                {categories.map((category) => (
                  <Link
                    key={category.key}
                    href={`/shop?category=${category.key}`}
                    className="rounded-xl border border-sand/10 px-3 py-2.5 text-xs text-cream/70"
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
              {mainLinks.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-4 py-3 text-lg hover:bg-gold/10"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Link href="/faq" className="rounded-xl border border-sand/10 px-3 py-3 text-sm">
                  پرسش‌های متداول
                </Link>
                <Link href="/contact" className="rounded-xl border border-sand/10 px-3 py-3 text-sm">
                  تماس با ما
                </Link>
                <Link href="/wholesale" className="rounded-xl border border-sand/10 px-3 py-3 text-sm">
                  فروش عمده
                </Link>
                <Link href="/admin" className="rounded-xl border border-sand/10 px-3 py-3 text-sm">
                  پنل مدیریت
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
