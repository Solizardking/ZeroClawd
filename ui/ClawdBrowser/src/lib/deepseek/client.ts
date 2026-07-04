/**
 * DeepSeek client via the Anthropic-compatible API.
 *
 * base_url : https://api.deepseek.com/anthropic
 * docs     : https://platform.deepseek.com/docs/guides/anthropic_api
 *
 * Thinking mode is enabled by default (DeepSeek-v4-pro).
 * Effort is controlled via the Anthropic `thinking` block; DeepSeek maps
 * `output_config.effort` from the request body — we pass it as extra JSON.
 */
import Anthropic from "@anthropic-ai/sdk";

export const DEEPSEEK_BASE_URL = "https://api.deepseek.com/anthropic";
export const DEFAULT_MODEL = process.env.DEEPSEEK_MODEL || "deepseek-v4-pro";

export type ThinkingEffort = "high" | "max";
export type ThinkingMode = "enabled" | "disabled";

function getApiKey(): string {
  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) throw new Error("DEEPSEEK_API_KEY is not set in .env.local");
  return key;
}

export function makeClient(): Anthropic {
  return new Anthropic({
    apiKey: getApiKey(),
    baseURL: DEEPSEEK_BASE_URL,
  });
}

/**
 * Build the `thinking` block for Anthropic-format requests to DeepSeek.
 * budget_tokens is required by the SDK type but ignored by DeepSeek —
 * effort is what actually controls compute.
 */
export function thinkingBlock(
  mode: ThinkingMode = "enabled",
  effort: ThinkingEffort = "high",
): Anthropic.ThinkingConfigParam {
  if (mode === "disabled") {
    return { type: "disabled" };
  }
  // budget_tokens must be > 0 for the SDK to accept the enabled variant.
  // DeepSeek ignores it and uses output_config.effort instead.
  const budgetByEffort: Record<ThinkingEffort, number> = {
    high: 8_000,
    max: 16_000,
  };
  return { type: "enabled", budget_tokens: budgetByEffort[effort] };
}

/**
 * Extra body sent alongside every thinking-mode request so DeepSeek
 * applies the right compute budget on its end.
 */
export function effortBody(
  effort: ThinkingEffort,
): Record<string, unknown> {
  return { output_config: { effort } };
}
