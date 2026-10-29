"use client";

import { usePathname } from "next/navigation";
import { CartDrawer } from "./cart-context";
import { SiteFooter } from "./site-footer";

export function SiteChrome() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return (
    <>
      <SiteFooter />
      <CartDrawer />
    </>
  );
}
