import { getAllProducts } from "@/lib/queries";

export const dynamic = "force-dynamic";

/**
 * Machine-readable product feed for AI shopping agents, comparison engines
 * and on-site search. Mirrors the JSON-LD data exposed on product pages.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") ?? "").trim().toLowerCase();
  const category = searchParams.get("category") ?? "";
  const limit = Math.min(Number(searchParams.get("limit")) || 50, 100);

  const products = await getAllProducts();
  const filtered = products
    .filter((product) => product.isActive)
    .filter((product) => (category ? product.category === category : true))
    .filter((product) =>
      query
        ? `${product.name} ${product.description} ${product.material} ${product.colors
            .map((color) => color.name)
            .join(" ")}`
            .toLowerCase()
            .includes(query)
        : true,
    )
    .slice(0, limit)
    .map((product) => ({
      id: product.slug,
      name: product.name,
      subtitle: product.subtitle,
      description: product.description,
      price_toman: product.price,
      compare_at_price_toman: product.compareAtPrice,
      currency: "IRT",
      category: product.category,
      collection: product.collectionSlug,
      material: product.material,
      dimensions: product.dimensions,
      weight_grams: product.weight,
      colors: product.colors,
      in_stock: product.stock > 0,
      stock: product.stock,
      rating: product.rating,
      reviews: product.reviewsCount,
      url: `/shop/${product.slug}`,
      images: product.images,
    }));

  return Response.json(
    {
      ok: true,
      count: filtered.length,
      updated_at: new Date().toISOString(),
      products: filtered,
    },
    { headers: { "cache-control": "public, max-age=300, s-maxage=300" } },
  );
}
