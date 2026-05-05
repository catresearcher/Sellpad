"use client";
import ShopAnalytics from "@/components/Sections/Dashboard/Shop/analytics";
import PageTitle from "@/components/ui/pageTitle";
import { useShop } from "@/context/shopContext";
import React from "react";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 12) return { text: "Good morning", emoji: "☀️" };
  if (hour >= 12 && hour < 18) return { text: "Good afternoon", emoji: "🌤️" };
  if (hour >= 18 && hour < 22) return { text: "Good evening", emoji: "🌇" };
  return { text: "Good night", emoji: "🌙" };
}

export default function ShopOverviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { selectedShop } = useShop();

  if (!selectedShop) return <div>Shop not found</div>;

  const greeting = getGreeting();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        {" "}
        <PageTitle
          title={`${greeting.text}, Teemu ${greeting.emoji}`}
          description="Here you can view your shops analytics"
        />
      </div>
      <ShopAnalytics
        Products={selectedShop.analytics.Products}
        Users={selectedShop.analytics.Users}
        Revenue={selectedShop.analytics.Revenue}
      />
      {children}
    </div>
  );
}
