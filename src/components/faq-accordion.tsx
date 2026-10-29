"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function FaqAccordion({
  items,
  defaultOpen = 0,
}: {
  items: { id?: number; question: string; answer: string; category?: string }[];
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="divide-y divide-sand/10 overflow-hidden rounded-3xl border border-sand/12 bg-onyx/40">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.id ?? item.question}>
            <button
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-right transition-colors hover:bg-gold/5 md:px-7"
            >
              <span className="flex items-start gap-3">
                <span className="font-latin mt-0.5 text-xs text-gold/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold leading-6 md:text-base">{item.question}</span>
              </span>
              <span
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors",
                  isOpen ? "border-gold bg-gold text-ink" : "border-sand/20 text-cream/60",
                )}
              >
                {isOpen ? <Minus size={14} /> : <Plus size={14} />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-6 pr-12 text-[0.82rem] leading-7 text-cream/60 md:px-7 md:pr-14">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
