# کیف‌شاپ | KIFSHOP — فروشگاه کیف چرم دست‌ساز

فروشگاه اینترنتی کامل کیف چرم دست‌ساز با طراحی سه‌بعدی، اسکرول سینمایی و پنل مدیریت محتوا.
ساخته‌شده با **Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 + Drizzle ORM + PostgreSQL**،
کاملاً **فارسی و RTL**، همراه با همه‌ی تصاویر (۲۸ عکس محلی) و مدل‌های دیتابیس.

---

## فهرست

- [ویژگی‌ها](#ویژگیها)
- [پیش‌نمایش سریع](#پیشنمایش-سریع)
- [اجرای محلی](#اجرای-محلی)
- [متغیرهای محیطی](#متغیرهای-محیطی)
- [پنل مدیریت](#پنل-مدیریت)
- [مدل‌های دیتابیس](#مدلهای-دیتابیس)
- [ساختار پروژه](#ساختار-پروژه)
- [تصاویر](#تصاویر)
- [سئو، AEO، GEO و AIO](#سئو-aeo-geo-و-aio)
- [اسکریپت‌ها](#اسکریپتها)

---

## ویژگی‌ها

### طراحی و تعامل
- **استیج سه‌بعدی کیف‌ها** در هدر صفحه اصلی: چرخش ۳۶۰ درجه با درگ، تیلت با ماوس، توقف/پخش و رینگ محصولات (CSS 3D + Framer Motion).
- **اینتروی سینمایی برند** (یک بار در هر نشست)، نوار پیشرفت اسکرول، ریویل کلمه‌به‌کلمه، پارالاکس و شمارنده‌های انیمیشنی.
- **سکشن پین‌شده‌ی «سفر ساخت کیف»** با اسکرول متصل و تصاویر متقاطع (Sticky + useScroll).
- **ریل افقی کالکشن‌ها** با حرکت متصل به اسکرول عمودی.
- کارت محصول سه‌بعدی، گالری محصول تیلت‌شونده، دراور سبد خرید، مگامنوی فروشگاه، مارکی، تایپوگرافی فارسی (Vazirmatn) + نمایشی (Cormorant Garamond).
- احترام به `prefers-reduced-motion`، فوکوس‌رینگ، `aria-label` و لینک پرش به محتوا.

### فروشگاه
- ۱۲ محصول واقعی در ۶ دسته (دستی، دوشی، توت، اداری، مجلسی، دست‌ساز) و ۴ کالکشن.
- فیلتر دسته، جست‌وجو، مرتب‌سازی (پیشنهادی/جدید/قیمت/امتیاز)، صفحه‌ی محصول با رنگ، تعداد، سبد خرید ماندگار (localStorage).
- سبد خرید، تسویه‌حساب و ثبت سفارش واقعی در دیتابیس (قیمت سمت سرور بازمحاسبه می‌شود)، پیام تماس، خبرنامه.
- صفحه‌های محتوایی خرید: راهنمای خرید + آزمون ۶۰ ثانیه‌ای کیف مناسب، سایزبندی، نگهداری چرم، ارسال و گارانتی، پرسش‌های متداول، فروش عمده، درباره و تماس.

### پنل مدیریت محتوا (`/admin`)
- ورود با رمز (کوکی HttpOnly + هش SHA-256)، خروج، حفاظت از همه‌ی صفحات و اکشن‌ها در سرور.
- مدیریت **محصولات** (افزودن/ویرایش/حذف، تصاویر، رنگ‌ها، موجودی، سئو)، **مقالات ژورنال** (ادیتور Markdown سبک)، **کالکشن‌ها**، **پرسش‌های متداول**، **سفارش‌ها** (تغییر وضعیت) و **پیام‌ها** (خوانده‌شده/حذف).
- داشبورد با آمار، هشدار موجودی و آخرین سفارش‌ها؛ تغییرات با `revalidatePath` فوراً در سایت اعمال می‌شود.

### ژورنال
۶ مقاله‌ی تخصصی (تشخیص چرم اصل، سایز کیف، نگهداری تابستانی، چرم گیاهی vs کروم، کیف لپ‌تاپ ۱۵ اینچ، ترند ۱۴۰۵) با فهرست مطالب، بخش «پاسخ کوتاه» و داده‌ی ساختاریافته Article.

---

## پیش‌نمایش سریع

```bash
cp .env.example .env          # تنظیم DATABASE_URL
npm install
npx drizzle-kit push          # ایجاد جداول از مدل‌های Drizzle
npm run dev                   # http://localhost:3000
```

اولین درخواست به سایت، دیتابیس را به‌صورت خودکار از `src/lib/catalog.ts` سید می‌کند
(۱۲ محصول، ۴ کالکشن، ۶ مقاله، ۸ پرسش). اگر می‌خواهید داده‌ها را مستقیم وارد کنید:
`psql "$DATABASE_URL" -f db/seed.sql`.

### اجرا با Docker (اختیاری)

```bash
docker compose up -d          # PostgreSQL روی پورت 5432
npm install && npx drizzle-kit push && npm run dev
```

---

## متغیرهای محیطی

| متغیر | الزامی | توضیح |
| --- | --- | --- |
| `DATABASE_URL` | ✅ | رشته اتصال PostgreSQL |
| `ADMIN_PASSWORD` | ➖ | رمز پنل مدیریت؛ پیش‌فرض `kifshop1405` |
| `NEXT_PUBLIC_SITE_URL` | ➖ | دامنه‌ی نهایی برای canonical/sitemap/schema؛ پیش‌فرض `https://kifshop.ir` |

---

## پنل مدیریت

- آدرس: `/admin/login`
- رمز پیش‌فرض: `kifshop1405` (با `ADMIN_PASSWORD` تغییر دهید)
- مسیرها: `/admin` · `/admin/products` · `/admin/collections` · `/admin/posts` · `/admin/faqs` · `/admin/orders` · `/admin/messages`
- صفحات پنل با `robots: noindex` و خارج از ناوبری عمومی هستند.

---

## مدل‌های دیتابیس

مدل‌ها با Drizzle ORM در [`src/db/schema.ts`](src/db/schema.ts) تعریف شده‌اند؛ اسنپ‌شات SQL در
[`db/schema.sql`](db/schema.sql) و داده‌ی نمونه در [`db/seed.sql`](db/seed.sql) نگه‌داری می‌شود.

| جدول | کاربرد |
| --- | --- |
| `products` | کیف‌ها: قیمت، رنگ‌ها (JSONB)، تصاویر (JSONB)، موجودی، امتیاز، فیلدهای سئو |
| `collections` | کالکشن‌ها: کلاسیک، شهری، آتلیه، مجلسی |
| `posts` | مقالات ژورنال + متادیتای سئو |
| `faqs` | پرسش‌های متداول (منبع FAQPage schema) |
| `orders` | سفارش‌ها با اقلام JSONB، جمع، ارسال و وضعیت |
| `messages` | پیام‌های فرم تماس و درخواست عمده |
| `subscribers` | ایمیل خبرنامه (یونیک) |

---

## ساختار پروژه

```
src/
├── app/
│   ├── layout.tsx              # متادیتای سراسری + Organization/WebSite/Store schema
│   ├── page.tsx                # صفحه اصلی سینمایی
│   ├── shop/                   # لیست + [slug] محصول
│   ├── collections/            # لیست + [slug]
│   ├── journal/                # لیست + [slug]
│   ├── buying-guide, size-guide, care, shipping, faq, about, contact,
│   │   wholesale, privacy, cart, checkout, search
│   ├── admin/                  # پنل مدیریت + actions.ts (Server Actions)
│   ├── api/                    # health · orders · contact · subscribe · products
│   ├── sitemap.ts, robots.ts, llms.txt/route.ts, icon.svg
├── components/                 # هیرو سه‌بعدی، کارت محصول، سبد، فرم‌ها، ادمین، موشن
├── db/                         # اتصال Drizzle + schema (مدل‌ها)
└── lib/                        # کاتالوگ محتوا، کوئری‌ها، schema.org، ابزارها
public/images/                  # ۲۸ تصویر محصول و آتلیه (محلی)
db/                             # schema.sql و seed.sql
```

---

## تصاویر

همه‌ی عکس‌ها داخل مخزن هستند: `public/images/*.jpg` (۲۸ فایل، ~۶.۷ مگابایت) و از طریق
`src/lib/catalog.ts` به محصولات، کالکشن‌ها و مقالات وصل می‌شوند. هیچ تصویری از دامنه‌ی خارجی
بارگذاری نمی‌شود؛ بنابراین سایت آفلاین و پس از کلون هم کامل نمایش داده می‌شود.

برای تعویض تصویر، فایل را در `public/images` جایگزین کنید یا از پنل مدیریت، فیلد «تصاویر» محصول را
با مسیر جدید (مثلاً `/images/new-bag.jpg`) به‌روزرسانی کنید.

---

## سئو، AEO، GEO و AIO

- **SEO کلاسیک:** عنوان/توضیح متا یکتا برای همه‌ی صفحات، canonical، Open Graph/Twitter، sitemap پویا،
  robots با اجازه به خزنده‌های AI، لینک‌سازی داخلی عمیق، breadcrumb، تصاویر با `alt` توصیفی.
- **داده‌ی ساختاریافته:** `Organization`، `WebSite` + `SearchAction`، `Store`، `Product` + `Offer` +
  `AggregateRating` + سیاست بازگشت و ارسال، `Article`، `FAQPage`، `BreadcrumbList`، `ItemList`،
  `CollectionPage`، `HowTo`، `Service`، `AboutPage`، `ContactPage`.
- **AEO:** بخش‌های «پاسخ کوتاه» در راهنماها، پرسش‌های متداول گروه‌بندی‌شده و قابل استناد.
- **GEO/AIO:** فایل [`/llms.txt`](src/app/llms.txt/route.ts) شامل هویت برند، محصولات، پاسخ‌های کوتاه و
  نقشه‌ی صفحات؛ فید ماشین‌خوان [`/api/products`](src/app/api/products/route.ts)؛ `robots.txt` با
  اجازه‌ی صریح به GPTBot، OAI-SearchBot، PerplexityBot، ClaudeBot، Google-Extended و…
- **SXO:** سرعت (فونت/تصاویر بهینه، بدون CLS سنگین)، مسیر خرید کوتاه، اعتمادسازی (گارانتی، تعویض،
  نظرات)، فرم‌های کوتاه و بازخورد فوری.

---

## انتشار در گیت‌هاب

مخزن محلی آماده و کامیت‌شده است؛ فقط احراز هویت لازم است:

```bash
git remote add origin https://github.com/vahidaskari1365/kifshop.git
git branch -M main
git push -u origin main
```

اگر Git از شما رمز پرسید، به‌جای رمز حساب از **Personal Access Token** استفاده کنید
(GitHub → Settings → Developer settings → Tokens (classic) → scope: `repo`):

```bash
git remote set-url origin https://<TOKEN>@github.com/vahidaskari1365/kifshop.git
git push -u origin main
git remote set-url origin https://github.com/vahidaskari1365/kifshop.git   # حذف توکن از remote
```

یا با GitHub CLI:

```bash
gh auth login
gh repo set-default vahidaskari1365/kifshop
git push -u origin main
```

> فایل `.env` عمداً کامیت نمی‌شود (فقط `.env.example`). تصاویر و مدل‌ها/داده‌ی دیتابیس مخزن‌شده‌اند.

---

## اسکریپت‌ها

| دستور | کار |
| --- | --- |
| `npm run dev` | اجرای محیط توسعه |
| `npm run build` | بیلد پروداکشن |
| `npm run start` | اجرای نسخه‌ی بیلدشده |
| `npm run lint` | ESLint |
| `npm run typecheck` | بررسی تایپ‌ها |
| `npx drizzle-kit push` | اعمال مدل‌ها روی دیتابیس |

---

© ۱۴۰۵ کیف‌شاپ — آتلیه کیف چرم دست‌ساز، تهران. کد این پروژه برای استفاده‌ی صاحب اثر آزاد است.
