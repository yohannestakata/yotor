import Image from "next/image";

interface ProductCardProps {
  title: string;
  description: string;
  price: number;
  src: string;
}

export default function ProductCard({
  title,
  description,
  price,
  src,
}: ProductCardProps) {
  return (
    <div className="col-span-4">
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
        <span className="text-base text-muted-foreground">{description}</span>
        <span className="text-xl">{price} Br</span>
      </div>
    </div>
  );
}
