import { db } from "@/db";
import { subscribers } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const email = String(body.email ?? "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ ok: false, error: "ایمیل نامعتبر است." }, { status: 400 });
    }
    await db.insert(subscribers).values({ email }).onConflictDoNothing();
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "ثبت ایمیل انجام نشد." }, { status: 500 });
  }
}
