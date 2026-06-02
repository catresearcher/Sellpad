"use client";
import { LoginApi } from "@/api/auth/login";
import { fetchShops } from "@/api/shops/shops";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { useUser } from "./userContext";
import { Shop } from "@/types/shop.type";

type ShopContextType = {
  shops: Shop[];
  selectedShop?: Shop;
  setSelectedShop: React.Dispatch<React.SetStateAction<Shop | undefined>>;
  isLoading: boolean;
  date: DateRange | undefined;
  setDate: (value: DateRange | undefined) => void;
  addShop: (shop: Shop) => void;
};

export const ShopContext = React.createContext<ShopContextType | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const params = useParams();
  const queryClient = useQueryClient();
  const [selectedShop, setSelectedShop] = useState<Shop | undefined>();

  const shopId = React.useMemo(() => {
    return params?.shopId ? Number(params.shopId) : undefined;
  }, [params]);

  const { data = [], isLoading } = useQuery({
    queryKey: ["shopsdata", user],
    queryFn: fetchShops,
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });

  const shops = (data ?? []) as Shop[];

  const addShop = React.useCallback(
    (shop: Shop) => {
      queryClient.setQueryData(["shopsdata", user], (oldData: Shop[] = []) => {
        return [...oldData, shop];
      });
    },
    [queryClient, user],
  );

  React.useEffect(() => {
    if (!shops.length) return;

    if (!shopId) {
      setSelectedShop(shops[0]);
      return;
    }

    const foundShop = shops.find((shop) => shop.id === shopId);

    setSelectedShop(foundShop);
  }, [shops, shopId]);

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  return (
    <ShopContext.Provider
      value={{
        shops,
        selectedShop,
        setSelectedShop,
        isLoading,
        date,
        setDate,
        addShop,
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
