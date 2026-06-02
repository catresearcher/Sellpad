import * as bitcoin from "bitcoinjs-lib";
import ECPairFactory from "ecpair";
import * as ecc from "tiny-secp256k1";
import BIP32Factory from "bip32";
import * as bip39 from "bip39";

import prisma from "../../../db";
import { SendCryptoArgs } from "../../../types/crypto";

const bip32 = BIP32Factory(ecc);
const ECPair = ECPairFactory(ecc);

const NETWORK = bitcoin.networks.bitcoin;

const BTC_MEMPOOL = process.env.BTC_MEMPOOL!;

const seed = bip39.mnemonicToSeedSync(process.env.MERCHANT_WALLET_MNEMONIC!);

const root = bip32.fromSeed(seed, NETWORK);

export async function fetchCurrentFeeRate(): Promise<number> {
  try {
    const response = await fetch(`${BTC_MEMPOOL}/v1/fees/recommended`);

    const data = await response.json();

    return Math.max(1, Number(data.fastestFee || 1));
  } catch (err) {
    console.error("Fee fetch failed:", err);

    return 5;
  }
}

export async function sendBTC({
  fromAddress,
  toAddress,
  amount,
  sweep = false,
}: SendCryptoArgs): Promise<string> {
  if (!fromAddress || !toAddress) {
    throw new Error("Missing addresses");
  }

  const wallet = await prisma.cryptoWallet.findFirst({
    where: {
      address: fromAddress,
      currency: "BITCOIN",
    },
  });

  if (!wallet) {
    throw new Error("Wallet not found");
  }

  const path = `m/84'/0'/0'/0/${wallet.subIndex}`;

  console.log(path);
  const keyNode = root.derivePath(path);

  if (!keyNode.privateKey) {
    throw new Error("Private key missing");
  }

  const keyPair = ECPair.fromPrivateKey(keyNode.privateKey, {
    network: NETWORK,
  });

  const utxoResponse = await fetch(
    `${BTC_MEMPOOL}/address/${fromAddress}/utxo`,
  );

  const utxos = await utxoResponse.json();

  if (!Array.isArray(utxos) || utxos.length === 0) {
    throw new Error("No UTXOs");
  }

  const psbt = new bitcoin.Psbt({
    network: NETWORK,
  });

  let totalInput = 0n;

  for (const utxo of utxos) {
    const txHexResponse = await fetch(`${BTC_MEMPOOL}/tx/${utxo.txid}/hex`);
    const txHex = await txHexResponse.text();

    const tx = bitcoin.Transaction.fromHex(txHex);

    const value = BigInt(tx.outs[utxo.vout].value);
    const script = tx.outs[utxo.vout].script;

    console.log("value", value);
    console.log("SCRIPT", script);

    psbt.addInput({
      hash: utxo.txid,
      index: utxo.vout,
      witnessUtxo: { script, value },
    });

    totalInput += value;
  }

  const feeRate = await fetchCurrentFeeRate();

  const inputCount = utxos.length;
  const outputCount = sweep ? 1 : 2;

  const estimatedSize = 10 + inputCount * 68 + outputCount * 31;

  const fee = BigInt(Math.ceil(estimatedSize * feeRate));

  if (sweep) {
    if (totalInput <= fee) {
      throw new Error("Insufficient balance for fee");
    }

    const amountToSend = totalInput - fee;

    psbt.addOutput({
      address: toAddress,
      value: amountToSend,
    });
  } else {
    if (!amount || amount <= 0) {
      throw new Error("Invalid amount");
    }

    const sendAmount = BigInt(Math.floor(amount * 1e8));

    if (totalInput < sendAmount + fee) {
      throw new Error("Insufficient balance");
    }

    const change = totalInput - sendAmount - fee;

    psbt.addOutput({
      address: toAddress,
      value: sendAmount,
    });

    if (change > 546n) {
      psbt.addOutput({
        address: fromAddress,
        value: change,
      });
    }
  }

  psbt.signAllInputs(keyPair);

  psbt.finalizeAllInputs();

  const rawTx = psbt.extractTransaction().toHex();

  const broadcastResponse = await fetch(`${BTC_MEMPOOL}/tx`, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: rawTx,
  });

  if (!broadcastResponse.ok) {
    const error = await broadcastResponse.text();

    throw new Error(error);
  }

  const txid = await broadcastResponse.text();

  console.log("BTC sent:", txid);

  return txid;
}
