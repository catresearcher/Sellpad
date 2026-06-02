import * as bip39 from "bip39";
import * as bitcoin from "bitcoinjs-lib";
import BIP32Factory from "bip32";
import * as ecc from "tiny-secp256k1";

bitcoin.initEccLib(ecc);

const bip32 = BIP32Factory(ecc);

const litecoinNetwork = {
  messagePrefix: "\x19Litecoin Signed Message:\n",
  bech32: "ltc",

  bip32: {
    public: 0x019da462,
    private: 0x019d9cfe,
  },

  pubKeyHash: 0x30,
  scriptHash: 0x32,
  wif: 0xb0,
};

const merchantMnemonic = process.env.MERCHANT_WALLET_MNEMONIC!;

const customerMnemonic = process.env.CUSTOMER_WALLET_MNEMONIC!;

if (!merchantMnemonic || !customerMnemonic) {
  throw new Error("Missing wallet mnemonics");
}

const merchantSeed = bip39.mnemonicToSeedSync(merchantMnemonic);

const customerSeed = bip39.mnemonicToSeedSync(customerMnemonic);

const merchantRoot = bip32.fromSeed(merchantSeed, litecoinNetwork);

const customerRoot = bip32.fromSeed(customerSeed, litecoinNetwork);

export function deriveLitecoinCustomerWallet(customerId: number) {
  const path = `m/84'/2'/0'/0/${customerId}`;

  const child = customerRoot.derivePath(path);

  const { address } = bitcoin.payments.p2wpkh({
    pubkey: child.publicKey,
    network: litecoinNetwork,
  });

  return {
    address,
    path,
  };
}

export function deriveLitecoinMerchantWallet(shopId: number) {
  const path = `m/84'/2'/0'/0/${shopId}`;

  const child = merchantRoot.derivePath(path);

  const { address } = bitcoin.payments.p2wpkh({
    pubkey: child.publicKey,
    network: litecoinNetwork,
  });

  return {
    address,
    path,
  };
}
