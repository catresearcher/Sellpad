"use client";

import { ShopProvider } from "@/context/shopContext";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import ShopConsumerLayout from "./shopLayout";
import LoadingScreenProvider from "@/app/loader";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ShopProvider>
      <LoadingScreenProvider>
        <ShopConsumerLayout>{children}</ShopConsumerLayout>
      </LoadingScreenProvider>
    </ShopProvider>
  );
}
