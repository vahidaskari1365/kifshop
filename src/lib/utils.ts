export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const faNumber = new Intl.NumberFormat("fa-IR");

export function faNum(value: number | string) {
  if (typeof value === "string") return value;
  return faNumber.format(value);
}

/** Prices are stored in Toman */
export function formatPrice(value: number) {
  return `${faNumber.format(value)} تومان`;
}

export function formatCompactPrice(value: number) {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    return `${millions.toLocaleString("fa-IR", { maximumFractionDigits: 1 })} میلیون`;
  }
  return faNumber.format(value);
}

export function formatDate(date: Date | string) {
  const value = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(value);
}

export function discountPercent(price: number, compareAt?: number | null) {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}

export function orderCode() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `KIF-${stamp}${rand}`;
}

export function excerpt(text: string, length = 140) {
  const clean = text.replace(/[#>*]/g, "").replace(/\s+/g, " ").trim();
  return clean.length > length ? `${clean.slice(0, length)}…` : clean;
}

export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9\u0600-\u06FF-]/g, "")
    .replace(/-+/g, "-");
}

export const shippingCost = 65000;
export const freeShippingThreshold = 3_000_000;
