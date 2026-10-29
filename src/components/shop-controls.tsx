"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { categories } from "@/lib/catalog";
import { cn, faNum } from "@/lib/utils";

export function ShopControls({ total }: { total: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const activeCategory = searchParams.get("category") ?? "";
  const activeSort = searchParams.get("sort") ?? "featured";
  const activeQuery = searchParams.get("q") ?? "";

  const update = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    const query = params.toString();
    startTransition(() => {
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    });
  };

  const hasFilters = Boolean(activeCategory || activeQuery || (activeSort && activeSort !== "featured"));

  return (
    <div className={cn("transition-opacity", pending && "opacity-60")}>
      <div className="flex flex-col gap-4 rounded-2xl border border-sand/12 bg-onyx/40 p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => update("category", "")}
            className={cn(
              "rounded-full border px-4 py-2 text-xs transition-colors",
              !activeCategory
                ? "border-gold bg-gold text-ink"
                : "border-sand/20 text-cream/65 hover:border-gold/60 hover:text-goldsoft",
            )}
          >
            همه
          </button>
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => update("category", category.key)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs transition-colors",
                activeCategory === category.key
                  ? "border-gold bg-gold text-ink"
                  : "border-sand/20 text-cream/65 hover:border-gold/60 hover:text-goldsoft",
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const form = new FormData(event.currentTarget);
              update("q", String(form.get("q") ?? ""));
            }}
            className="relative"
          >
            <input
              name="q"
              defaultValue={activeQuery}
              placeholder="جست‌وجو در کیف‌ها"
              aria-label="جست‌وجو در کیف‌ها"
              className="field h-10 w-full pr-9 md:w-48"
            />
            <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/35" />
            <button type="submit" className="sr-only">
              جست‌وجو
            </button>
          </form>
          <label className="flex items-center gap-2 rounded-full border border-sand/20 px-3 py-2 text-xs text-cream/60">
            <SlidersHorizontal size={13} className="text-gold" />
            <select
              value={activeSort}
              onChange={(event) => update("sort", event.target.value)}
              aria-label="ترتیب نمایش"
              className="bg-transparent text-xs text-cream/80 outline-none"
            >
              <option value="featured" className="bg-coal">پیشنهادی آتلیه</option>
              <option value="new" className="bg-coal">جدیدترین</option>
              <option value="price-asc" className="bg-coal">ارزان‌ترین</option>
              <option value="price-desc" className="bg-coal">گران‌ترین</option>
              <option value="rating" className="bg-coal">بیشترین امتیاز</option>
            </select>
          </label>
          {hasFilters && (
            <button
              onClick={() => startTransition(() => router.push(pathname, { scroll: false }))}
              className="flex items-center gap-1 rounded-full border border-clay/40 px-3 py-2 text-xs text-clay transition-colors hover:bg-clay/10"
            >
              <X size={12} />
              حذف فیلترها
            </button>
          )}
        </div>
      </div>
      <p className="mt-3 text-[0.7rem] text-cream/40">
        {faNum(total)} کیف موجود {activeCategory ? `در دسته‌ی ${categories.find((item) => item.key === activeCategory)?.label ?? ""}` : "در آتلیه کیف‌شاپ"}
      </p>
    </div>
  );
}
