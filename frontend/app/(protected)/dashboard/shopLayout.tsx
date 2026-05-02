"use client";

import { useShop } from "@/context/shopContext";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/Sections/Dashboard/Header/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { useParams, useRouter } from "next/navigation";

export default function ShopConsumerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();

  const { shops, selectedShop } = useShop();

  return (
    <SidebarProvider>
      <AppSidebar teams={shops} />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
