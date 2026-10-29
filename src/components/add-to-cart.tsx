"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import type { ColorOption, Product } from "@/db/schema";
import { cn, faNum } from "@/lib/utils";
import { useCart } from "./cart-context";

export function AddToCart({ product }: { product: Pick<Product, "slug" | "name" | "price" | "images" | "colors" | "stock"> }) {
  const { add } = useCart();
  const router = useRouter();
  const [color, setColor] = useState<ColorOption>(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const line = {
    slug: product.slug,
    name: product.name,
    price: product.price,
    image: product.images[0],
    color: color?.name,
  };

  const handleAdd = () => {
    add(line, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div>
      {product.colors.length > 0 && (
        <div>
          <p className="label !mb-2">
            رنگ: <span className="text-cream/80">{color?.name}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((option) => (
              <button
                key={option.hex}
                onClick={() => setColor(option)}
                aria-pressed={color?.hex === option.hex}
                aria-label={`رنگ ${option.name}`}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-3 py-2 text-[0.68rem] transition-colors",
                  color?.hex === option.hex
                    ? "border-gold bg-gold/10 text-goldsoft"
                    : "border-sand/20 text-cream/60 hover:border-gold/50",
                )}
              >
                <span
                  className="h-3.5 w-3.5 rounded-full border border-cream/25"
                  style={{ backgroundColor: option.hex }}
                />
                {option.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-3 rounded-full border border-sand/20 px-3 py-2">
          <button
            onClick={() => setQty((value) => Math.min(value + 1, 10))}
            aria-label="افزایش تعداد"
            className="text-cream/70 hover:text-gold"
          >
            <Plus size={14} />
          </button>
          <span className="min-w-5 text-center text-sm">{faNum(qty)}</span>
          <button
            onClick={() => setQty((value) => Math.max(1, value - 1))}
            aria-label="کاهش تعداد"
            className="text-cream/70 hover:text-gold"
          >
            <Minus size={14} />
          </button>
        </div>
        <button onClick={handleAdd} className="btn btn-gold flex-1 !py-3">
          {added ? (
            <>
              <Check size={16} /> به سبد اضافه شد
            </>
          ) : (
            <>
              <ShoppingBag size={16} /> افزودن به سبد خرید
            </>
          )}
        </button>
      </div>

      <button
        onClick={() => {
          add(line, qty);
          router.push("/checkout");
        }}
        className="btn btn-outline mt-2 w-full !py-2.5 !text-xs"
      >
        خرید سریع و پرداخت
      </button>

      <p className="mt-3 text-[0.68rem] text-cream/40">
        {product.stock > 5
          ? `موجود در انبار (${faNum(product.stock)} عدد)`
          : product.stock > 0
            ? `فقط ${faNum(product.stock)} عدد باقی مانده`
            : "پیش‌سفارش؛ آماده‌سازی ۷ روز کاری"}
      </p>
    </div>
  );
}
