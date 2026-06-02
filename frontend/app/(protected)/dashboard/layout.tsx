"use client";

import React from "react";
import ShopConsumerLayout from "./shopLayout";
import LoadingScreenProvider from "@/app/loader";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoadingScreenProvider>
      <ShopConsumerLayout>{children}</ShopConsumerLayout>
    </LoadingScreenProvider>
  );
}
