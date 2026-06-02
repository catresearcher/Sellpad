import * as bitcoin from "bitcoinjs-lib";
import ECPairFactory from "ecpair";
import * as ecc from "tiny-secp256k1";
import BIP32Factory from "bip32";
import * as bip39 from "bip39";
import axios from "axios";
import prisma from "../../../db";
import { SendCryptoArgs } from "../../../types/crypto";

const bip32 = BIP32Factory(ecc);
const ECPair = ECPairFactory(ecc);

const NETWORK = {
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

const LTC_MEMPOOL = process.env.LTC_MEMPOOL!;

const seed = bip39.mnemonicToSeedSync(process.env.MERCHANT_WALLET_MNEMONIC!);
const root = bip32.fromSeed(seed, NETWORK);

type LitecoinUtxo = {
  txid: string;
  vout: number;
  value: number;
  address?: string;
  scriptpubkey_type?: string;
  status?: any;
};

export async function fetchLTCFeeRate(): Promise<number> {
  try {
    const res = await axios.get<{ fastestFee: number }>(
      `${LTC_MEMPOOL}/v1/fees/recommended`,
    );

    return Math.max(1, res.data.fastestFee || 1);
  } catch {
    return 1;
  }
}

export async function sendLTC({
  fromAddress,
  toAddress,
  amount,
  sweep = false,
}: SendCryptoArgs): Promise<string> {
  if (!fromAddress) throw new Error("Missing fromAddress");

  const finalToAddress = sweep ? process.env.LTC_TREASURY_ADDRESS! : toAddress;

  if (!finalToAddress) throw new Error("Missing destination address");
  const cleanFrom = fromAddress.trim();
  const wallet = await prisma.cryptoWallet.findFirst({
    where: { address: cleanFrom, currency: "LITECOIN" },
  });

  if (!wallet) throw new Error("Wallet not found");

  const path = `m/84'/2'/0'/0/${wallet.subIndex}`;
  const keyNode = root.derivePath(path);

  if (!keyNode.privateKey) throw new Error("Missing private key");

  const keyPair = ECPair.fromPrivateKey(keyNode.privateKey, {
    network: NETWORK,
  });

  const utxosRes = await axios.get<LitecoinUtxo[]>(
    `${LTC_MEMPOOL}/address/${cleanFrom}/utxo`,
  );

  const utxos = utxosRes.data;
  if (!utxos.length) throw new Error("No UTXOs");

  const psbt = new bitcoin.Psbt({ network: NETWORK });

  let total = 0n;

  for (const utxo of utxos) {
    const txHexRes = await axios.get<string>(
      `${LTC_MEMPOOL}/tx/${utxo.txid}/hex`,
    );

    const txHex = txHexRes.data;
    if (!txHex) throw new Error("Missing tx hex");

    const tx = bitcoin.Transaction.fromHex(txHex);

    const value = BigInt(tx.outs[utxo.vout].value);
    const p2wpkh = bitcoin.payments.p2wpkh({
      pubkey: keyNode.publicKey,
      network: NETWORK,
    });

    const isSegwit = utxo.address?.startsWith("ltc1"); // from mempool API

    if (isSegwit) {
      psbt.addInput({
        hash: utxo.txid,
        index: utxo.vout,
        witnessUtxo: {
          script: p2wpkh.output!,
          value,
        },
      });
    } else {
      const txHex = (
        await axios.get<string>(`${LTC_MEMPOOL}/tx/${utxo.txid}/hex`)
      ).data;

      psbt.addInput({
        hash: utxo.txid,
        index: utxo.vout,
        nonWitnessUtxo: Buffer.from(txHex, "hex"),
      });
    }

    total += value;
  }

  const feeRate = await fetchLTCFeeRate();

  const inputCount = utxos.length;
  const outputCount = sweep ? 1 : 2;

  const size = 10 + inputCount * 68 + outputCount * 31;
  const safeFeeRate = feeRate + 10;
  const fee = BigInt(Math.ceil(size * safeFeeRate));

  let sendAmount: bigint;

  if (sweep) {
    if (total <= fee) throw new Error("Insufficient balance");

    sendAmount = total - fee;

    psbt.addOutput({
      address: finalToAddress,
      value: sendAmount,
    });
  } else {
    if (!amount || typeof amount !== "number")
      throw new Error("Missing amount");
    const amt = BigInt(Math.floor(amount * 1e8));

    if (total < amt + fee) {
      throw new Error("Insufficient balance");
    }

    sendAmount = amt;

    psbt.addOutput({
      address: finalToAddress,
      value: sendAmount,
    });

    const change = total - amt - fee;

    if (change > 546n) {
      psbt.addOutput({
        address: cleanFrom,
        value: change,
      });
    }
  }

  psbt.data.inputs.forEach((_, i) => {
    psbt.signInput(i, keyPair);
  });
  psbt.finalizeAllInputs();

  const txHex = psbt.extractTransaction().toHex();

  const broadcast = await axios.post<string>(`${LTC_MEMPOOL}/tx`, txHex, {
    headers: { "Content-Type": "text/plain" },
  });

  return broadcast.data;
}
