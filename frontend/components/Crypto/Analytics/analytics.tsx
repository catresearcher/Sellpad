"use client";

import { CryptoCard } from "./card";
import { useShop } from "@/context/shopContext";

const cryptoMeta: Record<
  string,
  {
    icon: string;
    color: string;
    name: string;
    shorten: string;
  }
> = {
  BITCOIN: {
    icon: "icon-[fa6-brands--btc]",
    name: "Bitcoin",
    shorten: "BTC",
    color: "bg-yellow-600",
  },

  LITECOIN: {
    icon: "icon-[token--ltc]",
    name: "Litecoin",
    shorten: "LTC",
    color: "bg-blue-500",
  },

  ETHEREUM: {
    icon: "icon-[token--ethereum]",
    name: "Ethereum",
    shorten: "ETH",
    color: "bg-sky-600",
  },
};

export default function CryptoAnalytics() {
  const { selectedShop } = useShop();

  if (!selectedShop) return null;

  return (
    <div className="w-full flex flex-col gap-4">
      <div
        className={`
    grid grid-cols-1 gap-4
    ${
      selectedShop?.wallets?.length === 1
        ? "lg:grid-cols-1"
        : selectedShop?.wallets?.length === 2
          ? "lg:grid-cols-2"
          : selectedShop?.wallets?.length === 3
            ? "lg:grid-cols-3"
            : "lg:grid-cols-4"
    }
  `}
      >
        {selectedShop?.wallets?.map((wallet: any) => {
          const meta = cryptoMeta[wallet.currency];

          if (!meta) return null;

          return (
            <CryptoCard
              key={wallet.address}
              title={{
                icon: meta.icon,
                name: meta.name,
                shorten: meta.shorten,
                color: meta.color,
              }}
              values={{
                crypto: wallet.balance,
                currency: wallet.usd_value,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
