"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import toast from "react-hot-toast";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.string().url("Image URL must be valid"),
});

type ProductData = z.infer<typeof productSchema>;

export function EditProductCard({
  product,
  onSave,
  onDelete,
}: {
  product: { id: string; name: string; image: string };
  onSave: (updatedProduct: ProductData) => void;
  onDelete: (productId: string) => void;
}) {
  const form = useForm<ProductData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      image: product.image,
    },
  });

  const handleSave = (values: ProductData) => {
    toast.success("Product updated successfully");
    onSave(values);
  };

  const handleDelete = () => {
    toast.success("Product deleted successfully");
    onDelete(product.id);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSave)}
        className={cn("bg-muted p-6 rounded-3xl flex flex-col gap-6")}
      >
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-xl font-bold">Edit Product</h1>
          <p className="text-sm text-muted-foreground">
            Modify the product details below.
          </p>
        </div>

        <div className="grid gap-6">
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

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    id="image"
                    type="url"
                    placeholder="Enter image URL"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
      </form>
    </Form>
  );
}
