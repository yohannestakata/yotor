"use client";

import EditProductCard from "@/components/ui/EditProductCard";
import supabase from "@/lib/supabase";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditProductList() {
  const [products, setProducts] = useState([]);

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

  const handleSaveAction = async (values, productId) => {
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

  return (
    <div className="gap-6 grid grid-cols-2">
      {products?.map((product) => (
        <EditProductCard
          product={product}
          key={product.id}
          onSaveAction={(updatedProduct) =>
            handleSaveAction(updatedProduct, product.id)
          }
          onDeleteAction={() => handleDeleteAction(product.id)}
        />
      ))}
    </div>
  );
}
