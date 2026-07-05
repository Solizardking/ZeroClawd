# Cloudflare + ZK Runtime Surface

This document ties together the edge installer, the local ZK primitive source,
and the Go runtime catalog.

## Local Paths

| Path | Role |
|---|---|
| `cloudflare/install-worker.js` | Cloudflare Worker for install wrappers, raw installer proxying, and metadata |
| `cloudflare/install-worker.test.mjs` | Local route and metadata test |
| `cloudflare/README.md` | Worker deployment and smoke-test guide |
| `wrangler.toml` | Worker config, vars, and routes |
| `zk-primitives/MANIFEST.json` | Machine-readable ZK subsystem index |
| `zk-primitives/docs/EDGE_DISTRIBUTION.md` | ZK-specific edge metadata contract |
| `pkg/catalog/catalog.go` | Go runtime loader for local skill, agent, and ZK catalog surfaces |
| `cmd/clawdbot/main.go` | `clawdbot catalog zk` display command |

## Public Routes

| Route | Output |
|---|---|
| `https://install.onchainai.fund/` | Complete install wrapper |
| `https://install.onchainai.fund/install.sh` | Raw installer proxy |
| `https://install.onchainai.fund/.well-known/clawdbot-install.json` | Combined installer metadata |
| `https://install.onchainai.fund/.well-known/clawdbot-zk.json` | ZK primitive metadata |
| `https://zk.x402.wtf/clawdbot` | Complete install wrapper under `/clawdbot` |
| `https://zk.x402.wtf/clawdbot/.well-known/clawdbot-zk.json` | ZK primitive metadata under `/clawdbot` |

## Verification

```bash
node --test cloudflare/install-worker.test.mjs
go test ./pkg/catalog
clawdbot catalog zk
curl -fsSL https://install.onchainai.fund/.well-known/clawdbot-zk.json
```

## Trust Boundary

Cloudflare metadata is observer-only discovery data. The local ZK packages can
compute nullifiers, verify proof shape, and build dry-run Solana instructions.
Live signing and transaction submission remain delegated actions controlled by
operator policy and signer infrastructure.
