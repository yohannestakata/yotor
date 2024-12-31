"use client";

import { useSearchParams } from "next/navigation";

export default function ProductDetails() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  return <div>Product Details for ID: {productId}</div>;
}
