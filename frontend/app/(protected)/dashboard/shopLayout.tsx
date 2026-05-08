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

  const { shops, selectedShop } = useShop();
  const shopExists = shops?.some((s) => s.id === shopId);

  useEffect(() => {
    if (!shops?.length) return;

    if (!shopId) return;

    if (!shopExists) {
      router.replace(`/dashboard/${shops[0].id}/overview`);
    }
  }, [shops, shopExists, router]);

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
