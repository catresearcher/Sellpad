import { fetchWithdraws } from "@/api/crypto/withdraw";
import { useQuery } from "@tanstack/react-query";

export type Withdraw = {
  status: string;
  method: string;
  amount: number;
  usdValue: number;
  recipient: string;
  transactionId: string;
  date: string;
};

export type WithdrawsResponse = {
  withdraws: Withdraw[];
  pages: {
    totalPages: number;
    totalCount: number;
  };
};

export const useWithdraws = (shopId: number, page: number) => {
  return useQuery<WithdrawsResponse, Error>({
    queryKey: ["withdraws", shopId, page],
    queryFn: () => fetchWithdraws(shopId, page),
    enabled: !!shopId,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
