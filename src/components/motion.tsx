"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  animate,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn, faNum } from "@/lib/utils";

/* ---------------- scroll progress ---------------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-right bg-gradient-to-l from-goldsoft via-gold to-clay"
    />
  );
}

/* ---------------- reveal ---------------- */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
  duration = 0.85,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- word-by-word headline ---------------- */
export function RevealWords({
  text,
  className,
  delay = 0,
  highlight = [],
}: {
  text: string;
  className?: string;
  delay?: number;
  highlight?: string[];
}) {
  const words = text.split(" ");
  return (
    <span className={cn("inline-block", className)}>
      {words.map((word, index) => {
        const clean = word.replace(/[،؛.]/g, "");
        const isHighlighted = highlight.some((item) => item === clean);
        return (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className={cn("inline-block", isHighlighted && "gold-text")}
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                delay: delay + index * 0.055,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
              {index < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

/* ---------------- marquee ---------------- */
export function Marquee({
  items,
  className,
  separator = "◆",
}: {
  items: string[];
  className?: string;
  separator?: string;
}) {
  const row = [...items, ...items];
  return (
    <div className={cn("overflow-hidden", className)}>
      <div className="marquee-track items-center gap-8">
        {row.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-8 whitespace-nowrap">
            <span className="text-xs tracking-[0.25em] md:text-sm">{item}</span>
            <span className="text-[0.5rem] text-gold">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- counter ---------------- */
export function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.9,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  const formatted = display.toLocaleString("fa-IR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/* ---------------- parallax ---------------- */
export function Parallax({
  children,
  distance = 60,
  className,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

/* ---------------- cinematic intro ---------------- */
export function CinematicIntro() {
  const [visible, setVisible] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("kifshop-intro") === "seen" || reduce) {
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("kifshop-intro", "seen");
    }, 2100);
    return () => clearTimeout(timer);
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <p className="eyebrow mb-4">ATELIER SINCE 2014</p>
            <h1 className="font-latin text-5xl tracking-[0.3em] text-cream md:text-7xl">KIFSHOP</h1>
            <p className="mt-4 text-sm text-sand/70">کیف‌شاپ · چرم دست‌ساز ایرانی</p>
          </motion.div>
          <div className="mt-10 h-[2px] w-44 overflow-hidden rounded-full bg-sand/15">
            <motion.div
              className="h-full bg-gradient-to-l from-goldsoft to-gold"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- text link with animated underline ---------------- */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-sm font-medium text-goldsoft transition-colors hover:text-cream",
        className,
      )}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 right-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
      </span>
      <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
    </a>
  );
}

/* ---------------- horizontal scroll section driver ---------------- */
export function useSectionProgress(ref: React.RefObject<HTMLElement | null>): MotionValue<number> {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return scrollYProgress;
}

export function CountdownPill({ items }: { items: { value: number; label: string }[] }) {
  return (
    <div className="flex items-center gap-4">
      {items.map((item) => (
        <div key={item.label} className="text-center">
          <div className="font-latin text-xl text-goldsoft">{faNum(item.value)}</div>
          <div className="text-[0.62rem] text-cream/45">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

export function useTilt(strength = 12) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 18 });

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * strength);
    rotateX.set(-py * strength);
  };
  const onPointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };
  return { rotateX: springX, rotateY: springY, onPointerMove, onPointerLeave };
}
