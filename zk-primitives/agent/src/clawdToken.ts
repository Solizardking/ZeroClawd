/**
 * $CLAWD (pump.fun) integration — how the shark "checks in with the reef"
 * before minting or launching an agent identity.
 *
 * The live Metaplex Agents mint service (see `metaplexAgentIdentity.ts`)
 * gates its treasury-sponsored (free) minting on holding at least
 * `minimumBalance` raw units of $CLAWD — everyone else pays a small x402
 * USDC fee instead. This module checks that gate for real, plus an
 * independent on-chain balance read that needs no external API.
 */

import { PublicKey } from "@solana/web3.js";
import type { Connection } from "@solana/web3.js";

/** The canonical $CLAWD mint on pump.fun, as given by the operator. */
export const CLAWD_MINT = "8cHzQHUS2s2h8TzCmfqPKYiM4dSt4roa3n7MyRLApump";

export interface ClawdGateResult {
  mint: string;
  balance: number;
  minimumBalance: number;
  eligible: boolean;
  source: string;
}

const DEFAULT_METAPLEX_AGENTS_API = "https://cheshireterminal.ai/api/metaplex-agents";

function metaplexAgentsApiBase(): string {
  return (process.env.ZK_SHARK_METAPLEX_AGENTS_API ?? DEFAULT_METAPLEX_AGENTS_API).replace(/\/$/, "");
}

/**
 * Check whether `ownerAddress` qualifies for treasury-sponsored (free) agent
 * minting by hitting the live gate endpoint. Read-only — makes no
 * transactions and costs nothing.
 */
export async function checkClawdGate(
  ownerAddress: string,
  fetchFn: typeof fetch = fetch,
): Promise<ClawdGateResult> {
  const url = `${metaplexAgentsApiBase()}/gate/${ownerAddress}`;
  const res = await fetchFn(url);
  if (!res.ok) {
    throw new Error(`$CLAWD gate check failed: ${res.status} ${await res.text()}`);
  }
  const body = (await res.json()) as { success: boolean; gate: ClawdGateResult };
  if (!body.success) {
    throw new Error("$CLAWD gate check returned success=false");
  }
  return body.gate;
}

export interface ClawdOnchainBalance {
  mint: string;
  balanceRaw: bigint;
  balanceUi: number;
  decimals: number;
}

/**
 * Independent on-chain $CLAWD balance read via the configured Solana RPC —
 * no dependency on the cheshireterminal.ai API. Sums all token accounts the
 * owner holds for the $CLAWD mint.
 */
export async function getClawdBalanceOnchain(
  connection: Connection,
  ownerAddress: string,
): Promise<ClawdOnchainBalance> {
  const owner = new PublicKey(ownerAddress);
  const mint = new PublicKey(CLAWD_MINT);
  const accounts = await connection.getParsedTokenAccountsByOwner(owner, { mint });

  let balanceRaw = 0n;
  let decimals = 6;
  for (const { account } of accounts.value) {
    const info = account.data.parsed?.info as
      | { tokenAmount: { amount: string; decimals: number } }
      | undefined;
    if (!info) continue;
    balanceRaw += BigInt(info.tokenAmount.amount);
    decimals = info.tokenAmount.decimals;
  }

  return {
    mint: CLAWD_MINT,
    balanceRaw,
    balanceUi: Number(balanceRaw) / 10 ** decimals,
    decimals,
  };
}
