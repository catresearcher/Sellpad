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

import { useQuery } from "@tanstack/react-query";

interface ProductsResponse {
  products: MinimalProduct[];
  totalCount: number;
}

const fetchProducts = async (
  shopId: string,
  page: number,
  search: string,
): Promise<ProductsResponse> => {
  const fakeProducts: ProductType[] = [
    {
      id: 1,
      name: "Wireless Mouse",
      description: "Ergonomic wireless mouse with USB receiver",
      stock: 120,
      shopId: "hjkjhkjhk",
      visibility: "Public",
      price: 20,
      createdAt: new Date("2025-01-10T10:00:00Z"),
      updatedAt: new Date("2025-02-15T12:00:00Z"),
    },
    {
      id: 2,
      name: "Mechanical Keyboard",
      description: "RGB backlit mechanical keyboard with blue switches",
      stock: 45,
      shopId: "hjkjhkjhk",
      visibility: "Public",
      price: 20,
      createdAt: new Date("2025-03-05T09:30:00Z"),
      updatedAt: new Date("2025-03-20T11:15:00Z"),
    },
    {
      id: 3,
      name: 'Gaming Monitor 27"',
      description: "144Hz QHD gaming monitor",
      stock: 20,
      shopId: "hjkjhkjhk",
      price: 20,
      visibility: "Private",
      createdAt: new Date("2025-01-25T14:00:00Z"),
      updatedAt: new Date("2025-02-10T16:45:00Z"),
    },
    {
      id: 4,
      name: "USB-C Hub",
      description: null,
      stock: 200,
      shopId: "asdsadsad",
      price: 20,
      visibility: "Public",
      createdAt: new Date("2025-04-01T08:00:00Z"),
      updatedAt: new Date("2025-04-02T10:00:00Z"),
    },
    {
      id: 5,
      name: "Noise Cancelling Headphones",
      description: "Over-ear headphones with active noise cancellation",
      stock: 35,
      price: 20,
      shopId: "asdsadsads",
      visibility: "Unlisted",
      createdAt: new Date("2025-02-12T13:20:00Z"),
      updatedAt: new Date("2025-02-18T15:40:00Z"),
    },
    {
      id: 6,
      name: "Portable SSD 1TB",
      description: "High-speed external SSD with USB 3.2",
      stock: 60,
      shopId: "asdsadsad",
      price: 20,
      visibility: "Public",
      createdAt: new Date("2025-03-18T07:45:00Z"),
      updatedAt: new Date("2025-03-25T09:10:00Z"),
    },
    {
      id: 7,
      name: "Smartwatch",
      description: "Fitness tracking smartwatch with heart rate monitor",
      stock: 80,
      price: 20,
      shopId: "asdsadsads",
      visibility: "Private",
      createdAt: new Date("2025-01-30T11:10:00Z"),
      updatedAt: new Date("2025-02-05T12:00:00Z"),
    },
    {
      id: 8,
      name: "Bluetooth Speaker",
      description: "Portable waterproof speaker",
      stock: 150,
      price: 20,
      shopId: "asdsadsads",
      visibility: "Public",
      createdAt: new Date("2025-04-10T10:25:00Z"),
      updatedAt: new Date("2025-04-12T11:50:00Z"),
    },
  ];
  const PAGE_SIZE = 5;

  let filtered = fakeProducts.filter((p) => {
    return p.shopId === shopId;
  });

  if (search) {
    const lower = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.description?.toLowerCase().includes(lower),
    );
  }

  const start = (page - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);

  return {
    products: filtered,
    totalCount: filtered.length,
  };
};

export const useProducts = (shopId: string, page: number, search: string) => {
  return useQuery<ProductsResponse, Error>({
    queryKey: ["products", page, search],
    queryFn: () => fetchProducts(shopId, page, search),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
