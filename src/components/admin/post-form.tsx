import { savePostAction } from "@/app/admin/actions";
import type { Post } from "@/db/schema";

export function PostForm({ post }: { post?: Post | null }) {
  const publishedAt = post ? new Date(post.publishedAt).toISOString().slice(0, 10) : "";

  return (
    <form action={savePostAction} className="rounded-2xl border border-sand/10 bg-onyx/40 p-5">
      <h2 className="text-sm font-bold">{post ? `ویرایش: ${post.title}` : "نوشتن مقاله جدید"}</h2>
      <p className="mt-1 text-[0.65rem] text-cream/35">
        برای ساختار محتوا از <span className="font-latin">##</span> برای تیتر،{" "}
        <span className="font-latin">&gt;</span> برای نقل‌قول و <span className="font-latin">-</span> برای
        فهرست استفاده کنید. بخش «پاسخ کوتاه» را در ابتدای متن قرار دهید.
      </p>

      {post && <input type="hidden" name="id" value={post.id} />}

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="label">عنوان مقاله *</label>
          <input name="title" required defaultValue={post?.title} className="field" />
        </div>
        <div>
          <label className="label">اسلاگ *</label>
          <input name="slug" required defaultValue={post?.slug} className="field" dir="ltr" />
        </div>
        <div>
          <label className="label">دسته</label>
          <input name="category" defaultValue={post?.category ?? "راهنما"} className="field" />
        </div>
        <div>
          <label className="label">نویسنده</label>
          <input name="author" defaultValue={post?.author ?? "تیم کیف‌شاپ"} className="field" />
        </div>
        <div>
          <label className="label">زمان مطالعه (دقیقه)</label>
          <input name="readMinutes" type="number" defaultValue={post?.readMinutes ?? 5} className="field" />
        </div>
        <div>
          <label className="label">تاریخ انتشار</label>
          <input name="publishedAt" type="date" defaultValue={publishedAt} className="field" dir="ltr" />
        </div>
        <div>
          <label className="label">تصویر کاور (URL)</label>
          <input name="cover" defaultValue={post?.cover} className="field" dir="ltr" />
        </div>
        <div className="md:col-span-2">
          <label className="label">خلاصه مقاله</label>
          <textarea name="excerpt" rows={2} defaultValue={post?.excerpt} className="field resize-none" />
        </div>
        <div className="md:col-span-2">
          <label className="label">متن مقاله *</label>
          <textarea name="content" rows={14} required defaultValue={post?.content} className="field resize-y" />
        </div>
        <div>
          <label className="label">عنوان سئو</label>
          <input name="seoTitle" defaultValue={post?.seoTitle} className="field" />
        </div>
        <div>
          <label className="label">توضیح متا</label>
          <input name="seoDescription" defaultValue={post?.seoDescription} className="field" />
        </div>
      </div>

      <label className="mt-4 flex items-center gap-2 text-xs text-cream/60">
        <input type="checkbox" name="isPublished" defaultChecked={post?.isPublished ?? true} className="accent-[#c9a96a]" />
        منتشر شود
      </label>

      <button type="submit" className="btn btn-gold mt-4 !py-2.5 !text-xs">
        ذخیره مقاله
      </button>
    </form>
  );
}
