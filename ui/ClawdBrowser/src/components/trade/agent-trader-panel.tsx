"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bot,
  Brain,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Loader2,
  ShieldAlert,
  Wrench,
  Zap,
} from "lucide-react";
import { fetchAgentWalletAction } from "@/lib/solana/trade-actions";
import type { TokenBalance } from "@/lib/solana/balances";
import type { ThinkingEffort, ThinkingMode } from "@/lib/deepseek/client";
import type { AgentTurn } from "@/lib/deepseek/agent-loop";

interface AgentWalletInfo {
  publicKey: string;
  balances: TokenBalance[];
  maxSolPerTrade: number;
}

const SUGGESTIONS = [
  "What's my SOL balance?",
  "Score BONK risk before trade",
  "Buy 0.05 SOL of BONK",
  "Show me the price of JUP",
  "Swap 10 USDC for SOL in paper mode",
];

export function AgentTraderPanel() {
  const [agent, setAgent] = useState<AgentWalletInfo | null>(null);
  const [agentError, setAgentError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [turns, setTurns] = useState<(AgentTurn & { id: string })[]>([]);
  const [busy, setBusy] = useState(false);
  const [thinking, setThinking] = useState<ThinkingMode>("enabled");
  const [effort, setEffort] = useState<ThinkingEffort>("high");
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    fetchAgentWalletAction()
      .then(setAgent)
      .catch((e) => setAgentError(e instanceof Error ? e.message : String(e)));
  }, []);

  const execute = useCallback(async () => {
    const text = prompt.trim();
    if (!text || busy) return;
    setBusy(true);
    setTurns([]);
    setPrompt("");

    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/deepseek-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text, thinking, effort }),
        signal: abortRef.current.signal,
      });

      if (!res.body) throw new Error("No response stream");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const evt = JSON.parse(line.slice(6)) as AgentTurn & { type: string };
          if ((evt.type as string) === "done" || (evt.type as string) === "error") continue;
          setTurns((prev) => [...prev, { ...evt, id: crypto.randomUUID() } as AgentTurn & { id: string }]);
        }
      }
      // Refresh wallet balances after a trade
      fetchAgentWalletAction().then(setAgent).catch(() => {});
    } catch (e) {
      if ((e as Error).name !== "AbortError") {
        setTurns((prev) => [
          ...prev,
          { type: "final", content: `Error: ${e instanceof Error ? e.message : String(e)}`, id: crypto.randomUUID() },
        ]);
      }
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }, [prompt, thinking, effort, busy]);

  function stop() {
    abortRef.current?.abort();
    setBusy(false);
  }

  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-zinc-200 flex items-center gap-2">
          <Bot size={14} className="text-amber-400" />
          ClawdBot Trader
        </h3>
        {agent && (
          <span className="text-[10px] text-zinc-500 font-mono truncate max-w-[140px]">
            cap {agent.maxSolPerTrade} SOL
          </span>
        )}
      </div>

      {/* Controls: thinking toggle + effort */}
      <div className="flex items-center gap-2 text-[11px]">
        <button
          type="button"
          onClick={() => setThinking((t) => (t === "enabled" ? "disabled" : "enabled"))}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md border transition-colors ${
            thinking === "enabled"
              ? "bg-violet-500/20 border-violet-500/40 text-violet-300"
              : "bg-zinc-800 border-zinc-700 text-zinc-500"
          }`}
        >
          <Brain size={11} />
          Thinking {thinking === "enabled" ? "on" : "off"}
        </button>

        {thinking === "enabled" && (
          <div className="flex items-center gap-1">
            {(["high", "max"] as ThinkingEffort[]).map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => setEffort(e)}
                className={`px-2 py-1 rounded-md border text-[11px] transition-colors ${
                  effort === e
                    ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                    : "bg-zinc-800 border-zinc-700 text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <Zap size={10} className="inline mr-0.5" />
                {e}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Agent wallet error */}
      {agentError && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200">
          <ShieldAlert size={14} className="shrink-0 mt-0.5" />
          <span>
            Agent wallet not configured — set{" "}
            <code className="font-mono">AGENT_WALLET_PRIVATE_KEY</code> in{" "}
            <code className="font-mono">.env.local</code>.
          </span>
        </div>
      )}

      {/* Wallet balances */}
      {agent && (
        <div className="flex flex-wrap gap-1.5">
          {agent.balances
            .filter((b) => Number(b.uiAmount) > 0)
            .slice(0, 6)
            .map((b) => (
              <span
                key={b.mint}
                className="px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-400"
              >
                {b.symbol} {b.uiAmount.toFixed(b.symbol === "SOL" ? 4 : 2)}
              </span>
            ))}
        </div>
      )}

      {/* Suggestions */}
      {turns.length === 0 && !busy && (
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => { setPrompt(s); }}
              className="px-2.5 py-1 text-[11px] text-zinc-400 bg-zinc-800 border border-zinc-800 rounded-full hover:bg-zinc-700 hover:text-zinc-200 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Turn stream */}
      {turns.length > 0 && (
        <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1">
          {turns.map((turn) => (
            <TurnBlock key={turn.id} turn={turn} />
          ))}
          {busy && (
            <div className="flex items-center gap-2 text-[11px] text-zinc-500 py-1">
              <Loader2 size={12} className="animate-spin" />
              <span>DeepSeek is thinking…</span>
            </div>
          )}
        </div>
      )}

      {/* Input */}
      <div className="flex flex-col gap-2">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              execute();
            }
          }}
          rows={2}
          disabled={busy}
          placeholder="Risk score BONK · Buy 0.05 SOL of BONK · Sell 50% of JUP"
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-zinc-600 resize-none disabled:opacity-50"
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={execute}
            disabled={!prompt.trim() || busy || !agent}
            className="flex-1 h-10 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-black font-medium text-sm flex items-center justify-center gap-2"
          >
            {busy ? <Loader2 size={14} className="animate-spin" /> : <Bot size={14} />}
            {busy ? "Running…" : "Run trader"}
          </button>
          {busy && (
            <button
              type="button"
              onClick={stop}
              className="h-10 px-4 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-medium"
            >
              Stop
            </button>
          )}
        </div>
      </div>

      <p className="text-[10px] text-zinc-600">
        Six-law risk gate · server hot-wallet cap · <span className="text-zinc-400">DEEPSEEK_API_KEY</span> in .env.local
      </p>
    </div>
  );
}

