"use server";

import { SpongeWallet } from "@paysponge/sdk";

let _wallet: SpongeWallet | null = null;

/**
 * Returns a singleton SpongeWallet authenticated via SPONGE_API_KEY.
 * Falls back to device-flow only in interactive (non-server) environments.
 * In Next.js API routes / server actions SPONGE_API_KEY must be set.
 */
export async function getSpongeWallet(): Promise<SpongeWallet> {
  if (_wallet) return _wallet;

  const apiKey = process.env.SPONGE_API_KEY;
  if (!apiKey) {
    throw new Error(
      "SPONGE_API_KEY is not set. Add it to .env.local to enable PaySponge features.",
    );
  }

  _wallet = await SpongeWallet.connect({ apiKey });
  return _wallet;
}
