"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import { ZoomIn } from "lucide-react";

export function ProductGallery({
  images,
  name,
  badge,
}: {
  images: string[];
  name: string;
  badge?: string | null;
}) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), { stiffness: 110, damping: 18 });
  const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), { stiffness: 110, damping: 18 });
  const imageX = useTransform(px, [0, 1], ["-3%", "3%"]);
  const imageY = useTransform(py, [0, 1], ["-3%", "3%"]);

  return (
    <div>
      <div
        className="perspective relative"
        onPointerMove={(event) => {
          if (reduce) return;
          const rect = event.currentTarget.getBoundingClientRect();
          px.set((event.clientX - rect.left) / rect.width);
          py.set((event.clientY - rect.top) / rect.height);
        }}
        onPointerLeave={() => {
          px.set(0.5);
          py.set(0.5);
        }}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-sand/15 bg-onyx"
        >
          <motion.img
            key={images[active]}
            src={images[active]}
            alt={`${name} — تصویر ${active + 1}`}
            style={{ x: reduce ? 0 : imageX, y: reduce ? 0 : imageY, scale: 1.1 }}
            className="h-full w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
          {badge && (
            <span className="absolute right-4 top-4 rounded-full border border-gold/40 bg-ink/70 px-3 py-1 text-[0.65rem] text-goldsoft backdrop-blur">
              {badge}
            </span>
          )}
          <span className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-ink/60 px-3 py-1.5 text-[0.62rem] text-cream/60 backdrop-blur">
            <ZoomIn size={12} className="text-gold" />
            برای چرخش سه‌بعدی نشانگر را حرکت دهید
          </span>
        </motion.div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <button
            key={image + index}
            onClick={() => setActive(index)}
            aria-label={`تصویر ${index + 1} ${name}`}
            aria-pressed={active === index}
            className={`relative aspect-square overflow-hidden rounded-xl border transition-colors ${
              active === index ? "border-gold" : "border-sand/15 hover:border-gold/50"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="" loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
