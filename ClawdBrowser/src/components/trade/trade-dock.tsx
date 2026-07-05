"use client";

import { useState } from "react";
import { ArrowLeftRight, Bot, Flame } from "lucide-react";
import { SwapPanel } from "./swap-panel";
import { PumpPanel } from "./pump-panel";
import { AgentTraderPanel } from "./agent-trader-panel";

type Tab = "swap" | "pump" | "agent";

const TABS: { value: Tab; label: string; icon: React.ReactNode }[] = [
  { value: "swap", label: "Swap", icon: <ArrowLeftRight size={14} /> },
  { value: "pump", label: "Pump", icon: <Flame size={14} /> },
  { value: "agent", label: "Agent", icon: <Bot size={14} /> },
];

export function TradeDock() {
  const [tab, setTab] = useState<Tab>("swap");
  return (
    <div className="flex flex-col h-full bg-zinc-950 border-l border-zinc-800">
      <div className="h-11 border-b border-zinc-800 flex items-center px-3 gap-1">
        {TABS.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setTab(t.value)}
            className={`flex items-center gap-1.5 px-3 h-8 rounded-md text-[12px] font-medium transition-colors ${
              tab === t.value
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {tab === "swap" && <SwapPanel />}
        {tab === "pump" && <PumpPanel />}
        {tab === "agent" && <AgentTraderPanel />}
      </div>
    </div>
  );
}
