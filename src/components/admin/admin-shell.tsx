"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  BookOpen,
  Boxes,
  ExternalLink,
  LayoutDashboard,
  Layers,
  LogOut,
  Mail,
  Menu,
  MessageCircleQuestion,
  ShoppingBag,
  X,
} from "lucide-react";
import { logoutAction } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "داشبورد", icon: LayoutDashboard },
  { href: "/admin/products", label: "محصولات", icon: Boxes },
  { href: "/admin/collections", label: "کالکشن‌ها", icon: Layers },
  { href: "/admin/posts", label: "ژورنال", icon: BookOpen },
  { href: "/admin/faqs", label: "پرسش‌ها", icon: MessageCircleQuestion },
  { href: "/admin/orders", label: "سفارش‌ها", icon: ShoppingBag },
  { href: "/admin/messages", label: "پیام‌ها", icon: Mail },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname === "/admin/login") return <>{children}</>;

  const nav = (
    <nav className="space-y-1">
      {links.map((link) => {
        const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
              active
                ? "border border-gold/30 bg-gold/10 text-goldsoft"
                : "border border-transparent text-cream/60 hover:bg-cream/5 hover:text-cream",
            )}
          >
            <link.icon size={16} />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-ink">
      <div className="border-b border-sand/10 bg-coal/60">
        <div className="shell flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-full border border-sand/20 text-cream/70 lg:hidden"
              aria-label="باز کردن منوی مدیریت"
            >
              <Menu size={16} />
            </button>
            <Link href="/admin" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 font-latin text-sm text-gold">
                K
              </span>
              <span>
                <span className="block text-sm font-bold">پنل مدیریت کیف‌شاپ</span>
                <span className="font-latin block text-[0.55rem] tracking-[0.25em] text-gold/60">
                  KIFSHOP CMS
                </span>
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-1.5 rounded-full border border-sand/20 px-3 py-1.5 text-[0.68rem] text-cream/60 hover:border-gold/50 hover:text-gold sm:flex"
            >
              مشاهده سایت
              <ExternalLink size={12} />
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-full border border-clay/40 px-3 py-1.5 text-[0.68rem] text-clay hover:bg-clay/10"
              >
                خروج
                <LogOut size={12} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="shell grid gap-6 py-6 lg:grid-cols-[15rem_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-sand/10 bg-onyx/40 p-3">
            {nav}
            <div className="mt-3 border-t border-sand/10 pt-3 text-[0.62rem] leading-5 text-cream/30">
              تغییرات در محتوا، بلافاصله در سایت و نقشه‌ی سایت اعمال می‌شود.
            </div>
          </div>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[95] lg:hidden">
          <div className="absolute inset-0 bg-ink/80" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-72 border-l border-sand/15 bg-coal p-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-bold">منوی مدیریت</span>
              <button onClick={() => setOpen(false)} aria-label="بستن">
                <X size={18} />
              </button>
            </div>
            {nav}
          </div>
        </div>
      )}
    </div>
  );
}
