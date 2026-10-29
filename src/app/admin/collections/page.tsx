import Link from "next/link";
import { saveCollectionAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin-auth";
import { adminCollections, adminProducts } from "@/lib/queries";
import { faNum } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminCollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  await requireAdmin();
  const [{ saved, error }, collections, products] = await Promise.all([
    searchParams,
    adminCollections(),
    adminProducts(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">COLLECTIONS</p>
          <h1 className="mt-2 text-2xl font-extrabold">کالکشن‌ها</h1>
          <p className="mt-1 text-xs text-cream/45">
            عنوان، تصویر و توضیح کالکشن‌ها را ویرایش کنید؛ صفحات کالکشن از همین داده‌ها ساخته می‌شوند.
          </p>
        </div>
        {saved && (
          <span className="rounded-full border border-sage/40 bg-sage/10 px-3 py-1.5 text-[0.68rem] text-sage">
            ذخیره شد.
          </span>
        )}
        {error && (
          <span className="rounded-full border border-clay/40 bg-clay/10 px-3 py-1.5 text-[0.68rem] text-clay">
            عنوان کالکشن الزامی است.
          </span>
        )}
      </div>

      <div className="space-y-3">
        {collections.map((collection) => {
          const count = products.filter((product) => product.collectionSlug === collection.slug).length;
          return (
            <section key={collection.id} className="rounded-2xl border border-sand/10 bg-onyx/40 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={collection.image}
                    alt=""
                    className="h-12 w-12 rounded-lg object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-sm font-bold text-cream">کالکشن {collection.title}</p>
                    <p className="font-latin text-[0.6rem] text-cream/35">
                      {collection.slug} · {faNum(count)} محصول
                    </p>
                  </div>
                </div>
                <Link
                  href={`/collections/${collection.slug}`}
                  target="_blank"
                  className="text-[0.65rem] text-goldsoft"
                >
                  مشاهده صفحه ←
                </Link>
              </div>

              <form action={saveCollectionAction} className="mt-4 grid gap-2 md:grid-cols-2">
                <input type="hidden" name="id" value={collection.id} />
                <input type="hidden" name="slug" value={collection.slug} />
                <div>
                  <label className="label">عنوان</label>
                  <input name="title" required defaultValue={collection.title} className="field" />
                </div>
                <div>
                  <label className="label">زیرعنوان</label>
                  <input name="subtitle" defaultValue={collection.subtitle} className="field" />
                </div>
                <div className="md:col-span-2">
                  <label className="label">توضیحات کالکشن</label>
                  <textarea
                    name="description"
                    rows={2}
                    defaultValue={collection.description}
                    className="field resize-none"
                  />
                </div>
                <div>
                  <label className="label">تصویر (URL)</label>
                  <input name="image" defaultValue={collection.image} className="field" dir="ltr" />
                </div>
                <div>
                  <label className="label">رنگ شاخص و ترتیب</label>
                  <div className="flex gap-2">
                    <input name="accent" defaultValue={collection.accent} className="field" dir="ltr" />
                    <input
                      name="sortOrder"
                      type="number"
                      defaultValue={collection.sortOrder}
                      className="field !w-24"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="btn btn-outline !px-3 !py-1.5 !text-[0.65rem]">
                    ذخیره کالکشن
                  </button>
                </div>
              </form>
            </section>
          );
        })}
      </div>
    </div>
  );
}
