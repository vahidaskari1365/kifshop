"use client";

import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error("failed");
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="flex items-center gap-2 rounded-full border border-sage/40 bg-sage/10 px-4 py-3 text-sm text-cream">
        <Check size={16} className="text-sage" />
        ثبت شد؛ خبرنامه‌ی ماهانه‌ی کیف‌شاپ فعال شد.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex w-full flex-col gap-2 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="ایمیل شما"
        aria-label="ایمیل برای عضویت در خبرنامه"
        className="field flex-1"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn btn-gold whitespace-nowrap disabled:opacity-60"
      >
        {status === "loading" ? "در حال ثبت…" : "عضویت"}
        <ArrowLeft size={15} />
      </button>
      {status === "error" && (
        <span className="text-xs text-clay">ثبت نشد؛ دوباره تلاش کنید.</span>
      )}
      {compact && status === "idle" && (
        <span className="sr-only">خبرنامه ماهانه کیف‌شاپ</span>
      )}
    </form>
  );
}
