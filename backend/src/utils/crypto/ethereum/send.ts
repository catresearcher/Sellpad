import { HDNodeWallet, JsonRpcProvider, parseEther } from "ethers";

import prisma from "../../../db";
import { SendCryptoArgs } from "../../../types/crypto";

const ETH_RPC = process.env.ETH_RPC!;

const provider = new JsonRpcProvider(ETH_RPC);

const mnemonic = process.env.MERCHANT_WALLET_MNEMONIC!;

export async function sendETH({
  fromAddress,
  toAddress,
  amount,
  sweep = false,
}: SendCryptoArgs): Promise<string> {
  if (!fromAddress || !toAddress) {
    throw new Error("Missing addresses");
  }

  const walletData = await prisma.cryptoWallet.findFirst({
    where: {
      address: fromAddress,
      currency: "ETHEREUM",
    },
  });

  if (!walletData) {
    throw new Error("Wallet not found");
  }

  const path = `m/44'/60'/0'/0/${walletData.subIndex}`;

  const hdNode = HDNodeWallet.fromPhrase(mnemonic, undefined, path);

  const wallet = hdNode.connect(provider);

  if (wallet.address.toLowerCase() !== fromAddress.toLowerCase()) {
    throw new Error("Derived wallet mismatch");
  }

  const balance = await provider.getBalance(fromAddress);

  const feeData = await provider.getFeeData();

  const gasLimit = 21_000n;

  const gasPrice = feeData.gasPrice || parseEther("0.00000002");

  const fee = gasLimit * gasPrice;

  let valueToSend: bigint;

  if (sweep) {
    if (balance <= fee) {
      throw new Error("Insufficient balance for fee");
    }

    valueToSend = balance - fee;
  } else {
    if (!amount || amount <= 0) {
      throw new Error("Invalid amount");
    }

    valueToSend = parseEther(amount.toString());

    if (balance < valueToSend + fee) {
      throw new Error("Insufficient balance");
    }
  }

  const tx = await wallet.sendTransaction({
    to: toAddress,
    value: valueToSend,
    gasLimit,
    gasPrice,
  });

  console.log("ETH sent:", tx.hash);

  return tx.hash;
}
