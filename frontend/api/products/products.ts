import { FullProduct } from "@/types/user.type";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

interface ProductsResponse {
  product: FullProduct[];
  pages: {
    totalCount: number;
    pages: number;
  };
}

export const fetchProducts = async (
  shopId: number,
  page: number,
  search: string,
): Promise<ProductsResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    search,
  });

  const response = await fetch(
    `${apiUrl}/shop/${shopId}/products?${params.toString()}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cards");
  }

  return response.json();
};

interface ProductResponse {
  product: FullProduct;
}

export const GetProduct = async (
  productId: number,
  shopId?: number,
): Promise<ProductResponse> => {
  const response = await fetch(
    `${apiUrl}/shop/${shopId}/products/${productId}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cards");
  }

  return response.json();
};
