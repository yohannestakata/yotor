import supabase from "@/lib/supabase";
import ProductCard from "../ui/ProductCard";

type Product = {
  id: number; // Ensure this matches your Supabase table schema
  name: string;
  description: string;
  price: number;
  image: string;
};

export default async function NewCollections() {
  const { data: Products, error } = await supabase
    .from<Product>("Products") // Typing the table
    .select("*")
    .limit(6);

  if (error) {
    console.error("Error fetching products:", error.message);
    return <div>Error loading new collections.</div>;
  }

  if (!Products || Products.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <section className="py-16">
      <h2 className="text-center text-5xl">New Collections</h2>
      <p className="mx-auto mt-4 w-1/2 text-center text-muted-foreground">
        Our latest collection, where classic and contemporary styles converge in
        perfect harmony
      </p>
      <div className="mt-16 grid grid-cols-12 gap-x-4 gap-y-6 px-16">
        {Products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.name}
            description={product.description}
            price={product.price}
            src={product.image}
            id={product.id}
          />
        ))}
      </div>
    </section>
  );
}
