export type Shop = {
  id: number;
  name: string;
  logo: string;
  plan: string;
  subdomain: string;
  wallets: {
    id: string;
    userId: string;
    shopId: number;
    isActive: boolean;
    currency: "BITCOIN" | "ETHEREUM" | "LITECOIN";
    subIndex: number;
    address: string;
    balance: number;
    createdAt: string;
    updatedAt: string;
  }[];
  analytics: {
    Orders: { date: string; uv: number }[];
    Users: { date: string; uv: number }[];
    Revenue: { date: string; uv: number }[];
  };
};
