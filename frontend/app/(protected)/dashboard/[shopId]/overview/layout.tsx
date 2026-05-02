"use client";
import ShopAnalytics from "@/components/Sections/Dashboard/Shop/analytics";
import { useShop } from "@/context/shopContext";
import React from "react";

export default function ShopOverviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { selectedShop } = useShop();

  if (!selectedShop) return <div>Shop not found</div>;

  return (
    <div className="flex flex-col gap-4">
      <ShopAnalytics
        Products={selectedShop.analytics.Products}
        Users={selectedShop.analytics.Users}
        Revenue={selectedShop.analytics.Revenue}
      />
      {children}
    </div>
  );
}
