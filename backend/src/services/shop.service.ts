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

export async function getShopsByUserId(userId: string): Promise<Shop[]> {
  try {
    const ownedShops = await prisma.shop.findMany({
      where: { ownerId: userId },
    });

    if (!ownedShops) {
      return [];
    }

    return ownedShops;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function checkShopOwnership(
  userId: string,
  shopId: number,
): Promise<boolean> {
  try {
    const ownedShop = await prisma.shop.findFirst({
      where: { id: shopId, ownerId: userId },
    });

    if (!ownedShop) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

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

export async function createProduct(
  shopId: number,
  values: z.infer<typeof createProductFormSchema>,
): Promise<FullProduct | null> {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          shopId,
          name: values.name,
          url_path: values.url_path,
          visibility: values.visibility,
          description: values.description,
        },
      });

      const variantsData: Prisma.ProductVariantCreateManyInput[] =
        values.variants.map((variant) => {
          const deliverablesArray = variant.deliverables ?? [];
          const stockCount = deliverablesArray.length;

          return {
            productId: product.id,
            name: variant.name,
            description: variant.description,
            price: parseFloat(variant.price),
            slashed_price: variant.slashed_price
              ? parseFloat(variant.slashed_price)
              : null,
            min_quantity: Number(variant.min_quantity),
            max_quantity: variant.max_quantity
              ? Number(variant.max_quantity)
              : null,
            stockCount,
            ...(deliverablesArray.length
              ? { deliverables: deliverablesArray as Prisma.InputJsonValue }
              : {}),
          };
        });

      const totalStock = variantsData.reduce(
        (sum, v) => sum + (v.stockCount || 0),
        0,
      );

      await tx.product.update({
        where: { id: product.id },
        data: { stock: totalStock },
      });

      await tx.productVariant.createMany({
        data: variantsData,
      });

      const fullProduct = await tx.product.findUnique({
        where: { id: product.id },
        include: { variants: true },
      });

      return fullProduct;
    });

    return result;
  } catch (error) {
    console.error("Error creating product:", error);
    return null;
  }
}

export async function updateProduct(
  shopId: number,
  productId: number,
  values: z.infer<typeof updateProductFormSchema>,
): Promise<FullProduct | null> {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const product = await tx.product.update({
        where: { id: productId },
        data: {
          shopId,
          name: values.name,
          visibility: values.visibility,
          description: values.description,
        },
      });

      const submittedIds = values.variants
        .map((v) => v.id)
        .filter((id): id is number => Boolean(id));

      await tx.productVariant.deleteMany({
        where: {
          productId: product.id,
          id: { notIn: submittedIds },
        },
      });

      for (const variant of values.variants) {
        const deliverablesArray = variant.deliverables ?? [];
        const stockCount = deliverablesArray.length;

        if (variant.id) {
          await tx.productVariant.update({
            where: { id: variant.id },
            data: {
              name: variant.name,
              price: parseFloat(variant.price),
              stockCount,
              deliverables: deliverablesArray.length
                ? deliverablesArray
                : undefined,
            },
          });
        } else {
          await tx.productVariant.create({
            data: {
              productId: product.id,
              name: variant.name,
              price: parseFloat(variant.price),
              stockCount,
              deliverables: deliverablesArray.length
                ? deliverablesArray
                : undefined,
            },
          });
        }
      }

      const variants = await tx.productVariant.findMany({
        where: { productId: product.id },
      });
      const totalStock = variants.reduce(
        (sum, v) => sum + (v.stockCount || 0),
        0,
      );

      await tx.product.update({
        where: { id: product.id },
        data: { stock: totalStock },
      });

      const fullProduct = await tx.product.findUnique({
        where: { id: product.id },
        include: { variants: true },
      });

      return fullProduct;
    });

    return result;
  } catch (error) {
    console.error("Error updating product:", error);
    return null;
  }
}

export async function deleteProduct(productId: number) {
  return prisma.$transaction(async (tx) => {
    await tx.productVariant.deleteMany({
      where: {
        productId,
      },
    });

    return tx.product.delete({
      where: {
        id: productId,
      },
    });
  });
}

export async function createShop(data: {
  userId: string;
  name: string;
  subdomain: string;
  description: string;
}) {
  return prisma.shop.create({
    data: {
      name: data.name,
      subdomain: data.subdomain,
      ownerId: data.userId,
    },
  });
}

export async function findShopByTenant(tenant: string) {
  const shop = await prisma.shop.findFirst({
    where: {
      OR: [{ customDomain: tenant }, { subdomain: tenant.split(".")[0] }],
    },
  });
  if (!shop) return false;
  return shop;
}

export default {
  findAllProducts,
  findProductById,
  createProduct,
  updateProduct,
  checkShopOwnership,
  getShopsByUserId,
  deleteProduct,
  createShop,
  findShopByTenant,
};
