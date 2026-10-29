"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X, ArrowLeft } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine } from "@/db/schema";
import { formatPrice, freeShippingThreshold, shippingCost } from "@/lib/utils";

type CartContextValue = {
  items: CartLine[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  add: (line: Omit<CartLine, "qty">, qty?: number) => void;
  remove: (slug: string, color?: string) => void;
  setQty: (slug: string, qty: number, color?: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  ready: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "kifshop-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, ready]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const add = useCallback((line: Omit<CartLine, "qty">, qty = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.slug === line.slug && item.color === line.color);
      if (existing) {
        return current.map((item) =>
          item === existing ? { ...item, qty: Math.min(item.qty + qty, 10) } : item,
        );
      }
      return [...current, { ...line, qty }];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((slug: string, color?: string) => {
    setItems((current) => current.filter((item) => !(item.slug === slug && item.color === color)));
  }, []);

  const setQty = useCallback((slug: string, qty: number, color?: string) => {
    setItems((current) =>
      current.map((item) =>
        item.slug === slug && item.color === color
          ? { ...item, qty: Math.max(1, Math.min(qty, 10)) }
          : item,
      ),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
    const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : shippingCost;
    return {
      items,
      count,
      subtotal,
      shipping,
      total: subtotal + shipping,
      add,
      remove,
      setQty,
      clear,
      open,
      setOpen,
      ready,
    };
  }, [items, add, remove, setQty, clear, open, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}

export function CartDrawer() {
  const { items, open, setOpen, remove, setQty, subtotal, shipping, total } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90]">
          <motion.div
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            className="absolute inset-y-0 left-0 flex w-full max-w-md flex-col border-l border-sand/15 bg-coal"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 230, damping: 28 }}
            aria-label="سبد خرید"
          >
            <div className="flex items-center justify-between border-b border-sand/10 px-6 py-5">
              <div>
                <p className="eyebrow">YOUR SELECTION</p>
                <h2 className="mt-1 text-lg font-bold">سبد خرید</h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-sand/20 text-cream/70 transition-colors hover:border-gold hover:text-gold"
                aria-label="بستن سبد خرید"
              >
                <X size={17} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
                  <span className="grid h-20 w-20 place-items-center rounded-full border border-sand/15 text-gold">
                    <ShoppingBag size={26} />
                  </span>
                  <p className="text-sm text-cream/60">سبد خرید شما خالی است.</p>
                  <Link href="/shop" onClick={() => setOpen(false)} className="btn btn-gold">
                    دیدن کیف‌ها
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={`${item.slug}-${item.color ?? ""}`}
                      className="flex gap-3 rounded-2xl border border-sand/10 bg-onyx/60 p-3"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-20 rounded-xl object-cover"
                        loading="lazy"
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold">{item.name}</p>
                            {item.color && <p className="mt-1 text-[0.7rem] text-cream/45">{item.color}</p>}
                          </div>
                          <button
                            onClick={() => remove(item.slug, item.color)}
                            className="text-cream/40 transition-colors hover:text-clay"
                            aria-label={`حذف ${item.name}`}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-sand/20 px-2 py-1">
                            <button
                              onClick={() => setQty(item.slug, item.qty - 1, item.color)}
                              className="text-cream/70 hover:text-gold"
                              aria-label="کاهش تعداد"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="min-w-4 text-center text-xs">{item.qty}</span>
                            <button
                              onClick={() => setQty(item.slug, item.qty + 1, item.color)}
                              className="text-cream/70 hover:text-gold"
                              aria-label="افزایش تعداد"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                          <p className="text-xs text-goldsoft">{formatPrice(item.price * item.qty)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-sand/10 bg-onyx/40 px-6 py-5">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between text-cream/65">
                  <dt>جمع کالاها</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-cream/65">
                  <dt>ارسال</dt>
                  <dd>{shipping === 0 ? "رایگان" : formatPrice(shipping)}</dd>
                </div>
                <div className="flex justify-between border-t border-sand/10 pt-2 font-bold text-cream">
                  <dt>مبلغ قابل پرداخت</dt>
                  <dd className="text-goldsoft">{formatPrice(total)}</dd>
                </div>
              </dl>
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="btn btn-gold mt-4 w-full"
              >
                تکمیل سفارش
                <ArrowLeft size={16} />
              </Link>
              <p className="mt-3 text-center text-[0.7rem] text-cream/40">
                ارسال رایگان برای سفارش‌های بالای ۳ میلیون تومان
              </p>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
