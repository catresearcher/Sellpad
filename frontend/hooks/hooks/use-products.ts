import { MinimalProduct } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface ProductsResponse {
  products: MinimalProduct[];
  totalCount: number;
}

const fetchProducts = async (
  shopId: number,
  page: number,
  search: string,
): Promise<ProductsResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/shop/${shopId}/products?page=${page}&search=${search}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return data;
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      shopId,
      productId,
    }: {
      shopId: number;
      productId: any;
    }) => {
      return toast.promise(
        (async () => {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/shop/${shopId}/products/${productId}`,
            {
              method: "DELETE",
              credentials: "include",
            },
          );

          if (!response.ok) {
            throw new Error("Failed to delete product");
          }

          return { productId };
        })(),
        {
          pending: "Deleting product...",
          success: "Product deleted successfully",
          error: "Something went wrong",
        },
      );
    },

    onSuccess: ({ productId }, { shopId }) => {
      queryClient.setQueriesData(
        {
          queryKey: ["products", shopId],
        },
        (oldData: any) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            products: oldData.products.filter(
              (product: any) => product.id !== productId,
            ),
          };
        },
      );
    },
  });
};

export const useProducts = (
  shopId: number | undefined,
  page: number,
  search: string,
) => {
  return useQuery<ProductsResponse, Error>({
    queryKey: ["products", shopId, page, search],
    queryFn: () => fetchProducts(shopId!, page, search),
    refetchOnWindowFocus: false,
    enabled: !!shopId,
    retry: 1,
  });
};
