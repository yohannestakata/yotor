"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

type Order = {
  id: string;
  user_id: string;
  created_at: string;
  status: "pending" | "completed";
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("Orders")
        .select("*")
        .eq("status", "pending");

      console.log(data);

      if (error) throw error;

      setOrders(data || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const markOrderCompleted = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from("Orders")
        .update({ status: "completed" })
        .eq("id", orderId);

      if (error) throw error;

      // Remove the order from the pending list
      setOrders(orders.filter((order) => order.id !== orderId));
      toast.success("Order marked as completed!");
    } catch (err) {
      console.error("Error updating order:", err);
      toast.error("Failed to mark order as completed");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="p-8">Loading orders...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  return (
    <div className="p-8">
      <Table>
        <TableCaption>A list of all pending orders in the system.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Customer ID</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.user_id}</TableCell>
              <TableCell>
                {new Date(order.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => markOrderCompleted(order.id)}
                >
                  Mark as Completed
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
