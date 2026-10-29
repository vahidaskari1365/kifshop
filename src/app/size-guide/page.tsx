import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { sizeGuide } from "@/lib/catalog";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "راهنمای سایز کیف چرم | جدول ابعاد کیف دستی، توت و اداری",
  description:
    "جدول کامل ابعاد و وزن کیف چرم: کیف دستی، دوشی، توت، کیف اداری و کلاچ. راهنمای انتخاب سایز بر اساس قد، اندام و لپ‌تاپ ۱۳ تا ۱۵ اینچ.",
  alternates: { canonical: "/size-guide" },
};

const laptopRows = [
  { laptop: "مک‌بوک ایر ۱۳ اینچ", width: "۳۳ × ۲۳ سانتی‌متر", recommended: "کیف دستی روزمره / توت" },
  { laptop: "لپ‌تاپ ۱۴ اینچ", width: "۳۵ × ۲۵ سانتی‌متر", recommended: "توت یا کیف اداری اسلیم" },
  { laptop: "لپ‌تاپ ۱۵٫۶ اینچ", width: "۳۸ × ۲۷ سانتی‌متر", recommended: "کیف اداری پارس" },
  { laptop: "لپ‌تاپ ۱۶ اینچ", width: "۴۰ × ۲۸ سانتی‌متر", recommended: "کیف اداری با عمق ۱۰ سانتی‌متر" },
];

const faqs = [
  {
    question: "برای لپ‌تاپ ۱۵ اینچ چه سایز کیفی مناسب است؟",
    answer:
      "کیف باید عرض داخلی حداقل ۳۵ و عمق ۵ سانتی‌متر داشته باشد. کیف اداری پارس با ابعاد داخلی ۴۰ × ۳۰ سانتی‌متر و محفظه‌ی فومی، مناسب لپ‌تاپ ۱۵ اینچ است.",
  },
  {
    question: "قد من ۱۵۸ سانتی‌متر است؛ چه اندازه کیف دستی مناسب است؟",
    answer:
      "برای قد زیر ۱۶۰ سانتی‌متر، کیف دستی با عرض ۲۶ تا ۳۰ سانتی‌متر متناسب است. کیف‌های بزرگ‌تر از ۳۴ سانتی‌متر روی اندام کوتاه‌تر سنگین به نظر می‌رسند.",
  },
  {
    question: "وزن مناسب یک کیف چرم خالی چقدر است؟",
    answer:
      "کیف خالی باید زیر ۱٫۲ کیلوگرم باشد. اگر روزانه لپ‌تاپ حمل می‌کنید، وزن زیر ۱ کیلوگرم توصیه می‌شود تا فشار روی شانه کم شود.",
  },
];

