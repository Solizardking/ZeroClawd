/**
 * PumpPortal trade API — buy/sell pump.fun bonding-curve tokens.
 * Docs: https://pumpportal.fun/creation/
 *
 * Two modes:
 *   - "trade-local": returns a serialized unsigned tx (base58 v0). We sign
 *     it server-side with the agent keypair and submit ourselves.
 *   - "trade": fully managed (PumpPortal signs + submits using your API key).
 *
 * We use trade-local so the agent hot wallet stays self-custodial.
 */

const PUMPPORTAL_BASE =
  process.env.PUMPPORTAL_API_BASE || "https://pumpportal.fun/api";

export interface PumpTradeRequest {
  publicKey: string;
  action: "buy" | "sell";
  /** Pump.fun mint address */
  mint: string;
  /** SOL for buys, token amount or "100%" for sells */
  amount: number | string;
  /** Whether `amount` is denominated in SOL or tokens (sell only) */
  denominatedInSol: "true" | "false";
  /** Slippage percent (0-100), e.g. 5 for 5% */
  slippage: number;
  /** Priority fee in SOL */
  priorityFee: number;
  /** "pump" | "raydium" | "auto" */
  pool?: "pump" | "raydium" | "auto";
}

/**
 * Returns a base58-encoded unsigned versioned transaction. Sign with the
 * trader's keypair, then submit via Connection.sendRawTransaction.
 */
export async function getPumpTradeLocalTx(
  req: PumpTradeRequest,
): Promise<Uint8Array> {
  const res = await fetch(`${PUMPPORTAL_BASE}/trade-local`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      publicKey: req.publicKey,
      action: req.action,
      mint: req.mint,
      amount: req.amount,
      denominatedInSol: req.denominatedInSol,
      slippage: req.slippage,
      priorityFee: req.priorityFee,
      pool: req.pool ?? "auto",
    }),
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`PumpPortal trade-local failed (${res.status}): ${body}`);
  }
  // Returns raw transaction bytes
  return new Uint8Array(await res.arrayBuffer());
}
