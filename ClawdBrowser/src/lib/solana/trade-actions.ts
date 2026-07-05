"use server";

import { PublicKey, VersionedTransaction } from "@solana/web3.js";
import {
  getJupiterQuote,
  getJupiterSwapTx,
  type JupiterQuoteResponse,
} from "./jupiter";
import { getPumpTradeLocalTx } from "./pump";
import {
  getAgentDefaultSlippageBps,
  getAgentKeypair,
  getAgentMaxSolPerTrade,
} from "./agent-wallet";
import { getConnection } from "./rpc";
import { getWalletBalances, type TokenBalance } from "./balances";
import { isValidMint, SOL_MINT, TOKENS_BY_MINT } from "./constants";
import { toBaseUnits } from "./format";
import type { AgentTradeResult, SwapQuoteResult } from "./trade-types";

// ---------- Public read actions ----------

export async function fetchBalancesAction(
  owner: string,
): Promise<TokenBalance[]> {
  if (!isValidMint(owner)) throw new Error("Invalid wallet address");
  return getWalletBalances(owner);
}

export async function fetchAgentWalletAction(): Promise<{
  publicKey: string;
  balances: TokenBalance[];
  maxSolPerTrade: number;
}> {
  const kp = getAgentKeypair();
  const pk = kp.publicKey.toBase58();
  return {
    publicKey: pk,
    balances: await getWalletBalances(pk),
    maxSolPerTrade: getAgentMaxSolPerTrade(),
  };
}

// ---------- Quotes ----------

export async function quoteSwapAction(opts: {
  inputMint: string;
  outputMint: string;
  amount: string; // human-decimal string
  slippageBps?: number;
}): Promise<SwapQuoteResult> {
  const { inputMint, outputMint } = opts;
  if (!isValidMint(inputMint)) throw new Error("Invalid input mint");
  if (!isValidMint(outputMint)) throw new Error("Invalid output mint");

  const inMeta = TOKENS_BY_MINT[inputMint];
  const outMeta = TOKENS_BY_MINT[outputMint];
  const inDecimals = inMeta?.decimals ?? (await fetchMintDecimals(inputMint));
  const outDecimals =
    outMeta?.decimals ?? (await fetchMintDecimals(outputMint));

  const baseAmount = toBaseUnits(opts.amount, inDecimals);
  if (baseAmount <= 0n) throw new Error("Amount must be > 0");

  const quote = await getJupiterQuote({
    inputMint,
    outputMint,
    amount: baseAmount.toString(),
    slippageBps: opts.slippageBps ?? 100,
  });

  return {
    quote,
    inAmount: quote.inAmount,
    outAmount: quote.outAmount,
    inSymbol: inMeta?.symbol ?? "TOKEN",
    outSymbol: outMeta?.symbol ?? "TOKEN",
    inDecimals,
    outDecimals,
    priceImpactPct: quote.priceImpactPct,
  };
}

// ---------- User-signed swap (returns base64 tx for browser wallet) ----------

export async function buildUserSwapTxAction(opts: {
  quote: JupiterQuoteResponse;
  userPublicKey: string;
}): Promise<{ transactionBase64: string; lastValidBlockHeight: number }> {
  if (!isValidMint(opts.userPublicKey)) {
    throw new Error("Invalid user public key");
  }
  const res = await getJupiterSwapTx({
    quoteResponse: opts.quote,
    userPublicKey: opts.userPublicKey,
    wrapAndUnwrapSol: true,
  });
  return {
    transactionBase64: res.swapTransaction,
    lastValidBlockHeight: res.lastValidBlockHeight,
  };
}

// ---------- Agent-signed swap (server hot wallet executes) ----------

