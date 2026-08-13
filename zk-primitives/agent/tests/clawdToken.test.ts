import { describe, expect, test, vi } from "vitest";
import { CLAWD_MINT, checkClawdGate, getClawdBalanceOnchain } from "../src/clawdToken.js";

describe("CLAWD_MINT", () => {
  test("is the pump.fun mint the operator gave us", () => {
    expect(CLAWD_MINT).toBe("8cHzQHUS2s2h8TzCmfqPKYiM4dSt4roa3n7MyRLApump");
  });
});

describe("checkClawdGate", () => {
  test("parses a successful gate response", async () => {
    const fakeFetch = vi.fn(async () =>
      new Response(
        JSON.stringify({
          success: true,
          gate: { mint: CLAWD_MINT, balance: 2_000_000, minimumBalance: 1_000_000, eligible: true, source: "test" },
        }),
        { status: 200 },
      ),
    );
    const gate = await checkClawdGate("SomeOwnerAddress", fakeFetch as unknown as typeof fetch);
    expect(gate).toEqual({
      mint: CLAWD_MINT,
      balance: 2_000_000,
      minimumBalance: 1_000_000,
      eligible: true,
      source: "test",
    });
    expect(fakeFetch).toHaveBeenCalledWith("https://cheshireterminal.ai/api/metaplex-agents/gate/SomeOwnerAddress");
  });

  test("throws on a non-ok response", async () => {
    const fakeFetch = vi.fn(async () => new Response("boom", { status: 500 }));
    await expect(checkClawdGate("addr", fakeFetch as unknown as typeof fetch)).rejects.toThrow("500");
  });

  test("throws when the API reports success=false", async () => {
    const fakeFetch = vi.fn(
      async () => new Response(JSON.stringify({ success: false }), { status: 200 }),
    );
    await expect(checkClawdGate("addr", fakeFetch as unknown as typeof fetch)).rejects.toThrow("success=false");
  });
});

describe("getClawdBalanceOnchain", () => {
  test("sums balances across multiple token accounts", async () => {
    const fakeConnection = {
      getParsedTokenAccountsByOwner: vi.fn(async () => ({
        value: [
          { account: { data: { parsed: { info: { tokenAmount: { amount: "1500000", decimals: 6 } } } } } },
          { account: { data: { parsed: { info: { tokenAmount: { amount: "500000", decimals: 6 } } } } } },
        ],
      })),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    const balance = await getClawdBalanceOnchain(fakeConnection, "11111111111111111111111111111111");
    expect(balance.balanceRaw).toBe(2_000_000n);
    expect(balance.decimals).toBe(6);
    expect(balance.balanceUi).toBeCloseTo(2, 5);
    expect(balance.mint).toBe(CLAWD_MINT);
  });

  test("returns zero balance when the owner holds no accounts for the mint", async () => {
    const fakeConnection = {
      getParsedTokenAccountsByOwner: vi.fn(async () => ({ value: [] })),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    const balance = await getClawdBalanceOnchain(fakeConnection, "11111111111111111111111111111111");
    expect(balance.balanceRaw).toBe(0n);
    expect(balance.balanceUi).toBe(0);
  });
});
