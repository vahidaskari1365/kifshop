"use client";

import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShieldCheck, ShoppingBag, Trash2, Truck } from "lucide-react";
import { formatPrice, freeShippingThreshold } from "@/lib/utils";
import { useCart } from "./cart-context";

export function CartView() {
  const { items, setQty, remove, subtotal, shipping, total, count } = useCart();

  if (!items.length) {
    return (
      <div className="rounded-3xl border border-sand/12 bg-onyx/40 p-12 text-center">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-sand/15 text-gold">
          <ShoppingBag size={28} />
        </span>
        <h2 className="mt-5 text-xl font-bold">سبد خرید شما خالی است</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-7 text-cream/50">
          کیف‌های دست‌ساز آتلیه را ببینید یا با آزمون ۶۰ ثانیه‌ای، کیف مناسب خودتان را پیدا کنید.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="btn btn-gold">
            دیدن کیف‌ها
          </Link>
          <Link href="/buying-guide" className="btn btn-outline">
            راهنمای خرید
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={`${item.slug}-${item.color ?? ""}`}
            className="flex flex-col gap-4 rounded-2xl border border-sand/12 bg-onyx/40 p-4 sm:flex-row"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.name}
              className="h-32 w-full rounded-xl object-cover sm:w-28"
            />
            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Link href={`/shop/${item.slug}`} className="text-sm font-bold hover:text-goldsoft">
                    {item.name}
                  </Link>
                  {item.color && (
                    <p className="mt-1 text-[0.68rem] text-cream/40">رنگ: {item.color}</p>
                  )}
                  <p className="mt-1 text-[0.68rem] text-cream/40">{formatPrice(item.price)} / عدد</p>
                </div>
                <button
                  onClick={() => remove(item.slug, item.color)}
                  className="text-cream/35 transition-colors hover:text-clay"
                  aria-label={`حذف ${item.name}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="mt-auto flex items-center justify-between pt-3">
                <div className="flex items-center gap-3 rounded-full border border-sand/20 px-3 py-1.5">
                  <button
                    onClick={() => setQty(item.slug, item.qty + 1, item.color)}
                    aria-label="افزایش تعداد"
                    className="text-cream/70 hover:text-gold"
                  >
                    <Plus size={14} />
                  </button>
                  <span className="min-w-5 text-center text-xs">{item.qty}</span>
                  <button
                    onClick={() => setQty(item.slug, item.qty - 1, item.color)}
                    aria-label="کاهش تعداد"
                    className="text-cream/70 hover:text-gold"
                  >
                    <Minus size={14} />
                  </button>
                </div>
                <p className="text-sm font-bold text-goldsoft">{formatPrice(item.qty * item.price)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <aside className="h-fit rounded-3xl border border-sand/12 bg-onyx/50 p-5 lg:sticky lg:top-28">
        <h2 className="text-lg font-bold">خلاصه سفارش</h2>
        <p className="mt-1 text-[0.68rem] text-cream/40">تعداد کالا: {count} عدد</p>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between text-cream/60">
            <dt>جمع کالاها</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between text-cream/60">
            <dt>هزینه ارسال</dt>
            <dd className={shipping === 0 ? "text-sage" : ""}>
              {shipping === 0 ? "رایگان" : formatPrice(shipping)}
            </dd>
          </div>
          <div className="flex justify-between border-t border-sand/10 pt-3 text-base font-bold">
            <dt>قابل پرداخت</dt>
            <dd className="text-goldsoft">{formatPrice(total)}</dd>
          </div>
        </dl>

        {subtotal < freeShippingThreshold && (
          <p className="mt-3 rounded-xl border border-gold/20 bg-gold/[0.05] p-3 text-[0.68rem] leading-6 text-cream/55">
            {formatPrice(freeShippingThreshold - subtotal)} تا ارسال رایگان باقی مانده است.
          </p>
        )}

        <Link href="/checkout" className="btn btn-gold mt-4 w-full">
          ادامه و تکمیل سفارش
          <ArrowLeft size={16} />
        </Link>
        <Link href="/shop" className="mt-2 block text-center text-[0.7rem] text-cream/40 hover:text-gold">
          ادامه خرید
        </Link>

        <ul className="mt-5 space-y-2 border-t border-sand/10 pt-4 text-[0.68rem] text-cream/50">
          <li className="flex items-center gap-2">
            <ShieldCheck size={13} className="text-gold" /> گارانتی ۵ ساله دوخت و یراق
          </li>
          <li className="flex items-center gap-2">
            <Truck size={13} className="text-gold" /> ارسال بیمه‌شده با کد رهگیری
          </li>
        </ul>
      </aside>
    </div>
  );
}
