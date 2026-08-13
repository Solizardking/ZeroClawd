/**
 * Launch the ZK Shark's agent token — a Genesis bonding-curve token bound
 * to an already-registered agent's Core asset, via
 * `@metaplex-foundation/genesis`'s `createAndRegisterLaunch`.
 *
 * SAFETY: an agent can only ever have one token. `setToken: true` is
 * PERMANENT — it cannot be changed, replaced, or unset once the
 * transaction confirms (see the Metaplex Genesis docs). Every function
 * here defaults to a dry run: it validates and returns the exact input
 * that WOULD be submitted, without sending anything, unless the caller
 * passes `confirm: true`. `setToken` also defaults to `false`.
 */

import type { Keypair } from "@solana/web3.js";
import {
  createAndRegisterLaunch,
  isGenesisApiError,
  isGenesisApiNetworkError,
  isGenesisValidationError,
  type CreateBondingCurveLaunchInput,
  type SvmNetwork,
  type TokenMetadata,
} from "@metaplex-foundation/genesis";
import { buildUmi } from "./umi.js";

const IRYS_PREFIX = "https://gateway.irys.xyz/";

/** Validate token metadata against the Genesis API's documented constraints. */
export function validateTokenMetadata(token: TokenMetadata): void {
  if (token.name.length < 1 || token.name.length > 32) {
    throw new Error(`Token name must be 1-32 characters, got ${token.name.length}.`);
  }
  if (token.symbol.length < 1 || token.symbol.length > 10) {
    throw new Error(`Token symbol must be 1-10 characters, got ${token.symbol.length}.`);
  }
  if (!token.image.startsWith(IRYS_PREFIX)) {
    throw new Error(`Token image must be an Irys URL (${IRYS_PREFIX}...), got "${token.image}".`);
  }
  if (token.description && token.description.length > 250) {
    throw new Error(`Token description must be at most 250 characters, got ${token.description.length}.`);
  }
}

export interface LaunchAgentTokenOptions {
  /** Core asset address of the already-registered agent (see metaplexAgentIdentity.ts). */
  agentAssetAddress: string;
  token: TokenMetadata;
  /** Defaults to devnet — pass "solana-mainnet" explicitly to go live. */
  network?: SvmNetwork;
  /** PERMANENT once confirmed. Defaults to false — only set true when certain. */
  setToken?: boolean;
  /** SOL amount for a fee-free first buy reserved for the agent. */
  firstBuyAmount?: number;
  /** Must be true to actually submit the launch transactions. Defaults to a dry run. */
  confirm?: boolean;
}

export interface LaunchAgentTokenPreview {
  confirmed: false;
  network: SvmNetwork;
  input: CreateBondingCurveLaunchInput;
}

export interface LaunchAgentTokenResult {
  confirmed: true;
  network: SvmNetwork;
  mintAddress: string;
  genesisAccount: string;
  launchLink: string;
}

/** Build the exact launch input this call would submit — pure, no I/O. */
export function buildLaunchInput(walletBase58: string, opts: LaunchAgentTokenOptions): CreateBondingCurveLaunchInput {
  validateTokenMetadata(opts.token);
  return {
    wallet: walletBase58,
    token: opts.token,
    network: opts.network ?? "solana-devnet",
    launchType: "bondingCurve",
    agent: { mint: opts.agentAssetAddress, setToken: opts.setToken ?? false },
    launch: {
      firstBuyAmount: opts.firstBuyAmount,
    },
  };
}

function describeGenesisError(err: unknown): Error {
  if (isGenesisValidationError(err)) {
    return new Error(`Genesis validation error on "${err.field}": ${err.message}`);
  }
  if (isGenesisApiNetworkError(err)) {
    return new Error(`Genesis API network error: ${err.message}`);
  }
  if (isGenesisApiError(err)) {
    return new Error(`Genesis API error (${err.statusCode}): ${err.message} — ${JSON.stringify(err.responseBody)}`);
  }
  return err instanceof Error ? err : new Error(String(err));
}

/**
 * Launch the agent's bonding-curve token. Defaults to a dry run (no
 * network mutation, `setToken` forced false in the preview) — pass
 * `confirm: true` to actually sign and send.
 */
export async function launchAgentToken(
  rpcUrl: string,
  signer: Keypair | undefined,
  opts: LaunchAgentTokenOptions,
): Promise<LaunchAgentTokenPreview | LaunchAgentTokenResult> {
  if (!signer) {
    throw new Error("launchAgentToken requires a signer — set ZK_SHARK_KEYPAIR.");
  }
  const network = opts.network ?? "solana-devnet";
  const input = buildLaunchInput(signer.publicKey.toBase58(), { ...opts, network });

  if (!opts.confirm) {
    return { confirmed: false, network, input };
  }

  const umi = buildUmi(rpcUrl, signer);
  try {
    const result = await createAndRegisterLaunch(umi, {}, input);
    return {
      confirmed: true,
      network,
      mintAddress: result.mintAddress,
      genesisAccount: result.genesisAccount,
      launchLink: result.launch.link,
    };
  } catch (err) {
    throw describeGenesisError(err);
  }
}
