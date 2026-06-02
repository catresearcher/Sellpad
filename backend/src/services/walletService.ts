const BTC_MEMPOOL = "https://mempool.space/api";

const LTC_MEMPOOL = "https://litecoinspace.org/api";

import { JsonRpcProvider, formatEther } from "ethers";

const ethProvider = new JsonRpcProvider(process.env.ETH_RPC!);

import * as bitcoin from "bitcoinjs-lib";
import * as ecc from "tiny-secp256k1";

bitcoin.initEccLib(ecc);
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

export type DepositResult = {
  txid: string;
  amount: number;
  confirmations: number;
  address: string;
  currency: "BITCOIN" | "LITECOIN" | "ETHEREUM";
  usdAmount: number;
};

export async function checkAddressTx(
  address: string,
  currency: "BITCOIN" | "LITECOIN" | "ETHEREUM",
): Promise<DepositResult[]> {
  switch (currency) {
    case "BITCOIN":
      return checkBTC(address);

    case "LITECOIN":
      return checkLTC(address);

    case "ETHEREUM":
      return checkETH(address);

    default:
      return [];
  }
}

type Coin = "bitcoin" | "ethereum" | "litecoin";

const priceCache: Partial<Record<Coin, { value: number; time: number }>> = {};

const CACHE_TTL = 60_000;

const COINS: Coin[] = ["bitcoin", "ethereum", "litecoin"];

async function fetchAllPrices() {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${COINS.join(
      ",",
    )}&vs_currencies=usd`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch crypto prices");
  }

  const data = await res.json();
  const now = Date.now();

  for (const coin of COINS) {
    const price = data?.[coin]?.usd;

    if (price) {
      priceCache[coin] = {
        value: price,
        time: now,
      };
    }
  }
}

export async function getCryptoPriceUSD(coinId: string): Promise<number> {
  const coin = coinId as Coin;
  const now = Date.now();

  const cached = priceCache[coin];

  if (cached && now - cached.time < CACHE_TTL) {
    return cached.value;
  }

  await fetchAllPrices();

  const updated = priceCache[coin];

  if (!updated) {
    throw new Error(`Invalid coin: ${coinId}`);
  }

  return updated.value;
}

async function getTipHeight(url: string) {
  const response = await fetch(`${url}/blocks/tip/height`);

  return Number(await response.text());
}

async function checkBTC(address: string): Promise<DepositResult[]> {
  const currentHeight = await getTipHeight(BTC_MEMPOOL);

  const [response, btcPrice] = await Promise.all([
    fetch(`${BTC_MEMPOOL}/address/${address}/txs`),
    getCryptoPriceUSD("bitcoin"),
  ]);

  const txs = await response.json();

  const deposits: DepositResult[] = [];

  for (const tx of txs) {
    if (!tx.status.confirmed) continue;

    const confirmations = currentHeight - tx.status.block_height + 1;

    for (const output of tx.vout) {
      const outAddress = output.scriptpubkey_address?.toLowerCase();

      if (outAddress !== address.toLowerCase()) continue;

      const btcAmount = output.value / 100000000;
      const usdAmount = btcAmount * btcPrice;

      deposits.push({
        txid: tx.txid,
        amount: btcAmount,
        confirmations,
        address,
        currency: "BITCOIN",
        usdAmount,
      });
    }
  }

  return deposits;
}

async function checkLTC(address: string): Promise<DepositResult[]> {
  const currentHeight = await getTipHeight(LTC_MEMPOOL);

  const [response, ltcPrice] = await Promise.all([
    fetch(`${LTC_MEMPOOL}/address/${address}/txs`),
    getCryptoPriceUSD("litecoin"),
  ]);

  const txs = await response.json();

  const deposits: DepositResult[] = [];

  const ourScript = bitcoin.address.toOutputScript(
    address.trim(),
    litecoinNetwork,
  );

  for (const tx of txs) {
    if (!tx.status.confirmed) continue;

    const confirmations = currentHeight - tx.status.block_height + 1;

    for (const output of tx.vout) {
      const outScript = Buffer.from(output.scriptpubkey, "hex");

      if (!outScript.equals(ourScript)) continue;

      const ltcAmount = output.value / 1e8;
      const usdAmount = ltcAmount * ltcPrice;

      deposits.push({
        txid: tx.txid,
        amount: ltcAmount,
        confirmations,
        address,
        currency: "LITECOIN",
        usdAmount: usdAmount,
      });
    }
  }

  return deposits;
}

async function checkETH(address: string): Promise<DepositResult[]> {
  const [latestBlock, ethPrice] = await Promise.all([
    ethProvider.getBlockNumber(),
    getCryptoPriceUSD("ethereum"),
  ]);

  // normal ETH txs
  const response = await fetch(
    `https://api.etherscan.io/v2/api?chainid=1&module=account&action=txlist&address=${address}&sort=desc&apikey=${process.env.ETHERSCAN_API_KEY}`,
  );

  const data = await response.json();

  if (data.status !== "1" && data.message !== "No transactions found") {
    throw new Error(`Etherscan error: ${data.result}`);
  }

  const txs = data.result || [];

  const deposits: DepositResult[] = [];

  for (const tx of txs) {
    // only successful incoming txs
    if (tx.to?.toLowerCase() !== address.toLowerCase() || tx.isError === "1") {
      continue;
    }

    const ethAmount = Number(formatEther(tx.value));

    const confirmations = latestBlock - Number(tx.blockNumber) + 1;

    deposits.push({
      txid: tx.hash,
      amount: ethAmount,
      confirmations,
      address,
      currency: "ETHEREUM",
      usdAmount: ethAmount * ethPrice,
    });
  }

  return deposits;
}
