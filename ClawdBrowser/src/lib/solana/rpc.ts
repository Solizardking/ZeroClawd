import { Connection } from "@solana/web3.js";

let cached: Connection | null = null;

/**
 * Server-side Solana RPC connection. Uses SOLANA_RPC_URL (with the privileged
 * Helius API key in the URL) when available, falling back to the public
 * NEXT_PUBLIC_ value, then mainnet-beta public endpoint.
 */
export function getConnection(): Connection {
  if (cached) return cached;
  const url =
    process.env.SOLANA_RPC_URL ||
    process.env.NEXT_PUBLIC_SOLANA_RPC_URL ||
    "https://api.mainnet-beta.solana.com";
  cached = new Connection(url, { commitment: "confirmed" });
  return cached;
}
