import Link from "next/link";
import { notFound } from "next/navigation";
import { PostForm } from "@/components/admin/post-form";
import { requireAdmin } from "@/lib/admin-auth";
import { adminPostById } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminPostEditPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const post = await adminPostById(Number(id));
  if (!post) notFound();

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow">EDIT ARTICLE</p>
          <h1 className="mt-2 text-2xl font-extrabold">{post.title}</h1>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/journal/${post.slug}`}
            target="_blank"
            className="btn btn-outline !py-2 !text-[0.68rem]"
          >
            مشاهده در سایت
          </Link>
          <Link href="/admin/posts" className="btn btn-dark !py-2 !text-[0.68rem]">
            بازگشت
          </Link>
        </div>
      </div>
      <PostForm post={post} />
    </div>
  );
}
