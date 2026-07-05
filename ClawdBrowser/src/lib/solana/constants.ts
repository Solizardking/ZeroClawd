import { PublicKey } from "@solana/web3.js";

export const SOL_MINT = "So11111111111111111111111111111111111111112";
export const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
export const USDT_MINT = "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB";
export const BONK_MINT = "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263";
export const JUP_MINT = "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN";
export const WIF_MINT = "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm";

export interface CuratedToken {
  symbol: string;
  name: string;
  mint: string;
  decimals: number;
  logo?: string;
}

/**
 * Curated default token list for the swap UI. Users can paste any mint
 * address; this is just the quick-pick set.
 */
export const CURATED_TOKENS: CuratedToken[] = [
  { symbol: "SOL", name: "Solana", mint: SOL_MINT, decimals: 9 },
  { symbol: "USDC", name: "USD Coin", mint: USDC_MINT, decimals: 6 },
  { symbol: "USDT", name: "Tether USD", mint: USDT_MINT, decimals: 6 },
  { symbol: "BONK", name: "Bonk", mint: BONK_MINT, decimals: 5 },
  { symbol: "JUP", name: "Jupiter", mint: JUP_MINT, decimals: 6 },
  { symbol: "WIF", name: "dogwifhat", mint: WIF_MINT, decimals: 6 },
];

export const TOKENS_BY_MINT: Record<string, CuratedToken> = Object.fromEntries(
  CURATED_TOKENS.map((t) => [t.mint, t]),
);

export function isValidMint(value: string): boolean {
  try {
    new PublicKey(value);
    return true;
  } catch {
    return false;
  }
}
