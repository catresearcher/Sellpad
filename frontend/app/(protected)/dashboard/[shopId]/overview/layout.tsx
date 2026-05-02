"use client";
import ShopAnalytics from "@/components/Sections/Dashboard/Shop/analytics";
import { useShop } from "@/context/shopContext";

export default function ShopOverviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const shop = useShop();
  return (
    <div className="flex flex-col gap-4">
      <ShopAnalytics
        Products={shop.analytics.Products}
        Users={shop.analytics.Users}
        Revenue={shop.analytics.Revenue}
      />
      {children}
    </div>
  );
}
