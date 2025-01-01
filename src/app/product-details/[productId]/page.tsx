"use client";
import { useParams } from "next/navigation";
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
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Footer } from "@/components/ui";
import { useCart } from "@/providers/CartProvider";

const formSchema = z.object({
  size: z.string().nonempty("Please select a size."),
  quantity: z
    .number()
    .min(1, "Quantity must be at least 1")
    .max(99, "Quantity must be less than 100"),
});

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

type FormData = z.infer<typeof formSchema>;

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { dispatch } = useCart();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      size: "",
      quantity: 1,
    },
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
      dispatch({
        type: "ADD_ITEM",
        payload: {
          productId: product.id,
          name: product.name,
          price: product.price,
          size: data.size,
          quantity: data.quantity,
          image: product.image,
        },
      });
      toast.success("Product added to cart!");
    } catch (error) {
      toast.error("Failed to add product to cart.");
      console.log(error);
    }
  };

  if (loading) return <div>Loading product details...</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div>
      <Nav />
      <main className="mt-10">
        <div className="grid grid-cols-12 px-16 gap-6">
          {/* Image section remains the same */}
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
              <form
                onSubmit={form.handleSubmit(addToCart)}
                className="space-y-6"
              >
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
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                          min={1}
                          max={99}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full rounded-full"
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </Button>
              </form>
            </Form>
            {/* Characteristics section remains the same */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
