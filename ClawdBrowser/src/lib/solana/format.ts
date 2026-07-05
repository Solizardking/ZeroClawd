/**
 * Convert a UI-decimal string ("1.5") into a base-units BigInt for a token
 * with `decimals`. Rejects malformed input.
 */
export function toBaseUnits(amount: string | number, decimals: number): bigint {
  const s = typeof amount === "number" ? amount.toString() : amount.trim();
  if (!s || !/^\d*\.?\d*$/.test(s)) throw new Error(`Invalid amount: ${amount}`);
  const [whole, frac = ""] = s.split(".");
  const fracPadded = (frac + "0".repeat(decimals)).slice(0, decimals);
  const combined = (whole || "0") + fracPadded;
  // Strip leading zeros for BigInt parsing
  return BigInt(combined.replace(/^0+(?=\d)/, "") || "0");
}

/**
 * Convert base-units (BigInt or stringified BigInt) into a fixed-decimal
 * UI string. Trims trailing zeros while keeping at least one decimal place.
 */
export function fromBaseUnits(
  amount: bigint | string | number,
  decimals: number,
  maxFractionDigits = 6,
): string {
  const big = typeof amount === "bigint" ? amount : BigInt(amount);
  const negative = big < 0n;
  const abs = negative ? -big : big;
  const divisor = 10n ** BigInt(decimals);
  const whole = abs / divisor;
  const frac = abs % divisor;
  if (decimals === 0) return (negative ? "-" : "") + whole.toString();
  const fracStr = frac.toString().padStart(decimals, "0");
  const trimmed = fracStr.replace(/0+$/, "").slice(0, maxFractionDigits);
  const out = trimmed ? `${whole}.${trimmed}` : whole.toString();
  return (negative ? "-" : "") + out;
}

export function shortAddress(address: string, chars = 4): string {
  if (address.length <= chars * 2 + 1) return address;
  return `${address.slice(0, chars)}…${address.slice(-chars)}`;
}
