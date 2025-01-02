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

      const { data, error } = await supabase.from("Orders").select("*");

      if (error) throw error;

      setOrders(data || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders. Please try again later.");
    } finally {
      setLoading(false);
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
