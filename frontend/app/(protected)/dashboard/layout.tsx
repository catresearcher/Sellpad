"use client";

import { ShopProvider } from "@/context/shopContext";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import ShopConsumerLayout from "./shopLayout";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ShopProvider>
      <ShopConsumerLayout>{children}</ShopConsumerLayout>
    </ShopProvider>
  );
}
