// app/context/shop-context.tsx
"use client";

import React, { createContext, useContext } from "react";

import { ReactNode } from "react";

export type Shop = {
  id: number;
  name: string;
  logo: ReactNode;
  plan: "Enterprise" | "Startup" | "Free" | string;
  analytics: {
    Products: number;
    Users: number;
    Revenue: number;
  };
};

const ShopContext = createContext<Shop | null>(null);

export const ShopProvider = ({
  value,
  children,
}: {
  value: Shop;
  children: React.ReactNode;
}) => {
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
};
