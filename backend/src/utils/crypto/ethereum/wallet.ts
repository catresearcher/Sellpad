import { HDNodeWallet } from "ethers";

const merchantMnemonic = process.env.MERCHANT_WALLET_MNEMONIC!;

const customerMnemonic = process.env.CUSTOMER_WALLET_MNEMONIC!;

if (!merchantMnemonic || !customerMnemonic) {
  throw new Error("Missing wallet mnemonics");
}

export function deriveEthereumCustomerWallet(customerId: number) {
  const path = `m/44'/60'/0'/0/${customerId}`;

  const wallet = HDNodeWallet.fromPhrase(customerMnemonic, undefined, path);

  return {
    address: wallet.address,
    path,
  };
}

export function deriveEthereumMerchantWallet(shopId: number) {
  const path = `m/44'/60'/0'/0/${shopId}`;

  const wallet = HDNodeWallet.fromPhrase(merchantMnemonic, undefined, path);

  return {
    address: wallet.address,
    path,
  };
}
