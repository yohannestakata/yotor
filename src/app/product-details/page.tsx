"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";
import Image from "next/image";
import { Nav } from "@/components/home";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import toast from "react-hot-toast";

export type Product = {
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

const formSchema = z.object({
  size: z.string().nonempty("Please select a size."),
});

type FormData = z.infer<typeof formSchema>;

export default function ProductDetails() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  console.log(product);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { size: "" },
  });

  useEffect(() => {
    if (!productId) return;
    const fetchProduct = async () => {
      setLoading(true);
      const { data: Product } = await supabase
        .from("Products")
        .select("*")
        .eq("id", productId)
        .single();
      setProduct(Product);
      setLoading(false);
    };
    fetchProduct();
  }, [productId]);

  const addToCart = (data: FormData) => {
    if (!product) return;
    try {
      console.log("Adding to cart:", {
        productId: product.id,
        size: data.size,
      });
      toast.success("Product added to cart!");
    } catch (error) {
      toast.error("Failed to add product to cart.");
    }
  };

  if (loading) return <div>Loading product details...</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <main>
      <Nav />
      <div className="grid grid-cols-12 px-16 gap-6 mt-10">
        <div className="col-span-6 aspect-square">
          <Image
            height={600}
            width={600}
            src={product.image}
            alt={product.name}
            className="object-cover h-full w-full rounded-3xl"
          />
        </div>
        <div className="col-span-6 flex flex-col gap-5">
          <h1 className="text-4xl">{product.name}</h1>
          <p className="text-xl">Price: ${product.price}</p>
          <p className="text-muted-foreground">{product.description}</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(addToCart)} className="space-y-6">
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Select Size</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-6"
                      >
                        {product.sizes.map((size) => (
                          <FormItem
                            key={size}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={size} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {size}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full rounded-full">
                Add to Cart
              </Button>
            </form>
          </Form>
          <div>
            <span>Characteristics</span>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <p className="text-muted-foreground">Brand: </p>
              <p className="text-right">{product.brand}</p>
              <p className="text-muted-foreground">Collection: </p>
              <p className="text-right">{product.collection}</p>
              <p className="text-muted-foreground">Material: </p>
              <p className="text-right">{product.material}</p>

              <p className="text-muted-foreground">Category: </p>
              <p className="text-right">{product.category}</p>
              <p className="text-muted-foreground">Stock: </p>
              <p className="text-right">{product.stock}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
