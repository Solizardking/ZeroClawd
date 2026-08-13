# ZK Shark - Shark of All Streets Agent

> ZK Shark is the Shark of All Streets agent, named in honor of zk Shark,
> the legend of ordinals. It wraps [`@clawd/zk-client`](../client/) so
> nullifiers, Groth16 proofs, Light Protocol compressed state, and
> attestation flows can be driven through a typed API, CLI, or deterministic
> natural-language intent router.

The lower-level ZK primitive SDK is useful but repetitive: every caller has
to derive nullifiers, pack public inputs, assemble proofs, and build the
same Solana instructions. `@clawd/zk-shark-agent` keeps that wiring in one
place so an agent can operate across the ZK stack with a small surface:

```ts
import { ZkSharkAgent } from "@clawd/zk-shark-agent";

const agent = await ZkSharkAgent.fromEnv();
const { nullifierHex, signature } = await agent.attestModel({
  modelHash,
  payloadCommitment,
  proof,
  context: "model-attest:v1:my-model",
});
```

`ClawdZkAgent` and `clawd-zk-agent` remain compatibility aliases for older
callers.

## Repo Layout

```text
agent/
├── package.json
├── tsconfig.json
├── README.md
├── SKILL.md
├── src/
│   ├── index.ts
│   ├── agent.ts
│   ├── config.ts
│   ├── intents.ts
│   ├── cli.ts
│   ├── tui.ts
│   ├── theme.ts
│   └── tradeLoop.ts
└── tests/
    ├── agent.test.ts
    ├── theme.test.ts
    ├── tui.test.ts
    └── tradeLoop.test.ts
```

## TUI

Run the binary with no arguments in a terminal (or `zk-shark-agent tui`
explicitly) to launch an interactive, shark-themed menu over the same
operations the CLI exposes — no need to remember flags or hex encode
things by hand:

```bash
zk-shark-agent
# or
zk-shark-agent tui
```

```text
                    .
                   /|
                  / |
                 /  |
      __________/   |____________________________________________
~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^

                        Z K   S H A R K
                🦈  the Shark of All Streets  🦈
     nullifiers · Groth16 proofs · Light Protocol attestations

~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^

  1) 🌊 Inspect configuration
  2) 🦈 Attest a model
  3) 🔐 Commit encrypted state
  4) ✅ Verify a proof
  5) #️⃣  Compute a nullifier
  6) 💬 Ask the shark (natural language)
  7) ❓ Help
  q) 🚪 Swim away (quit)
```

Each menu item walks you through the required inputs (prompting and
re-prompting on malformed hex), shows a shark-cruising spinner while an
operation is in flight, and prints the result in a bordered box. Errors
surface as a "🦈💢 blood in the water" box instead of a raw stack trace.

The TUI is built entirely on Node's own `readline/promises` and ANSI
escape codes (see `src/theme.ts`) — no `ink`/`blessed`/`chalk` — so the
package keeps its zero-extra-dependency footprint. Colors are skipped
automatically when stdout isn't a TTY or `NO_COLOR` is set.

`runTui()` and the `sharkTheme` namespace are also exported from the
package root for anyone embedding the same menu elsewhere.

## Trade Loop (paper, any token)

Menu option `8` (or `zk-shark-agent trade-loop`) lets the shark launch a
**paper-trading** OODA loop for whatever token you name — it spawns the
sibling `ooda/loop.ts` harness (see `ooda/README.md`) and streams every
tick back into the TUI, shark-flavored:

```bash
zk-shark-agent trade-loop --token BONK --ticks 100 --sleep 0.25
zk-shark-agent trade-loop --token WIF --ticks 50 --llm     # LLM-routed decisions
zk-shark-agent trade-loop --token PEPE --goblin            # GOBLIN MODE
```

This is a thin bridge, not a second trading engine — `ooda/loop.ts`
enforces its own safety contract entirely on its own (paper mode +
devnet only, mainnet RPCs rejected, position-size caps, a kill-switch),
and this module cannot weaken any of it. The `--token` you pick only
labels the run (journal entries, the LLM prompt, the default perps-OI
symbol); the price feed is the harness's seeded synthetic generator,
not a live market feed — see `ooda/README.md` for the full contract and
how to wire in a real price adapter.

