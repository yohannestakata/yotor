"use client";

import { useParams } from "next/navigation";

export default function Page() {
  const { category } = useParams();
  return `${category}`;
}
