import {
  boolean,
  doublePrecision,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export type ColorOption = { name: string; hex: string };
export type CartLine = {
  slug: string;
  name: string;
  price: number;
  image: string;
  color?: string;
  qty: number;
};

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  subtitle: text("subtitle").notNull().default(""),
  description: text("description").notNull().default(""),
  story: text("story").notNull().default(""),
  price: integer("price").notNull(),
  compareAtPrice: integer("compare_at_price"),
  category: text("category").notNull(),
  collectionSlug: text("collection_slug"),
  images: jsonb("images").$type<string[]>().notNull(),
  colors: jsonb("colors").$type<ColorOption[]>().notNull(),
  material: text("material").notNull().default("چرم طبیعی گاوی"),
  dimensions: text("dimensions").notNull().default(""),
  weight: integer("weight").notNull().default(0),
  stock: integer("stock").notNull().default(0),
  rating: doublePrecision("rating").notNull().default(5),
  reviewsCount: integer("reviews_count").notNull().default(0),
  badge: text("badge"),
  featured: boolean("featured").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true),
  seoTitle: text("seo_title").notNull().default(""),
  seoDescription: text("seo_description").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull().default(""),
  description: text("description").notNull().default(""),
  image: text("image").notNull(),
  accent: text("accent").notNull().default("#c8a96a"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull().default(""),
  content: text("content").notNull().default(""),
  cover: text("cover").notNull(),
  category: text("category").notNull().default("راهنما"),
  author: text("author").notNull().default("تیم کیف‌شاپ"),
  readMinutes: integer("read_minutes").notNull().default(5),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull().defaultNow(),
  isPublished: boolean("is_published").notNull().default(true),
  seoTitle: text("seo_title").notNull().default(""),
  seoDescription: text("seo_description").notNull().default(""),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  customerName: text("customer_name").notNull(),
  phone: text("phone").notNull(),
  city: text("city").notNull().default(""),
  address: text("address").notNull().default(""),
  note: text("note").notNull().default(""),
  items: jsonb("items").$type<CartLine[]>().notNull(),
  subtotal: integer("subtotal").notNull().default(0),
  shipping: integer("shipping").notNull().default(0),
  total: integer("total").notNull().default(0),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().default(""),
  phone: text("phone").notNull().default(""),
  subject: text("subject").notNull().default(""),
  message: text("message").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: text("category").notNull().default("عمومی"),
  sortOrder: integer("sort_order").notNull().default(0),
  isPublished: boolean("is_published").notNull().default(true),
});

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Collection = typeof collections.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type Faq = typeof faqs.$inferSelect;
export type Subscriber = typeof subscribers.$inferSelect;
