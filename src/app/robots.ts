import type { MetadataRoute } from "next";
import { site } from "@/lib/catalog";

export default function robots(): MetadataRoute.Robots {
  const privatePaths = ["/admin", "/admin/", "/api/", "/checkout", "/cart", "/search"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: privatePaths,
      },
      // Answer engines and AI crawlers are explicitly welcomed for GEO / AIO visibility.
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "PerplexityBot",
          "Perplexity-User",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "Google-Extended",
          "Applebot-Extended",
          "Bingbot",
          "CCBot",
          "Amazonbot",
          "YouBot",
        ],
        allow: "/",
        disallow: ["/admin", "/api/", "/checkout", "/cart"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
