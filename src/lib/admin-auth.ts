import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_COOKIE = "kifshop_admin";

export function adminPassword() {
  return process.env.ADMIN_PASSWORD || "kifshop1405";
}

export function hashPassword(password: string) {
  return createHash("sha256").update(`${password}::kifshop-atelier-1405`).digest("hex");
}

export async function isAdmin() {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  return Boolean(token) && token === hashPassword(adminPassword());
}

export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
