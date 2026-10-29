"use client";

import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";

const subjects = [
  "مشاوره انتخاب کیف",
  "سفارش اختصاصی و حکاکی",
  "پیگیری سفارش",
  "گارانتی و تعمیر",
  "فروش عمده",
  "همکاری و رسانه",
];

export function InquiryForm({ variant = "contact" }: { variant?: "contact" | "wholesale" }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = new FormData(event.currentTarget);
    const payload: Record<string, string> = {};
    form.forEach((value, key) => {
      payload[key] = String(value);
    });
    if (variant === "wholesale") {
      payload.subject = "فروش عمده";
      payload.message = `درخواست عمده — شرکت: ${payload.company ?? "—"} · تعداد: ${payload.quantity ?? "—"} · توضیح: ${payload.message ?? ""}`;
    }
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("failed");
      setStatus("done");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-3xl border border-sage/40 bg-sage/10 p-8 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-sage/20 text-sage">
          <Check size={22} />
        </span>
        <h3 className="mt-4 text-lg font-bold">درخواست شما ثبت شد</h3>
        <p className="mt-2 text-sm leading-7 text-cream/60">
          کارشناس آتلیه کیف‌شاپ در ساعات کاری (شنبه تا پنجشنبه، ۱۰ تا ۱۹) با شما تماس می‌گیرد. شماره
          پیگیری از طریق پیامک ارسال می‌شود.
        </p>
        <button onClick={() => setStatus("idle")} className="btn btn-outline mt-5 !text-xs">
          ارسال درخواست دیگر
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="name">
            نام و نام خانوادگی *
          </label>
          <input id="name" name="name" required className="field" placeholder="نام شما" />
        </div>
        <div>
          <label className="label" htmlFor="phone">
            شماره تماس *
          </label>
          <input
            id="phone"
            name="phone"
            required
            inputMode="tel"
            className="field"
            placeholder="۰۹۱۲..."
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="email">
            ایمیل
          </label>
          <input id="email" name="email" type="email" className="field" placeholder="you@example.com" />
        </div>
        {variant === "contact" ? (
          <div>
            <label className="label" htmlFor="subject">
              موضوع
            </label>
            <select id="subject" name="subject" className="field" defaultValue={subjects[0]}>
              {subjects.map((subject) => (
                <option key={subject} value={subject} className="bg-coal">
                  {subject}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div>
            <label className="label" htmlFor="company">
              نام فروشگاه / شرکت
            </label>
            <input id="company" name="company" className="field" placeholder="نام کسب‌وکار" />
          </div>
        )}
      </div>
      {variant === "wholesale" && (
        <div>
          <label className="label" htmlFor="quantity">
            تعداد تقریبی سفارش
          </label>
          <input id="quantity" name="quantity" className="field" placeholder="مثلاً ۲۵ عدد" />
        </div>
      )}
      <div>
        <label className="label" htmlFor="message">
          پیام شما *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="field resize-none"
          placeholder={
            variant === "wholesale"
              ? "مدل‌های مورد نظر، رنگ و زمان تحویل را بنویسید."
              : "کاربرد کیف، سایز مورد نظر و سوال‌تان را بنویسید تا دقیق راهنمایی کنیم."
          }
        />
      </div>
      <button type="submit" disabled={status === "loading"} className="btn btn-gold w-full disabled:opacity-60">
        {status === "loading" ? "در حال ارسال…" : "ارسال درخواست"}
        <ArrowLeft size={16} />
      </button>
      {status === "error" && (
        <p className="text-xs text-clay">ارسال نشد؛ لطفاً دوباره تلاش کنید یا با ما تماس بگیرید.</p>
      )}
      <p className="text-[0.65rem] leading-6 text-cream/35">
        با ارسال این فرم، با تماس کارشناس کیف‌شاپ موافقت می‌کنید. اطلاعات شما برای تبلیغات شخص ثالث
        استفاده نمی‌شود. جزئیات در صفحه‌ی حریم خصوصی آمده است.
      </p>
    </form>
  );
}
