"use client";

import React from "react";
import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
} from "lucide-react";

export type Shop = {
  id: string;
  name: string;
  logo: React.ReactNode;
  plan: string;
  analytics: {
    Products: number;
    Users: number;
    Revenue: number;
  };
};

type ShopContextType = {
  shops: Shop[];
  selectedShop?: Shop;
};

export const ShopContext = React.createContext<ShopContextType | null>(null);

export function ShopProvider({
  children,
  shopId,
}: {
  children: React.ReactNode;
  shopId: string;
}) {
  const shops = React.useMemo<Shop[]>(
    () => [
      {
        id: "hjkjhkjhk",
        name: "Apple Inc",
        logo: <GalleryVerticalEndIcon />,
        plan: "Enterprise",
        analytics: {
          Products: 225,
          Users: 1725,
          Revenue: 120240,
        },
      },
      {
        id: "bgbgfhfgh",
        name: "Teemu Oy.",
        logo: <AudioLinesIcon />,
        plan: "Startup",
        analytics: {
          Products: 15,
          Users: 55,
          Revenue: 4240,
        },
      },
      {
        id: "asdasdsad",
        name: "TeemuGang",
        logo: <TerminalIcon />,
        plan: "Free",
        analytics: {
          Products: 25,
          Users: 125,
          Revenue: 24240,
        },
      },
    ],
    [],
  );

  const selectedShop = React.useMemo(
    () => shops.find((t) => t.id === shopId),
    [shops, shopId],
  );

  return (
    <ShopContext.Provider value={{ shops, selectedShop }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const ctx = React.useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
