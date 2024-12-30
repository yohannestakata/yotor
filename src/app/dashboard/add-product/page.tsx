"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import supabase from "@/lib/supabase";
import Image from "next/image";

// Define the form schema
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Product name must be at least 2 characters." }),
  price: z.coerce.number().min(1, { message: "Price must be at least 1." }),
  description: z.string().optional(),
  image: z.any().refine((file) => file && file[0]?.size > 0, {
    message: "Please upload a product image.",
  }),
  brand: z.string().optional(),
  category: z.string().optional(),
  collection: z.string().optional(),
  colors: z.string().optional(),
  care_recommendation: z.string().optional(),
  material: z.string().optional(),
  sizes: z.array(z.enum(["XS", "SM", "MD", "LG", "XL"])).optional(),
  stock: z.coerce.number().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function AddProductForm() {
  const [previewImage, setPreviewImage] = useState<string | null>(null); // State for previewing the image

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 1,
      description: "",
      brand: "",
      category: "",
      collection: "",
      colors: "",
      care_recommendation: "",
      material: "",
      sizes: [],
      stock: 1,
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      const imagePath = `${Date.now()}-${values.image[0].name}`;
      const { data: imageData, error: imageError } = await supabase.storage
        .from("products")
        .upload(imagePath, values.image[0]);

      if (imageError) throw imageError;

      const imageUrl = `https://dsfzqjbtjytmzgmfgtbh.supabase.co/storage/v1/object/public/products/${imageData.path}`;

      const sizes =
        values.sizes && values.sizes.length > 0 ? values.sizes : null;

      const colors =
        values.colors && values.colors.length > 0
          ? values.colors.split(",").map((color) => color.trim())
          : null;

      const { data: productData, error: productError } = await supabase
        .from("Products")
        .insert([
          {
            name: values.name,
            price: values.price,
            description: values.description,
            image: imageUrl,
            brand: values.brand,
            category: values.category,
            collection: values.collection,
            colors,
            care_recommendation: values.care_recommendation,
            material: values.material,
            sizes,
            stock: values.stock,
          },
        ])
        .select();

      if (productError) throw productError;

      toast.success("Product added successfully!");
      console.log("Product added:", productData);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid-cols-12 grid gap-6 mx-auto w-full"
      >
        <div className="col-span-6  aspect-square overflow-hidden sticky top-4 bg-muted rounded-3xl w-full">
          <Image
            width={100}
            height={100}
            src={previewImage || "/placeholder.png"} // Show preview or placeholder
            className="h-full object-cover w-full"
            alt="Product Image"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(e.target.files);
                          const reader = new FileReader();
                          reader.onload = () =>
                            setPreviewImage(reader.result as string);
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="col-span-6 space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Casual T-Shirt" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 49.99" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Product description..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="care_recommendation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Care Recommendation</FormLabel>
                <FormControl>
                  <Textarea placeholder="Care recommendation..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <div className=" grid grid-cols-3">
                    {["Men", "Women", "Kids"].map((category) => (
                      <label
                        key={category}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={field.value === category}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                        <span>{category}</span>
                      </label>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Nike" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="collection"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Collection</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Summer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="material"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Material</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Cotton 100%" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 100" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sizes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sizes</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-3 gap-2">
                    {["XS", "SM", "MD", "LG", "XL"].map((size) => (
                      <label key={size} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={size}
                          checked={field.value?.includes(size)}
                          onChange={(e) => {
                            const value = e.target.value;
                            const isChecked = e.target.checked;
                            field.onChange(
                              isChecked
                                ? [...(field.value || []), value]
                                : field.value?.filter((s) => s !== value),
                            );
                          }}
                        />
                        <span>{size}</span>
                      </label>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full rounded-full">
            Add Product
          </Button>
        </div>
      </form>
    </Form>
  );
}
