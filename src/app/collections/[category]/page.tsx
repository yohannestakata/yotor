"use client";

import { Nav } from "@/components/home";
import { Footer, ProductCard } from "@/components/ui";
import supabase from "@/lib/supabase";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  care_recommendation: string;
  category: string;
  brand: string;
  collection: string;
  material: string;
  stock: number;
  sizes: string[];
};

type FetchState = {
  products: Product[] | null;
  isLoading: boolean;
  error: string | null;
};

export default function CategoryPage() {
  const { category } = useParams();
  const [fetchState, setFetchState] = useState<FetchState>({
    products: null,
    isLoading: true,
    error: null,
  });

  console.log(fetchState);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setFetchState((prev) => ({ ...prev, isLoading: true, error: null }));

        const { data: products, error } = await supabase
          .from("Products")
          .select("*")
          .eq("category", category)
          .order("created_at", { ascending: false })
          .limit(24);

        console.log(products);

        if (error) throw error;

        setFetchState({
          products,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error fetching products:", error);
        setFetchState((prev) => ({
          ...prev,
          isLoading: false,
          error: "Failed to load products. Please try again later.",
        }));
      }
    };

    getProducts();
  }, [category]);

  // Loading state
  if (fetchState.isLoading) {
    return (
      <>
        <Nav />
        <section className="p-16">
          <Skeleton className="h-12 w-64 mx-auto mb-16" />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-72 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ))}
          </div>
        </section>
        <Footer />
      </>
    );
  }

  // Error state
  if (fetchState.error) {
    return (
      <>
        <Nav />
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-16">
          <h2 className="text-xl font-semibold text-red-600 mb-4">
            {fetchState.error}
          </h2>
          <button
            onClick={() => window.location.reload()}
            className="text-blue-600 hover:underline"
          >
            Try Again
          </button>
        </div>
        <Footer />
      </>
    );
  }

  // Empty state
  if (!fetchState.products || fetchState.products.length === 0) {
    return (
      <>
        <Nav />
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-16">
          <h2 className="text-xl font-semibold mb-4">
            No products found in this category
          </h2>
          <p className="text-muted-foreground">
            Please check back later or explore other categories
          </p>
        </div>
        <Footer />
      </>
    );
  }

  // Format category name for display (e.g., "mens-clothing" -> "Mens Clothing")
  const formatCategoryName = (category: string) => {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <>
      <Nav />
      <section className="p-6 md:p-16">
        <h2 className="text-center text-3xl md:text-5xl">
          {formatCategoryName(category as string)} Collection
        </h2>

        <div className="mt-6 md:mt-16 grid grid-cols-12 gap-4 md:gap-6">
          {fetchState.products.map((product) => (
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
      <Footer />
    </>
  );
}
