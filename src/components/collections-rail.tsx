"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Collection } from "@/db/schema";
import { faNum } from "@/lib/utils";

export function CollectionsRail({
  collections,
  counts,
}: {
  collections: Collection[];
  counts: Record<string, number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(480);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -shift]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const measure = () => {
      const element = trackRef.current;
      if (!element) return;
      setShift(Math.max(0, element.scrollWidth - window.innerWidth + 96));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const cards = collections.map((collection, index) => (
    <Link
      key={collection.slug}
      href={`/collections/${collection.slug}`}
      className="group relative block h-[30rem] w-[21rem] shrink-0 overflow-hidden rounded-[1.8rem] border border-sand/15"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={collection.image}
        alt={`کالکشن ${collection.title} کیف‌شاپ`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="font-latin text-[0.6rem] tracking-[0.35em] text-gold/80">
          COLLECTION 0{index + 1}
        </p>
        <h3 className="mt-2 text-2xl font-extrabold">{collection.title}</h3>
        <p className="mt-1 text-xs text-cream/60">{collection.subtitle}</p>
        <div className="mt-4 flex items-center justify-between border-t border-cream/15 pt-3 text-[0.68rem]">
          <span className="text-cream/55">{faNum(counts[collection.slug] ?? 0)} کیف</span>
          <span className="text-goldsoft transition-transform duration-300 group-hover:-translate-x-1">
            مشاهده کالکشن ←
          </span>
        </div>
      </div>
      <span
        className="absolute right-5 top-5 h-9 w-9 rounded-full border border-cream/25 backdrop-blur"
        style={{ backgroundColor: `${collection.accent}44` }}
      />
    </Link>
  ));

  return (
    <>
      <div ref={ref} className="relative hidden h-[260vh] lg:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="shell mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">CURATED COLLECTIONS</p>
              <h2 className="display mt-3 text-3xl md:text-4xl">
                چهار کالکشن، <span className="gold-text">چهار سبک زندگی</span>
              </h2>
            </div>
            <p className="hidden max-w-xs text-xs leading-6 text-cream/45 md:block">
              با اسکرول، کالکشن‌ها را مرور کنید. هر کالکشن از یک ایده‌ی مشخص در آتلیه شکل گرفته است.
            </p>
          </div>
          <motion.div
            ref={trackRef}
            style={{ x: reduce ? 0 : x }}
            className="flex w-max gap-6 px-[max(2rem,calc((100vw-84rem)/2))]"
          >
            {cards}
            <div className="flex h-[30rem] w-[21rem] shrink-0 flex-col justify-center rounded-[1.8rem] border border-gold/30 bg-gradient-to-br from-mocha to-coal p-8">
              <p className="eyebrow">ATELIER SERVICE</p>
              <h3 className="mt-3 text-2xl font-extrabold leading-snug">
                کیف سفارشی
                <br />
                با حکاکی نام
              </h3>
              <p className="mt-3 text-xs leading-6 text-cream/55">
                انتخاب چرم، رنگ یراق و حکاکی حروف اول؛ ساخت اختصاصی در ۱۰ تا ۱۴ روز کاری.
              </p>
              <Link href="/contact" className="btn btn-gold mt-6 w-fit !text-xs">
                درخواست سفارشی
              </Link>
            </div>
          </motion.div>
          <div className="shell mt-8">
            <div className="h-px w-full bg-sand/10">
              <motion.div
                className="h-px origin-right bg-gold"
                style={{ width: reduce ? "100%" : progress }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4">
          {cards}
        </div>
      </div>
    </>
  );
}