export async function agentJupiterTradeAction(opts: {
  inputMint: string;
  outputMint: string;
  amount: string; // human-decimal of inputMint
  slippageBps?: number;
}): Promise<AgentTradeResult> {
  const kp = getAgentKeypair();
  const slippageBps = opts.slippageBps ?? getAgentDefaultSlippageBps();

  // Enforce per-trade SOL cap when input is SOL (the common case)
  if (opts.inputMint === SOL_MINT) {
    const requested = Number(opts.amount);
    const cap = getAgentMaxSolPerTrade();
    if (!Number.isFinite(requested) || requested <= 0) {
      throw new Error("Invalid SOL amount");
    }
    if (requested > cap) {
      throw new Error(
        `Trade size ${requested} SOL exceeds AGENT_MAX_SOL_PER_TRADE=${cap}`,
      );
    }
  }

  const { quote } = await quoteSwapAction({
    inputMint: opts.inputMint,
    outputMint: opts.outputMint,
    amount: opts.amount,
    slippageBps,
  });

  const swap = await getJupiterSwapTx({
    quoteResponse: quote,
    userPublicKey: kp.publicKey.toBase58(),
    wrapAndUnwrapSol: true,
  });

  const tx = VersionedTransaction.deserialize(
    Buffer.from(swap.swapTransaction, "base64"),
  );
  tx.sign([kp]);

  const connection = getConnection();
  const signature = await connection.sendRawTransaction(tx.serialize(), {
    skipPreflight: false,
    maxRetries: 3,
  });
  await connection.confirmTransaction(
    {
      signature,
      blockhash: tx.message.recentBlockhash,
      lastValidBlockHeight: swap.lastValidBlockHeight,
    },
    "confirmed",
  );

  return {
    signature,
    inputMint: opts.inputMint,
    outputMint: opts.outputMint,
    inAmount: quote.inAmount,
    outAmount: quote.outAmount,
    route: "jupiter",
    explorerUrl: `https://solscan.io/tx/${signature}`,
  };
}

// ---------- Agent Pump.fun trade ----------

export async function agentPumpTradeAction(opts: {
  mint: string;
  side: "buy" | "sell";
  /** SOL for buy, token amount (or "100%") for sell */
  amount: number | string;
  slippagePct?: number;
  priorityFee?: number;
  pool?: "pump" | "raydium" | "auto";
}): Promise<AgentTradeResult> {
  if (!isValidMint(opts.mint)) throw new Error("Invalid token mint");
  const kp = getAgentKeypair();

  if (opts.side === "buy") {
    const cap = getAgentMaxSolPerTrade();
    const requested = Number(opts.amount);
    if (!Number.isFinite(requested) || requested <= 0) {
      throw new Error("Invalid buy SOL amount");
    }
    if (requested > cap) {
      throw new Error(
        `Pump buy ${requested} SOL exceeds AGENT_MAX_SOL_PER_TRADE=${cap}`,
      );
    }
  }

  const txBytes = await getPumpTradeLocalTx({
    publicKey: kp.publicKey.toBase58(),
    action: opts.side,
    mint: opts.mint,
    amount: opts.amount,
    denominatedInSol: opts.side === "buy" ? "true" : "false",
    slippage: opts.slippagePct ?? 5,
    priorityFee: opts.priorityFee ?? 0.00005,
    pool: opts.pool ?? "auto",
  });

  const tx = VersionedTransaction.deserialize(txBytes);
  tx.sign([kp]);

  const connection = getConnection();
  const signature = await connection.sendRawTransaction(tx.serialize(), {
    skipPreflight: false,
    maxRetries: 3,
  });
  // Use a recent blockhash + lastValidBlockHeight pulled from the chain since
  // PumpPortal doesn't return one.
  const latest = await connection.getLatestBlockhash("confirmed");
  await connection.confirmTransaction(
    { signature, ...latest },
    "confirmed",
  );

  return {
    signature,
    inputMint: opts.side === "buy" ? SOL_MINT : opts.mint,
    outputMint: opts.side === "buy" ? opts.mint : SOL_MINT,
    inAmount: String(opts.amount),
    outAmount: "?",
    route: "pump",
    explorerUrl: `https://solscan.io/tx/${signature}`,
  };
}

// ---------- Helpers ----------

async function fetchMintDecimals(mint: string): Promise<number> {
  const connection = getConnection();
  const info = await connection.getParsedAccountInfo(new PublicKey(mint));
  type ParsedMint = { parsed?: { info?: { decimals?: number } } };
  const data = info.value?.data as ParsedMint | undefined;
  const decimals = data?.parsed?.info?.decimals;
  if (typeof decimals !== "number") {
    throw new Error(`Could not fetch decimals for mint ${mint}`);
  }
  return decimals;
}

