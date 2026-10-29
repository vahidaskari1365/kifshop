import { asc, desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  collections,
  faqs,
  messages,
  orders,
  posts,
  products,
  subscribers,
  type Collection,
  type Faq,
  type Message,
  type Order,
  type Post,
  type Product,
} from "@/db/schema";
import { seedCollections, seedFaqs, seedPosts, seedProducts } from "./catalog";

let seedPromise: Promise<void> | null = null;

async function runSeed() {
  const [{ count }] = await db.select({ count: sql<number>`count(*)::int` }).from(products);
  if (Number(count) > 0) return;

  const productRows = seedProducts.map(({ id: _id, ...rest }) => rest);
  await db.insert(products).values(productRows).onConflictDoNothing();

  const collectionRows = seedCollections.map(({ id: _id, ...rest }) => rest);
  await db.insert(collections).values(collectionRows).onConflictDoNothing();

  const postRows = seedPosts.map(({ id: _id, ...rest }) => rest);
  await db.insert(posts).values(postRows).onConflictDoNothing();

  const faqRows = seedFaqs.map(({ id: _id, ...rest }) => rest);
  await db.insert(faqs).values(faqRows).onConflictDoNothing();
}

export async function ensureSeeded() {
  if (!seedPromise) {
    seedPromise = runSeed().catch((error) => {
      seedPromise = null;
      throw error;
    });
  }
  await seedPromise;
}

async function safe<T>(query: () => Promise<T[]>, fallback: T[]): Promise<T[]> {
  try {
    await ensureSeeded();
    const rows = await query();
    return rows.length ? rows : fallback;
  } catch {
    return fallback;
  }
}

export const getAllProducts = () =>
  safe<Product>(() => db.select().from(products).orderBy(asc(products.id)), seedProducts);

export const getAllPosts = () =>
  safe<Post>(
    () => db.select().from(posts).where(eq(posts.isPublished, true)).orderBy(desc(posts.publishedAt)),
    seedPosts,
  );

export const getAllCollections = () =>
  safe<Collection>(
    () => db.select().from(collections).orderBy(asc(collections.sortOrder)),
    seedCollections,
  );

export const getAllFaqs = () =>
  safe<Faq>(
    () => db.select().from(faqs).where(eq(faqs.isPublished, true)).orderBy(asc(faqs.sortOrder)),
    seedFaqs,
  );

export async function getProductBySlug(slug: string) {
  const all = await getAllProducts();
  return all.find((product) => product.slug === slug && product.isActive) ?? null;
}

export async function getCollectionBySlug(slug: string) {
  const all = await getAllCollections();
  return all.find((collection) => collection.slug === slug) ?? null;
}

export async function getPostBySlug(slug: string) {
  const all = await getAllPosts();
  return all.find((post) => post.slug === slug) ?? null;
}

export async function getRelatedProducts(product: Product, limit = 3) {
  const all = await getAllProducts();
  return all
    .filter((item) => item.slug !== product.slug && item.isActive)
    .sort((a, b) => {
      const score = (item: Product) =>
        (item.category === product.category ? 2 : 0) +
        (item.collectionSlug === product.collectionSlug ? 1 : 0);
      return score(b) - score(a);
    })
    .slice(0, limit);
}

export async function getProductsForCollection(slug: string) {
  const all = await getAllProducts();
  return all.filter((product) => product.collectionSlug === slug && product.isActive);
}

/** Admin data — reads live rows, empty on failure */
export async function adminOverview() {
  try {
    await ensureSeeded();
    const [productRows, orderRows, messageRows, postRows, subscriberRows] = await Promise.all([
      db.select().from(products),
      db.select().from(orders).orderBy(desc(orders.createdAt)).limit(8),
      db.select().from(messages).orderBy(desc(messages.createdAt)).limit(5),
      db.select().from(posts),
      db.select().from(subscribers),
    ]);
    const revenue = orderRows
      .filter((order) => order.status !== "canceled")
      .reduce((sum, order) => sum + order.total, 0);
    return {
      productCount: productRows.length,
      lowStock: productRows.filter((product) => product.stock <= 5).length,
      postCount: postRows.length,
      subscriberCount: subscriberRows.length,
      unreadMessages: messageRows.filter((message) => !message.isRead).length,
      revenue,
      recentOrders: orderRows,
      recentMessages: messageRows,
    };
  } catch {
    return {
      productCount: 0,
      lowStock: 0,
      postCount: 0,
      subscriberCount: 0,
      unreadMessages: 0,
      revenue: 0,
      recentOrders: [] as Order[],
      recentMessages: [] as Message[],
    };
  }
}

export async function adminOrders() {
  try {
    await ensureSeeded();
    return await db.select().from(orders).orderBy(desc(orders.createdAt));
  } catch {
    return [] as Order[];
  }
}

export async function adminMessages() {
  try {
    await ensureSeeded();
    return await db.select().from(messages).orderBy(desc(messages.createdAt));
  } catch {
    return [] as Message[];
  }
}

export async function adminProducts() {
  try {
    await ensureSeeded();
    return await db.select().from(products).orderBy(desc(products.id));
  } catch {
    return [] as Product[];
  }
}

export async function adminProductById(id: number) {
  try {
    const rows = await db.select().from(products).where(eq(products.id, id)).limit(1);
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function adminPosts() {
  try {
    await ensureSeeded();
    return await db.select().from(posts).orderBy(desc(posts.publishedAt));
  } catch {
    return [] as Post[];
  }
}

export async function adminPostById(id: number) {
  try {
    const rows = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function adminCollections() {
  try {
    await ensureSeeded();
    return await db.select().from(collections).orderBy(asc(collections.sortOrder));
  } catch {
    return [] as Collection[];
  }
}

export async function adminFaqs() {
  try {
    await ensureSeeded();
    return await db.select().from(faqs).orderBy(asc(faqs.sortOrder));
  } catch {
    return [] as Faq[];
  }
}
