import { fetchTransactions } from "@/api/crypto/transactions";
import { useQuery } from "@tanstack/react-query";

export type Transaction = {
  type: string;
  customer: {
    username: string;
    role: string;
  };
  status: string;
  currency: string;
  cryptoAmount: string;
  totalAmount: string;
  txid: string;
  createdAt: string;
};

export type TransactionsResponse = {
  transactions: Transaction[];
  pages: {
    totalPages: number;
    totalCount: number;
  };
};

export const useTransactions = (shopId: number) => {
  return useQuery<TransactionsResponse, Error>({
    queryKey: ["transactions", shopId],
    queryFn: () => fetchTransactions(shopId),
    enabled: !!shopId,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
