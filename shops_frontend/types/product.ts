export type ProductVisibility = "Public" | "Private" | "Unlisted";

export type ProductType = {
  name: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  stock: number;
  shopId: number;
  description: string | null;
  url_path?: string;
  visibility: ProductVisibility;
};

export type MinimalProduct = Pick<ProductType, "id" | "name" | "visibility">;

export interface ProductVariantType {
  id: number;
  name: string;
  description?: string;
  price: string;
  slashed_price?: string;
  min_quantity: number;
  max_quantity?: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  deliverables?: string[];
}

export interface FullProduct extends MinimalProduct {
  description: string | null;
  url_path?: string;
  variants?: ProductVariantType[];
}
