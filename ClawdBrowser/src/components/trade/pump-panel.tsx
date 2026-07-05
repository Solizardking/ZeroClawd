"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { isValidMint } from "@/lib/solana/constants";
import { agentPumpTradeAction } from "@/lib/solana/trade-actions";
import type { AgentTradeResult } from "@/lib/solana/trade-types";

/**
 * Pump.fun buy/sell. Routes through the agent hot wallet (server-signed)
 * because pump.fun trades are typically faster + cheaper to execute server
 * side, and most users running this UI want one-click memecoin trades.
 */
export function PumpPanel() {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [mint, setMint] = useState("");
  const [amount, setAmount] = useState("");
  const [slippagePct, setSlippagePct] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<AgentTradeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mintValid = mint.length >= 32 && isValidMint(mint);
  const amountValid = !!amount && Number(amount) > 0;

  async function execute() {
    if (!mintValid || !amountValid) return;
    setSubmitting(true);
    setError(null);
    setResult(null);
    try {
      const r = await agentPumpTradeAction({
        mint,
        side,
        amount: side === "buy" ? Number(amount) : amount,
        slippagePct,
      });
      setResult(r);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-zinc-200">Pump.fun</h3>
        <span className="text-[10px] uppercase tracking-wider text-zinc-500">
          Agent wallet
        </span>
      </div>

      {/* Side toggle */}
      <div className="flex bg-zinc-950 border border-zinc-800 rounded-lg p-0.5">
        <button
          type="button"
          onClick={() => setSide("buy")}
          className={`flex-1 py-1.5 rounded text-xs font-medium ${
            side === "buy"
              ? "bg-emerald-500/20 text-emerald-300"
              : "text-zinc-500"
          }`}
        >
          Buy
        </button>
        <button
          type="button"
          onClick={() => setSide("sell")}
          className={`flex-1 py-1.5 rounded text-xs font-medium ${
            side === "sell" ? "bg-red-500/20 text-red-300" : "text-zinc-500"
          }`}
        >
          Sell
        </button>
      </div>

      {/* Mint */}
      <div>
        <label className="text-[11px] text-zinc-500 mb-1 block">Token mint</label>
        <input
          type="text"
          value={mint}
          onChange={(e) => setMint(e.target.value.trim())}
          placeholder="Paste pump.fun mint address…"
          spellCheck={false}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs font-mono text-zinc-200 outline-none focus:border-zinc-600"
        />
      </div>

      {/* Amount */}
      <div>
        <label className="text-[11px] text-zinc-500 mb-1 block">
          {side === "buy" ? "Amount (SOL to spend)" : 'Amount (token amount or "100%")'}
        </label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={side === "buy" ? "0.05" : '100% or token count'}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm font-mono text-zinc-200 outline-none focus:border-zinc-600"
        />
      </div>

      {/* Slippage */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-zinc-500">Slippage</span>
        <div className="flex items-center gap-1">
          {[1, 5, 10, 20].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setSlippagePct(p)}
              className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                slippagePct === p
                  ? "bg-zinc-700 text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {p}%
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={execute}
        disabled={!mintValid || !amountValid || submitting}
        className={`h-11 rounded-lg font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-40 ${
          side === "buy"
            ? "bg-emerald-500 hover:bg-emerald-400 text-black"
            : "bg-red-500 hover:bg-red-400 text-white"
        }`}
      >
        {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
        {submitting ? "Sending…" : side === "buy" ? "Buy" : "Sell"}
      </button>

      {result && (
        <a
          href={result.explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-emerald-400 hover:underline truncate"
        >
          ✓ {result.signature}
        </a>
      )}
      {error && <p className="text-xs text-red-400 break-all">{error}</p>}
    </div>
  );
}
