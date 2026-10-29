import type { Metadata } from "next";
import Link from "next/link";
import { CartView } from "@/components/cart-view";

export const metadata: Metadata = {
  title: "سبد خرید",
  description: "سبد خرید کیف‌شاپ؛ بررسی کیف‌های انتخابی و ادامه سفارش.",
  alternates: { canonical: "/cart" },
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <>
      <section className="border-b border-sand/10">
        <div className="shell py-10">
          <nav aria-label="مسیر صفحه" className="text-[0.68rem] text-cream/40">
            <Link href="/" className="hover:text-gold">
              خانه
            </Link>
            <span className="mx-2">/</span>
            <span className="text-cream/70">سبد خرید</span>
          </nav>
          <p className="eyebrow mt-5">YOUR SELECTION</p>
          <h1 className="display mt-2 text-3xl">سبد خرید</h1>
        </div>
      </section>
      <section className="section !pt-8">
        <div className="shell">
          <CartView />
        </div>
      </section>
    </>
  );
}
