"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

type Step = { id: string; step: string; title: string; text: string; image: string };

export function CraftStory({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 8]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1.12, 1.04]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(value * steps.length)));
    setActive(next);
  });

  return (
    <div ref={ref} className="relative">
      {/* desktop pinned cinematic story */}
      <div className="hidden lg:block lg:h-[340vh]">
        <div className="sticky top-20 flex h-[calc(100vh-5rem)] items-center">
          <div className="shell grid w-full grid-cols-2 items-center gap-14">
            <div className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-sand/15">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={steps[active].id}
                    src={steps[active].image}
                    alt={steps[active].title}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ rotate, scale: reduce ? 1 : scale }}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                  <div>
                    <p className="eyebrow">STEP {steps[active].step}</p>
                    <p className="mt-1 text-2xl font-bold">{steps[active].title}</p>
                  </div>
                  <span className="font-latin text-6xl text-cream/15">
                    {String(active + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <div className="absolute -left-6 top-8 hidden rotate-[-90deg] font-latin text-[0.6rem] tracking-[0.4em] text-gold/60 xl:block">
                HANDCRAFTED IN TEHRAN
              </div>
            </div>

            <div>
              <p className="eyebrow">THE MAKING OF A KIFSHOP BAG</p>
              <h2 className="display mt-4 text-3xl md:text-4xl">
                سفر یک کیف، از پوست تا <span className="gold-text">مهر آتلیه</span>
              </h2>
              <div className="mt-10 space-y-2">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`rounded-2xl border p-4 transition-all duration-500 ${
                      index === active
                        ? "border-gold/40 bg-gold/[0.07]"
                        : "border-transparent opacity-55"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-latin text-xs ${index === active ? "text-gold" : "text-cream/40"}`}
                      >
                        {step.step}
                      </span>
                      <h3 className="text-sm font-bold">{step.title}</h3>
                      <span className="mr-auto h-px flex-1 bg-sand/10" />
                    </div>
                    {index === active && (
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-xs leading-6 text-cream/65"
                      >
                        {step.text}
                      </motion.p>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 h-[2px] w-full overflow-hidden rounded-full bg-sand/10">
                <motion.div
                  className="h-full origin-right bg-gradient-to-l from-goldsoft to-gold"
                  style={{ scaleX: scrollYProgress }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* mobile stacked */}
      <div className="space-y-6 lg:hidden">
        <div>
          <p className="eyebrow">THE MAKING OF A KIFSHOP BAG</p>
          <h2 className="display mt-3 text-2xl">
            سفر یک کیف، از پوست تا <span className="gold-text">مهر آتلیه</span>
          </h2>
        </div>
        {steps.map((step) => (
          <div
            key={step.id}
            className="overflow-hidden rounded-3xl border border-sand/12 bg-onyx/50"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={step.image}
              alt={step.title}
              loading="lazy"
              className="h-52 w-full object-cover"
            />
            <div className="p-5">
              <p className="eyebrow">STEP {step.step}</p>
              <h3 className="mt-2 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-xs leading-6 text-cream/60">{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
