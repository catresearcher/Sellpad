import {
  Product as ProductType,
  ProductVariant as ProductVariantType,
  User as UserType,
} from "../lib/database/generated";

export type User = UserType;
export type UserWithoutPassword = Omit<UserType, "password">;

export type MinimalProduct = Pick<ProductType, "id" | "name" | "visibility">;
export interface MinimalProductWithPrice {
  id: number;
  name: string;
  stock: number;
  visibility: "Public" | "Private" | "Unlisted";
  priceRange?: string;
}

export interface FullProduct extends MinimalProduct {
  description: string | null;
  variants?: ProductVariantType[];
}
