import Link from "next/link";
import { AlertTriangle, ArrowUpRight, Boxes, Mail, ShoppingBag, Users } from "lucide-react";
import { requireAdmin } from "@/lib/admin-auth";
import { adminOverview, adminProducts } from "@/lib/queries";
import { faNum, formatDate, formatPrice } from "@/lib/utils";
import { ORDER_STATUS_LABELS } from "@/lib/admin-labels";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await requireAdmin();
  const [overview, products] = await Promise.all([adminOverview(), adminProducts()]);
  const lowStock = products.filter((product) => product.stock <= 5);

  const cards = [
    { label: "محصولات", value: faNum(overview.productCount), icon: Boxes, href: "/admin/products" },
    { label: "سفارش‌ها", value: faNum(overview.recentOrders.length), icon: ShoppingBag, href: "/admin/orders" },
    { label: "پیام‌های خوانده‌نشده", value: faNum(overview.unreadMessages), icon: Mail, href: "/admin/messages" },
    { label: "اعضای خبرنامه", value: faNum(overview.subscriberCount), icon: Users, href: "/admin/messages" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">OVERVIEW</p>
        <h1 className="mt-2 text-2xl font-extrabold">داشبورد کیف‌شاپ</h1>
        <p className="mt-1 text-xs text-cream/45">
          خلاصه‌ی وضعیت فروشگاه و محتوای سایت. همه‌ی تغییرات از همین پنل انجام می‌شود.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl border border-sand/10 bg-onyx/40 p-4 transition-colors hover:border-gold/40"
          >
            <div className="flex items-center justify-between">
              <card.icon size={16} className="text-gold" />
              <ArrowUpRight size={13} className="text-cream/25" />
            </div>
            <p className="font-latin mt-3 text-2xl text-cream">{card.value}</p>
            <p className="mt-1 text-[0.68rem] text-cream/45">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-sand/10 bg-onyx/40 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold">آخرین سفارش‌ها</h2>
            <Link href="/admin/orders" className="text-[0.65rem] text-goldsoft">
              همه سفارش‌ها
            </Link>
          </div>
          {overview.recentOrders.length === 0 ? (
            <p className="mt-4 rounded-xl border border-sand/10 bg-ink/30 p-4 text-xs text-cream/40">
              هنوز سفارشی ثبت نشده است. سفارش‌های سایت در این جدول نمایش داده می‌شوند.
            </p>
          ) : (
            <div className="mt-4 space-y-2">
              {overview.recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between gap-2 rounded-xl border border-sand/10 bg-ink/30 px-3 py-2 text-[0.7rem]"
                >
                  <div>
                    <p className="font-latin text-goldsoft">{order.code}</p>
                    <p className="mt-0.5 text-cream/45">
                      {order.customerName} · {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="text-cream/75">{formatPrice(order.total)}</p>
                    <p className="mt-0.5 text-[0.6rem] text-cream/40">
                      {ORDER_STATUS_LABELS[order.status] ?? order.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-sand/10 bg-onyx/40 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold">هشدار موجودی</h2>
            <Link href="/admin/products" className="text-[0.65rem] text-goldsoft">
              مدیریت محصولات
            </Link>
          </div>
          {lowStock.length === 0 ? (
            <p className="mt-4 text-xs text-cream/40">موجودی همه‌ی محصولات مناسب است.</p>
          ) : (
            <div className="mt-4 space-y-2">
              {lowStock.slice(0, 5).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between gap-2 rounded-xl border border-clay/25 bg-clay/[0.07] px-3 py-2 text-[0.7rem]"
                >
                  <span className="flex items-center gap-2 text-cream/75">
                    <AlertTriangle size={12} className="text-clay" />
                    {product.name}
                  </span>
                  <span className="text-clay">{faNum(product.stock)} عدد</span>
                </div>
              ))}
            </div>
          )}
          <div className="mt-4 rounded-xl border border-gold/20 bg-gold/[0.05] p-3 text-[0.65rem] leading-6 text-cream/50">
            مجموع فروش ثبت‌شده: <span className="text-goldsoft">{formatPrice(overview.revenue)}</span>
            <br />
            وضعیت سئو: عنوان، توضیح متا، داده ساختاریافته و sitemap برای همه محصولات و مقالات فعال است.
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-sand/10 bg-onyx/40 p-5">
        <h2 className="text-sm font-bold">میان‌بُرهای مدیریت محتوا</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: "/admin/products", label: "افزودن محصول جدید" },
            { href: "/admin/posts", label: "نوشتن مقاله ژورنال" },
            { href: "/admin/collections", label: "ویرایش کالکشن‌ها" },
            { href: "/admin/faqs", label: "به‌روزرسانی پرسش‌های متداول" },
            { href: "/admin/orders", label: "بررسی سفارش‌ها" },
            { href: "/admin/messages", label: "پاسخ به پیام‌ها" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-sand/10 px-3 py-2.5 text-xs text-cream/60 transition-colors hover:border-gold/40 hover:text-goldsoft"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
