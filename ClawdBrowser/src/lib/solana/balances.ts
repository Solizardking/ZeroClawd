import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import { getConnection } from "./rpc";
import { CURATED_TOKENS, SOL_MINT, TOKENS_BY_MINT } from "./constants";

export interface TokenBalance {
  mint: string;
  symbol: string;
  decimals: number;
  amount: string; // base units, stringified BigInt
  uiAmount: number; // convenience for display
}

/**
 * Pulls SOL + curated SPL balances. We intentionally do not enumerate
 * every account on the wallet — for the swap UI we only need the curated
 * set; users can still trade arbitrary mints via paste.
 */
export async function getWalletBalances(owner: string): Promise<TokenBalance[]> {
  const connection = getConnection();
  const ownerKey = new PublicKey(owner);

  const lamports = await connection.getBalance(ownerKey, "confirmed");
  const out: TokenBalance[] = [
    {
      mint: SOL_MINT,
      symbol: "SOL",
      decimals: 9,
      amount: lamports.toString(),
      uiAmount: lamports / LAMPORTS_PER_SOL,
    },
  ];

  const splTokens = CURATED_TOKENS.filter((t) => t.mint !== SOL_MINT);
  await addSplBalances(connection, ownerKey, TOKEN_PROGRAM_ID, splTokens, out);
  await addSplBalances(connection, ownerKey, TOKEN_2022_PROGRAM_ID, splTokens, out);
  return out;
}

async function addSplBalances(
  connection: Connection,
  owner: PublicKey,
  programId: PublicKey,
  expected: typeof CURATED_TOKENS,
  out: TokenBalance[],
) {
  const res = await connection.getParsedTokenAccountsByOwner(owner, { programId });
  for (const { account } of res.value) {
    const info = (account.data as { parsed?: { info?: ParsedTokenInfo } })
      .parsed?.info;
    if (!info) continue;
    const mint = info.mint;
    const meta = TOKENS_BY_MINT[mint] ?? expected.find((t) => t.mint === mint);
    if (!meta) continue;
    const ui = info.tokenAmount;
    if (out.some((b) => b.mint === mint)) continue;
    out.push({
      mint,
      symbol: meta.symbol,
      decimals: ui.decimals,
      amount: ui.amount,
      uiAmount: ui.uiAmount ?? Number(ui.amount) / 10 ** ui.decimals,
    });
  }
}

interface ParsedTokenInfo {
  mint: string;
  owner: string;
  tokenAmount: {
    amount: string;
    decimals: number;
    uiAmount: number | null;
    uiAmountString: string;
  };
}
