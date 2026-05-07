export type ProductVisibility = "Public" | "Private" | "Unlisted";

export type ProductType = {
  name: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  stock: number;
  price: number;
  shopId: string;
  description: string | null;
  visibility: ProductVisibility;
};

export type MinimalProduct = Pick<ProductType, "id" | "name" | "visibility">;

export interface ProductVariantType {
  id: number;
  name: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  deliverables?: string[];
}

export interface FullProduct extends MinimalProduct {
  description: string | null;
  variants?: ProductVariantType[];
}

import { fetchProducts } from "@/api/products/products";
import { useQuery } from "@tanstack/react-query";

interface ProductsResponse {
  products: MinimalProduct[];
  totalCount: number;
}

export const useProducts = (shopId: string, page: number, search: string) => {
  return useQuery<ProductsResponse, Error>({
    queryKey: ["products", page, search],
    queryFn: () => fetchProducts(shopId, page, search),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
