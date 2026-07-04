"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Loader2 } from "lucide-react";
import { SwapPanel } from "@/components/trade/swap-panel";
import { PumpPanel } from "@/components/trade/pump-panel";
import { AgentTraderPanel } from "@/components/trade/agent-trader-panel";
import { fetchBalancesAction } from "@/lib/solana/trade-actions";
import type { TokenBalance } from "@/lib/solana/balances";

export default function TradePage() {
  const { publicKey, connected } = useWallet();
  const [balances, setBalances] = useState<TokenBalance[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!publicKey) {
      setBalances(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetchBalancesAction(publicKey.toBase58())
      .then((b) => {
        if (!cancelled) setBalances(b);
      })
      .catch(() => {
        if (!cancelled) setBalances([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [publicKey]);

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-zinc-100">Trade Solana</h1>
          <p className="text-xs text-zinc-500 mt-1">
            Connect a wallet for manual swaps · ClawdBot trader uses six-law risk gates and server hot-wallet caps.
          </p>
        </div>

        {/* Wallet balances strip */}
        <div className="mb-6 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-300">Your wallet</span>
            {loading && <Loader2 size={12} className="animate-spin text-zinc-500" />}
          </div>
          {!connected ? (
            <p className="text-xs text-zinc-500">
              Connect a wallet (top right) to see your balances.
            </p>
          ) : balances && balances.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {balances
                .filter((b) => Number(b.uiAmount) > 0)
                .map((b) => (
                  <div
                    key={b.mint}
                    className="px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-xs"
                  >
                    <span className="text-zinc-400">{b.symbol}</span>{" "}
                    <span className="font-mono text-zinc-100">
                      {b.uiAmount.toFixed(b.symbol === "SOL" ? 4 : 2)}
                    </span>
                  </div>
                ))}
              {balances.filter((b) => Number(b.uiAmount) > 0).length === 0 && (
                <p className="text-xs text-zinc-500">No balances yet.</p>
              )}
            </div>
          ) : (
            <p className="text-xs text-zinc-500">No balances loaded.</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <SwapPanel />
          <PumpPanel />
          <AgentTraderPanel />
        </div>
      </div>
    </div>
  );
}
