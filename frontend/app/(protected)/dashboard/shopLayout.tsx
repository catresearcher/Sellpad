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
  const shopId = params.shopId as string;
  const router = useRouter();

  const { shops, selectedShop } = useShop();

  React.useEffect(() => {
    if (!selectedShop) {
      router.replace(`/dashboard/${shops[0].id}/overview`);
    }
  }, [shopId, router, shops]);

  if (!selectedShop) return <div>Shop not found</div>;

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
