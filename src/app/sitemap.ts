import type { MetadataRoute } from "next";
import { site } from "@/lib/catalog";
import { getAllCollections, getAllPosts, getAllProducts } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, posts, collections] = await Promise.all([
    getAllProducts(),
    getAllPosts(),
    getAllCollections(),
  ]);
  const now = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/shop", priority: 0.95, changeFrequency: "weekly" },
    { path: "/collections", priority: 0.9, changeFrequency: "monthly" },
    { path: "/buying-guide", priority: 0.9, changeFrequency: "monthly" },
    { path: "/size-guide", priority: 0.8, changeFrequency: "monthly" },
    { path: "/care", priority: 0.8, changeFrequency: "monthly" },
    { path: "/journal", priority: 0.8, changeFrequency: "weekly" },
    { path: "/faq", priority: 0.8, changeFrequency: "monthly" },
    { path: "/shipping", priority: 0.7, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
    { path: "/wholesale", priority: 0.7, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...collections.map((collection) => ({
      url: `${site.url}/collections/${collection.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...products
      .filter((product) => product.isActive)
      .map((product) => ({
        url: `${site.url}/shop/${product.slug}`,
        lastModified: new Date(product.createdAt),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      })),
    ...posts.map((post) => ({
      url: `${site.url}/journal/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
