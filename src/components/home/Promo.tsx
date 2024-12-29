import Image from "next/image";
import LinkButton from "../ui/LinkButton";

export default function Promo() {
  return (
    <section className="py-16">
      <div className="px-16">
        <Image
          width={1000}
          height={320}
          src="https://images.unsplash.com/photo-1571973348421-fd0ecb5b2dd6?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="h-80 w-full rounded-3xl bg-muted object-cover"
        />
      </div>
      <h2 className="mt-8 text-center text-5xl">Wear to Your Graduation</h2>
      <p className="mx-auto mt-4 w-1/2 text-center text-muted-foreground">
        Our latest collection, where classic and contemporary styles converge in
        perfect harmony
      </p>

      <LinkButton
        title="See Details"
        href="/products/0145809134134"
        className="mx-auto mt-4 block w-fit"
      />
    </section>
  );
}
