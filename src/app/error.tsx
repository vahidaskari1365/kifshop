"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="shell flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">SOMETHING WENT WRONG</p>
      <h1 className="display mt-4 text-3xl">خطایی رخ داد</h1>
      <p className="mt-3 max-w-md text-sm leading-7 text-cream/55">
        در دریافت اطلاعات مشکلی پیش آمد. دوباره تلاش کنید؛ اگر مشکل ادامه داشت با آتلیه تماس بگیرید.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button onClick={reset} className="btn btn-gold">
          تلاش دوباره
        </button>
        <Link href="/shop" className="btn btn-outline">
          فروشگاه
        </Link>
        <Link href="/contact" className="btn btn-outline">
          تماس با ما
        </Link>
      </div>
    </section>
  );
}
