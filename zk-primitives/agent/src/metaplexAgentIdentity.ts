/**
 * Register + mint the ZK Shark's onchain agent identity — a Metaplex Core
 * NFT via `@metaplex-foundation/mpl-agent-registry`'s `mintAndSubmitAgent`.
 *
 * This mints a REAL, permanent onchain asset and costs real SOL (or is
 * treasury-sponsored when the wallet holds enough $CLAWD — see
 * `clawdToken.ts`). Every function here defaults to a dry run: it builds
 * and returns the exact input that WOULD be submitted, without sending
 * anything, unless the caller passes `confirm: true`.
 */

import { Buffer } from "node:buffer";
import type { Keypair } from "@solana/web3.js";
import {
  mintAndSubmitAgent,
  type AgentMetadata,
  type AgentRegistration,
  type AgentService,
  type MintAgentInput,
  type SvmNetwork,
} from "@metaplex-foundation/mpl-agent-registry";
import { buildUmi } from "./umi.js";

/**
 * The off-chain-hosted registration document shape (EIP-8004
 * `registration-v1` flavored, per the Metaplex Agent API convention). Host
 * this JSON somewhere (Arweave/IPFS/your own domain) and pass the URL as
 * `uri` — the on-chain `agentMetadata` is a validated subset of it.
 */
export interface AgentRegistrationDoc {
  type: string;
  name: string;
  description: string;
  image?: string;
  services: AgentService[];
  x402Support?: boolean;
  active?: boolean;
  registrations: AgentRegistration[];
  supportedTrust: string[];
}

/** Derive the on-chain `agentMetadata` struct from the full registration doc. */
export function toAgentMetadata(doc: AgentRegistrationDoc): AgentMetadata {
  return {
    type: doc.type,
    name: doc.name,
    description: doc.description,
    services: doc.services,
    registrations: doc.registrations,
    supportedTrust: doc.supportedTrust,
  };
}

export interface MintAgentIdentityOptions {
  doc: AgentRegistrationDoc;
  /** URL where `doc` (or an equivalent metadata JSON) is hosted. */
  uri: string;
  /** Defaults to devnet — pass "solana-mainnet" explicitly to go live. */
  network?: SvmNetwork;
  /** Must be true to actually submit the mint transaction. Defaults to a dry run. */
  confirm?: boolean;
}

export interface MintAgentIdentityPreview {
  confirmed: false;
  network: SvmNetwork;
  input: MintAgentInput;
}

export interface MintAgentIdentityResult {
  confirmed: true;
  network: SvmNetwork;
  assetAddress: string;
  signatureHex: string;
}

/** Build the exact `MintAgentInput` this call would submit — pure, no I/O. */
export function buildMintAgentInput(walletBase58: string, opts: MintAgentIdentityOptions): MintAgentInput {
  return {
    wallet: walletBase58,
    network: opts.network ?? "solana-devnet",
    name: opts.doc.name,
    uri: opts.uri,
    agentMetadata: toAgentMetadata(opts.doc),
  };
}

/**
 * Register + mint the agent identity. Defaults to a dry run (no network
 * mutation) — pass `confirm: true` to actually sign and send.
 */
export async function mintAgentIdentity(
  rpcUrl: string,
  signer: Keypair | undefined,
  opts: MintAgentIdentityOptions,
): Promise<MintAgentIdentityPreview | MintAgentIdentityResult> {
  if (!signer) {
    throw new Error("mintAgentIdentity requires a signer — set ZK_SHARK_KEYPAIR.");
  }
  const network = opts.network ?? "solana-devnet";
  const input = buildMintAgentInput(signer.publicKey.toBase58(), { ...opts, network });

  if (!opts.confirm) {
    return { confirmed: false, network, input };
  }

  const umi = buildUmi(rpcUrl, signer);
  const result = await mintAndSubmitAgent(umi, {}, input);
  return {
    confirmed: true,
    network,
    assetAddress: result.assetAddress,
    signatureHex: Buffer.from(result.signature).toString("hex"),
  };
}