// ---------- Turn block renderer ----------

function TurnBlock({ turn }: { turn: AgentTurn }) {
  const [open, setOpen] = useState(false);

  if (turn.type === "thinking") {
    return (
      <div className="rounded-lg bg-violet-500/5 border border-violet-500/20">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center gap-2 px-3 py-2 text-[11px] text-violet-300 hover:bg-violet-500/10 rounded-lg"
        >
          <Brain size={11} />
          <span className="flex-1 text-left">Thinking trace</span>
          {open ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
        </button>
        {open && (
          <pre className="px-3 pb-3 text-[10px] text-violet-200/70 whitespace-pre-wrap font-mono leading-relaxed max-h-48 overflow-y-auto">
            {turn.content}
          </pre>
        )}
      </div>
    );
  }

  if (turn.type === "tool_call") {
    return (
      <div className="flex items-start gap-2 p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-[11px]">
        <Wrench size={11} className="text-amber-400 shrink-0 mt-0.5" />
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-amber-300 font-mono">{turn.tool}</span>
          <span className="text-zinc-500 truncate">
            {JSON.stringify(turn.data).slice(0, 80)}
          </span>
        </div>
      </div>
    );
  }

  if (turn.type === "tool_result") {
    let parsed: unknown;
    let hasExplorer = false;
    let explorerUrl = "";
    try {
      parsed = JSON.parse(turn.data as string);
      if (
        parsed &&
        typeof parsed === "object" &&
        "explorerUrl" in (parsed as object)
      ) {
        hasExplorer = true;
        explorerUrl = (parsed as { explorerUrl: string }).explorerUrl;
      }
    } catch {
      parsed = turn.data;
    }

    return (
      <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px]">
        <div className="text-zinc-500 mb-1 font-mono">{turn.tool} →</div>
        {hasExplorer ? (
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:underline flex items-center gap-1 font-mono"
          >
            <ExternalLink size={10} />
            View on Solscan
          </a>
        ) : (
          <pre className="text-zinc-300 whitespace-pre-wrap break-all font-mono leading-relaxed max-h-24 overflow-y-auto">
            {typeof parsed === "string" ? parsed : JSON.stringify(parsed, null, 2)}
          </pre>
        )}
      </div>
    );
  }

  if (turn.type === "text" || turn.type === "final") {
    return (
      <div className="p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-[13px] text-zinc-100 leading-relaxed whitespace-pre-wrap">
        {turn.content}
      </div>
    );
  }

  return null;
}
