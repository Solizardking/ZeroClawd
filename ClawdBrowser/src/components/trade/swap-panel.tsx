"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowDownUp, Loader2 } from "lucide-react";
import { VersionedTransaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { TokenSelect } from "./token-select";
import { TOKENS_BY_MINT, SOL_MINT, USDC_MINT } from "@/lib/solana/constants";
import { fromBaseUnits } from "@/lib/solana/format";
import {
  buildUserSwapTxAction,
  quoteSwapAction,
} from "@/lib/solana/trade-actions";
import type { SwapQuoteResult } from "@/lib/solana/trade-types";

const SLIPPAGE_OPTIONS = [50, 100, 300, 1000]; // bps

export function SwapPanel() {
  const { publicKey, signTransaction, connected } = useWallet();
  const { connection } = useConnection();

  const [inputMint, setInputMint] = useState(SOL_MINT);
  const [outputMint, setOutputMint] = useState(USDC_MINT);
  const [amount, setAmount] = useState("");
  const [slippageBps, setSlippageBps] = useState(100);
  const [quote, setQuote] = useState<SwapQuoteResult | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [resultSig, setResultSig] = useState<string | null>(null);
  const [resultErr, setResultErr] = useState<string | null>(null);

  const inMeta = TOKENS_BY_MINT[inputMint];
  const outMeta = TOKENS_BY_MINT[outputMint];

  // Debounced quote fetch
  useEffect(() => {
    setResultSig(null);
    setResultErr(null);
    if (!amount || !Number(amount)) {
      setQuote(null);
      setQuoteError(null);
      return;
    }
    const t = setTimeout(async () => {
      setQuoteLoading(true);
      setQuoteError(null);
      try {
        const q = await quoteSwapAction({
          inputMint,
          outputMint,
          amount,
          slippageBps,
        });
        setQuote(q);
      } catch (e) {
        setQuote(null);
        setQuoteError(e instanceof Error ? e.message : String(e));
      } finally {
        setQuoteLoading(false);
      }
    }, 350);
    return () => clearTimeout(t);
  }, [amount, inputMint, outputMint, slippageBps]);

  const flip = useCallback(() => {
    setInputMint(outputMint);
    setOutputMint(inputMint);
    setAmount("");
  }, [inputMint, outputMint]);

  const expectedOut = useMemo(() => {
    if (!quote || !outMeta) return "";
    return fromBaseUnits(quote.outAmount, quote.outDecimals, 6);
  }, [quote, outMeta]);

  async function handleSwap() {
    if (!connected || !publicKey || !signTransaction || !quote) return;
    setSubmitting(true);
    setResultErr(null);
    setResultSig(null);
    try {
      const { transactionBase64, lastValidBlockHeight } =
        await buildUserSwapTxAction({
          quote: quote.quote,
          userPublicKey: publicKey.toBase58(),
        });
      const tx = VersionedTransaction.deserialize(
        Buffer.from(transactionBase64, "base64"),
      );
      const signed = await signTransaction(tx);
      const sig = await connection.sendRawTransaction(signed.serialize(), {
        skipPreflight: false,
        maxRetries: 3,
      });
      await connection.confirmTransaction(
        {
          signature: sig,
          blockhash: signed.message.recentBlockhash,
          lastValidBlockHeight,
        },
        "confirmed",
      );
      setResultSig(sig);
      setAmount("");
      setQuote(null);
    } catch (e) {
      setResultErr(e instanceof Error ? e.message : String(e));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-zinc-200">Swap (Jupiter)</h3>
        <SlippageSelect value={slippageBps} onChange={setSlippageBps} />
      </div>

      {/* Input row */}
      <div className="flex items-center gap-2 p-3 rounded-lg bg-zinc-950 border border-zinc-800">
        <input
          type="text"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
          placeholder="0.0"
          className="flex-1 bg-transparent text-xl text-zinc-100 outline-none font-mono"
        />
        <TokenSelect value={inputMint} onChange={setInputMint} />
      </div>

      {/* Flip */}
      <div className="flex justify-center -my-1">
        <button
          type="button"
          onClick={flip}
          className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:bg-zinc-700"
          title="Swap direction"
        >
          <ArrowDownUp size={14} />
        </button>
      </div>

      {/* Output row */}
      <div className="flex items-center gap-2 p-3 rounded-lg bg-zinc-950 border border-zinc-800">
        <div className="flex-1 text-xl font-mono text-zinc-300 truncate">
          {quoteLoading ? <Loader2 size={16} className="animate-spin text-zinc-500" /> : expectedOut || "0.0"}
        </div>
        <TokenSelect value={outputMint} onChange={setOutputMint} />
      </div>

      {/* Quote info */}
      {quote && (
        <div className="text-[11px] text-zinc-500 flex items-center justify-between">
          <span>
            Price impact{" "}
            <span className={Number(quote.priceImpactPct) > 1 ? "text-amber-400" : "text-zinc-400"}>
              {Number(quote.priceImpactPct).toFixed(3)}%
            </span>
          </span>
          <span>Slippage {slippageBps / 100}%</span>
        </div>
      )}

      {quoteError && (
        <p className="text-xs text-red-400 break-all">{quoteError}</p>
      )}

      <button
        type="button"
        onClick={handleSwap}
        disabled={!connected || !quote || submitting || quoteLoading}
        className="h-11 rounded-lg bg-white text-black font-medium text-sm hover:bg-zinc-200 disabled:opacity-40 disabled:hover:bg-white flex items-center justify-center gap-2"
      >
        {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
        {!connected
          ? "Connect wallet"
          : submitting
          ? "Confirm in wallet…"
          : "Swap"}
      </button>

      {resultSig && (
        <a
          href={`https://solscan.io/tx/${resultSig}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-emerald-400 hover:underline truncate"
        >
          ✓ {resultSig}
        </a>
      )}
      {resultErr && (
        <p className="text-xs text-red-400 break-all">{resultErr}</p>
      )}
    </div>
  );
}

function SlippageSelect({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      {SLIPPAGE_OPTIONS.map((bps) => (
        <button
          key={bps}
          type="button"
          onClick={() => onChange(bps)}
          className={`px-2 py-1 rounded text-[11px] font-mono ${
            value === bps
              ? "bg-zinc-700 text-zinc-100"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
          title={`${bps / 100}% slippage`}
        >
          {bps / 100}%
        </button>
      ))}
    </div>
  );
}
