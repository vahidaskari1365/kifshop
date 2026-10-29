import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { deleteProductAction } from "@/app/admin/actions";
import { ProductForm } from "@/components/admin/product-form";
import { requireAdmin } from "@/lib/admin-auth";
import { adminCollections, adminProducts } from "@/lib/queries";
import { categoryLabel } from "@/lib/catalog";
import { faNum, formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  await requireAdmin();
  const [{ saved, error }, products, collections] = await Promise.all([
    searchParams,
    adminProducts(),
    adminCollections(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">PRODUCTS</p>
          <h1 className="mt-2 text-2xl font-extrabold">مدیریت محصولات</h1>
          <p className="mt-1 text-xs text-cream/45">
            {faNum(products.length)} محصول ثبت شده · قیمت‌ها به تومان
          </p>
        </div>
        {saved && (
          <span className="rounded-full border border-sage/40 bg-sage/10 px-3 py-1.5 text-[0.68rem] text-sage">
            تغییرات با موفقیت ذخیره شد.
          </span>
        )}
        {error && (
          <span className="rounded-full border border-clay/40 bg-clay/10 px-3 py-1.5 text-[0.68rem] text-clay">
            نام و قیمت محصول الزامی است.
          </span>
        )}
      </div>

      <section className="overflow-hidden rounded-2xl border border-sand/10 bg-onyx/40">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[46rem] text-right text-xs">
            <thead className="bg-ink/60 text-cream/45">
              <tr>
                <th className="px-4 py-3 font-medium">محصول</th>
                <th className="px-4 py-3 font-medium">دسته</th>
                <th className="px-4 py-3 font-medium">قیمت</th>
                <th className="px-4 py-3 font-medium">موجودی</th>
                <th className="px-4 py-3 font-medium">وضعیت</th>
                <th className="px-4 py-3 font-medium">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/10 text-cream/65">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.images[0]}
                        alt=""
                        className="h-10 w-9 rounded-md object-cover"
                        loading="lazy"
                      />
                      <div>
                        <p className="font-semibold text-cream">{product.name}</p>
                        <p className="font-latin text-[0.62rem] text-cream/30">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{categoryLabel(product.category)}</td>
                  <td className="px-4 py-3">{formatPrice(product.price)}</td>
                  <td className={`px-4 py-3 ${product.stock <= 5 ? "text-clay" : ""}`}>
                    {faNum(product.stock)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[0.6rem] ${
                        product.isActive
                          ? "bg-sage/15 text-sage"
                          : "bg-cream/10 text-cream/45"
                      }`}
                    >
                      {product.isActive ? "فعال" : "غیرفعال"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="grid h-7 w-7 place-items-center rounded-md border border-sand/20 text-cream/60 hover:border-gold hover:text-gold"
                        aria-label={`ویرایش ${product.name}`}
                      >
                        <Pencil size={12} />
                      </Link>
                      <form action={deleteProductAction}>
                        <input type="hidden" name="id" value={product.id} />
                        <button
                          type="submit"
                          className="grid h-7 w-7 place-items-center rounded-md border border-clay/30 text-clay/70 hover:bg-clay/10 hover:text-clay"
                          aria-label={`حذف ${product.name}`}
                        >
                          <Trash2 size={12} />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-cream/40">
                    محصولی ثبت نشده است. از فرم پایین اولین محصول را اضافه کنید.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <ProductForm collections={collections} />
    </div>
  );
}
