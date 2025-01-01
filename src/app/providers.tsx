"use client";

import { CartProvider } from "@/providers/CartProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
