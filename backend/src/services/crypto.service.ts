import prisma from "../db";
import { deriveMerchantWallet } from "../utils/crypto/bitcoin/wallet";
import { deriveEthereumMerchantWallet } from "../utils/crypto/ethereum/wallet";
import { deriveLitecoinMerchantWallet } from "../utils/crypto/litecoin/wallet";
import { getCryptoPriceUSD } from "./walletService";

export async function createWallets(
  userId: string,
  shopId: number,
): Promise<boolean> {
  const [lastBitcoinWallet, lastLitecoinWallet, lastEthereumWallet] =
    await Promise.all([
      prisma.cryptoWallet.findFirst({
        where: {
          currency: "BITCOIN",
        },
        orderBy: {
          subIndex: "desc",
        },
      }),

      prisma.cryptoWallet.findFirst({
        where: {
          currency: "LITECOIN",
        },
        orderBy: {
          subIndex: "desc",
        },
      }),

      prisma.cryptoWallet.findFirst({
        where: {
          currency: "ETHEREUM",
        },
        orderBy: {
          subIndex: "desc",
        },
      }),
    ]);

  const nextBitcoinIndex =
    lastBitcoinWallet?.subIndex != null ? lastBitcoinWallet.subIndex + 1 : 0;

  const nextLitecoinIndex =
    lastLitecoinWallet?.subIndex != null ? lastLitecoinWallet.subIndex + 1 : 0;

  const nextEthereumIndex =
    lastEthereumWallet?.subIndex != null ? lastEthereumWallet.subIndex + 1 : 0;

  const bitcoinWallet = deriveMerchantWallet(nextBitcoinIndex);

  const litecoinWallet = deriveLitecoinMerchantWallet(nextLitecoinIndex);

  const ethereumWallet = deriveEthereumMerchantWallet(nextEthereumIndex);

  if (
    !bitcoinWallet.address ||
    !litecoinWallet.address ||
    !ethereumWallet.address
  ) {
    return false;
  }

  await prisma.cryptoWallet.createMany({
    data: [
      {
        userId,
        shopId,
        currency: "BITCOIN",
        address: bitcoinWallet.address,
        balance: 0,
        isActive: true,
        subIndex: nextBitcoinIndex,
      },

      {
        userId,
        shopId,
        currency: "LITECOIN",
        address: litecoinWallet.address,
        balance: 0,
        isActive: true,
        subIndex: nextLitecoinIndex,
      },
      {
        userId,
        shopId,
        currency: "ETHEREUM",
        address: ethereumWallet.address,
        balance: 0,
        isActive: true,
        subIndex: nextEthereumIndex,
      },
    ],
  });

  return true;
}

export async function getCustomerWallets(userId: string) {
  const wallets = await prisma.cryptoWallet.findMany({
    where: { userId },
    select: {
      address: true,
      balance: true,
      currency: true,
    },
  });

  const currencyMap: Record<string, "bitcoin" | "litecoin" | "ethereum"> = {
    BITCOIN: "bitcoin",
    LITECOIN: "litecoin",
    ETHEREUM: "ethereum",
  };

  const walletsWithUsd = await Promise.all(
    wallets.map(async (wallet) => {
      const coinId = currencyMap[wallet.currency];

      let usdValue = 0;

      if (coinId) {
        const price = await getCryptoPriceUSD(coinId);
        usdValue = Number((wallet.balance * price).toFixed(2));
      }

      return {
        ...wallet,
        usd_value: usdValue,
      };
    }),
  );

  return walletsWithUsd;
}
export default {
  createWallets,
  getCustomerWallets,
};
