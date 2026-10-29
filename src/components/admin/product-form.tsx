import { saveProductAction } from "@/app/admin/actions";
import type { Collection, Product } from "@/db/schema";
import { categories } from "@/lib/catalog";

const fieldClass = "field";

export function ProductForm({
  product,
  collections,
}: {
  product?: Product | null;
  collections: Collection[];
}) {
  const colorsValue = product?.colors.map((color) => `${color.name}:${color.hex}`).join("\n") ?? "";

  return (
    <form action={saveProductAction} className="rounded-2xl border border-sand/10 bg-onyx/40 p-5">
      <h2 className="text-sm font-bold">{product ? `ویرایش: ${product.name}` : "افزودن محصول جدید"}</h2>
      <p className="mt-1 text-[0.65rem] text-cream/35">
        فیلدهای ستاره‌دار الزامی است. تصاویر و رنگ‌ها هر کدام در یک خط جداگانه وارد شوند.
      </p>

      {product && <input type="hidden" name="id" value={product.id} />}

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div>
          <label className="label">نام محصول *</label>
          <input name="name" required defaultValue={product?.name} className={fieldClass} />
        </div>
        <div>
          <label className="label">اسلاگ (آدرس) *</label>
          <input
            name="slug"
            required
            defaultValue={product?.slug}
            className={fieldClass}
            placeholder="kif-dasti-ariana"
            dir="ltr"
          />
        </div>
        <div>
          <label className="label">زیرعنوان</label>
          <input name="subtitle" defaultValue={product?.subtitle} className={fieldClass} />
        </div>
        <div>
          <label className="label">دسته‌بندی</label>
          <select name="category" defaultValue={product?.category ?? "handbag"} className={fieldClass}>
            {categories.map((category) => (
              <option key={category.key} value={category.key} className="bg-coal">
                {category.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">قیمت (تومان) *</label>
          <input name="price" type="number" required defaultValue={product?.price} className={fieldClass} />
        </div>
        <div>
          <label className="label">قیمت پیش از تخفیف</label>
          <input
            name="compareAtPrice"
            type="number"
            defaultValue={product?.compareAtPrice ?? ""}
            className={fieldClass}
          />
        </div>
        <div>
          <label className="label">کالکشن</label>
          <select name="collectionSlug" defaultValue={product?.collectionSlug ?? ""} className={fieldClass}>
            <option value="" className="bg-coal">
              بدون کالکشن
            </option>
            {collections.map((collection) => (
              <option key={collection.slug} value={collection.slug} className="bg-coal">
                {collection.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">برچسب</label>
          <input name="badge" defaultValue={product?.badge ?? ""} className={fieldClass} placeholder="پرفروش‌ترین" />
        </div>
        <div>
          <label className="label">جنس</label>
          <input name="material" defaultValue={product?.material} className={fieldClass} />
        </div>
        <div>
          <label className="label">ابعاد</label>
          <input name="dimensions" defaultValue={product?.dimensions} className={fieldClass} placeholder="۳۰ × ۲۲ × ۱۲ سانتی‌متر" />
        </div>
        <div>
          <label className="label">وزن (گرم)</label>
          <input name="weight" type="number" defaultValue={product?.weight ?? 0} className={fieldClass} />
        </div>
        <div>
          <label className="label">موجودی</label>
          <input name="stock" type="number" defaultValue={product?.stock ?? 0} className={fieldClass} />
        </div>
        <div>
          <label className="label">امتیاز (۰ تا ۵)</label>
          <input name="rating" type="number" step="0.1" defaultValue={product?.rating ?? 5} className={fieldClass} />
        </div>
        <div>
          <label className="label">تعداد نظرات</label>
          <input name="reviewsCount" type="number" defaultValue={product?.reviewsCount ?? 0} className={fieldClass} />
        </div>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div>
          <label className="label">توضیحات محصول</label>
          <textarea name="description" rows={4} defaultValue={product?.description} className={`${fieldClass} resize-none`} />
        </div>
        <div>
          <label className="label">داستان ساخت</label>
          <textarea name="story" rows={4} defaultValue={product?.story} className={`${fieldClass} resize-none`} />
        </div>
        <div>
          <label className="label">تصاویر (هر خط یک URL)</label>
          <textarea
            name="images"
            rows={4}
            defaultValue={product?.images.join("\n")}
            className={`${fieldClass} resize-none`}
            dir="ltr"
            placeholder="https://…"
          />
        </div>
        <div>
          <label className="label">رنگ‌ها (نام:کد رنگ در هر خط)</label>
          <textarea
            name="colors"
            rows={4}
            defaultValue={colorsValue}
            className={`${fieldClass} resize-none`}
            placeholder={"کونьяک:#8a4b2a\nاسپرسو:#3a2418"}
          />
        </div>
        <div>
          <label className="label">عنوان سئو</label>
          <input name="seoTitle" defaultValue={product?.seoTitle} className={fieldClass} />
        </div>
        <div>
          <label className="label">توضیح متا (سئو)</label>
          <textarea
            name="seoDescription"
            rows={3}
            defaultValue={product?.seoDescription}
            className={`${fieldClass} resize-none`}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-cream/60">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="featured" defaultChecked={product?.featured} className="accent-[#c9a96a]" />
          نمایش در منتخب صفحه اصلی
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked={product?.isActive ?? true}
            className="accent-[#c9a96a]"
          />
          فعال و قابل خرید
        </label>
      </div>

      <button type="submit" className="btn btn-gold mt-4 !py-2.5 !text-xs">
        ذخیره محصول
      </button>
    </form>
  );
}
