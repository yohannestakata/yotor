import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Orders",
      url: "/dashboard/orders",
      items: [
        {
          title: "Pending",
          url: "/dashboard/orders/pending",
        },
        {
          title: "Completed",
          url: "/dashboard/orders/completed",
        },
      ],
    },
    {
      title: "Products",
      url: "#",
      items: [
        {
          title: "All Products",
          url: "/dashboard/products",
        },
        {
          title: "Add Products",
          url: "/dashboard/add-product",
        },
      ],
    },
    {
      // Total sales (daily, weekly, monthly).
      // Total orders (pending, completed, canceled).
      // Revenue trends (charts and graphs).
      // Top-selling products.
      // Low-stock alerts.
      title: "Analytics",
      url: "#",
      items: [
        {
          title: "Sales Report",
          url: "#",
        },
      ],
    },
    {
      title: "Users",
      url: "#",
      items: [
        {
          title: "Manage Users",
          url: "#",
          isActive: true,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="leading-none px-2">
          <div className="text-2xl font-display font-medium">YOTOR </div>
          <div className="text-muted-foreground">Admin Dashboard</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
