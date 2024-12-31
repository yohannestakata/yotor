import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  title: string;
  description: string;
  price: number;
  src: string;
  id: string;
}

export default function ProductCard({
  title,
  description,
  price,
  src,
  id,
}: ProductCardProps) {
  return (
    <Link href={`/product-details?productId=${id}`} className="col-span-4">
      <div className="rounded-3xl bg-muted aspect-square overflow-hidden">
        <Image
          src={src}
          width={500}
          height={500}
          alt=""
          className="h-full w-full object-cover "
        />
      </div>
      <div className="mt-4 flex flex-col gap-1 leading-none">
        <span className="text-xl">{title}</span>
        <span className="text-base text-muted-foreground">
          {description.slice(0, 80)}
        </span>
        <span className="text-xl">{price} Br</span>
      </div>
    </Link>
  );
}
