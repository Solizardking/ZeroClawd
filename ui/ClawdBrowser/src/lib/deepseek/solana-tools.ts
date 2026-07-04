/**
 * Solana trading tool definitions in Anthropic tool-call schema.
 * These are what DeepSeek sees and reasons about. The actual execution
 * happens in agent-action.ts which maps tool names → real Solana calls.
 */
import type Anthropic from "@anthropic-ai/sdk";

export type SolanaTool =
  | "get_wallet_balances"
  | "get_sol_price"
  | "get_token_price"
  | "get_jupiter_quote"
  | "execute_jupiter_swap"
  | "pump_buy"
  | "pump_sell"
  | "get_agent_wallet_info"
  | "search_token_by_symbol"
  | "sponge_get_balances"
  | "sponge_swap_solana"
  | "sponge_hyperliquid"
  | "phoenix_get_markets"
  | "phoenix_get_orderbook"
  | "phoenix_get_trader_state"
  | "phoenix_get_funding_rate"
  | "phoenix_register_trader"
  | "phoenix_place_limit_order"
  | "phoenix_place_market_order"
  | "phoenix_cancel_all_orders"
  | "phoenix_deposit"
  | "phoenix_withdraw";

export const SOLANA_TOOLS: Anthropic.Tool[] = [
  {
    name: "get_wallet_balances",
    description:
      "Get SOL and SPL token balances for a wallet address. Returns a list of tokens with their symbol, mint, and UI-decimal amount.",
    input_schema: {
      type: "object",
      properties: {
        wallet: {
          type: "string",
          description: "Base58 Solana wallet public key. Use 'agent' to query the agent hot wallet.",
        },
      },
      required: ["wallet"],
    },
  },
  {
    name: "get_agent_wallet_info",
    description:
      "Get the agent hot wallet public key, current balances, and the max-SOL-per-trade safety cap. Call this first to know what funds are available for autonomous trading.",
    input_schema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_token_price",
    description:
      "Get the current USD price of a Solana token by mint address via Jupiter price API.",
    input_schema: {
      type: "object",
      properties: {
        mint: {
          type: "string",
          description: "SPL token mint address (base58). For SOL use So11111111111111111111111111111111111111112",
        },
      },
      required: ["mint"],
    },
  },
  {
    name: "search_token_by_symbol",
    description:
      "Look up a known token's mint address by symbol (e.g. BONK, JUP, WIF, USDC). Returns null if the symbol is not in the curated list.",
    input_schema: {
      type: "object",
      properties: {
        symbol: {
          type: "string",
          description: "Token ticker symbol, case-insensitive.",
        },
      },
      required: ["symbol"],
    },
  },
  {
    name: "get_jupiter_quote",
    description:
      "Fetch a live swap quote from Jupiter aggregator. Shows the expected output amount, price impact, and route. Always call this before execute_jupiter_swap to show the user what they are getting.",
    input_schema: {
      type: "object",
      properties: {
        input_mint: {
          type: "string",
          description: "Input token mint (base58).",
        },
        output_mint: {
          type: "string",
          description: "Output token mint (base58).",
        },
        amount: {
          type: "string",
          description: "Amount of input token in human-decimal notation (e.g. '0.1' for 0.1 SOL).",
        },
        slippage_bps: {
          type: "number",
          description: "Slippage in basis points (100 = 1%). Default 100.",
        },
      },
      required: ["input_mint", "output_mint", "amount"],
    },
  },
  {
    name: "execute_jupiter_swap",
    description:
      "Execute a swap through Jupiter using the agent hot wallet. Always get a quote first. The trade amount is capped by AGENT_MAX_SOL_PER_TRADE.",
    input_schema: {
      type: "object",
      properties: {
        input_mint: {
          type: "string",
          description: "Input token mint (base58).",
        },
        output_mint: {
          type: "string",
          description: "Output token mint (base58).",
        },
        amount: {
          type: "string",
          description: "Amount of input token in human-decimal notation.",
        },
        slippage_bps: {
          type: "number",
          description: "Slippage in basis points. Default 100.",
        },
      },
      required: ["input_mint", "output_mint", "amount"],
    },
  },
  {
    name: "pump_buy",
    description:
      "Buy a pump.fun bonding-curve token using the agent hot wallet. Specify the SOL amount to spend.",
    input_schema: {
      type: "object",
      properties: {
        mint: {
          type: "string",
          description: "Pump.fun token mint address.",
        },
        sol_amount: {
          type: "number",
          description: "SOL to spend on the buy (e.g. 0.05). Capped by AGENT_MAX_SOL_PER_TRADE.",
        },
        slippage_pct: {
          type: "number",
          description: "Slippage percent (e.g. 5 for 5%). Default 5.",
        },
        pool: {
          type: "string",
          description: "Routing pool: 'pump', 'raydium', or 'auto'. Default 'auto'.",
        },
      },
      required: ["mint", "sol_amount"],
    },
  },
  {
    name: "pump_sell",
    description:
      "Sell a pump.fun token using the agent hot wallet. Specify the amount to sell or '100%' to sell everything.",
    input_schema: {
      type: "object",
      properties: {
        mint: {
          type: "string",
          description: "Pump.fun token mint address.",
        },
        token_amount: {
          type: "string",
          description: "Token amount to sell as a decimal string, or '100%' to sell the full balance.",
        },
        slippage_pct: {
          type: "number",
          description: "Slippage percent. Default 5.",
        },
        pool: {
          type: "string",
          description: "Routing pool: 'pump', 'raydium', or 'auto'. Default 'auto'.",
        },
      },
      required: ["mint", "token_amount"],
    },
  },
  {
    name: "sponge_get_balances",
    description:
      "Get multi-chain balances from the PaySponge agent wallet (Solana, Base, Hyperliquid, etc.). Requires SPONGE_API_KEY.",
    input_schema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "sponge_swap_solana",
    description:
      "Swap tokens on Solana via the PaySponge wallet (uses Jupiter internally). Provide inputToken/outputToken as symbol or mint, amount as a decimal string.",
    input_schema: {
      type: "object",
      properties: {
        input_token: {
          type: "string",
          description: "Input token symbol or mint (e.g. 'SOL', 'USDC').",
        },
        output_token: {
          type: "string",
          description: "Output token symbol or mint.",
        },
        amount: {
          type: "string",
          description: "Amount of input token to swap (e.g. '1' for 1 SOL).",
        },
        slippage_bps: {
          type: "number",
          description: "Slippage in basis points. Default 50.",
        },
      },
      required: ["input_token", "output_token", "amount"],
    },
  },
  {
    name: "sponge_hyperliquid",
    description:
      "Trade perpetuals on Hyperliquid via the PaySponge wallet. Actions: status, order, cancel, cancel_all, positions, markets, set_leverage, fills, funding, withdraw.",
    input_schema: {
      type: "object",
      properties: {
        action: {
          type: "string",
          description:
            "One of: status, order, cancel, cancel_all, set_leverage, positions, orders, fills, markets, ticker, funding, withdraw, transfer.",
        },
        symbol: { type: "string", description: "Market symbol, e.g. 'ETH'." },
        side: { type: "string", description: "'buy' or 'sell'." },
        type: { type: "string", description: "'limit' or 'market'." },
        amount: { type: "string", description: "Order size." },
        price: { type: "string", description: "Limit price." },
        leverage: { type: "number", description: "Leverage multiplier." },
        order_id: { type: "string", description: "Order ID for cancel." },
      },
      required: ["action"],
    },
  },

  // ─── Phoenix Rise perpetuals ────────────────────────────────────────────
  {
    name: "phoenix_get_markets",
    description:
      "List all available Phoenix perpetual markets (SOL-PERP, BTC-PERP, ETH-PERP, etc.) with tick size and status.",
    input_schema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "phoenix_get_orderbook",
    description:
      "Fetch the top-5 bids and asks for a Phoenix perp market (e.g. 'SOL-PERP').",
    input_schema: {
      type: "object",
      properties: {
        symbol: { type: "string", description: "Market symbol, e.g. 'SOL-PERP' or 'SOL'." },
      },
      required: ["symbol"],
    },
  },
  {
    name: "phoenix_get_trader_state",
    description:
      "Get the agent's Phoenix trader account: positions, collateral, and open orders.",
    input_schema: {
      type: "object",
      properties: {
        trader_pda_index: { type: "number", description: "Trader PDA index (default 0)." },
      },
      required: [],
    },
  },
  {
    name: "phoenix_get_funding_rate",
    description: "Get the latest funding rate for a Phoenix perp market.",
    input_schema: {
      type: "object",
      properties: {
        symbol: { type: "string", description: "Market symbol, e.g. 'SOL-PERP'." },
      },
      required: ["symbol"],
    },
  },
  {
    name: "phoenix_register_trader",
    description:
      "Register the agent hot wallet as a Phoenix trader (one-time setup, required before placing orders).",
    input_schema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "phoenix_place_limit_order",
    description:
      "Place a limit order on Phoenix perps using the agent hot wallet. Always check the orderbook first.",
    input_schema: {
      type: "object",
      properties: {
        symbol: { type: "string", description: "Market symbol, e.g. 'SOL-PERP'." },
        side: { type: "string", description: "'buy' (long) or 'sell' (short)." },
        price_usd: { type: "string", description: "Limit price in USD, e.g. '150.50'." },
        base_units: { type: "string", description: "Size in base asset units, e.g. '0.25' for 0.25 SOL." },
        trader_pda_index: { type: "number", description: "Trader PDA index (default 0)." },
      },
      required: ["symbol", "side", "price_usd", "base_units"],
    },
  },
  {
    name: "phoenix_place_market_order",
    description:
      "Place a market order on Phoenix perps using the agent hot wallet.",
    input_schema: {
      type: "object",
      properties: {
        symbol: { type: "string", description: "Market symbol, e.g. 'SOL-PERP'." },
        side: { type: "string", description: "'buy' (long) or 'sell' (short)." },
        base_units: { type: "string", description: "Size in base asset units, e.g. '0.1'." },
        trader_pda_index: { type: "number", description: "Trader PDA index (default 0)." },
      },
      required: ["symbol", "side", "base_units"],
    },
  },
  {
    name: "phoenix_cancel_all_orders",
    description: "Cancel all open orders on a Phoenix perp market for the agent wallet.",
    input_schema: {
      type: "object",
      properties: {
        symbol: { type: "string", description: "Market symbol, e.g. 'SOL-PERP'." },
        trader_pda_index: { type: "number", description: "Trader PDA index (default 0)." },
      },
      required: ["symbol"],
    },
  },
  {
    name: "phoenix_deposit",
    description: "Deposit USDC collateral into the agent's Phoenix trader account.",
    input_schema: {
      type: "object",
      properties: {
        usdc_amount: { type: "string", description: "USDC amount to deposit, e.g. '100'." },
        trader_pda_index: { type: "number", description: "Trader PDA index (default 0)." },
      },
      required: ["usdc_amount"],
    },
  },
  {
    name: "phoenix_withdraw",
    description: "Withdraw USDC collateral from the agent's Phoenix trader account.",
    input_schema: {
      type: "object",
      properties: {
        usdc_amount: { type: "string", description: "USDC amount to withdraw, e.g. '50'." },
        trader_pda_index: { type: "number", description: "Trader PDA index (default 0)." },
      },
      required: ["usdc_amount"],
    },
  },
];
