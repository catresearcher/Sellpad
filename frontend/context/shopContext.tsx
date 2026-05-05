"use client";
import { LoginApi } from "@/api/auth/login";
import { fetchShops } from "@/api/shops/shops";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React from "react";

export type Shop = {
  id: string;
  name: string;
  logo: string;
  plan: string;

  subdomain: string;
  analytics: {
    Products: number;
    Users: number;
    Revenue: number;
  };
};

type ShopContextType = {
  shops: Shop[];
  selectedShop?: Shop;
  isLoading: boolean;
};

export const ShopContext = React.createContext<ShopContextType | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const params = useParams();
  console.log("Context");

  const shopId = React.useMemo(() => {
    return params?.shopId ? String(params.shopId) : undefined;
  }, [params]);

  const { data = [], isLoading } = useQuery({
    queryKey: ["shopsdata"],
    queryFn: fetchShops,
  });

  const shops = (data ?? []) as Shop[];

  const selectedShop = React.useMemo(() => {
    if (!shopId) return shops[0];
    return data.find((t) => t.id === shopId);
  }, [data, shopId]);

  return (
    <ShopContext.Provider
      value={{
        shops,
        selectedShop,
        isLoading,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const ctx = React.useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
