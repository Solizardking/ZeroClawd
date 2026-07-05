"use server";

import {
  agentJupiterTradeAction,
  agentPumpTradeAction,
  fetchAgentWalletAction,
  quoteSwapAction,
} from "@/lib/solana/trade-actions";
import { getWalletBalances } from "@/lib/solana/balances";
import { CURATED_TOKENS, TOKENS_BY_MINT, isValidMint } from "@/lib/solana/constants";
import { fromBaseUnits } from "@/lib/solana/format";
import {
  fetchSpongeBalancesAction,
  spongeHyperliquidAction,
  spongeSwapSolanaAction,
} from "@/lib/sponge/actions";
import {
  phoenixCancelAllOrdersAction,
  phoenixDepositAction,
  phoenixGetFundingRateAction,
  phoenixGetMarketsAction,
  phoenixGetOrderbookAction,
  phoenixGetTraderStateAction,
  phoenixPlaceLimitOrderAction,
  phoenixPlaceMarketOrderAction,
  phoenixRegisterTraderAction,
  phoenixWithdrawAction,
} from "@/lib/phoenix/actions";
import { runAgentLoop } from "./agent-loop";
import type { ThinkingEffort, ThinkingMode } from "./client";
import type { AgentTurn } from "./agent-loop";

// Jupiter price API — free, no key required
async function fetchTokenPrice(mint: string): Promise<string> {
  const res = await fetch(
    `https://lite-api.jup.ag/price/v2?ids=${mint}`,
    { cache: "no-store" },
  );
  if (!res.ok) throw new Error(`Price fetch failed: ${res.status}`);
  const json = await res.json() as { data?: Record<string, { price?: number }> };
  const price = json.data?.[mint]?.price;
  if (price == null) return `Price not available for ${mint}`;
  return `$${price.toFixed(6)} USD`;
}

