"use client";

import { useShop } from "@/context/shopContext";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/Sections/Dashboard/Header/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ShopConsumerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const shopId = params.shopId as string;

  console.log("shopId", shopId);

  const { shops, selectedShop, isLoading } = useShop();
  const shopExists = shops?.some((s) => s.id === shopId);

  useEffect(() => {
    if (isLoading) return;
    if (!shops?.length) return;

    if (!shopExists || !shopId === undefined) {
      router.replace(`/dashboard/${shops[0].id}/overview`);
    }
  }, [isLoading, shops, shopExists, router]);

  if (isLoading) return <div>loading</div>;

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
