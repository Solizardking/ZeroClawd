import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

let cached: Keypair | null = null;

/**
 * Decode the agent hot-wallet keypair from AGENT_WALLET_PRIVATE_KEY.
 * Accepts either base58 (Phantom export format) or a JSON byte array.
 * Server-only — never call from a client component.
 */
export function getAgentKeypair(): Keypair {
  if (cached) return cached;
  const raw = process.env.AGENT_WALLET_PRIVATE_KEY;
  if (!raw) {
    throw new Error(
      "AGENT_WALLET_PRIVATE_KEY is not set. Configure the agent hot wallet " +
        "in .env.local before using agent-trade actions.",
    );
  }
  let secret: Uint8Array;
  const trimmed = raw.trim();
  if (trimmed.startsWith("[")) {
    secret = Uint8Array.from(JSON.parse(trimmed));
  } else {
    secret = bs58.decode(trimmed);
  }
  if (secret.length !== 64) {
    throw new Error(
      `AGENT_WALLET_PRIVATE_KEY must decode to 64 bytes, got ${secret.length}`,
    );
  }
  cached = Keypair.fromSecretKey(secret);
  return cached;
}

export function getAgentMaxSolPerTrade(): number {
  const v = Number(process.env.AGENT_MAX_SOL_PER_TRADE ?? "0.5");
  return Number.isFinite(v) && v > 0 ? v : 0.5;
}

export function getAgentDefaultSlippageBps(): number {
  const v = Number(process.env.AGENT_DEFAULT_SLIPPAGE_BPS ?? "100");
  return Number.isFinite(v) && v > 0 ? Math.floor(v) : 100;
}
