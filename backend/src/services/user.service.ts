import prisma from "../db";
import { createHash } from "crypto";
import { Prisma, TransactionType, User } from "../lib/database/generated";
import { getCryptoPriceUSD } from "./walletService";

export type DashboardShop = {
  id: number;
  name: string;
  logo: string;
  plan: string;

  subdomain: string;

  analytics: {
    Orders: { date: string; uv: number }[];
    Users: { date: string; uv: number }[];
    Revenue: { date: string; uv: number }[];
  };
};

const daysInMonth: Record<number, number> = {
  0: 31,
  1: 28,
  2: 31,
  3: 30,
  4: 31,
  5: 30,
  6: 31,
  7: 31,
  8: 30,
  9: 31,
  10: 30,
  11: 31,
};

const pad = (n: number) => String(n).padStart(2, "0");

const generateEmptyYear = () => {
  const data: { date: string; uv: number }[] = [];

  for (let month = 0; month < 12; month++) {
    for (let day = 1; day <= daysInMonth[month]; day++) {
      data.push({
        date: `2026-${pad(month + 1)}-${pad(day)}`,
        uv: 0,
      });
    }
  }

  return data;
};

const mergeIntoBase = (
  base: { date: string; uv: number }[],
  map: Map<string, number>,
) => {
  return base.map((item) => ({
    date: item.date,
    uv: map.get(item.date) ?? 0,
  }));
};

export async function findUserShopsById(
  userId: string,
): Promise<DashboardShop[]> {
  try {
    const shops = await prisma.shop.findMany({
      where: { ownerId: userId },
      include: {
        cryptoWallets: true,
        transactions: {
          select: {
            type: true,
            totalAmount: true,
            createdAt: true,
          },
        },
      },
    });

    const revenueMap = new Map<string, number>();
    const ordersMap = new Map<string, number>();
    const usersMap = new Map<string, number>();

    const users = await prisma.user.findMany({
      select: {
        createdAt: true,
      },
    });

    for (const user of users) {
      const date = user.createdAt.toISOString().split("T")[0];

      usersMap.set(date, (usersMap.get(date) ?? 0) + 1);
    }
    for (const shop of shops) {
      for (const tx of shop.transactions) {
        const date = tx.createdAt.toISOString().split("T")[0];

        if (tx.type === TransactionType.DEPOSIT) {
          revenueMap.set(
            date,
            (revenueMap.get(date) ?? 0) + Number(tx.totalAmount),
          );
        }

        if (tx.type === TransactionType.PURCHASE) {
          ordersMap.set(date, (ordersMap.get(date) ?? 0) + 1);
        }
      }
    }

    const baseYear = generateEmptyYear();

    const analytics = {
      Orders: mergeIntoBase(baseYear, ordersMap),
      Revenue: mergeIntoBase(baseYear, revenueMap),

      Users: mergeIntoBase(baseYear, usersMap),
    };

    const currencyMap: Record<string, string> = {
      BITCOIN: "bitcoin",
      ETHEREUM: "ethereum",
      LITECOIN: "litecoin",
    };

    return await Promise.all(
      shops.map(async (shop, index) => {
        const wallets = await Promise.all(
          shop.cryptoWallets.map(async (wallet) => {
            const coinId = currencyMap[wallet.currency];

            const usdPrice = await getCryptoPriceUSD(coinId);

            return {
              ...wallet,
              usd_value: wallet.balance * usdPrice,
            };
          }),
        );

        return {
          id: shop.id,
          name: shop.name,

          logo: ["GalleryVerticalEndIcon", "AudioLinesIcon", "TerminalIcon"][
            index % 3
          ],

          plan: "Enterprise",
          subdomain: shop.subdomain,

          wallets,

          analytics,
        };
      }),
    );
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function findUserBySessiontoken(
  sessionToken: string,
): Promise<Pick<User, "id" | "username"> | null> {
  const tokenHash = createHash("sha256").update(sessionToken).digest("hex");

  return prisma.user.findFirst({
    where: {
      sessions: {
        some: {
          token: tokenHash,
        },
      },
    },
    select: {
      id: true,
      username: true,
    },
  });
}

export async function findUserById(id: string): Promise<User | null> {
  return prisma.user.findFirst({
    where: {
      id,
    },
  });
}

export async function findUserByUsername(
  username: string,
): Promise<User | null> {
  return prisma.user.findFirst({
    where: {
      username,
    },
  });
}

export async function createUser(data: Prisma.UserCreateInput): Promise<User> {
  return prisma.user.create({ data });
}

export default {
  findUserBySessiontoken,
  findUserById,
  findUserByUsername,
  findUserShopsById,
  createUser,
};
