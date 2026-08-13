---
name: zk-shark-agent
description: Drive ZK Shark, the Shark of All Streets agent, for nullifiers, Groth16 proofs, Light Protocol compressed state, model attestations, encrypted-state commitments, proof checks, nullifier derivation, and deterministic natural-language routing.
when_to_use: |
  Use this skill whenever the request is one of:
    - "attest this model with hash 0xab12... and proof.json"
    - "publish an attestation for my fine-tuned model"
    - "commit this encrypted state blob"
    - "verify this Groth16 proof against the publish inputs"
    - "derive a nullifier for context foo"
    - "show me the ZK Shark config" / "inspect the zk shark agent"
    - "mint/register a Metaplex agent identity" / "check the $CLAWD gate"
    - "launch an agent token on Solana" / "launch a Genesis bonding-curve token"
  Do not use it for on-chain trading, voice calls, or generic Solana RPC queries.
inputs:
  - modelHash            (optional, hex) - 32-byte model hash for attest intents
  - payloadCommitment    (optional, hex) - 32-byte payload commitment for attest
  - ciphertextCommitment (optional, hex) - 32-byte ciphertext commitment for commit
  - stateVersion         (optional, number) - version number for commit (default 1)
  - context              (optional, string) - domain-separated context tag
  - proofPath            (optional, string) - path to a Groth16 proof JSON file
  - proof                (optional, Groth16Proof) - inline proof if not loading from disk
outputs:
  - nullifierHex            (string) - the derived 32-byte nullifier
  - publicInputsPackedHex   (string) - the canonical public input vector
  - instruction             (TransactionInstruction) - ready-to-sign Solana instruction
  - signature               (string, optional) - transaction signature when a signer is attached
  - summary                 (string) - human-readable operation summary
env:
  required: [ZK_SHARK_RPC_URL]
  optional:
    - ZK_SHARK_PROGRAM_ID
    - ZK_SHARK_PHOTON_URL
    - ZK_SHARK_API_KEY
    - ZK_SHARK_COMMITMENT
    - ZK_SHARK_KEYPAIR
    - ZK_SHARK_NETWORK
    - ZK_SHARK_METAPLEX_AGENTS_API
---

# ZK Shark Agent

ZK Shark is the Shark of All Streets agent, named in honor of zk Shark,
the legend of ordinals. It wraps the lower-level `@clawd/zk-client` SDK
and exposes the four operations an agent needs most:

| Method | Purpose |
|---|---|
| `agent.attestModel({ modelHash, payloadCommitment, proof, context })` | Build a `publish_attestation` instruction. |
| `agent.commitEncryptedState({ modelHash, ciphertextCommitment, stateVersion, proof })` | Build a `commit_encrypted_state` instruction. |
| `agent.verifyProof({ proof, publicInputs?, ... })` | Off-chain Groth16 sanity check. |
| `agent.computeNullifierFor(secret, context)` | Deterministic 32-byte nullifier. |

The class name is `ZkSharkAgent`. `ClawdZkAgent` remains exported as a
compatibility alias.

## Quick Start

```ts
import { ZkSharkAgent, routeIntent, dispatchRoute } from "@clawd/zk-shark-agent";

const agent = await ZkSharkAgent.fromEnv();

const route = routeIntent(
  "attest this model 0xab12cd34... with my proof.json",
  agent,
  { payloadCommitment: "0x" + "ab".repeat(32), proofPath: "./proof.json" },
);

const result = await dispatchRoute(route, agent);
console.log(result);
```

The router is deterministic and rule-based. It makes no model calls.

## Recognised Intents

| Verb pattern | Routed action | Required context |
|---|---|---|
| `attest`, `attestation`, `publish`, `publish_attestation` | `attestModel` | `modelHash`, `payloadCommitment`, `proofPath` |
| `commit`, `commit_state`, `encrypted state`, `ciphertext` | `commitEncryptedState` | `ciphertextCommitment`, `stateVersion`, `proofPath` |
| `verify`, `check`, `validate` | `verifyProof` | `proofPath` |
| `nullifier`, `derive`, `compute_nullifier` | `computeNullifier` | `context` |
| `inspect`, `config`, `status`, `show` | `describe` | none |
| `help`, `usage`, `how`, `what` | `help` | none |

## CLI

