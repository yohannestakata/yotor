"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Image from "next/image";
import { useEffect, useState } from "react";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.string().url("Image URL must be valid"),
  price: z.coerce.number().min(0, "Price is required"),
  description: z.string().min(1, "Description is required"),
  care_recommendation: z.string().min(1, "Care recommendation is required"),
  category: z.enum(["Men", "Women", "Kids"]),
  brand: z.string().min(1, "Brand is required"),
  collection: z.string().min(1, "Collection is required"),
  material: z.string().min(1, "Material is required"),
  stock: z.coerce.number().min(1, "Stock is required"),
  sizes: z.array(z.enum(["XS", "SM", "MD", "LG", "XL"])),
});

type ProductData = z.infer<typeof productSchema>;

export default function EditProductCard({
  product,
  onSaveAction,
  onDeleteAction,
}: {
  product: {
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
  onSaveAction: (updatedProduct: ProductData) => void;
  onDeleteAction: (productId: string) => void;
}) {
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (edit) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [edit]);

  const form = useForm<ProductData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      image: product.image,
      price: product.price,
      description: product.description,
      care_recommendation: product.care_recommendation,
      category: product.category as "Men" | "Women" | "Kids",
      brand: product.brand,
      collection: product.collection,
      material: product.material,
      stock: product.stock,
      sizes: product.sizes as ("XS" | "SM" | "MD" | "LG" | "XL")[],
    },
  });

  const handleSave = (values: ProductData) => {
    setEdit(false);
    onSaveAction(values);
  };

  const handleDelete = () => {
    onDeleteAction(product.id);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSave)}
        className={cn(
          "bg-muted p-6  rounded-3xl flex flex-col gap-6 ",
          edit && "col-span-2 row-start-1",
        )}
      >
        <div className="flex items-start gap-4">
          <Image
            src={product.image}
            alt={product.name}
            className="w-40 h-40 object-cover rounded-3xl aspect-square"
            width={160}
            height={160}
          />
          <div className="leading-none space-y-2">
            <h1 className="text-xl font-semibold font-sans">{product.name}</h1>
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>
          <Button
            type="button"
            onClick={() => setEdit((prev) => !prev)}
            className="ml-auto"
          >
            Edit
          </Button>
        </div>

        {edit && (
          <div className="grid grid-cols-2 gap-6">
            {/* Product Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter product name"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      id="price"
                      type="number"
                      placeholder="Enter price"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      placeholder="Product description"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Care Recommendation */}
            <FormField
              control={form.control}
              name="care_recommendation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Care Recommendation</FormLabel>
                  <FormControl>
                    <Textarea
                      id="care_recommendation"
                      placeholder="Care recommendation"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
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

            {/* Brand */}
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input
                      id="brand"
                      type="text"
                      placeholder="Enter brand"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Collection */}
            <FormField
              control={form.control}
              name="collection"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collection</FormLabel>
                  <FormControl>
                    <Input
                      id="collection"
                      type="text"
                      placeholder="Enter collection"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Material */}
            <FormField
              control={form.control}
              name="material"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material</FormLabel>
                  <FormControl>
                    <Input
                      id="material"
                      type="text"
                      placeholder="Enter material"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Stock */}
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      id="stock"
                      type="number"
                      placeholder="Enter stock"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sizes */}
            <FormField
              control={form.control}
              name="sizes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sizes</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-3 gap-2">
                      {["XS", "SM", "MD", "LG", "XL"].map((size) => (
                        <label
                          key={size}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            value={size}
                            checked={field.value?.includes(
                              size as "XS" | "SM" | "MD" | "LG" | "XL",
                            )}
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

            {/* Buttons */}
            <div className="flex gap-4">
              <Button type="submit" className="rounded-lg">
                Save
              </Button>
              <Button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </form>
    </Form>
  );
}
