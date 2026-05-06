"use client";
import ShopAnalyticDate from "@/components/Sections/Dashboard/Shop/date-picker";
import PageTitle from "@/components/ui/pageTitle";
import { useShop } from "@/context/shopContext";
import React, { useState } from "react";
import { addDays, format } from "date-fns";

import { type DateRange } from "react-day-picker";

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
  const { selectedShop, date, setDate } = useShop();

  if (!selectedShop) return <div>Shop not found</div>;

  const greeting = getGreeting();

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between w-full">
        {" "}
        <PageTitle
          title={`${greeting.text}, Teemu ${greeting.emoji}`}
          description="Here you can view your shops analytics"
        />
        <ShopAnalyticDate date={date} setDate={setDate} />
      </div>

      {children}
    </div>
  );
}
