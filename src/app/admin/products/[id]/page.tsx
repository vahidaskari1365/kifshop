import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { requireAdmin } from "@/lib/admin-auth";
import { adminCollections, adminProductById } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminProductEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const [product, collections] = await Promise.all([adminProductById(Number(id)), adminCollections()]);
  if (!product) notFound();

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="eyebrow">EDIT PRODUCT</p>
          <h1 className="mt-2 text-2xl font-extrabold">{product.name}</h1>
        </div>
        <div className="flex gap-2 text-[0.68rem]">
          <Link href={`/shop/${product.slug}`} target="_blank" className="btn btn-outline !py-2 !text-[0.68rem]">
            مشاهده در سایت
          </Link>
          <Link href="/admin/products" className="btn btn-dark !py-2 !text-[0.68rem]">
            بازگشت
          </Link>
        </div>
      </div>
      <ProductForm product={product} collections={collections} />
    </div>
  );
}
