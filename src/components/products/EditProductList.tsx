"use client";

import { EditProductCard } from "@/components/products";
import supabase from "@/lib/supabase";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export default function EditProductList() {
  const [products, setProducts] = useState<Product[]>([]); // Use Product[] as the state type

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("Products").select("*");
    if (error) {
      console.error("Error fetching products:", error.message);
      return;
    }
    setProducts(data);
  };

  const handleSaveAction = async (values: Product, productId: string) => {
    try {
      const { error } = await supabase
        .from("Products")
        .update(values)
        .eq("id", productId);

      if (error) {
        throw error;
      }
      toast.success("Product updated successfully");
      fetchProducts(); // Refresh the products list
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product.");
    }
  };

  const handleDeleteAction = async (productId: string) => {
    try {
      const { error } = await supabase
        .from("Products")
        .delete()
        .eq("id", productId);

      if (error) {
        throw error;
      }

      toast.success("Product deleted successfully");
      fetchProducts(); // Refresh the products list
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product.");
    }
  };

  const [filterBy, setFilterBy] = useState("All");
  const [editExpandedId, setEditExpandedId] = useState<string | null>(null);

  let filteredProducts;

  if (filterBy === "All") {
    filteredProducts = products;
  } else {
    filteredProducts = products.filter(
      (product) => product.category === filterBy,
    );
  }
  return (
    <div>
      <Select onValueChange={(value) => setFilterBy(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="Men">Men</SelectItem>
          <SelectItem value="Women">Women</SelectItem>
          <SelectItem value="Kids">Kids</SelectItem>
        </SelectContent>
      </Select>

      <div className="gap-4 grid grid-cols-2 mt-6">
        {filteredProducts?.map((product) => (
          <EditProductCard
            product={product}
            key={product.id}
            onSaveAction={(updatedProduct) =>
              handleSaveAction(updatedProduct as Product, product.id)
            }
            onDeleteAction={() => handleDeleteAction(product.id)}
            editExpandedId={editExpandedId}
            setEditExpandedIdAction={setEditExpandedId}
          />
        ))}
      </div>
    </div>
  );
}
