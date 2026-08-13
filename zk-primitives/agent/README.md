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
│   ├── tradeLoop.ts
│   ├── clawdToken.ts
│   ├── metaplexAgentIdentity.ts
│   ├── genesisAgentToken.ts
│   └── umi.ts
└── tests/
    ├── agent.test.ts
    ├── theme.test.ts
    ├── tui.test.ts
    ├── tradeLoop.test.ts
    ├── clawdToken.test.ts
    ├── metaplexAgentIdentity.test.ts
    └── genesisAgentToken.test.ts
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
  8) 🔁 Run a trade loop (paper, any token)
  9) 🦞 Check $CLAWD gate (pump.fun)
  10) 🪪 Register + mint agent identity (Metaplex)
  11) 🚀 Launch agent token (Genesis)
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

## Metaplex Agent — mint an identity, launch a token, check $CLAWD

Menu options `9`–`11` (and matching CLI subcommands) let the shark
register a real onchain agent identity and launch a real agent token on
Solana, using the official `@metaplex-foundation/genesis` and
`@metaplex-foundation/mpl-agent-registry` SDKs — not a simulation.

**⚠️ These are real, costly, irreversible mainnet actions when
confirmed.** Every mutating call defaults to a **dry run** (devnet,
`--network devnet` implied, no transaction sent) and requires an
explicit `--confirm` flag (CLI) or a loud "yes, actually submit"
prompt (TUI) before it sends anything. `setToken`/`--set-token` is
**permanent** — an agent can only ever have one token, forever, per the
Metaplex Genesis contract — and defaults to `false`.

### 9 — Check the $CLAWD gate (pump.fun)

The live Metaplex Agents minting service is gated by $CLAWD (mint
[`8cHzQHUS2s2h8TzCmfqPKYiM4dSt4roa3n7MyRLApump`](https://pump.fun/coin/8cHzQHUS2s2h8TzCmfqPKYiM4dSt4roa3n7MyRLApump)
on pump.fun) — wallets holding ≥1,000,000 raw units get **treasury-sponsored,
free** minting; everyone else pays a small x402 USDC fee. This is a
read-only check (live API + an independent onchain RPC read), not a
decoration — it tells you what minting will actually cost.

```bash
zk-shark-agent clawd-gate [walletAddress]   # defaults to the configured signer
```

### 10 — Register + mint the agent identity

Mints a Metaplex Core NFT identity from an EIP-8004 `registration-v1`
style document (`type`, `name`, `description`, `services`,
`registrations`, `supportedTrust` — `image`/`x402Support`/`active` are
kept in the hosted doc but not part of the on-chain struct). Host the
full doc JSON somewhere (Arweave/IPFS/your own domain) and pass that
URL as `--uri`.

```bash
zk-shark-agent register-agent ./agent.json --uri https://your-host/agent.json \
  --network devnet          # dry run — prints the exact MintAgentInput, sends nothing
zk-shark-agent register-agent ./agent.json --uri https://your-host/agent.json \
  --network mainnet --confirm   # actually mints — real SOL fees (or free if $CLAWD-gated)
```

### 11 — Launch the agent token

Launches a bonding-curve token bound to the agent's Core asset via
Genesis's `createAndRegisterLaunch` — creator fees route automatically
to the agent's asset-signer PDA.

```bash
zk-shark-agent launch-token --asset <agentCoreAssetAddress> \
  --name "Clawd Shark" --symbol CLSHK --image https://gateway.irys.xyz/<id> \
  --network devnet                       # dry run
zk-shark-agent launch-token --asset <agentCoreAssetAddress> \
  --name "Clawd Shark" --symbol CLSHK --image https://gateway.irys.xyz/<id> \
  --network mainnet --first-buy 0.1 --set-token --confirm   # real launch, permanent
```

The token `image` **must** be an Irys gateway URL
(`https://gateway.irys.xyz/...`) — upload there first, per the Genesis
API's own validation. `--set-token` is the permanent one-token-per-agent
link; omit it (or answer "no" in the TUI) to launch without committing.

`checkClawdGate`, `getClawdBalanceOnchain`, `mintAgentIdentity`,
`buildMintAgentInput`, `launchAgentToken`, `buildLaunchInput`, and
`validateTokenMetadata` are all exported from the package root for
programmatic use — every one of them is pure/dry-run-safe except
`mintAgentIdentity`/`launchAgentToken` with `confirm: true`.

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
zk-shark-agent clawd-gate [walletAddress]
zk-shark-agent register-agent ./agent.json --uri <hostedUrl> [--network mainnet|devnet] [--confirm]
zk-shark-agent launch-token --asset <agentAssetAddress> --name X --symbol Y \
  --image https://gateway.irys.xyz/<id> [--network mainnet|devnet] [--set-token] [--confirm]
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
| `ZK_SHARK_METAPLEX_AGENTS_API` | `https://cheshireterminal.ai/api/metaplex-agents` | Base URL for the $CLAWD gate check. |

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
- [`../../ooda/README.md`](../../ooda/README.md) - the paper-trading harness behind `trade-loop`
- [`@metaplex-foundation/genesis`](https://www.npmjs.com/package/@metaplex-foundation/genesis) - token launch SDK behind `launch-token`
- [`@metaplex-foundation/mpl-agent-registry`](https://www.npmjs.com/package/@metaplex-foundation/mpl-agent-registry) - agent identity SDK behind `register-agent`

## License

Apache-2.0.
