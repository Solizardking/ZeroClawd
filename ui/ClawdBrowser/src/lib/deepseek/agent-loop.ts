/**
 * DeepSeek multi-turn agent loop with Anthropic-format tool calls.
 *
 * Pattern mirrors the DeepSeek docs sample:
 *   while true:
 *     call model
 *     if no tool_calls → return final answer
 *     execute each tool_call, append tool_result
 *     (include reasoning_content in messages when tools were called)
 */
import type Anthropic from "@anthropic-ai/sdk";
import {
  makeClient,
  DEFAULT_MODEL,
  thinkingBlock,
  effortBody,
  type ThinkingEffort,
  type ThinkingMode,
} from "./client";
import { SOLANA_TOOLS } from "./solana-tools";

export interface AgentTurn {
  type: "thinking" | "text" | "tool_call" | "tool_result" | "final";
  /** Tool name (tool_call/tool_result only) */
  tool?: string;
  /** For tool_call: the parsed input. For tool_result: the result string. */
  data?: unknown;
  /** Text content */
  content?: string;
  /** Signature/URL for final trade results */
  explorerUrl?: string;
}

export type ToolExecutor = (name: string, input: unknown) => Promise<string>;

export interface AgentRunOptions {
  thinking?: ThinkingMode;
  effort?: ThinkingEffort;
  maxTurns?: number;
  systemPrompt?: string;
}

const DEFAULT_SYSTEM = `You are a Solana trading agent with access to real on-chain tools across three venues:

SPOT (Jupiter + Pump.fun — agent hot wallet, AGENT_WALLET_PRIVATE_KEY):
- get_agent_wallet_info → check SOL/SPL balances and the per-trade SOL cap
- search_token_by_symbol → resolve symbol → mint address
- get_token_price → live USD price via Jupiter price API
- get_jupiter_quote → required before execute_jupiter_swap (shows price impact)
- execute_jupiter_swap → executes a swap through Jupiter aggregator
- pump_buy / pump_sell → buy or sell pump.fun bonding-curve tokens

PERPS — Phoenix Rise (agent hot wallet, same AGENT_WALLET_PRIVATE_KEY):
- phoenix_get_markets → list all perp markets (SOL-PERP, BTC-PERP, ETH-PERP …)
- phoenix_get_orderbook → top-5 bids/asks for a market
- phoenix_get_trader_state → agent's collateral, positions, open orders
- phoenix_get_funding_rate → latest funding rate
- phoenix_register_trader → one-time on-chain setup (call if not yet registered)
- phoenix_deposit / phoenix_withdraw → move USDC collateral in/out
- phoenix_place_limit_order → limit order (provide symbol, side, price_usd, base_units)
- phoenix_place_market_order → market order (provide symbol, side, base_units)
- phoenix_cancel_all_orders → cancel all open orders on a market

MULTI-CHAIN (PaySponge wallet, SPONGE_API_KEY):
- sponge_get_balances → balances across Solana, Base, Hyperliquid
- sponge_swap_solana → swap tokens on Solana via Sponge
- sponge_hyperliquid → trade perpetuals on Hyperliquid (action: order/positions/status …)

RULES:
1. Always call get_agent_wallet_info or phoenix_get_trader_state first to confirm balance.
2. For spot swaps: quote first (get_jupiter_quote), then execute.
3. For Phoenix perps: check orderbook first, then place order.
4. For unknown token symbols, call search_token_by_symbol or ask for the mint address.
5. After every on-chain action, report the transaction signature and Solscan explorer link.
6. If phoenix_register_trader is needed, do it before any order placement.
7. Express amounts in SOL or USD. Be concise.`;


/**
 * Run one user message through the DeepSeek agent loop.
 * Yields AgentTurn events so the UI can stream incrementally.
 */
export async function* runAgentLoop(
  userMessage: string,
  executor: ToolExecutor,
  options: AgentRunOptions = {},
): AsyncGenerator<AgentTurn> {
  const {
    thinking = "enabled",
    effort = "high",
    maxTurns = 12,
    systemPrompt = DEFAULT_SYSTEM,
  } = options;

  const client = makeClient();
  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: userMessage },
  ];

  let turn = 0;
  while (turn < maxTurns) {
    turn++;

    const params: Anthropic.MessageCreateParamsNonStreaming & Record<string, unknown> = {
      model: DEFAULT_MODEL,
      max_tokens: 16_000,
      system: systemPrompt,
      thinking: thinkingBlock(thinking, effort),
      tools: SOLANA_TOOLS,
      tool_choice: { type: "auto" },
      messages,
      ...effortBody(effort),
    };

    const response = await client.messages.create(
      params as Anthropic.MessageCreateParamsNonStreaming,
    );

    // Collect this turn's content blocks
    const assistantBlocks: Anthropic.ContentBlock[] = response.content;
    const toolUseBlocks = assistantBlocks.filter(
      (b): b is Anthropic.ToolUseBlock => b.type === "tool_use",
    );
    const thinkingBlocks = assistantBlocks.filter(
      (b): b is Anthropic.ThinkingBlock => b.type === "thinking",
    );
    const textBlocks = assistantBlocks.filter(
      (b): b is Anthropic.TextBlock => b.type === "text",
    );

    // Emit thinking content to UI
    for (const tb of thinkingBlocks) {
      yield { type: "thinking", content: tb.thinking };
    }

    // Emit text blocks
    for (const txt of textBlocks) {
      if (txt.text.trim()) yield { type: "text", content: txt.text };
    }

    // If no tool calls → agent is done
    if (toolUseBlocks.length === 0) {
      const finalText = textBlocks.map((t) => t.text).join("\n").trim();
      yield { type: "final", content: finalText };
      return;
    }

    // Append assistant message — reasoning_content is baked into the content
    // array as a `thinking` block; Anthropic SDK handles serialisation.
    messages.push({ role: "assistant", content: assistantBlocks });

    // Execute tools and collect results
    const toolResults: Anthropic.ToolResultBlockParam[] = [];
    for (const toolUse of toolUseBlocks) {
      yield { type: "tool_call", tool: toolUse.name, data: toolUse.input };
      let resultContent: string;
      try {
        resultContent = await executor(toolUse.name, toolUse.input);
      } catch (e) {
        resultContent = `ERROR: ${e instanceof Error ? e.message : String(e)}`;
      }
      yield { type: "tool_result", tool: toolUse.name, data: resultContent };
      toolResults.push({
        type: "tool_result",
        tool_use_id: toolUse.id,
        content: resultContent,
      });
    }

    // Append all tool results as a single user turn (Anthropic format)
    messages.push({ role: "user", content: toolResults });
  }

  yield { type: "final", content: "(max turns reached)" };
}
