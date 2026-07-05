"use server";

/**
 * Transaction building + signing for Phoenix perps.
 * Uses @solana/kit (web3.js v2) primitives, the same ones @ellipsis-labs/rise depends on.
 *
 * Fee payer = agent authority. Since they're the same keypair, one signature
 * satisfies both the fee payer slot and any authority WRITABLE_SIGNER accounts
 * the Rise SDK places in its instructions.
 */

import bs58 from "bs58";
import {
  addSignersToInstruction,
  createKeyPairSignerFromBytes,
  setTransactionMessageFeePayerSigner,
  signTransactionMessageWithSigners,
} from "@solana/signers";
import {
  AccountRole,
  appendTransactionMessageInstructions,
  createSolanaRpc,
  createSolanaRpcSubscriptions,
  createTransactionMessage,
  getSignatureFromTransaction,
  pipe,
  sendAndConfirmTransactionFactory,
  setTransactionMessageLifetimeUsingBlockhash,
  type IInstruction,
} from "@solana/kit";

function toWssUrl(httpUrl: string): string {
  return httpUrl.replace(/^https:\/\//, "wss://").replace(/^http:\/\//, "ws://");
}

function loadKeypairBytes(): Uint8Array {
  const raw = process.env.AGENT_WALLET_PRIVATE_KEY;
  if (!raw) throw new Error("AGENT_WALLET_PRIVATE_KEY not set");
  const trimmed = raw.trim();
  return trimmed.startsWith("[")
    ? Uint8Array.from(JSON.parse(trimmed) as number[])
    : bs58.decode(trimmed);
}

/**
 * Signs and sends a batch of Phoenix instructions using the agent hot wallet.
 * The signer is injected into every WRITABLE_SIGNER / READONLY_SIGNER account
 * whose address matches the agent pubkey, so one keypair covers both fee payer
 * and authority roles.
 *
 * Returns the base58 transaction signature.
 */
export async function sendPhoenixInstructions(
  instructions: IInstruction[],
): Promise<string> {
  const rpcUrl =
    process.env.SOLANA_RPC_URL ??
    process.env.NEXT_PUBLIC_SOLANA_RPC_URL ??
    "https://api.mainnet-beta.solana.com";

  const rpc = createSolanaRpc(rpcUrl);
  const rpcSubscriptions = createSolanaRpcSubscriptions(toWssUrl(rpcUrl));
  const sendAndConfirm = sendAndConfirmTransactionFactory({ rpc, rpcSubscriptions });

  const signer = await createKeyPairSignerFromBytes(loadKeypairBytes());
  const agentAddress = signer.address;

  // Embed the signer into every instruction account that (a) is a signer role
  // and (b) belongs to the agent. This makes signTransactionMessageWithSigners
  // pick them up automatically.
  const signedIxs = instructions.map((ix) => {
    const accounts = ix.accounts;
    if (!accounts) return ix;
    const needsInjection = accounts.some(
      (a) =>
        a.address === agentAddress &&
        (a.role === AccountRole.WRITABLE_SIGNER ||
          a.role === AccountRole.READONLY_SIGNER),
    );
    if (!needsInjection) return ix;
    return addSignersToInstruction([signer], ix);
  });

  const latestBlockhash = await rpc
    .getLatestBlockhash({ commitment: "confirmed" })
    .send();

  const txMsg = pipe(
    createTransactionMessage({ version: 0 }),
    (tx) => setTransactionMessageFeePayerSigner(signer, tx),
    (tx) =>
      setTransactionMessageLifetimeUsingBlockhash(latestBlockhash.value, tx),
    (tx) => appendTransactionMessageInstructions(signedIxs, tx),
  );

  const signed = await signTransactionMessageWithSigners(txMsg);
  const signature = getSignatureFromTransaction(signed);

  await sendAndConfirm(
    {
      ...signed,
      lifetimeConstraint: {
        lastValidBlockHeight: latestBlockhash.value.lastValidBlockHeight,
      },
    },
    { commitment: "confirmed" },
  );

  return signature as string;
}
