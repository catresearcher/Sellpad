import prisma from "../db";
import {
  Prisma,
  ProductVariant,
  ProductVisibility,
  Shop,
} from "../lib/database/generated";

import { FullProduct, MinimalProduct, MinimalProductWithPrice } from "../types";

import {
  createProductFormSchema,
  updateProductFormSchema,
} from "../schemas/form.schema";
import * as z from "zod";

export async function findAllProducts(
  shopId: number,
  page: number = 1,
  search: string = "",
): Promise<{ result: MinimalProductWithPrice[]; totalCount: number } | null> {
  try {
    const take = 10;
    const skip = (page - 1) * take;

    const totalCount = await prisma.product.count({
      where: {
        name: {
          contains: search,
        },
        shopId,
      },
    });

    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: search,
        },
        shopId,
      },
      skip,
      take,
      orderBy: { createdAt: "asc" },
      include: {
        variants: {
          select: {
            price: true,
          },
        },
      },
    });

    const result: MinimalProductWithPrice[] = products.map((product) => {
      let price: string | undefined;
      if (product.variants && product.variants.length > 0) {
        const prices = product.variants.map((variant) => Number(variant.price));
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        price =
          min === max
            ? `${min.toFixed(2)}`
            : `${min.toFixed(2)}-${max.toFixed(2)}`;
      }
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        stock: product.stock,
        visibility: product.visibility as "Public" | "Private" | "Unlisted",
        price,
      };
    });

    return { result, totalCount };
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}

export async function findProductVariantById(
  productId: number,
  variantId: number,
): Promise<ProductVariant | null> {
  try {
    const product = await prisma.productVariant.findFirst({
      where: { productId, id: variantId },
    });

    if (!product) return null;

    return {
      ...product,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}

export async function findProductById(
  id: number,
  shopId?: number,
): Promise<FullProduct | null> {
  try {
    const product = await prisma.product.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        visibility: true,
        shopId: true,
        variants: true,
      },
    });

    if (!product) return null;
    if (shopId && product.shopId !== shopId) return null;

    return {
      ...product,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}

export default {
  findAllProducts,
  findProductById,
};
