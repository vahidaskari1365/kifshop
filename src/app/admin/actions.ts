"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import {
  collections,
  faqs,
  messages,
  orders,
  posts,
  products,
  type ColorOption,
} from "@/db/schema";
import { ADMIN_COOKIE, adminPassword, hashPassword, requireAdmin } from "@/lib/admin-auth";

const text = (form: FormData, key: string) => String(form.get(key) ?? "").trim();
const number = (form: FormData, key: string, fallback = 0) => {
  const value = Number(String(form.get(key) ?? "").replace(/[^\d.-]/g, ""));
  return Number.isFinite(value) ? value : fallback;
};
const flag = (form: FormData, key: string) => form.get(key) === "on" || form.get(key) === "true";
const lines = (form: FormData, key: string) =>
  String(form.get(key) ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

function parseColors(form: FormData): ColorOption[] {
  const parsed = lines(form, "colors").map((line) => {
    const [name, hex] = line.split(":").map((part) => part.trim());
    return { name: name || "رنگ", hex: hex || "#8a4b2a" };
  });
  return parsed.length ? parsed : [{ name: "کونьяک", hex: "#8a4b2a" }];
}

function refresh(paths: string[]) {
  paths.forEach((path) => revalidatePath(path));
  revalidatePath("/", "layout");
}

/* ---------------- auth ---------------- */
export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (password !== adminPassword()) redirect("/admin/login?error=1");
  const store = await cookies();
  store.set(ADMIN_COOKIE, hashPassword(password), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
    secure: process.env.NODE_ENV === "production",
  });
  redirect("/admin");
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

/* ---------------- products ---------------- */
export async function saveProductAction(formData: FormData) {
  await requireAdmin();
  const id = number(formData, "id");
  const values = {
    slug: text(formData, "slug") || `product-${Date.now()}`,
    name: text(formData, "name"),
    subtitle: text(formData, "subtitle"),
    description: text(formData, "description"),
    story: text(formData, "story"),
    price: number(formData, "price"),
    compareAtPrice: number(formData, "compareAtPrice") || null,
    category: text(formData, "category") || "handbag",
    collectionSlug: text(formData, "collectionSlug") || null,
    images: lines(formData, "images"),
    colors: parseColors(formData),
    material: text(formData, "material") || "چرم طبیعی گاوی",
    dimensions: text(formData, "dimensions"),
    weight: number(formData, "weight"),
    stock: number(formData, "stock"),
    rating: number(formData, "rating", 5),
    reviewsCount: number(formData, "reviewsCount"),
    badge: text(formData, "badge") || null,
    featured: flag(formData, "featured"),
    isActive: flag(formData, "isActive"),
    seoTitle: text(formData, "seoTitle"),
    seoDescription: text(formData, "seoDescription"),
  };

  if (!values.name || values.price <= 0) {
    redirect("/admin/products?error=1");
  }

  if (id) {
    await db.update(products).set(values).where(eq(products.id, id));
  } else {
    await db.insert(products).values({ ...values, images: values.images.length ? values.images : [] }).onConflictDoUpdate({
      target: products.slug,
      set: values,
    });
  }
  refresh(["/admin/products", "/shop", "/"]);
  redirect(`/admin/products?saved=${id || "new"}`);
}

export async function deleteProductAction(formData: FormData) {
  await requireAdmin();
  const id = number(formData, "id");
  if (id) await db.delete(products).where(eq(products.id, id));
  refresh(["/admin/products", "/shop"]);
}

/* ---------------- posts ---------------- */
export async function savePostAction(formData: FormData) {
  await requireAdmin();
  const id = number(formData, "id");
  const values = {
    slug: text(formData, "slug") || `post-${Date.now()}`,
    title: text(formData, "title"),
    excerpt: text(formData, "excerpt"),
    content: String(formData.get("content") ?? ""),
    cover: text(formData, "cover"),
    category: text(formData, "category") || "راهنما",
    author: text(formData, "author") || "تیم کیف‌شاپ",
    readMinutes: number(formData, "readMinutes", 5),
    publishedAt: text(formData, "publishedAt") ? new Date(text(formData, "publishedAt")) : new Date(),
    isPublished: flag(formData, "isPublished"),
    seoTitle: text(formData, "seoTitle"),
    seoDescription: text(formData, "seoDescription"),
  };
  if (!values.title) redirect("/admin/posts?error=1");

  if (id) {
    await db.update(posts).set(values).where(eq(posts.id, id));
  } else {
    await db.insert(posts).values(values).onConflictDoUpdate({ target: posts.slug, set: values });
  }
  refresh(["/admin/posts", "/journal", "/"]);
  redirect(`/admin/posts?saved=${id || "new"}`);
}

export async function deletePostAction(formData: FormData) {
  await requireAdmin();
  const id = number(formData, "id");
  if (id) await db.delete(posts).where(eq(posts.id, id));
  refresh(["/admin/posts", "/journal"]);
}

/* ---------------- faqs ---------------- */
export async function saveFaqAction(formData: FormData) {
  await requireAdmin();
  const id = number(formData, "id");
  const values = {
    question: text(formData, "question"),
    answer: text(formData, "answer"),
    category: text(formData, "category") || "عمومی",
    sortOrder: number(formData, "sortOrder"),
    isPublished: flag(formData, "isPublished"),
  };
  if (!values.question) redirect("/admin/faqs?error=1");
  if (id) await db.update(faqs).set(values).where(eq(faqs.id, id));
  else await db.insert(faqs).values(values);
  refresh(["/admin/faqs", "/faq", "/"]);
  redirect("/admin/faqs?saved=1");
}

export async function deleteFaqAction(formData: FormData) {
  await requireAdmin();
  const id = number(formData, "id");
  if (id) await db.delete(faqs).where(eq(faqs.id, id));
  refresh(["/admin/faqs", "/faq"]);
}

/* ---------------- collections ---------------- */
export async function saveCollectionAction(formData: FormData) {
  await requireAdmin();
  const id = number(formData, "id");
  const values = {
    slug: text(formData, "slug"),
    title: text(formData, "title"),
    subtitle: text(formData, "subtitle"),
    description: text(formData, "description"),
    image: text(formData, "image"),
    accent: text(formData, "accent") || "#c8a96a",
    sortOrder: number(formData, "sortOrder"),
  };
  if (!id || !values.title) redirect("/admin/collections?error=1");
  await db.update(collections).set(values).where(eq(collections.id, id));
  refresh(["/admin/collections", "/collections", "/"]);
  redirect("/admin/collections?saved=1");
}

/* ---------------- orders & messages ---------------- */
export async function updateOrderStatusAction(formData: FormData) {
  await requireAdmin();
  const id = number(formData, "id");
  const status = text(formData, "status") || "pending";
  if (id) await db.update(orders).set({ status }).where(eq(orders.id, id));
  refresh(["/admin/orders", "/admin"]);
}

export async function messageAction(formData: FormData) {
  await requireAdmin();
  const id = number(formData, "id");
  const intent = text(formData, "intent");
  if (!id) return;
  if (intent === "delete") await db.delete(messages).where(eq(messages.id, id));
  else await db.update(messages).set({ isRead: intent !== "unread" }).where(eq(messages.id, id));
  refresh(["/admin/messages", "/admin"]);
}
