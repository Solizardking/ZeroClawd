"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { CURATED_TOKENS, isValidMint, type CuratedToken } from "@/lib/solana/constants";
import { shortAddress } from "@/lib/solana/format";

interface TokenSelectProps {
  value: string; // mint address
  onChange: (mint: string) => void;
}

export function TokenSelect({ value, onChange }: TokenSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const selected: CuratedToken | undefined = CURATED_TOKENS.find(
    (t) => t.mint === value,
  );
  const lower = search.toLowerCase();
  const filtered = search
    ? CURATED_TOKENS.filter(
        (t) =>
          t.symbol.toLowerCase().includes(lower) ||
          t.name.toLowerCase().includes(lower) ||
          t.mint.toLowerCase().includes(lower),
      )
    : CURATED_TOKENS;

  const customMintIsValid = !!search && search.length >= 32 && isValidMint(search);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-sm font-medium text-zinc-100"
      >
        <span>{selected?.symbol ?? shortAddress(value)}</span>
        <ChevronDown size={14} className="text-zinc-400" />
      </button>

      {open && (
        <div className="absolute top-full mt-1 left-0 w-72 z-50 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl flex flex-col max-h-80">
          <div className="p-2 border-b border-zinc-800">
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search symbol or paste mint…"
              className="w-full bg-zinc-800 text-zinc-200 text-xs rounded px-2 py-1.5 outline-none placeholder-zinc-500"
            />
          </div>
          <div className="overflow-y-auto flex-1">
            {filtered.length === 0 && !customMintIsValid && (
              <div className="px-3 py-4 text-xs text-zinc-500 text-center">
                No matches. Paste a valid mint address to use a custom token.
              </div>
            )}
            {filtered.map((t) => (
              <button
                key={t.mint}
                type="button"
                onClick={() => {
                  onChange(t.mint);
                  setOpen(false);
                  setSearch("");
                }}
                className="w-full text-left px-3 py-2 text-xs hover:bg-zinc-800 flex items-center gap-2"
              >
                <span className="font-medium text-zinc-100 w-12">{t.symbol}</span>
                <span className="text-zinc-500 flex-1 truncate">{t.name}</span>
                {value === t.mint && <Check size={12} className="text-zinc-400" />}
              </button>
            ))}
            {customMintIsValid && (
              <button
                type="button"
                onClick={() => {
                  onChange(search.trim());
                  setOpen(false);
                  setSearch("");
                }}
                className="w-full text-left px-3 py-2 text-xs hover:bg-zinc-800 border-t border-zinc-800 flex flex-col gap-0.5"
              >
                <span className="text-zinc-100">Use custom mint</span>
                <span className="font-mono text-[10px] text-zinc-500">{search.trim()}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
