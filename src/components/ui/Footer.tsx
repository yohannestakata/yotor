import Link from "next/link";

export default function Footer() {
  return (
    <footer className="pt-16">
      <div className="bg-primary text-background  grid gap-6 grid-cols-12 p-16">
        <div className="col-span-6 space-y-4">
          <Link href="/" className="text-7xl leading-none font-display">
            Yotor
          </Link>
          <p className="text-muted-foreground">
            Yotor is a casual wear e-commerce platform tailored for young
            adults. We provide a wide range of products from t-shirts to shoes
            at an affordable price.
          </p>
        </div>

        <div className="col-span-2 ">
          <span className="">Products</span>
          <ul className="mt-4 space-y-1 text-muted-foreground">
            <li>
              <Link href="/">Tshirt</Link>
            </li>
            <li>
              <Link href="/">Jacket</Link>
            </li>
            <li>
              <Link href="/">Shoes</Link>
            </li>
            <li>
              <Link href="/">Pants</Link>
            </li>
            <li>
              <Link href="/">Sunglasses</Link>
            </li>
            <li>
              <Link href="/">Tuxedo</Link>
            </li>
          </ul>
        </div>
        <div className="col-span-2 ">
          <span className="">Categories</span>
          <ul className="mt-4 space-y-1 text-muted-foreground">
            <li>
              <Link href="/collections/Men">Men</Link>
            </li>
            <li>
              <Link href="/collections/Women">Women</Link>
            </li>
            <li>
              <Link href="/collections/Kids">Kids</Link>
            </li>
          </ul>
        </div>
        <div className="col-span-2 ">
          <span className="">Group Members</span>
          <ul className="mt-4 space-y-1 text-muted-foreground">
            <li>
              <Link href="/">Tsion Girum</Link>
            </li>
            <li>
              <Link href="/">Tsion Hailu</Link>
            </li>
            <li>
              <Link href="/">Sosina Yilma</Link>
            </li>
            <li>
              <Link href="/">Tinsae Million</Link>
            </li>
            <li>
              <Link href="/">Yohannes Takata</Link>
            </li>
            <li>
              <Link href="/">Yosef Sintayew</Link>
            </li>
            <li>
              <Link href="/">Zemen Asmamaw</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
