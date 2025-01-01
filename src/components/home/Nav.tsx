import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import Cart from "../cart/Cart";

export default function Nav() {
  return (
    <nav className="relative mt-8 flex justify-between px-16">
      <ul className="flex gap-6">
        <li>
          <Link href="/collections/Men">Men</Link>
        </li>
        <li>
          <Link href="/collections/Women">Women</Link>
        </li>
        <li>
          <Link href="/collections/Kids">Kids</Link>
        </li>
        <li>
          <Link href="/collections/new">New &amp; Featured</Link>
        </li>
      </ul>
      <div className="flex gap-6">
        <Sheet>
          <SheetTrigger>
            <ShoppingCart />
          </SheetTrigger>
          <SheetContent
            side="right"
            style={{ maxWidth: "50vw", overflowY: "scroll" }}
          >
            <div className="grid gap-4 py-4">
              <Cart />
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/login">Login</Link>
      </div>
      <Link
        href="/"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl"
      >
        <h1>Yotor</h1>
      </Link>
    </nav>
  );
}
