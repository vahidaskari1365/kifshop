import type { Product } from "@/db/schema";
import { categoryLabel, site } from "./catalog";

const abs = (path: string) => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": abs("/#organization"),
  name: site.name,
  alternateName: site.nameEn,
  url: site.url,
  logo: abs("/icon.svg"),
  description: site.description,
  foundingDate: "2014",
  slogan: site.tagline,
  telephone: site.phoneRaw,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address,
    addressLocality: "تهران",
    addressCountry: "IR",
  },
  sameAs: [site.instagram, site.whatsapp],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: site.phoneRaw,
      contactType: "customer service",
      areaServed: "IR",
      availableLanguage: ["fa", "en"],
    },
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": abs("/#website"),
  url: site.url,
  name: site.name,
  inLanguage: "fa-IR",
  publisher: { "@id": abs("/#organization") },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${site.url}/search?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

export const storeSchema = {
  "@context": "https://schema.org",
  "@type": "Store",
  "@id": abs("/#store"),
  name: site.name,
  image: abs("/icon.svg"),
  url: site.url,
  telephone: site.phoneRaw,
  priceRange: "۱٬۸۰۰٬۰۰۰ تا ۷٬۰۰۰٬۰۰۰ تومان",
  currenciesAccepted: "IRR",
  paymentAccepted: "کارت بانکی، پرداخت در محل",
  openingHours: "Sa-Th 10:00-19:00",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address,
    addressLocality: "تهران",
    addressRegion: "تهران",
    addressCountry: "IR",
  },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "612" },
};

export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": abs(`/shop/${product.slug}#product`),
    name: product.name,
    description: product.seoDescription || product.description,
    image: product.images.map((image) => image),
    sku: `KIF-${product.id.toString().padStart(3, "0")}`,
    mpn: product.slug,
    brand: { "@type": "Brand", name: site.name },
    category: categoryLabel(product.category),
    material: product.material,
    color: product.colors.map((color) => color.name).join("، "),
    offers: {
      "@type": "Offer",
      url: abs(`/shop/${product.slug}`),
      priceCurrency: "IRR",
      price: product.price * 10,
      availability:
        product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": abs("/#organization") },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IR",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: { "@type": "MonetaryAmount", value: 65000, currency: "IRR" },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2, unitCode: "DAY" },
          transitTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 4, unitCode: "DAY" },
        },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
    },
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: abs(item.href),
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function articleSchema(post: {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  author: string;
  publishedAt: Date;
  seoDescription: string;
  readMinutes: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": abs(`/journal/${post.slug}#article`),
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: [post.cover],
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified: new Date(post.publishedAt).toISOString(),
    author: { "@type": "Person", name: post.author },
    publisher: { "@id": abs("/#organization") },
    inLanguage: "fa-IR",
    timeRequired: `PT${post.readMinutes}M`,
    isPartOf: { "@id": abs("/#website") },
    mainEntityOfPage: abs(`/journal/${post.slug}`),
  };
}

export function collectionSchema(collection: {
  slug: string;
  title: string;
  description: string;
  products: Product[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": abs(`/collections/${collection.slug}#collection`),
    name: `کالکشن ${collection.title}`,
    description: collection.description,
    url: abs(`/collections/${collection.slug}`),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: collection.products.length,
      itemListElement: collection.products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: abs(`/shop/${product.slug}`),
        name: product.name,
      })),
    },
  };
}
