"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useCurrentUser } from "@/context/user-context";

export function useSelectedShop() {
  const user = useCurrentUser();
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;

    const stored = localStorage.getItem("shopId");
    let shopIdToUse: number | null = null;

    if (stored) {
      try {
        const parsed = JSON.parse(stored) as number;
        const valid = user.shops.some((s) => s.id === parsed);
        if (valid) shopIdToUse = parsed;
      } catch {
        console.warn("Invalid stored shop ID");
      }
    }

    if (!shopIdToUse && user.shops.length) {
      shopIdToUse = user.shops[0].id;
      localStorage.setItem("shopId", JSON.stringify(shopIdToUse));
    }

    setSelectedShopId(shopIdToUse);
  }, [user]);

  const changeShop = useCallback(
    (newId: number) => {
      if (user?.shops.some((s) => s.id === newId)) {
        setSelectedShopId(newId);
        localStorage.setItem("shopId", JSON.stringify(newId));
      } else {
        console.warn("Attempted to select invalid shop ID");
      }
    },
    [user]
  );

  const selectedShop = useMemo(
    () => user?.shops.find((s) => s.id === selectedShopId) || null,
    [user, selectedShopId]
  );

  return { selectedShopId, selectedShop, changeShop };
}
