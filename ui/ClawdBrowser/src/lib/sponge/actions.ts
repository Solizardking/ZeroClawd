"use server";

import { getSpongeWallet } from "./client";

export interface SpongeBalances {
  raw: unknown;
}

export async function fetchSpongeBalancesAction(): Promise<SpongeBalances> {
  const wallet = await getSpongeWallet();
  const raw = await wallet.getDetailedBalances();
  return { raw };
}

export interface SpongeSwapResult {
  txHash: string;
}

export async function spongeSwapSolanaAction(params: {
  inputToken: string;
  outputToken: string;
  amount: string;
  slippageBps?: number;
}): Promise<SpongeSwapResult> {
  const wallet = await getSpongeWallet();
  const tx = await wallet.swap({
    chain: "solana",
    from: params.inputToken,
    to: params.outputToken,
    amount: params.amount,
    slippageBps: params.slippageBps ?? 50,
  });
  return { txHash: (tx as { txHash: string }).txHash };
}

export interface HyperliquidResult {
  result: unknown;
}

export async function spongeHyperliquidAction(
  action: string,
  options: Record<string, unknown> = {},
): Promise<HyperliquidResult> {
  const wallet = await getSpongeWallet();
  const result = await wallet.hyperliquid({ action, ...options } as Parameters<typeof wallet.hyperliquid>[0]);
  return { result };
}
