"use client";

import { useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { shortAddress } from "@/lib/solana/format";

export function WalletBar() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [solBalance, setSolBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!publicKey) {
      setSolBalance(null);
      return;
    }
    let cancelled = false;
    async function fetchBalance() {
      try {
        if (!publicKey) return;
        const lamports = await connection.getBalance(publicKey, "confirmed");
        if (!cancelled) setSolBalance(lamports / LAMPORTS_PER_SOL);
      } catch {
        if (!cancelled) setSolBalance(null);
      }
    }
    fetchBalance();
    const id = setInterval(fetchBalance, 15_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [publicKey, connection]);

  return (
    <div className="flex items-center gap-3">
      {connected && publicKey ? (
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs">
          <span className="text-zinc-400">{shortAddress(publicKey.toBase58())}</span>
          <span className="text-zinc-700">·</span>
          <span className="text-zinc-200 font-mono">
            {solBalance === null ? "…" : `${solBalance.toFixed(4)} SOL`}
          </span>
        </div>
      ) : null}
      <WalletMultiButton
        style={{
          background: "transparent",
          border: "1px solid rgb(63 63 70)",
          color: "rgb(228 228 231)",
          fontSize: "13px",
          height: "36px",
          padding: "0 14px",
          borderRadius: "8px",
          fontWeight: 500,
        }}
      />
    </div>
  );
}
