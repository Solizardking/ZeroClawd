import type { JupiterQuoteResponse } from "./jupiter";

export interface AgentTradeResult {
  signature: string;
  inputMint: string;
  outputMint: string;
  inAmount: string;
  outAmount: string;
  route: "jupiter" | "pump";
  explorerUrl: string;
}

export interface SwapQuoteResult {
  quote: JupiterQuoteResponse;
  inAmount: string;
  outAmount: string;
  inSymbol: string;
  outSymbol: string;
  inDecimals: number;
  outDecimals: number;
  priceImpactPct: string;
}
