"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, MousePointerClick, Pause, Play } from "lucide-react";
import type { Product } from "@/db/schema";
import { formatCompactPrice } from "@/lib/utils";

export function HeroStage({ products }: { products: Product[] }) {
  const items = products.slice(0, 6);
  const count = items.length || 1;
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const rotation = useMotionValue(-12);
  const smooth = useSpring(rotation, { stiffness: 70, damping: 22, mass: 0.6 });
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 90, damping: 18 });
  const springTiltY = useSpring(tiltY, { stiffness: 90, damping: 18 });
  const dragging = useRef(false);
  const lastX = useRef(0);

  useAnimationFrame((_, delta) => {
    if (paused || reduce || dragging.current) return;
    rotation.set(rotation.get() + delta * 0.0075);
  });

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    if (dragging.current) {
      const delta = event.clientX - lastX.current;
      lastX.current = event.clientX;
      rotation.set(rotation.get() + delta * 0.35);
      return;
    }
    tiltY.set(((event.clientX - rect.left) / rect.width - 0.5) * 16);
    tiltX.set(-(((event.clientY - rect.top) / rect.height - 0.5) * 12));
  };

  const step = (direction: number) => {
    animate(rotation, rotation.get() + (360 / count) * direction, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    });
  };

  const ringRotation = useTransform(smooth, (value) => `rotateY(${value}deg)`);
  const [active, setActive] = useState(0);
  useMotionValueEvent(smooth, "change", (value) => {
    const normalized = ((Math.round(value / (360 / count)) % count) + count) % count;
    setActive(normalized);
  });

  return (
    <div className="relative">
      <div
        className="perspective relative h-[26rem] select-none sm:h-[30rem] lg:h-[34rem]"
        onPointerMove={onPointerMove}
        onPointerDown={(event) => {
          dragging.current = true;
          lastX.current = event.clientX;
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerLeave={() => {
          dragging.current = false;
          tiltX.set(0);
          tiltY.set(0);
        }}
        style={{ touchAction: "pan-y" }}
        role="group"
        aria-label="نمایش سه‌بعدی کیف‌های منتخب کیف‌شاپ"
      >
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl"
        />
        <motion.div
          className="preserve-3d absolute inset-0"
          style={{ rotateX: springTiltX, rotateY: springTiltY }}
        >
          <motion.div
            className="preserve-3d absolute left-1/2 top-1/2 h-0 w-0"
            style={{ transform: ringRotation, ["--ring-radius" as string]: "clamp(9.5rem, 26vw, 17rem)" }}
          >
            {items.map((product, index) => (
              <div
                key={product.slug}
                className="ring-3d-item"
                style={{
                  transform: `translate(-50%, -50%) rotateY(${(360 / count) * index}deg) translateZ(var(--ring-radius))`,
                }}
              >
                <Link
                  href={`/shop/${product.slug}`}
                  className="group block w-[clamp(8.5rem,22vw,13rem)]"
                  draggable={false}
                >
                  <div className="relative overflow-hidden rounded-2xl border border-sand/20 bg-onyx shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)] transition-colors duration-500 group-hover:border-gold/60">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      draggable={false}
                      className="aspect-[3/4] w-full object-cover opacity-95 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/60 to-transparent p-2.5">
                      <p className="truncate text-[0.68rem] font-semibold text-cream">{product.name}</p>
                      <p className="text-[0.6rem] text-goldsoft">
                        {formatCompactPrice(product.price)} تومان
                      </p>
                    </div>
                    <span className="absolute right-2 top-2 rounded-full bg-ink/70 px-2 py-0.5 font-latin text-[0.55rem] tracking-widest text-gold backdrop-blur">
                      0{index + 1}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div
          aria-hidden
          className="pointer-events-none absolute bottom-6 left-1/2 h-16 w-[70%] -translate-x-1/2 rounded-[50%] bg-gradient-to-b from-gold/20 to-transparent blur-2xl"
        />

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2">
          <button
            onClick={() => step(-1)}
            aria-label="چرخش به راست"
            className="grid h-9 w-9 place-items-center rounded-full border border-sand/20 bg-ink/60 text-cream/70 backdrop-blur transition-colors hover:border-gold hover:text-gold"
          >
            <ArrowRight size={15} />
          </button>
          <button
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? "پخش چرخش" : "توقف چرخش"}
            className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 bg-ink/70 text-gold backdrop-blur transition-colors hover:bg-gold hover:text-ink"
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
          <button
            onClick={() => step(1)}
            aria-label="چرخش به چپ"
            className="grid h-9 w-9 place-items-center rounded-full border border-sand/20 bg-ink/60 text-cream/70 backdrop-blur transition-colors hover:border-gold hover:text-gold"
          >
            <ArrowLeft size={15} />
          </button>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between gap-3 border-t border-sand/10 pt-4 text-[0.66rem] text-cream/45">
        <span className="flex items-center gap-1.5">
          <MousePointerClick size={13} className="text-gold" />
          با درگ کردن یا دکمه‌ها، کیف‌ها را در فضا بچرخانید
        </span>
        <span className="font-latin tracking-[0.2em] text-gold/60">
          {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
