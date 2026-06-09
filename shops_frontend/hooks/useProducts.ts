import { fetchProducts } from "@/api/products";
import { FullProduct } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}
