import { db } from "@/db";
import { messages } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = String(body.name ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !message) {
      return Response.json({ ok: false, error: "نام و پیام الزامی است." }, { status: 400 });
    }

    await db.insert(messages).values({
      name,
      email: String(body.email ?? "").trim(),
      phone: String(body.phone ?? "").trim(),
      subject: String(body.subject ?? "تماس از سایت").trim(),
      message,
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "ارسال پیام انجام نشد." }, { status: 500 });
  }
}
