import type { Metadata } from "next";
import Link from "next/link";
import { Lock } from "lucide-react";
import { loginAction } from "@/app/admin/actions";
import { isAdmin } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ورود به پنل مدیریت",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdmin()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-sand/15 bg-onyx/60 p-8">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 text-gold">
            <Lock size={19} />
          </span>
          <p className="eyebrow mt-5">KIFSHOP CMS</p>
          <h1 className="mt-2 text-2xl font-extrabold">ورود به پنل مدیریت</h1>
          <p className="mt-2 text-xs leading-6 text-cream/45">
            برای مدیریت محصولات، کالکشن‌ها، مقالات و سفارش‌ها رمز مدیریت را وارد کنید.
          </p>

          <form action={loginAction} className="mt-6 space-y-4">
            <div>
              <label className="label" htmlFor="password">
                رمز مدیریت
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                className="field"
                placeholder="••••••••"
              />
            </div>
            {error && (
              <p className="rounded-xl border border-clay/40 bg-clay/10 px-3 py-2 text-xs text-clay">
                رمز وارد شده صحیح نیست.
              </p>
            )}
            <button type="submit" className="btn btn-gold w-full">
              ورود به پنل
            </button>
          </form>

          <p className="mt-5 rounded-xl border border-sand/10 bg-ink/40 p-3 text-[0.65rem] leading-6 text-cream/35">
            رمز پیش‌فرض این نسخه‌ی نمایشی: <span className="font-latin text-goldsoft">kifshop1405</span>
            <br />
            برای تغییر، متغیر محیطی <span className="font-latin">ADMIN_PASSWORD</span> را تنظیم کنید.
          </p>
        </div>
        <Link href="/" className="mt-5 block text-center text-xs text-cream/40 hover:text-gold">
          بازگشت به سایت
        </Link>
      </div>
    </div>
  );
}
