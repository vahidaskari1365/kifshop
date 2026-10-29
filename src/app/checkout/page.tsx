import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutView } from "@/components/checkout-view";

export const metadata: Metadata = {
  title: "تکمیل سفارش",
  description: "تکمیل سفارش کیف چرم در کیف‌شاپ با ارسال بیمه‌شده و گارانتی ۵ ساله.",
  alternates: { canonical: "/checkout" },
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <>
      <section className="border-b border-sand/10">
        <div className="shell py-10">
          <nav aria-label="مسیر صفحه" className="text-[0.68rem] text-cream/40">
            <Link href="/" className="hover:text-gold">
              خانه
            </Link>
            <span className="mx-2">/</span>
            <Link href="/cart" className="hover:text-gold">
              سبد خرید
            </Link>
            <span className="mx-2">/</span>
            <span className="text-cream/70">تکمیل سفارش</span>
          </nav>
          <p className="eyebrow mt-5">SECURE CHECKOUT</p>
          <h1 className="display mt-2 text-3xl">تکمیل سفارش</h1>
        </div>
      </section>
      <section className="section !pt-8">
        <div className="shell">
          <CheckoutView />
        </div>
      </section>
    </>
  );
}
