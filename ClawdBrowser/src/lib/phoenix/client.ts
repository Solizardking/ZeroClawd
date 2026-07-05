// No "use server" — synchronous singleton, imported by "use server" action files.
import { createPhoenixClient } from "@ellipsis-labs/rise";
import type { PhoenixClient } from "@ellipsis-labs/rise";

const PHOENIX_API_URL = "https://perp-api.phoenix.trade";

let _client: PhoenixClient | null = null;

/**
 * Returns a singleton PhoenixClient wired to the Helius RPC URL.
 * Called only from "use server" action files — never shipped to the client bundle.
 */
export function getPhoenixClient(): PhoenixClient {
  if (_client) return _client;
  _client = createPhoenixClient({
    apiUrl: process.env.PHOENIX_API_URL ?? PHOENIX_API_URL,
    apiKey: process.env.PHOENIX_API_KEY,
    rpcUrl: process.env.SOLANA_RPC_URL ?? process.env.NEXT_PUBLIC_SOLANA_RPC_URL,
    exchangeMetadata: { stream: false },
    ws: false,
  });
  return _client;
}
