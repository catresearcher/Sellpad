import { fetchProducts } from "@/api/products";
import { FullProduct } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

interface ProductResponse {
  products: any;
  totalCount: number;
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    select: (data) => data?.products ?? null,
  });
}
