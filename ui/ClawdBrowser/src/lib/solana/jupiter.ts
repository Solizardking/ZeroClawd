/**
 * Jupiter v6 swap API helpers (server-only). Docs: https://station.jup.ag/docs/apis/swap-api
 *
 * We use the public `lite-api.jup.ag` host which doesn't require an API key.
 * For higher rate limits switch to `quote-api.jup.ag` with a key.
 */

const JUPITER_BASE = "https://lite-api.jup.ag/swap/v1";

export interface JupiterQuoteParams {
  inputMint: string;
  outputMint: string;
  /** Base units of inputMint */
  amount: string | number | bigint;
  slippageBps: number;
  swapMode?: "ExactIn" | "ExactOut";
  onlyDirectRoutes?: boolean;
}

export interface JupiterQuoteResponse {
  inputMint: string;
  outputMint: string;
  inAmount: string;
  outAmount: string;
  otherAmountThreshold: string;
  swapMode: "ExactIn" | "ExactOut";
  slippageBps: number;
  priceImpactPct: string;
  routePlan: unknown[];
  contextSlot?: number;
  timeTaken?: number;
  // Echoed back into /swap unchanged
  [key: string]: unknown;
}

export async function getJupiterQuote(
  params: JupiterQuoteParams,
): Promise<JupiterQuoteResponse> {
  const qs = new URLSearchParams({
    inputMint: params.inputMint,
    outputMint: params.outputMint,
    amount: String(params.amount),
    slippageBps: String(params.slippageBps),
    swapMode: params.swapMode ?? "ExactIn",
  });
  if (params.onlyDirectRoutes) qs.set("onlyDirectRoutes", "true");

  const res = await fetch(`${JUPITER_BASE}/quote?${qs}`, {
    headers: { accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Jupiter quote failed (${res.status}): ${body}`);
  }
  return res.json();
}

export interface JupiterSwapTxParams {
  quoteResponse: JupiterQuoteResponse;
  userPublicKey: string;
  wrapAndUnwrapSol?: boolean;
  prioritizationFeeLamports?:
    | number
    | "auto"
    | { priorityLevelWithMaxLamports: { maxLamports: number; priorityLevel: "medium" | "high" | "veryHigh" } };
  dynamicComputeUnitLimit?: boolean;
  asLegacyTransaction?: boolean;
}

export interface JupiterSwapTxResponse {
  swapTransaction: string; // base64 v0 transaction
  lastValidBlockHeight: number;
  prioritizationFeeLamports?: number;
}

export async function getJupiterSwapTx(
  params: JupiterSwapTxParams,
): Promise<JupiterSwapTxResponse> {
  const res = await fetch(`${JUPITER_BASE}/swap`, {
    method: "POST",
    headers: { "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      quoteResponse: params.quoteResponse,
      userPublicKey: params.userPublicKey,
      wrapAndUnwrapSol: params.wrapAndUnwrapSol ?? true,
      dynamicComputeUnitLimit: params.dynamicComputeUnitLimit ?? true,
      prioritizationFeeLamports:
        params.prioritizationFeeLamports ?? {
          priorityLevelWithMaxLamports: {
            maxLamports: 1_000_000,
            priorityLevel: "high",
          },
        },
      asLegacyTransaction: params.asLegacyTransaction ?? false,
    }),
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Jupiter swap-tx failed (${res.status}): ${body}`);
  }
  return res.json();
}