```bash
zk-shark-agent inspect
zk-shark-agent attest  <modelHash> <payloadCommitment> <proof.json> [--context "..."]
zk-shark-agent commit  <ciphertextCommitment> <stateVersion> <proof.json> [--model <modelHash>]
zk-shark-agent verify  <proof.json>
zk-shark-agent nullifier "context-tag"
zk-shark-agent ask     "natural language"
```

`shark-of-all-streets` is also available as a binary alias. The legacy
`clawd-zk-agent` binary remains available for older scripts.

Running the binary with no arguments in a terminal (or `zk-shark-agent
tui` explicitly) launches an interactive, shark-themed TUI menu that
wraps the same operations for humans — see `README.md` for details.

`zk-shark-agent trade-loop --token <SYM>` (also menu option `8` in the
TUI) spawns the sibling `ooda/loop.ts` paper-trading harness for any
named token and streams its ticks live. It is a thin bridge — all
safety enforcement (paper mode, devnet only, position caps, kill-switch)
lives entirely in `ooda/`, unchanged by this agent. Requires running
from inside the go-bot monorepo.

### Metaplex agent identity + token (real onchain actions)

- `zk-shark-agent clawd-gate [wallet]` (menu `9`) — read-only check of
  whether a wallet qualifies for treasury-sponsored free agent minting
  by its $CLAWD balance (mint `8cHzQHUS2s2h8TzCmfqPKYiM4dSt4roa3n7MyRLApump`
  on pump.fun). No transaction, no cost.
- `zk-shark-agent register-agent <doc.json> --uri <url>` (menu `10`) —
  mints a Metaplex Core NFT agent identity via
  `@metaplex-foundation/mpl-agent-registry`'s `mintAndSubmitAgent`.
- `zk-shark-agent launch-token --asset <addr> --name X --symbol Y --image <irysUrl>`
  (menu `11`) — launches a bonding-curve token bound to that identity
  via `@metaplex-foundation/genesis`'s `createAndRegisterLaunch`.

**Both mutating commands default to a devnet dry run and require an
explicit `--confirm` (or an explicit "yes" in the TUI) to actually send
a transaction.** `--set-token` is permanent — one token per agent,
forever — and defaults to off. Never invoke these with `--confirm`
against mainnet without the operator's explicit, informed go-ahead.

The proof JSON shape is:

```json
{
  "a": "0x...",
  "b": "0x...",
  "c": "0x...",
  "verifyingKey": "0x..."
}
```

## Configuration

Use `ZK_SHARK_RPC_URL` plus the optional `ZK_SHARK_*` variables declared
in the frontmatter. Legacy `CLAWD_ZK_*` variables are still accepted as
fallbacks.

Named program aliases:

| Alias | Purpose |
|---|---|
| `ZK_SHARK_MAINNET` | Default mainnet placeholder. |
| `ZK_SHARK_DEVNET` | Devnet placeholder. |
| `ZK_SHARK_LOCALNET` | Localnet placeholder. |

Legacy `CLAWDZK_MAINNET`, `CLAWDZK_DEVNET`, and `CLAWDZK_LOCALNET` are
also accepted.

## Failure Modes

- `ZK_SHARK_RPC_URL is not set` - add it to the environment, or keep
  using legacy `CLAWD_ZK_RPC_URL`.
- `Invalid ZK_SHARK_PROGRAM_ID/CLAWD_ZK_PROGRAM_ID` - the value is not
  a base58 pubkey and not a known alias.
- `proof.a must be 64 bytes` - the proof JSON is malformed; re-export
  from the prover.
- `Secret must be at least 16 bytes` - supply a real nullifier secret.
- `mintAgentIdentity requires a signer` / `launchAgentToken requires a
  signer` - set `ZK_SHARK_KEYPAIR` to a funded Solana keypair JSON.
- `Token image must be an Irys URL` - upload the token image to Irys
  first; only `https://gateway.irys.xyz/...` URLs pass Genesis validation.
- `Genesis validation error on "<field>"` / `Genesis API error (<code>)`
  - typed errors surfaced verbatim from `@metaplex-foundation/genesis`.

## Cross-References

- Lower-level SDK: `zk-primitives/client/`
- Anchor program: `zk-primitives/programs/clawd-zk/`
- Architecture notes: `zk-primitives/docs/ARCHITECTURE.md`
- Agent catalog: `AGENTS.md`
- Paper-trading harness: `ooda/README.md`
- Token launch SDK: `@metaplex-foundation/genesis`
- Agent identity SDK: `@metaplex-foundation/mpl-agent-registry`
