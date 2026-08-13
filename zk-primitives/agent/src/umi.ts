/**
 * Builds a Umi instance from a ZkSharkAgent's existing signer/RPC config,
 * so the Metaplex Genesis and Agent Registry SDKs can share the same
 * `ZK_SHARK_KEYPAIR` / `ZK_SHARK_RPC_URL` config the rest of this agent
 * already uses — no new key-handling surface.
 */

import type { Keypair } from "@solana/web3.js";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { keypairIdentity, type Umi } from "@metaplex-foundation/umi";

export function buildUmi(rpcUrl: string, signer?: Keypair): Umi {
  const umi = createUmi(rpcUrl);
  if (signer) {
    const umiKeypair = umi.eddsa.createKeypairFromSecretKey(signer.secretKey);
    umi.use(keypairIdentity(umiKeypair));
  }
  return umi;
}
