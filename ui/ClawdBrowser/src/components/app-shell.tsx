"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { WalletBar } from "@/components/wallet/wallet-bar";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const onTradePage = pathname?.startsWith("/trade");

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <header className="h-12 border-b border-zinc-800 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-semibold text-zinc-100">
            Clawd<span className="text-amber-400">Browser</span>
          </Link>
          <nav className="flex items-center gap-1">
            <Link
              href="/"
              className={`px-2.5 h-7 rounded-md text-xs font-medium flex items-center ${
                !onTradePage
                  ? "bg-zinc-800 text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Browser agent
            </Link>
            <Link
              href="/trade"
              className={`px-2.5 h-7 rounded-md text-xs font-medium flex items-center ${
                onTradePage
                  ? "bg-zinc-800 text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Trade
            </Link>
          </nav>
        </div>
        <WalletBar />
      </header>
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
