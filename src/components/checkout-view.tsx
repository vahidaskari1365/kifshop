"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Check, ShieldCheck } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCart } from "./cart-context";

type Result = { code: string; total: number } | null;

export function CheckoutView() {
  const { items, subtotal, shipping, total, clear } = useCart();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [result, setResult] = useState<Result>(null);
  const [error, setError] = useState("");

  if (result) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-sage/40 bg-sage/[0.08] p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sage/20 text-sage">
          <Check size={26} />
        </span>
        <h2 className="mt-5 text-2xl font-extrabold">سفارش شما ثبت شد</h2>
        <p className="mt-2 text-sm leading-7 text-cream/60">
          کد پیگیری سفارش: <span className="font-latin text-goldsoft">{result.code}</span>
          <br />
          مبلغ کل: {formatPrice(result.total)} (پرداخت در محل یا هماهنگی تلفنی)
        </p>
        <p className="mt-3 text-xs leading-6 text-cream/45">
          کارشناس آتلیه در ساعات کاری برای تأیید رنگ و زمان ارسال تماس می‌گیرد. رسید سفارش به شماره
          شما پیامک می‌شود.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="btn btn-gold">
            ادامه خرید
          </Link>
          <Link href="/" className="btn btn-outline">
            صفحه اصلی
          </Link>
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="rounded-3xl border border-sand/12 bg-onyx/40 p-12 text-center">
        <h2 className="text-xl font-bold">برای تکمیل سفارش، سبد خرید نباید خالی باشد</h2>
        <p className="mt-2 text-sm text-cream/50">کیف‌های آتلیه را ببینید و انتخاب کنید.</p>
        <Link href="/shop" className="btn btn-gold mt-6">
          دیدن کیف‌ها
        </Link>
      </div>
    );
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = {
      customerName: String(form.get("name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      city: String(form.get("city") ?? ""),
      address: String(form.get("address") ?? ""),
      note: String(form.get("note") ?? ""),
      items,
    };
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { ok?: boolean; code?: string; total?: number; error?: string };
      if (!response.ok || !data.ok || !data.code) throw new Error(data.error || "خطا در ثبت سفارش");
      setResult({ code: data.code, total: data.total ?? total });
      clear();
    } catch (submitError) {
      setStatus("error");
      setError(submitError instanceof Error ? submitError.message : "خطا در ثبت سفارش");
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <form onSubmit={submit} className="rounded-3xl border border-sand/12 bg-onyx/40 p-6 md:p-8">
        <h2 className="text-xl font-bold">اطلاعات ارسال</h2>
        <p className="mt-1 text-xs text-cream/45">
          سفارش با تماس کارشناس تأیید و سپس ارسال می‌شود. پرداخت درگاه بانکی یا در محل.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="checkout-name">
              نام و نام خانوادگی *
            </label>
            <input id="checkout-name" name="name" required className="field" placeholder="نام گیرنده" />
          </div>
          <div>
            <label className="label" htmlFor="checkout-phone">
              شماره تماس *
            </label>
            <input
              id="checkout-phone"
              name="phone"
              required
              inputMode="tel"
              className="field"
              placeholder="۰۹۱۲..."
            />
          </div>
          <div>
            <label className="label" htmlFor="checkout-city">
              شهر *
            </label>
            <input id="checkout-city" name="city" required className="field" placeholder="تهران" />
          </div>
          <div>
            <label className="label" htmlFor="checkout-postal">
              کد پستی
            </label>
            <input id="checkout-postal" name="postal" className="field" placeholder="اختیاری" />
          </div>
        </div>
        <div className="mt-4">
          <label className="label" htmlFor="checkout-address">
            نشانی کامل *
          </label>
          <textarea
            id="checkout-address"
            name="address"
            required
            rows={3}
            className="field resize-none"
            placeholder="خیابان، کوچه، پلاک، واحد"
          />
        </div>
        <div className="mt-4">
          <label className="label" htmlFor="checkout-note">
            توضیح سفارش
          </label>
          <textarea
            id="checkout-note"
            name="note"
            rows={2}
            className="field resize-none"
            placeholder="مثلاً: تماس قبل از ارسال، بسته‌بندی هدیه…"
          />
        </div>

        <div className="mt-5 flex items-start gap-2 rounded-2xl border border-gold/20 bg-gold/[0.05] p-4 text-[0.7rem] leading-6 text-cream/55">
          <ShieldCheck size={15} className="mt-0.5 shrink-0 text-gold" />
          گارانتی ۵ ساله، تعویض ۷ روزه و بسته‌بندی ضدضربه برای همه سفارش‌ها. اطلاعات شما فقط برای
          ارسال سفارش استفاده می‌شود.
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn btn-gold mt-5 w-full disabled:opacity-60"
        >
          {status === "loading" ? "در حال ثبت سفارش…" : "ثبت سفارش"}
          <ArrowLeft size={16} />
        </button>
        {status === "error" && <p className="mt-2 text-xs text-clay">{error}</p>}
      </form>

      <aside className="h-fit rounded-3xl border border-sand/12 bg-onyx/50 p-5 lg:sticky lg:top-28">
        <h2 className="text-lg font-bold">سفارش شما</h2>
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li key={`${item.slug}-${item.color ?? ""}`} className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.name} className="h-14 w-12 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="text-xs font-semibold">{item.name}</p>
                <p className="text-[0.65rem] text-cream/40">
                  {item.qty} × {item.color ?? "—"}
                </p>
              </div>
              <p className="text-[0.68rem] text-goldsoft">{formatPrice(item.price * item.qty)}</p>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-2 border-t border-sand/10 pt-4 text-xs">
          <div className="flex justify-between text-cream/55">
            <dt>جمع کالاها</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between text-cream/55">
            <dt>ارسال</dt>
            <dd>{shipping === 0 ? "رایگان" : formatPrice(shipping)}</dd>
          </div>
          <div className="flex justify-between border-t border-sand/10 pt-2 text-sm font-bold">
            <dt>قابل پرداخت</dt>
            <dd className="text-goldsoft">{formatPrice(total)}</dd>
          </div>
        </dl>
        <Link href="/cart" className="mt-4 block text-center text-[0.68rem] text-cream/40 hover:text-gold">
          ویرایش سبد خرید
        </Link>
      </aside>
    </div>
  );
}
