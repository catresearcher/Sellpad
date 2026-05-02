"use client";

import { ShopProvider } from "@/context/shopContext";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import ShopConsumerLayout from "./dashboard/shopLayout";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const router = useRouter();

  const shopId = params.shopId as string;

  return (
    <ShopProvider shopId={shopId}>
      <ShopConsumerLayout>{children}</ShopConsumerLayout>
    </ShopProvider>
  );
}
