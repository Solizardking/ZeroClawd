# ClawdBrowser

A Solana-trading-aware Browser Use chat UI. Built on Next.js 15, the
[Browser Use Cloud SDK](https://docs.browser-use.com/cloud/introduction),
the standard Solana wallet adapter stack, Jupiter v6, and PumpPortal.

Two modes:

- **Browser agent** — give the AI agent a task; it browses live and reports back. (unchanged from upstream)
- **Trade** — connect a wallet for manual swaps, trade pump.fun tokens, or let the
  agent hot wallet execute autonomous trades from a natural-language prompt.

## Setup

```bash
npm install
cp .env.example .env.local
# fill in BROWSER_USE_API_KEY, HELIUS_API_KEY, AGENT_WALLET_PRIVATE_KEY
npm run dev
```

Required env vars:

| Var | Required for | Notes |
|---|---|---|
| `BROWSER_USE_API_KEY` | Browser agent | Server-only |
| `SOLANA_RPC_URL` / `NEXT_PUBLIC_SOLANA_RPC_URL` | All trading | Helius URL with API key |
| `AGENT_WALLET_PRIVATE_KEY` | Pump.fun panel + Agent panel | Base58 OR JSON byte array. Server-only — never exposed |
| `AGENT_MAX_SOL_PER_TRADE` | Agent trades | Hard cap per transaction (default `0.5`) |
| `AGENT_DEFAULT_SLIPPAGE_BPS` | Agent trades | Default `100` (= 1%) |

## Trade modes

### Swap (Jupiter)
User-signed swap via the connected browser wallet. Pulls a Jupiter v6 quote,
builds the v0 transaction server-side, returns it for the wallet to sign.

### Pump.fun
Direct buy/sell of pump.fun bonding-curve tokens via PumpPortal's
`trade-local` endpoint. Routes through the agent hot wallet (server-signed).

### Agent trader
Natural-language prompt → parsed intent → executed by the agent hot wallet.
Recognized forms:

```
buy 0.05 SOL of BONK
sell 50% of WIF
swap 10 USDC for JUP
ape 0.02 SOL into <pump-mint> on pump
buy 0.1 SOL of <mint> slippage 5%
```

Trades exceeding `AGENT_MAX_SOL_PER_TRADE` are rejected server-side.

## Architecture

```
src/
├── app/
│   ├── layout.tsx                 # Providers + AppShell
│   ├── page.tsx                   # Browser-agent home
│   ├── trade/page.tsx             # Trade dashboard
│   ├── session/[id]/page.tsx      # Browser-agent session view
│   └── api/stream/[sessionId]     # Browser Use SSE
├── components/
│   ├── app-shell.tsx              # Top bar + nav + WalletBar
│   ├── browser-panel.tsx          # Live agent browser iframe
│   ├── chat-*.tsx                 # Browser Use chat UI
│   ├── wallet/wallet-bar.tsx      # WalletMultiButton + SOL balance
│   └── trade/
│       ├── swap-panel.tsx         # Jupiter swap (user wallet)
│       ├── pump-panel.tsx         # Pump.fun trade (agent wallet)
│       ├── agent-trader-panel.tsx # NL prompt → agent trade
│       ├── token-select.tsx       # Token picker + custom mint paste
│       └── trade-dock.tsx         # Tabbed container (unused on /trade page)
├── context/
│   ├── solana-provider.tsx        # ConnectionProvider + WalletProvider
│   ├── session-context.tsx        # Browser Use session state
│   └── settings-context.tsx
└── lib/
    ├── solana/
    │   ├── constants.ts           # Curated tokens + mints
    │   ├── format.ts              # Base-units math
    │   ├── rpc.ts                 # Server Connection
    │   ├── agent-wallet.ts        # Hot wallet keypair loader + caps
    │   ├── balances.ts            # SOL + SPL balances
    │   ├── jupiter.ts             # Jupiter v6 quote/swap helpers
    │   ├── pump.ts                # PumpPortal trade-local
    │   ├── trade-actions.ts       # "use server" actions
    │   └── trade-types.ts         # Shared types
    ├── api.ts                     # Browser Use SDK client
    ├── actions.ts                 # Browser Use server actions
    └── ...
```

## Security notes

- The agent hot wallet holds funds on the server — keep balances small and
  always set `AGENT_MAX_SOL_PER_TRADE`.
- `.env.local` is git-ignored; the `.env.example` ships only placeholders.
- User wallet swaps never touch the server with private keys — only the
  pre-built unsigned transaction crosses the boundary.
- The agent-trader prompt parser is regex-based, not LLM-based, so it cannot
  be jailbroken into trading mints the user didn't explicitly type.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | Next ESLint |

## License

MIT
