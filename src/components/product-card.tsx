"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/db/schema";
import { categoryLabel } from "@/lib/catalog";
import { cn, discountPercent, faNum, formatPrice } from "@/lib/utils";
import { useCart } from "./cart-context";
import { useTilt } from "./motion";

export function ProductCard({
  product,
  index = 0,
  className,
}: {
  product: Product;
  index?: number;
  className?: string;
}) {
  const { add } = useCart();
  const { rotateX, rotateY, onPointerMove, onPointerLeave } = useTilt(9);
  const discount = discountPercent(product.price, product.compareAtPrice);
  const secondImage = product.images[1] ?? product.images[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={cn("group relative", className)}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="relative overflow-hidden rounded-[1.6rem] border border-sand/12 bg-gradient-to-b from-onyx to-coal"
      >
        <Link href={`/shop/${product.slug}`} className="block">
          <div className="relative aspect-[4/5] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.images[0]}
              alt={`${product.name} — ${product.material}`}
              loading={index < 3 ? "eager" : "lazy"}
              decoding="async"
              className="zoom-img absolute inset-0 h-full w-full object-cover"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={secondImage}
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/5 to-transparent" />

            <div className="absolute right-3 top-3 flex flex-col items-start gap-2">
              {product.badge && (
                <span className="rounded-full border border-gold/40 bg-ink/70 px-3 py-1 text-[0.62rem] text-goldsoft backdrop-blur">
                  {product.badge}
                </span>
              )}
              {discount && (
                <span className="rounded-full bg-clay px-2.5 py-1 text-[0.62rem] font-bold text-cream">
                  {faNum(discount)}٪ تخفیف
                </span>
              )}
            </div>

            <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-ink/70 px-2.5 py-1 text-[0.62rem] backdrop-blur">
              <Star size={11} className="fill-gold text-gold" />
              <span>{faNum(product.rating)}</span>
              <span className="text-cream/40">({faNum(product.reviewsCount)})</span>
            </div>
          </div>
        </Link>

        <div className="p-4">
          <p className="text-[0.65rem] tracking-wide text-gold/70">{categoryLabel(product.category)}</p>
          <h3 className="mt-1 text-[0.98rem] font-bold leading-6">
            <Link href={`/shop/${product.slug}`} className="transition-colors hover:text-goldsoft">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 line-clamp-1 text-[0.7rem] text-cream/40">{product.subtitle}</p>

          <div className="mt-3 flex items-end justify-between gap-2">
            <div>
              {product.compareAtPrice && (
                <p className="text-[0.65rem] text-cream/35 line-through">
                  {formatPrice(product.compareAtPrice)}
                </p>
              )}
              <p className="text-sm font-bold text-goldsoft">{formatPrice(product.price)}</p>
            </div>
            <div className="flex items-center gap-1.5">
              {product.colors.slice(0, 3).map((color) => (
                <span
                  key={color.hex}
                  title={color.name}
                  className="h-3 w-3 rounded-full border border-cream/25"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() =>
              add({
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.images[0],
                color: product.colors[0]?.name,
              })
            }
            className="mt-3 w-full rounded-full border border-sand/20 py-2 text-xs font-medium text-cream/80 transition-all hover:border-gold hover:bg-gold hover:text-ink"
          >
            افزودن سریع به سبد
          </button>
        </div>
      </motion.div>
    </motion.article>
  );
}