export default function SizeGuidePage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "خانه", href: "/" },
            { name: "راهنمای سایز", href: "/size-guide" },
          ]),
        ]}
      />

      <section className="relative overflow-hidden border-b border-sand/10">
        <div className="pointer-events-none absolute inset-0 spotlight opacity-60" />
        <div className="shell relative py-14">
          <nav aria-label="مسیر صفحه" className="text-[0.68rem] text-cream/40">
            <Link href="/" className="hover:text-gold">
              خانه
            </Link>
            <span className="mx-2">/</span>
            <span className="text-cream/70">راهنمای سایز</span>
          </nav>
          <p className="eyebrow mt-6">SIZE & FIT</p>
          <h1 className="display mt-3 text-[clamp(2rem,4.8vw,3.4rem)]">
            سایز درست، <span className="gold-text">راحتی هر روز</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-cream/55">
            ابعاد کیف را با وسایل واقعی خودتان مقایسه کنید. این جدول بر اساس محصولات آتلیه و
            بازخورد مشتریان تنظیم شده است؛ همه ابعاد بیرونی و به سانتی‌متر هستند.
          </p>
        </div>
      </section>

      <section className="section !pt-10">
        <div className="shell">
          <div className="overflow-x-auto rounded-2xl border border-sand/12">
            <table className="w-full min-w-[38rem] text-right text-xs">
              <thead className="bg-onyx/70 text-cream/50">
                <tr>
                  <th className="px-4 py-3 font-medium">نوع کیف</th>
                  <th className="px-4 py-3 font-medium">ابعاد (عرض × ارتفاع × عمق)</th>
                  <th className="px-4 py-3 font-medium">وزن تقریبی</th>
                  <th className="px-4 py-3 font-medium">چه چیزهایی جا می‌شود</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand/10 text-cream/65">
                {sizeGuide.map((row) => (
                  <tr key={row.type}>
                    <td className="px-4 py-3 font-semibold text-cream">{row.type}</td>
                    <td className="px-4 py-3">{row.dimensions} سانتی‌متر</td>
                    <td className="px-4 py-3">{row.weight}</td>
                    <td className="px-4 py-3 text-cream/50">{row.fits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold">سازگاری با لپ‌تاپ</h2>
              <p className="mt-2 text-xs leading-6 text-cream/50">
                عرض داخلی کیف باید ۲ سانتی‌متر از عرض لپ‌تاپ بیشتر باشد تا لپ‌تاپ بدون فشار جا
                بگیرد. ابعاد زیر شامل قاب محافظ نیست.
              </p>
              <div className="mt-4 overflow-hidden rounded-2xl border border-sand/12">
                <table className="w-full text-right text-xs">
                  <thead className="bg-onyx/70 text-cream/50">
                    <tr>
                      <th className="px-3 py-2.5 font-medium">لپ‌تاپ</th>
                      <th className="px-3 py-2.5 font-medium">ابعاد</th>
                      <th className="px-3 py-2.5 font-medium">پیشنهاد</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand/10 text-cream/60">
                    {laptopRows.map((row) => (
                      <tr key={row.laptop}>
                        <td className="px-3 py-2.5">{row.laptop}</td>
                        <td className="px-3 py-2.5">{row.width}</td>
                        <td className="px-3 py-2.5 text-cream/45">{row.recommended}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold">چطور سایز بگیریم؟</h2>
              <ol className="mt-3 space-y-3 text-xs leading-7 text-cream/55">
                {[
                  "وسایلی که هر روز حمل می‌کنید را روی میز بچینید؛ بزرگ‌ترین وسیله را اندازه بگیرید.",
                  "عرض و ارتفاع بزرگ‌ترین وسیله را ۲ سانتی‌متر افزایش دهید؛ این حداقل ابعاد داخلی کیف است.",
                  "قد خود را در نظر بگیرید: زیر ۱۶۰ سانتی‌متر عرض ۲۶ تا ۳۰، بین ۱۶۰ تا ۱۷۵ عرض ۲۸ تا ۳۶ و بالای ۱۷۵ عرض ۳۴ تا ۴۲ سانتی‌متر.",
                  "وزن کیف خالی را بررسی کنید؛ برای حمل روزانه زیر ۱ کیلوگرم بهترین گزینه است.",
                  "اگر بین دو سایز هستید، سایز بزرگ‌تر را انتخاب کنید؛ کیف کوچک‌تر معمولاً کنار گذاشته می‌شود.",
                ].map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="font-latin mt-0.5 text-gold/70">0{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-5 rounded-2xl border border-gold/20 bg-gold/[0.05] p-4 text-xs text-cream/60">
                هنوز مطمئن نیستید؟ ابعاد وسایل و قد خود را برای ما بنویسید؛ کارشناس آتلیه دقیق
                راهنمایی می‌کند.
                <Link href="/contact" className="mr-2 text-goldsoft">
                  مشاوره رایگان ←
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/shop" className="btn btn-gold">
              دیدن کیف‌ها
            </Link>
            <Link href="/buying-guide" className="btn btn-outline">
              راهنمای خرید
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
