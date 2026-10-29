import { updateOrderStatusAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin-auth";
import { ORDER_STATUSES, ORDER_STATUS_LABELS } from "@/lib/admin-labels";
import { adminOrders } from "@/lib/queries";
import { faNum, formatDate, formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

const statusStyles: Record<string, string> = {
  pending: "bg-gold/15 text-goldsoft",
  confirmed: "bg-sage/15 text-sage",
  shipped: "bg-[#7d9bb5]/15 text-[#a9c4da]",
  delivered: "bg-sage/25 text-sage",
  canceled: "bg-clay/15 text-clay",
};

export default async function AdminOrdersPage() {
  await requireAdmin();
  const orders = await adminOrders();
  const revenue = orders
    .filter((order) => order.status !== "canceled")
    .reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">ORDERS</p>
        <h1 className="mt-2 text-2xl font-extrabold">سفارش‌ها</h1>
        <p className="mt-1 text-xs text-cream/45">
          {faNum(orders.length)} سفارش · مجموع فروش {formatPrice(revenue)}
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-sand/10 bg-onyx/40 p-10 text-center text-sm text-cream/45">
          هنوز سفارشی ثبت نشده است. سفارش‌های ثبت‌شده در سایت به‌صورت خودکار در این صفحه نمایش داده
          می‌شوند.
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <article key={order.id} className="rounded-2xl border border-sand/10 bg-onyx/40 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-latin text-sm text-goldsoft">{order.code}</p>
                  <p className="mt-1 text-xs text-cream/70">
                    {order.customerName} · <span className="font-latin">{order.phone}</span>
                  </p>
                  <p className="mt-1 text-[0.66rem] text-cream/40">
                    {order.city} — {order.address}
                  </p>
                  <p className="mt-1 text-[0.62rem] text-cream/30">{formatDate(order.createdAt)}</p>
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-cream">{formatPrice(order.total)}</p>
                  <span
                    className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-[0.62rem] ${
                      statusStyles[order.status] ?? "bg-cream/10 text-cream/50"
                    }`}
                  >
                    {ORDER_STATUS_LABELS[order.status] ?? order.status}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 border-t border-sand/10 pt-3">
                {order.items.map((item) => (
                  <span
                    key={`${order.id}-${item.slug}-${item.color ?? ""}`}
                    className="rounded-full border border-sand/15 px-2.5 py-1 text-[0.62rem] text-cream/55"
                  >
                    {item.name} × {faNum(item.qty)} {item.color ? `· ${item.color}` : ""}
                  </span>
                ))}
              </div>

              {order.note && (
                <p className="mt-2 rounded-xl bg-ink/40 px-3 py-2 text-[0.65rem] text-cream/45">
                  یادداشت مشتری: {order.note}
                </p>
              )}

              <form action={updateOrderStatusAction} className="mt-3 flex flex-wrap items-center gap-2">
                <input type="hidden" name="id" value={order.id} />
                <select name="status" defaultValue={order.status} className="field !w-auto !py-1.5 !text-[0.68rem]">
                  {ORDER_STATUSES.map((status) => (
                    <option key={status} value={status} className="bg-coal">
                      {ORDER_STATUS_LABELS[status]}
                    </option>
                  ))}
                </select>
                <button type="submit" className="btn btn-outline !px-3 !py-1.5 !text-[0.65rem]">
                  به‌روزرسانی وضعیت
                </button>
              </form>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
