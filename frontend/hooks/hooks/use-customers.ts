import { fetchCustomers } from "@/api/customers/customers";
import { Customer } from "@/types/customer.type";
import { useQuery } from "@tanstack/react-query";

export interface CustomerResponse {
  customers: Customer[];
  pages: {
    totalCount: number;
    pagesCount: number;
  };
}

export const useCustomers = (shopId: number, page: number, search: string) => {
  return useQuery<CustomerResponse, Error>({
    queryKey: ["customers", shopId, page, search],
    queryFn: () => fetchCustomers(shopId, page, search),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
