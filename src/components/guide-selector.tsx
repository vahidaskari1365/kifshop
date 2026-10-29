"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, RotateCcw, Sparkles } from "lucide-react";
import { categories, type CategoryKey } from "@/lib/catalog";

type Question = {
  title: string;
  options: { label: string; note?: string; weights: Partial<Record<CategoryKey, number>> }[];
};

const questions: Question[] = [
  {
    title: "بیشتر کجا از کیف استفاده می‌کنید؟",
    options: [
      { label: "محل کار و جلسه", weights: { office: 2, handbag: 1 } },
      { label: "روزمره و خرید", weights: { tote: 2, crossbody: 1 } },
      { label: "مهمانی و مراسم", weights: { clutch: 2 } },
      { label: "سفر و پیاده‌روی شهری", weights: { crossbody: 2, tote: 1 } },
    ],
  },
  {
    title: "چه چیزی همراه دارید؟",
    options: [
      { label: "لپ‌تاپ ۱۴ تا ۱۵ اینچ", weights: { office: 3, tote: 1 } },
      { label: "لوازم روزمره و کیف پول", weights: { handbag: 2, crossbody: 1 } },
      { label: "دفتر A4 و بطری آب", weights: { tote: 3 } },
      { label: "فقط گوشی و کارت", weights: { clutch: 2, crossbody: 2 } },
    ],
  },
  {
    title: "کدام ویژگی برای شما مهم‌تر است؟",
    options: [
      { label: "دوام و گارانتی بلندمدت", weights: { office: 1, artisan: 2, tote: 1 } },
      { label: "سبکی و راحتی", weights: { crossbody: 3 } },
      { label: "ظاهر مجلسی و خاص", weights: { clutch: 3 } },
      { label: "دست‌ساز بودن و محدود بودن", weights: { artisan: 3 } },
    ],
  },
];

export function GuideSelector() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  const choose = (weights: Partial<Record<CategoryKey, number>>) => {
    const next = { ...scores };
    Object.entries(weights).forEach(([key, value]) => {
      next[key] = (next[key] ?? 0) + (value ?? 0);
    });
    setScores(next);
    if (step === questions.length - 1) setDone(true);
    else setStep(step + 1);
  };

  const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] as CategoryKey | undefined;
  const category = categories.find((item) => item.key === winner) ?? categories[0];

  const reset = () => {
    setStep(0);
    setScores({});
    setDone(false);
  };

  return (
    <div className="rounded-3xl border border-gold/25 bg-gradient-to-br from-mocha/70 to-coal p-6 md:p-8">
      <div className="flex items-center justify-between">
        <p className="eyebrow">60-SECOND FINDER</p>
        <span className="font-latin text-[0.65rem] text-gold/60">
          {done ? "DONE" : `${step + 1} / ${questions.length}`}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 14 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="mt-3 text-xl font-bold">{questions[step].title}</h3>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {questions[step].options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => choose(option.weights)}
                  className="flex items-center justify-between rounded-xl border border-sand/20 bg-ink/40 px-4 py-3 text-right text-xs text-cream/75 transition-colors hover:border-gold hover:text-goldsoft"
                >
                  {option.label}
                  <ArrowLeft size={14} className="text-gold/60" />
                </button>
              ))}
            </div>
            <div className="mt-4 h-px w-full bg-sand/10">
              <div
                className="h-px bg-gold transition-all duration-500"
                style={{ width: `${((step + 1) / questions.length) * 100}%` }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[0.65rem] text-goldsoft">
              <Sparkles size={12} /> پیشنهاد آتلیه
            </span>
            <h3 className="mt-3 text-2xl font-extrabold">{category.label}</h3>
            <p className="mt-2 text-xs leading-6 text-cream/60">{category.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href={`/shop?category=${category.key}`} className="btn btn-gold !py-2.5 !text-xs">
                دیدن این کیف‌ها
              </Link>
              <button onClick={reset} className="btn btn-outline !py-2.5 !text-xs">
                <RotateCcw size={13} /> آزمون دوباره
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
