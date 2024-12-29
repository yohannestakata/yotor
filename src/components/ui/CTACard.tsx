import Link from "next/link";
import { describe } from "node:test";

interface CTACardProps {
  bgUrl: string;
  title: string;
  href: string;
}

export default function CTACard({ bgUrl, title, href }: CTACardProps) {
  return (
    <Link
      href={href}
      className="aspect-square col-span-4 rounded-3xl bg-cover bg-center p-6"
      style={{
        backgroundImage: `linear-gradient(
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0.2)
      ),url(${bgUrl})`,
      }}
    >
      <div className="h-full flex flex-col justify-end leading-none">
        <h3 className="text-4xl text-background">{title}</h3>
      </div>
    </Link>
  );
}
