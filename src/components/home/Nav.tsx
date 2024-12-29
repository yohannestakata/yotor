import { Search } from "lucide-react";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="relative mt-8 flex justify-between px-16">
      <ul className="flex gap-6">
        <li>
          <Link href="/collections/men">Men</Link>
        </li>
        <li>
          <Link href="/collections/women">Women</Link>
        </li>
        <li>
          <Link href="/collections/kids">Kids</Link>
        </li>
        <li>
          <Link href="/collections/new">New &amp; Featured</Link>
        </li>
      </ul>
      <div className="flex gap-6">
        <a href="">
          <Search />
        </a>
        <a href="/auth/login">Login</a>
      </div>

      <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl">
        Yotor
      </h1>
    </nav>
  );
}