Requires running from inside the go-bot monorepo (`ooda/` must sit next
to `zk-primitives/`); `resolveOodaDir()` throws a clear error otherwise.
`runTradeLoop`, `buildLoopArgs`, and `resolveOodaDir` are exported from
the package root for programmatic use.

## CLI

```bash
zk-shark-agent inspect
zk-shark-agent attest <modelHash> <payloadCommitment> <proof.json> \
  [--context "model-attest:v1:my-model"]
zk-shark-agent commit <ciphertextCommitment> <stateVersion> <proof.json> \
  [--model <modelHash>]
zk-shark-agent verify <proof.json>
zk-shark-agent nullifier "model-attest:v1:my-model"
zk-shark-agent ask "attest this model 0xab12... with my proof"
zk-shark-agent trade-loop --token BONK --ticks 100 --sleep 0.25
```

The package also exposes `shark-of-all-streets` as a command alias.

The proof JSON shape is:

```json
{
  "a": "0x0102...",
  "b": "0x0102...",
  "c": "0x0102...",
  "verifyingKey": "0x0102..."
}
```

## Programmatic API

```ts
import { ZkSharkAgent } from "@clawd/zk-shark-agent";

const agent = await ZkSharkAgent.fromEnv();

const result = await agent.attestModel({
  modelHash: new Uint8Array(32),
  payloadCommitment: new Uint8Array(32),
  proof: { a, b, c, verifyingKey },
  context: "model-attest:v1:my-model",
});

console.log(result.nullifierHex);
```

The four core operations are:

| Method | Purpose |
|---|---|
| `agent.attestModel({ modelHash, payloadCommitment, proof, context })` | Build a `publish_attestation` instruction with a nullifier. |
| `agent.commitEncryptedState({ modelHash, ciphertextCommitment, stateVersion, proof })` | Build a `commit_encrypted_state` instruction. |
| `agent.verifyProof({ proof, publicInputs?, ... })` | Run the off-chain proof and input-shape sanity check. |
| `agent.computeNullifierFor(secret, context)` | Derive a deterministic 32-byte nullifier. |

## Configuration

Preferred environment variables:

| Var | Default | Notes |
|---|---|---|
| `ZK_SHARK_RPC_URL` | required | Solana RPC endpoint. |
| `ZK_SHARK_PROGRAM_ID` | placeholder mainnet pubkey | Base58 pubkey, or `ZK_SHARK_MAINNET`, `ZK_SHARK_DEVNET`, `ZK_SHARK_LOCALNET`. |
| `ZK_SHARK_PHOTON_URL` | `ZK_SHARK_RPC_URL` | Photon indexer URL. |
| `ZK_SHARK_API_KEY` | none | Separate RPC API key when needed. |
| `ZK_SHARK_COMMITMENT` | `confirmed` | `processed`, `confirmed`, or `finalized`. |
| `ZK_SHARK_KEYPAIR` | none | Path to a Solana CLI keypair JSON. |
| `ZK_SHARK_NETWORK` | `mainnet` | `mainnet`, `devnet`, or `localnet`. |

Legacy `CLAWD_ZK_*` variables and `CLAWDZK_*` program aliases are still
accepted as fallbacks.

## Intent Router

The router is deterministic and rule-based, with no model calls. It maps
natural language to executable routes:

| Verb pattern | Routed action |
|---|---|
| `attest`, `attestation`, `publish`, `publish_attestation` | `attestModel` |
| `commit`, `commit_state`, `encrypted state`, `ciphertext` | `commitEncryptedState` |
| `verify`, `check`, `validate` | `verifyProof` |
| `nullifier`, `derive`, `compute_nullifier` | `computeNullifier` |
| `inspect`, `config`, `status`, `show` | `describe` |
| `help`, `usage`, `how`, `what` | `help` |

## Status

This package is an off-chain agent surface. It builds instructions and
performs deterministic preparation. Production transaction submission still
needs the `trySend` hook in [src/agent.ts](src/agent.ts) wired to the chosen
`@solana/kit` send-and-confirm pipeline.

## See Also

- [`../client/`](../client/) - lower-level SDK (`@clawd/zk-client`)
- [`../programs/clawd-zk/`](../programs/clawd-zk/) - Anchor program
- [`../docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md) - architecture notes
- [`../../AGENTS.md`](../../AGENTS.md) - agent catalog

## License

Apache-2.0.
