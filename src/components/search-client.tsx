"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Product } from "@/db/schema";
import { categories } from "@/lib/catalog";
import { cn, faNum } from "@/lib/utils";
import { ProductCard } from "./product-card";

export function SearchClient({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(7_000_000);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return products.filter((product) => {
      const haystack = `${product.name} ${product.subtitle} ${product.description} ${product.material} ${product.colors
        .map((color) => color.name)
        .join(" ")}`.toLowerCase();
      return (
        (!needle || haystack.includes(needle)) &&
        (!category || product.category === category) &&
        product.price <= maxPrice
      );
    });
  }, [products, query, category, maxPrice]);

  return (
    <div>
      <div className="rounded-3xl border border-sand/12 bg-onyx/40 p-5">
        <div className="relative">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="نام کیف، رنگ یا جنس چرم را بنویسید…"
            aria-label="جست‌وجوی کیف"
            className="field h-12 pr-11 text-sm"
            autoFocus
          />
          <Search size={17} className="absolute right-4 top-1/2 -translate-y-1/2 text-gold" />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setCategory("")}
            className={cn(
              "rounded-full border px-3 py-1.5 text-[0.68rem] transition-colors",
              !category ? "border-gold bg-gold text-ink" : "border-sand/20 text-cream/60",
            )}
          >
            همه دسته‌ها
          </button>
          {categories.map((item) => (
            <button
              key={item.key}
              onClick={() => setCategory(item.key)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-[0.68rem] transition-colors",
                category === item.key
                  ? "border-gold bg-gold text-ink"
                  : "border-sand/20 text-cream/60 hover:border-gold/50",
              )}
            >
              {item.short}
            </button>
          ))}
        </div>

        <label className="mt-4 flex items-center gap-3 text-[0.68rem] text-cream/45">
          <SlidersHorizontal size={13} className="text-gold" />
          حداکثر قیمت:
          <input
            type="range"
            min={2_000_000}
            max={7_000_000}
            step={100_000}
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
            className="flex-1 accent-[#c9a96a]"
            aria-label="حداکثر قیمت"
          />
          <span className="font-latin whitespace-nowrap text-cream/70">
            {faNum(maxPrice / 1_000_000)} م
          </span>
        </label>
      </div>

      <p className="mt-4 text-xs text-cream/45">{faNum(results.length)} کیف پیدا شد</p>

      <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {results.map((product, index) => (
          <ProductCard key={product.slug} product={product} index={index} />
        ))}
      </div>

      {results.length === 0 && (
        <div className="mt-6 rounded-3xl border border-sand/12 bg-onyx/40 p-10 text-center">
          <p className="text-sm font-bold">کیفی با این مشخصات پیدا نشد.</p>
          <p className="mt-2 text-xs text-cream/45">
            نام را کوتاه‌تر کنید یا دسته را تغییر دهید. برای سفارش اختصاصی با آتلیه تماس بگیرید.
          </p>
        </div>
      )}
    </div>
  );
}
