import { inArray } from "drizzle-orm";
import { db } from "@/db";
import { orders, products, type CartLine } from "@/db/schema";
import { freeShippingThreshold, orderCode, shippingCost } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const customerName = String(body.customerName ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const city = String(body.city ?? "").trim();
    const address = String(body.address ?? "").trim();
    const note = String(body.note ?? "").trim();
    const incoming = Array.isArray(body.items) ? (body.items as CartLine[]) : [];

    if (!customerName || !phone || !address || incoming.length === 0) {
      return Response.json({ ok: false, error: "اطلاعات سفارش کامل نیست." }, { status: 400 });
    }

    const slugs = incoming.map((item) => String(item.slug));
    const priceMap = new Map<string, { price: number; name: string; image: string }>();
    try {
      const rows = await db.select().from(products).where(inArray(products.slug, slugs));
      rows.forEach((row) => {
        priceMap.set(row.slug, { price: row.price, name: row.name, image: row.images[0] ?? "" });
      });
    } catch {
      /* fall back to submitted values */
    }

    const items: CartLine[] = incoming.map((item) => {
      const known = priceMap.get(String(item.slug));
      return {
        slug: String(item.slug),
        name: known?.name ?? String(item.name ?? ""),
        price: known?.price ?? (Number(item.price) || 0),
        image: known?.image || String(item.image ?? ""),
        color: item.color ? String(item.color) : undefined,
        qty: Math.max(1, Math.min(10, Number(item.qty) || 1)),
      };
    });

    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shipping = subtotal >= freeShippingThreshold ? 0 : shippingCost;
    const total = subtotal + shipping;
    const code = orderCode();

    await db.insert(orders).values({
      code,
      customerName,
      phone,
      city,
      address,
      note,
      items,
      subtotal,
      shipping,
      total,
      status: "pending",
    });

    return Response.json({ ok: true, code, total });
  } catch {
    return Response.json(
      { ok: false, error: "ثبت سفارش انجام نشد؛ لطفاً با پشتیبانی تماس بگیرید." },
      { status: 500 },
    );
  }
}
