import { Search } from "lucide-react";

export default function Nav() {
  return (
    <nav className="relative mt-8 flex justify-between px-16">
      <ul className="flex gap-6">
        <li>
          <a href="">Men</a>
        </li>
        <li>
          <a href="">Women</a>
        </li>
        <li>
          <a href="">Kids</a>
        </li>
        <li>
          <a href="">New &amp; Featured</a>
        </li>
        <li>
          <a href="">Gifts</a>
        </li>
      </ul>
      <div className="flex gap-6">
        <a href="">
          <Search />
        </a>
        <a href="">Login</a>
      </div>

      <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl">
        Yotor
      </h1>
    </nav>
  );
}
