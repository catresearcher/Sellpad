import * as bip39 from "bip39";
import * as bitcoin from "bitcoinjs-lib";
import BIP32Factory from "bip32";
import * as ecc from "tiny-secp256k1";

bitcoin.initEccLib(ecc);

const bip32 = BIP32Factory(ecc);

const NETWORK = bitcoin.networks.bitcoin;

const merchantMnemonic = process.env.MERCHANT_WALLET_MNEMONIC!;

const customerMnemonic = process.env.CUSTOMER_WALLET_MNEMONIC!;

if (!merchantMnemonic || !customerMnemonic) {
  throw new Error("Missing wallet mnemonics");
}

const merchantSeed = bip39.mnemonicToSeedSync(merchantMnemonic);

const customerSeed = bip39.mnemonicToSeedSync(customerMnemonic);

const merchantRoot = bip32.fromSeed(merchantSeed, NETWORK);

const customerRoot = bip32.fromSeed(customerSeed, NETWORK);

export function deriveMerchantWallet(shopId: number) {
  const child = merchantRoot.derivePath(`m/84'/0'/0'/0/${shopId}`);

  const { address } = bitcoin.payments.p2wpkh({
    pubkey: child.publicKey,
    network: NETWORK,
  });

  return {
    address,
    path: `m/84'/0'/0'/0/${shopId}`,
  };
}

export function deriveCustomerWallet(customerId: number) {
  const child = customerRoot.derivePath(`m/84'/0'/0'/0/${customerId}`);

  const { address } = bitcoin.payments.p2wpkh({
    pubkey: child.publicKey,
    network: NETWORK,
  });

  return {
    address,
    path: `m/84'/0'/0'/0/${customerId}`,
  };
}
