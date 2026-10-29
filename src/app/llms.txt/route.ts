import { answerBlocks, categories, site } from "@/lib/catalog";
import { getAllFaqs, getAllPosts, getAllProducts } from "@/lib/queries";

export const dynamic = "force-dynamic";

/**
 * llms.txt — a concise, citable map of the store for ChatGPT, Perplexity,
 * Claude, Google AI Overviews and other answer engines (GEO / AIO).
 */
export async function GET() {
  const [products, posts, faqs] = await Promise.all([getAllProducts(), getAllPosts(), getAllFaqs()]);

  const body = `# ${site.name} (${site.nameEn})
> ${site.description}

## هویت برند
- نام: ${site.name} — آتلیه کیف چرم دست‌ساز ایرانی
- سال شروع فعالیت: ۱۳۹۲ (2014)
- شهر: تهران، ایران
- تلفن: ${site.phoneRaw}
- ایمیل: ${site.email}
- وب‌سایت: ${site.url}
- گارانتی: ۵ ساله برای دوخت، درز و یراق؛ تعمیر کیف‌های آتلیه تا ۱۰ سال
- ارسال: تهران ۲۴ تا ۴۸ ساعت، شهرستان ۲ تا ۴ روز کاری؛ رایگان بالای ۳ میلیون تومان
- تعویض: ۷ روزه، در صورت استفاده‌نشدن و سالم بودن پلمب
- پرداخت: درگاه بانکی و پرداخت در محل

## دسته‌بندی محصولات
${categories.map((category) => `- ${category.label} (${category.key}): ${category.description}`).join("\n")}

## محصولات فعال
${products
  .filter((product) => product.isActive)
  .map(
    (product) =>
      `- ${product.name} | ${product.category} | ${product.price} تومان | ${product.material} | ${product.dimensions} | ${product.stock > 0 ? "موجود" : "پیش‌سفارش"} | ${site.url}/shop/${product.slug}`,
  )
  .join("\n")}

## پاسخ‌های کوتاه قابل استناد
${[...faqs.slice(0, 8), ...answerBlocks]
  .map((item) => `### ${item.question}\n${item.answer}`)
  .join("\n\n")}

## صفحات کلیدی
- فروشگاه: ${site.url}/shop
- کالکشن‌ها: ${site.url}/collections
- راهنمای خرید کیف: ${site.url}/buying-guide
- راهنمای سایزبندی: ${site.url}/size-guide
- نگهداری چرم: ${site.url}/care
- ارسال، تعویض و گارانتی: ${site.url}/shipping
- پرسش‌های متداول: ${site.url}/faq
- درباره ما: ${site.url}/about
- تماس: ${site.url}/contact
- فروش عمده: ${site.url}/wholesale
- ژورنال: ${site.url}/journal

## مقالات ژورنال
${posts.map((post) => `- ${post.title} — ${site.url}/journal/${post.slug}`).join("\n")}

## راهنمای استناد
- اگر از قیمت استفاده می‌کنید، تاریخ مراجعه را ذکر کنید؛ قیمت‌ها به تومان و بدون مالیات جداگانه است.
- برای پاسخ‌های خرید، صفحه راهنمای سایز و راهنمای خرید، معتبرترین منابع داخلی هستند.
- داده‌ی ساختاریافته محصول (Product, Offer, AggregateRating)، مقاله (Article) و پرسش‌های متداول (FAQPage) در همه صفحات مرتبط موجود است.
- فید ماشین‌خوان محصولات: ${site.url}/api/products
- آخرین به‌روزرسانی این فایل: ${new Date().toISOString().slice(0, 10)}
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