export async function executeToolCall(
  name: string,
  input: Record<string, unknown>,
): Promise<string> {
  switch (name) {
    case "get_agent_wallet_info": {
      const info = await fetchAgentWalletAction();
      return JSON.stringify({
        publicKey: info.publicKey,
        maxSolPerTrade: info.maxSolPerTrade,
        balances: info.balances.map((b) => ({
          symbol: b.symbol,
          mint: b.mint,
          amount: b.uiAmount.toFixed(b.symbol === "SOL" ? 6 : 4),
        })),
      });
    }

    case "get_wallet_balances": {
      const wallet = input.wallet as string;
      const addr =
        wallet === "agent"
          ? (await fetchAgentWalletAction()).publicKey
          : wallet;
      if (!isValidMint(addr)) throw new Error(`Invalid wallet: ${wallet}`);
      const bals = await getWalletBalances(addr);
      return JSON.stringify(
        bals.map((b) => ({
          symbol: b.symbol,
          mint: b.mint,
          amount: b.uiAmount.toFixed(b.symbol === "SOL" ? 6 : 4),
        })),
      );
    }

    case "get_token_price": {
      const mint = input.mint as string;
      if (!isValidMint(mint)) throw new Error(`Invalid mint: ${mint}`);
      return fetchTokenPrice(mint);
    }

    case "search_token_by_symbol": {
      const sym = (input.symbol as string).toUpperCase();
      const token = CURATED_TOKENS.find((t) => t.symbol.toUpperCase() === sym);
      if (!token)
        return `Token '${sym}' not in curated list — ask user for the mint address.`;
      return JSON.stringify({ symbol: token.symbol, mint: token.mint, decimals: token.decimals });
    }

    case "get_jupiter_quote": {
      const result = await quoteSwapAction({
        inputMint: input.input_mint as string,
        outputMint: input.output_mint as string,
        amount: input.amount as string,
        slippageBps:
          typeof input.slippage_bps === "number" ? input.slippage_bps : 100,
      });
      const inSym = TOKENS_BY_MINT[result.quote.inputMint as string]?.symbol ?? "TOKEN";
      const outSym = TOKENS_BY_MINT[result.quote.outputMint as string]?.symbol ?? "TOKEN";
      const outHuman = fromBaseUnits(result.outAmount, result.outDecimals, 6);
      return JSON.stringify({
        inAmount: input.amount,
        outAmount: outHuman,
        inSymbol: inSym,
        outSymbol: outSym,
        priceImpactPct: result.priceImpactPct,
        slippageBps: result.quote.slippageBps,
      });
    }

    case "execute_jupiter_swap": {
      const res = await agentJupiterTradeAction({
        inputMint: input.input_mint as string,
        outputMint: input.output_mint as string,
        amount: input.amount as string,
        slippageBps:
          typeof input.slippage_bps === "number" ? input.slippage_bps : 100,
      });
      return JSON.stringify({
        status: "confirmed",
        signature: res.signature,
        route: res.route,
        explorerUrl: res.explorerUrl,
      });
    }

    case "pump_buy": {
      const res = await agentPumpTradeAction({
        mint: input.mint as string,
        side: "buy",
        amount: input.sol_amount as number,
        slippagePct:
          typeof input.slippage_pct === "number" ? input.slippage_pct : 5,
        pool: (input.pool as "pump" | "raydium" | "auto") ?? "auto",
      });
      return JSON.stringify({
        status: "confirmed",
        signature: res.signature,
        explorerUrl: res.explorerUrl,
      });
    }

    case "pump_sell": {
      const res = await agentPumpTradeAction({
        mint: input.mint as string,
        side: "sell",
        amount: input.token_amount as string,
        slippagePct:
          typeof input.slippage_pct === "number" ? input.slippage_pct : 5,
        pool: (input.pool as "pump" | "raydium" | "auto") ?? "auto",
      });
      return JSON.stringify({
        status: "confirmed",
        signature: res.signature,
        explorerUrl: res.explorerUrl,
      });
    }

    case "sponge_get_balances": {
      const { raw } = await fetchSpongeBalancesAction();
      return JSON.stringify(raw);
    }

    case "sponge_swap_solana": {
      const res = await spongeSwapSolanaAction({
        inputToken: input.input_token as string,
        outputToken: input.output_token as string,
        amount: input.amount as string,
        slippageBps: typeof input.slippage_bps === "number" ? input.slippage_bps : 50,
      });
      return JSON.stringify({ status: "confirmed", txHash: res.txHash });
    }

    case "sponge_hyperliquid": {
      const { action, ...rest } = input as { action: string } & Record<string, unknown>;
      const { result } = await spongeHyperliquidAction(action, rest);
      return JSON.stringify(result);
    }

    // ─── Phoenix Rise perpetuals ─────────────────────────────────────────

    case "phoenix_get_markets":
      return JSON.stringify(await phoenixGetMarketsAction());

    case "phoenix_get_orderbook":
      return JSON.stringify(
        await phoenixGetOrderbookAction(input.symbol as string),
      );

    case "phoenix_get_trader_state":
      return JSON.stringify(
        await phoenixGetTraderStateAction(
          undefined,
          typeof input.trader_pda_index === "number" ? input.trader_pda_index : 0,
        ),
      );

    case "phoenix_get_funding_rate":
      return JSON.stringify(
        await phoenixGetFundingRateAction(input.symbol as string),
      );

    case "phoenix_register_trader":
      return JSON.stringify(await phoenixRegisterTraderAction());

    case "phoenix_place_limit_order": {
      const res = await phoenixPlaceLimitOrderAction({
        symbol: input.symbol as string,
        side: input.side as "buy" | "sell",
        priceUsd: input.price_usd as string,
        baseUnits: input.base_units as string,
        traderPdaIndex:
          typeof input.trader_pda_index === "number" ? input.trader_pda_index : 0,
      });
      return JSON.stringify(res);
    }

    case "phoenix_place_market_order": {
      const res = await phoenixPlaceMarketOrderAction({
        symbol: input.symbol as string,
        side: input.side as "buy" | "sell",
        baseUnits: input.base_units as string,
        traderPdaIndex:
          typeof input.trader_pda_index === "number" ? input.trader_pda_index : 0,
      });
      return JSON.stringify(res);
    }

    case "phoenix_cancel_all_orders": {
      const res = await phoenixCancelAllOrdersAction({
        symbol: input.symbol as string,
        traderPdaIndex:
          typeof input.trader_pda_index === "number" ? input.trader_pda_index : 0,
      });
      return JSON.stringify(res);
    }

    case "phoenix_deposit": {
      const res = await phoenixDepositAction({
        usdcAmount: input.usdc_amount as string,
        traderPdaIndex:
          typeof input.trader_pda_index === "number" ? input.trader_pda_index : 0,
      });
      return JSON.stringify(res);
    }

    case "phoenix_withdraw": {
      const res = await phoenixWithdrawAction({
        usdcAmount: input.usdc_amount as string,
        traderPdaIndex:
          typeof input.trader_pda_index === "number" ? input.trader_pda_index : 0,
      });
      return JSON.stringify(res);
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export interface DeepSeekAgentOptions {
  thinking?: ThinkingMode;
  effort?: ThinkingEffort;
}

/**
 * Runs the full agent loop and returns all emitted turns.
 * Use the /api/deepseek-agent SSE route for streaming.
 */
export async function runDeepSeekAgentAction(
  prompt: string,
  options: DeepSeekAgentOptions = {},
): Promise<AgentTurn[]> {
  const turns: AgentTurn[] = [];
  for await (const turn of runAgentLoop(
    prompt,
    async (name, input) => executeToolCall(name, input as Record<string, unknown>),
    { thinking: options.thinking, effort: options.effort },
  )) {
    turns.push(turn);
  }
  return turns;
}
