import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { deletePostAction } from "@/app/admin/actions";
import { PostForm } from "@/components/admin/post-form";
import { requireAdmin } from "@/lib/admin-auth";
import { adminPosts } from "@/lib/queries";
import { faNum, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  await requireAdmin();
  const [{ saved, error }, posts] = await Promise.all([searchParams, adminPosts()]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">JOURNAL</p>
          <h1 className="mt-2 text-2xl font-extrabold">مدیریت ژورنال</h1>
          <p className="mt-1 text-xs text-cream/45">{faNum(posts.length)} مقاله ثبت شده</p>
        </div>
        {saved && (
          <span className="rounded-full border border-sage/40 bg-sage/10 px-3 py-1.5 text-[0.68rem] text-sage">
            مقاله ذخیره شد.
          </span>
        )}
        {error && (
          <span className="rounded-full border border-clay/40 bg-clay/10 px-3 py-1.5 text-[0.68rem] text-clay">
            عنوان مقاله الزامی است.
          </span>
        )}
      </div>

      <section className="overflow-hidden rounded-2xl border border-sand/10 bg-onyx/40">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[38rem] text-right text-xs">
            <thead className="bg-ink/60 text-cream/45">
              <tr>
                <th className="px-4 py-3 font-medium">عنوان</th>
                <th className="px-4 py-3 font-medium">دسته</th>
                <th className="px-4 py-3 font-medium">تاریخ</th>
                <th className="px-4 py-3 font-medium">وضعیت</th>
                <th className="px-4 py-3 font-medium">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/10 text-cream/65">
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-cream">{post.title}</p>
                    <p className="font-latin text-[0.6rem] text-cream/30">{post.slug}</p>
                  </td>
                  <td className="px-4 py-3">{post.category}</td>
                  <td className="px-4 py-3">{formatDate(post.publishedAt)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[0.6rem] ${
                        post.isPublished ? "bg-sage/15 text-sage" : "bg-cream/10 text-cream/45"
                      }`}
                    >
                      {post.isPublished ? "منتشرشده" : "پیش‌نویس"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="grid h-7 w-7 place-items-center rounded-md border border-sand/20 text-cream/60 hover:border-gold hover:text-gold"
                        aria-label={`ویرایش ${post.title}`}
                      >
                        <Pencil size={12} />
                      </Link>
                      <form action={deletePostAction}>
                        <input type="hidden" name="id" value={post.id} />
                        <button
                          type="submit"
                          className="grid h-7 w-7 place-items-center rounded-md border border-clay/30 text-clay/70 hover:bg-clay/10"
                          aria-label={`حذف ${post.title}`}
                        >
                          <Trash2 size={12} />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-cream/40">
                    مقاله‌ای ثبت نشده است.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <PostForm />
    </div>
  );
}
