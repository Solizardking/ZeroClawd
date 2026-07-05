"use server";

import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { address } from "@solana/kit";
import {
  MarginType,
  Side,
  symbol as toSymbol,
  type Authority,
} from "@ellipsis-labs/rise";
import { getPhoenixClient } from "./client";
import { sendPhoenixInstructions } from "./tx";

const PHOENIX_EXPLORER = "https://solscan.io/tx";
const USDC_DECIMALS = 6;

function loadAgentPublicKey(): string {
  const raw = process.env.AGENT_WALLET_PRIVATE_KEY;
  if (!raw) throw new Error("AGENT_WALLET_PRIVATE_KEY not set");
  const trimmed = raw.trim();
  const bytes = trimmed.startsWith("[")
    ? Uint8Array.from(JSON.parse(trimmed) as number[])
    : bs58.decode(trimmed);
  return Keypair.fromSecretKey(bytes).publicKey.toBase58();
}

function toAuthority(pubkey: string): Authority {
  return address(pubkey) as Authority;
}

function parseUsdcToBigInt(amount: string): bigint {
  const n = Math.round(parseFloat(amount) * 10 ** USDC_DECIMALS);
  return BigInt(n);
}

// ─── Read-only queries ──────────────────────────────────────────────────────

export async function phoenixGetMarketsAction() {
  const client = getPhoenixClient();
  const markets = await client.api.markets().getMarkets();
  return markets.map((m) => ({
    symbol: m.symbol,
    status: m.marketStatus,
    tickSize: m.tickSize,
    takerFee: m.takerFee,
    makerFee: m.makerFee,
  }));
}

export async function phoenixGetOrderbookAction(sym: string) {
  const client = getPhoenixClient();
  const ob = await client.api.orderbook().getOrderbook(sym);
  return {
    symbol: ob.symbol,
    bids: ob.bids?.slice(0, 5) ?? [],
    asks: ob.asks?.slice(0, 5) ?? [],
  };
}

export async function phoenixGetTraderStateAction(
  authority?: string,
  traderPdaIndex = 0,
) {
  const client = getPhoenixClient();
  const pubkey = authority ?? loadAgentPublicKey();
  const snapshot = await client.api
    .traders()
    .getTraderStateSnapshot(pubkey, { traderPdaIndex });
  return {
    authority: snapshot.authority,
    traderPdaIndex: snapshot.traderPdaIndex,
    subaccounts: snapshot.snapshot.subaccounts,
  };
}

export async function phoenixGetFundingRateAction(sym: string) {
  const client = getPhoenixClient();
  const resp = await client.api.funding().getFundingRateHistory(sym, { limit: 1 });
  return { symbol: resp.symbol, latestRate: resp.rates[0] ?? null };
}

// ─── Trader registration ────────────────────────────────────────────────────

export interface PhoenixTxResult {
  signature: string;
  explorerUrl: string;
}

export async function phoenixRegisterTraderAction(): Promise<PhoenixTxResult> {
  const client = getPhoenixClient();
  const authority = toAuthority(loadAgentPublicKey());
  const ix = await client.ixs.buildRegisterTrader({
    authority,
    marginType: MarginType.Cross,
    traderPdaIndex: 0,
  });
  const signature = await sendPhoenixInstructions([ix]);
  return { signature, explorerUrl: `${PHOENIX_EXPLORER}/${signature}` };
}

// ─── Order placement ────────────────────────────────────────────────────────

export async function phoenixPlaceLimitOrderAction(params: {
  symbol: string;
  side: "buy" | "sell";
  priceUsd: string;
  baseUnits: string;
  traderPdaIndex?: number;
}): Promise<PhoenixTxResult> {
  const client = getPhoenixClient();
  const authority = toAuthority(loadAgentPublicKey());
  const sym = toSymbol(params.symbol);
  const orderPacket = await client.orderPackets.buildLimitOrderPacket({
    symbol: params.symbol,
    side: params.side === "buy" ? Side.Bid : Side.Ask,
    priceUsd: params.priceUsd,
    baseUnits: params.baseUnits,
  });
  const ix = await client.ixs.buildPlaceLimitOrder({
    authority,
    symbol: sym,
    orderPacket,
    traderPdaIndex: params.traderPdaIndex ?? 0,
  });
  const signature = await sendPhoenixInstructions([ix]);
  return { signature, explorerUrl: `${PHOENIX_EXPLORER}/${signature}` };
}

export async function phoenixPlaceMarketOrderAction(params: {
  symbol: string;
  side: "buy" | "sell";
  baseUnits: string;
  traderPdaIndex?: number;
}): Promise<PhoenixTxResult> {
  const client = getPhoenixClient();
  const authority = toAuthority(loadAgentPublicKey());
  const sym = toSymbol(params.symbol);
  const orderPacket = await client.orderPackets.buildMarketOrderPacket({
    symbol: params.symbol,
    side: params.side === "buy" ? Side.Bid : Side.Ask,
    baseUnits: params.baseUnits,
  });
  const ix = await client.ixs.buildPlaceMarketOrder({
    authority,
    symbol: sym,
    orderPacket,
    traderPdaIndex: params.traderPdaIndex ?? 0,
  });
  const signature = await sendPhoenixInstructions([ix]);
  return { signature, explorerUrl: `${PHOENIX_EXPLORER}/${signature}` };
}

// ─── Order cancellation ─────────────────────────────────────────────────────

export async function phoenixCancelAllOrdersAction(params: {
  symbol: string;
  traderPdaIndex?: number;
}): Promise<PhoenixTxResult> {
  const client = getPhoenixClient();
  const authority = toAuthority(loadAgentPublicKey());
  const sym = toSymbol(params.symbol);
  const ix = await client.ixs.buildCancelAll({
    authority,
    symbol: sym,
    traderPdaIndex: params.traderPdaIndex ?? 0,
  });
  const signature = await sendPhoenixInstructions([ix]);
  return { signature, explorerUrl: `${PHOENIX_EXPLORER}/${signature}` };
}

// ─── Collateral ─────────────────────────────────────────────────────────────

export async function phoenixDepositAction(params: {
  usdcAmount: string;
  traderPdaIndex?: number;
}): Promise<PhoenixTxResult> {
  const client = getPhoenixClient();
  const authority = toAuthority(loadAgentPublicKey());
  const result = await client.ixs.buildDepositIxs({
    authority,
    amount: parseUsdcToBigInt(params.usdcAmount),
    traderPdaIndex: params.traderPdaIndex ?? 0,
  });
  const signature = await sendPhoenixInstructions(result.instructions);
  return { signature, explorerUrl: `${PHOENIX_EXPLORER}/${signature}` };
}

export async function phoenixWithdrawAction(params: {
  usdcAmount: string;
  traderPdaIndex?: number;
}): Promise<PhoenixTxResult> {
  const client = getPhoenixClient();
  const authority = toAuthority(loadAgentPublicKey());
  const result = await client.ixs.buildWithdrawIxs({
    authority,
    amount: parseUsdcToBigInt(params.usdcAmount),
    traderPdaIndex: params.traderPdaIndex ?? 0,
  });
  const signature = await sendPhoenixInstructions(result.instructions);
  return { signature, explorerUrl: `${PHOENIX_EXPLORER}/${signature}` };
}
