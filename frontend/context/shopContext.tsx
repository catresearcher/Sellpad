"use client";
import { LoginApi } from "@/api/auth/login";
import { fetchShops } from "@/api/shops/shops";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";

export type Shop = {
  id: string;
  name: string;
  logo: string;
  plan: string;

  subdomain: string;
  analytics: {
    Products: number;
    Users: { date: string; uv: number }[];
    Revenue: { date: string; uv: number }[];
  };
};

type ShopContextType = {
  shops: Shop[];
  selectedShop?: Shop;
  isLoading: boolean;
  date: DateRange | undefined;
  setDate: (value: DateRange | undefined) => void;
};

export const ShopContext = React.createContext<ShopContextType | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const params = useParams();

  const shopId = React.useMemo(() => {
    return params?.shopId ? String(params.shopId) : undefined;
  }, [params]);

  const { data = [], isLoading } = useQuery({
    queryKey: ["shopsdata"],
    queryFn: fetchShops,
  });

  console.log(data);

  const shops = (data ?? []) as Shop[];

  const selectedShop = React.useMemo(() => {
    if (!shopId) return shops[0];
    return data.find((t) => t.id === shopId);
  }, [data, shopId]);

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  return (
    <ShopContext.Provider
      value={{
        shops,
        selectedShop,
        isLoading,
        date,
        setDate,
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
