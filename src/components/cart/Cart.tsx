"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/providers/CartProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import supabase from "@/lib/supabase";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Cart() {
  const { state, dispatch } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUserId(session?.user?.id || null);
    };

    checkAuth();

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const updateQuantity = (
    productId: string,
    size: string,
    quantity: number,
  ) => {
    if (quantity < 1) return;
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { productId, size, quantity },
    });
  };

  const removeItem = (productId: string, size: string) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: { productId, size },
    });
  };

  const handleCheckout = async () => {
    if (!userId) {
      toast.error("Please login to complete your purchase");
      router.push("/login?redirect=/cart");
      return;
    }

    if (state.items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setIsSubmitting(true);

      // First, create the order
      const { data: orderData, error: orderError } = await supabase
        .from("Orders")
        .insert({
          status: "pending",
          user_id: userId,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Then, create order items
      const orderItems = state.items.map((item) => ({
        order_id: orderData.id,
        product_id: item.productId,
        quantity: item.quantity,
        size: item.size,
        price_at_time: item.price,
      }));

      const { error: itemsError } = await supabase
        .from("OrderItems")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear the cart
      dispatch({ type: "CLEAR_CART" });
      toast.success("Order placed successfully!");
      router.push(`/`);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {!userId && state.items.length > 0 && (
        <div className="mb-6 p-4 bg-muted rounded-lg">
          <p className="text-sm">
            Please{" "}
            <Link href="/login?redirect=/cart" className="underline">
              login
            </Link>{" "}
            to complete your purchase
          </p>
        </div>
      )}

      <div className="grid grid-cols-1  gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-full">
          {state.items.map((item) => (
            <div
              key={`${item.productId}-${item.size}`}
              className="flex gap-4 border-b py-4"
            >
              <div className="w-24 h-24 relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <div className="flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-muted-foreground">Size: {item.size}</p>
                <p>${item.price}</p>

                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.size,
                          item.quantity - 1,
                        )
                      }
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          item.productId,
                          item.size,
                          parseInt(e.target.value) || 1,
                        )
                      }
                      className="w-16 text-center mx-2"
                      min={1}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.size,
                          item.quantity + 1,
                        )
                      }
                    >
                      +
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.productId, item.size)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="col-span-full">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button
              className="w-full rounded-full"
              onClick={handleCheckout}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Checkout"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
