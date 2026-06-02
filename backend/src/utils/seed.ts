import prisma from "../db";
import { v4 as uuid } from "uuid";
import { deriveMerchantWallet } from "./crypto/bitcoin/wallet";
import { deriveLitecoinMerchantWallet } from "./crypto/litecoin/wallet";
import { deriveEthereumMerchantWallet } from "./crypto/ethereum/wallet";
import { CryptoCurrency } from "../lib/database/generated";

export async function SeedDatabase() {
  try {
    const result = await prisma.$transaction(async (tx: any) => {
      const user = await tx.user.upsert({
        where: { username: "Admin" },
        update: {},
        create: {
          email: "admin@sellpad.io",
          username: "Admin",
          role: "Admin",
          password:
            "$2a$12$IkenbP4BOBmHzNTmXLf0huXwr8rSpyQUMQRnxD/UesWR81P1WA/He",
        },
      });

      const shop = await tx.shop.upsert({
        where: { id: 1 },
        update: {},
        create: {
          id: 1,
          subdomain: "admin",
          name: "Admin Shop",
          ownerId: user.id,
        },
      });

      const btcAddress = deriveMerchantWallet(shop.id).address;
      const ltcAddress = deriveLitecoinMerchantWallet(shop.id).address;
      const ethAddress = deriveEthereumMerchantWallet(shop.id).address;

      if (!btcAddress || !ltcAddress || !ethAddress) {
        throw new Error("Missing wallet address");
      }

      const addresses: Record<CryptoCurrency, string> = {
        BITCOIN: btcAddress,
        LITECOIN: ltcAddress,
        ETHEREUM: ethAddress,
      };

      const wallets = await Promise.all(
        Object.entries(addresses).map(([currency, address]) =>
          tx.cryptoWallet.upsert({
            where: {
              userId_shopId_currency: {
                userId: user.id,
                shopId: shop.id,
                currency: currency as CryptoCurrency,
              },
            },
            update: {
              address,
            },
            create: {
              userId: user.id,
              shopId: shop.id,
              currency: currency as CryptoCurrency,
              address,
              subIndex: shop.id,
            },
          }),
        ),
      );

      const product = await tx.product.upsert({
        where: { id: 1 },
        update: {
          description:
            "This is a test product description for rich text editor",
          stock: 10,
        },
        create: {
          id: 1,
          shopId: shop.id,
          name: "testProduct",
          description:
            "This is a test product description for rich text editor",
          visibility: "Public",
          stock: 10,
        },
      });

      const variant = await tx.productVariant.upsert({
        where: { id: 1 },
        update: {
          price: 19.99,
          stockCount: 2,
          deliverables: ["Deliverable 1", "Deliverable 2"],
        },
        create: {
          id: 1,
          productId: product.id,
          name: "Default Variant",
          price: 19.99,
          stockCount: 2,
          deliverables: ["Deliverable 1", "Deliverable 2"],
        },
      });

      return { user, shop, wallets, product, variant };
    });

    console.log("DB seeded/upserted successfully:", result);
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
