import { Trash2 } from "lucide-react";
import { deleteFaqAction, saveFaqAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin-auth";
import { adminFaqs } from "@/lib/queries";
import { faNum } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminFaqsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  await requireAdmin();
  const [{ saved, error }, faqs] = await Promise.all([searchParams, adminFaqs()]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">AEO / FAQ</p>
          <h1 className="mt-2 text-2xl font-extrabold">پرسش‌های متداول</h1>
          <p className="mt-1 text-xs text-cream/45">
            {faNum(faqs.length)} پرسش · این پاسخ‌ها در داده‌ی ساختاریافته FAQPage منتشر می‌شوند.
          </p>
        </div>
        {saved && (
          <span className="rounded-full border border-sage/40 bg-sage/10 px-3 py-1.5 text-[0.68rem] text-sage">
            ذخیره شد.
          </span>
        )}
        {error && (
          <span className="rounded-full border border-clay/40 bg-clay/10 px-3 py-1.5 text-[0.68rem] text-clay">
            متن پرسش الزامی است.
          </span>
        )}
      </div>

      <form action={saveFaqAction} className="rounded-2xl border border-sand/10 bg-onyx/40 p-5">
        <h2 className="text-sm font-bold">افزودن پرسش جدید</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div>
            <label className="label">پرسش *</label>
            <input name="question" required className="field" />
          </div>
          <div>
            <label className="label">دسته</label>
            <input name="category" defaultValue="عمومی" className="field" />
          </div>
          <div className="md:col-span-2">
            <label className="label">پاسخ *</label>
            <textarea name="answer" required rows={3} className="field resize-none" />
          </div>
          <div>
            <label className="label">ترتیب نمایش</label>
            <input name="sortOrder" type="number" defaultValue={faqs.length + 1} className="field" />
          </div>
          <label className="flex items-end gap-2 pb-2 text-xs text-cream/60">
            <input type="checkbox" name="isPublished" defaultChecked className="accent-[#c9a96a]" />
            منتشر شود
          </label>
        </div>
        <button type="submit" className="btn btn-gold mt-3 !py-2.5 !text-xs">
          افزودن پرسش
        </button>
      </form>

      <div className="space-y-2">
        {faqs.map((faq) => (
          <details key={faq.id} className="rounded-2xl border border-sand/10 bg-onyx/40 p-4">
            <summary className="flex cursor-pointer items-center justify-between gap-3 text-xs text-cream/75">
              <span>{faq.question}</span>
              <span className="flex items-center gap-2">
                <span className="rounded-full border border-sand/20 px-2 py-0.5 text-[0.6rem] text-cream/40">
                  {faq.category}
                </span>
                <span className="text-[0.6rem] text-cream/30">#{faq.sortOrder}</span>
              </span>
            </summary>
            <form action={saveFaqAction} className="mt-3 grid gap-2 border-t border-sand/10 pt-3">
              <input type="hidden" name="id" value={faq.id} />
              <input name="question" defaultValue={faq.question} className="field" />
              <textarea name="answer" defaultValue={faq.answer} rows={3} className="field resize-none" />
              <div className="flex flex-wrap items-center gap-2">
                <input name="category" defaultValue={faq.category} className="field !w-40" />
                <input
                  name="sortOrder"
                  type="number"
                  defaultValue={faq.sortOrder}
                  className="field !w-24"
                />
                <label className="flex items-center gap-2 text-[0.68rem] text-cream/55">
                  <input
                    type="checkbox"
                    name="isPublished"
                    defaultChecked={faq.isPublished}
                    className="accent-[#c9a96a]"
                  />
                  منتشر شود
                </label>
                <button type="submit" className="btn btn-outline !px-3 !py-1.5 !text-[0.65rem]">
                  ذخیره
                </button>
              </div>
            </form>
            <form action={deleteFaqAction} className="mt-2">
              <input type="hidden" name="id" value={faq.id} />
              <button
                type="submit"
                className="flex items-center gap-1 text-[0.62rem] text-clay/70 hover:text-clay"
              >
                <Trash2 size={11} />
                حذف پرسش
              </button>
            </form>
          </details>
        ))}
      </div>
    </div>
  );
}
