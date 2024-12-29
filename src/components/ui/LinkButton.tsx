import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface LinkButtonProps {
  href: string;
  className?: string;
  title: string;
}

export default function LinkButton({
  href,
  className,
  title,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={twMerge(
        "rounded-full bg-foreground text-background px-8 py-2 font-semibold leading-none hover:opacity-80 transition-opacity duration-100",
        className,
      )}
    >
      {title}
    </Link>
  );
}
