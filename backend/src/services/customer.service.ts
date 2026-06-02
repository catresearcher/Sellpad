import prisma from "../db";
import { Customer } from "../types/customer";

export async function getAllCustomers(
  shopId: number,
  page: number = 1,
  search: string = "",
): Promise<{
  result: Customer[];
  pages: { totalCount: number; pages: number };
} | null> {
  try {
    const take = 10;
    const skip = (page - 1) * take;

    const totalCount = await prisma.shopCustomer.count({
      where: {
        shopId,
        email: {
          contains: search,
        },
      },
    });

    const customers = await prisma.shopCustomer.findMany({
      where: {
        shopId,
        email: {
          contains: search,
        },
      },
      skip,
      take,
      orderBy: { createdAt: "asc" },
    });

    return {
      result: customers.map((c) => ({
        id: c.id,
        shopId: c.shopId,
        email: c.email,
        notes: c.notes,
        createdAt: c.createdAt.toISOString(),
        updatedAt: c.updatedAt.toISOString(),
        deletedAt: c.deletedAt ? c.deletedAt.toISOString() : null,
      })),
      pages: {
        totalCount,
        pages: Math.ceil(totalCount / take),
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}

export default {
  getAllCustomers,
};
