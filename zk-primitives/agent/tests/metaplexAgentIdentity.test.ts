import { Keypair } from "@solana/web3.js";
import { describe, expect, test, vi } from "vitest";
import type { AgentRegistrationDoc } from "../src/metaplexAgentIdentity.js";

const mintAndSubmitAgentMock = vi.fn();

vi.mock("@metaplex-foundation/mpl-agent-registry", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@metaplex-foundation/mpl-agent-registry")>();
  return { ...actual, mintAndSubmitAgent: mintAndSubmitAgentMock };
});

const { buildMintAgentInput, mintAgentIdentity, toAgentMetadata } = await import("../src/metaplexAgentIdentity.js");

const DOC: AgentRegistrationDoc = {
  type: "https://eips.ethereum.org/EIPS/eip-8004#registration-v1",
  name: "clawd",
  description: "a sovereign Solana-native AI agent.",
  image: "https://example.invalid/clawd.png",
  services: [{ name: "web", endpoint: "https://web.agentxyz.com/" }],
  x402Support: false,
  active: true,
  registrations: [],
  supportedTrust: [],
};

describe("toAgentMetadata", () => {
  test("keeps only the on-chain-safe fields", () => {
    const meta = toAgentMetadata(DOC);
    expect(meta).toEqual({
      type: DOC.type,
      name: DOC.name,
      description: DOC.description,
      services: DOC.services,
      registrations: DOC.registrations,
      supportedTrust: DOC.supportedTrust,
    });
    expect(meta).not.toHaveProperty("image");
    expect(meta).not.toHaveProperty("x402Support");
    expect(meta).not.toHaveProperty("active");
  });
});

describe("buildMintAgentInput", () => {
  test("defaults to devnet", () => {
    const input = buildMintAgentInput("SomeWallet111", { doc: DOC, uri: "https://example.invalid/agent.json" });
    expect(input.network).toBe("solana-devnet");
    expect(input.wallet).toBe("SomeWallet111");
    expect(input.name).toBe("clawd");
    expect(input.uri).toBe("https://example.invalid/agent.json");
  });

  test("honors an explicit mainnet network", () => {
    const input = buildMintAgentInput("SomeWallet111", {
      doc: DOC,
      uri: "https://example.invalid/agent.json",
      network: "solana-mainnet",
    });
    expect(input.network).toBe("solana-mainnet");
  });
});

describe("mintAgentIdentity", () => {
  test("throws without a signer", async () => {
    await expect(
      mintAgentIdentity("https://rpc.invalid", undefined, { doc: DOC, uri: "https://example.invalid/agent.json" }),
    ).rejects.toThrow("requires a signer");
  });

  test("dry run: returns the built input without calling the SDK", async () => {
    const signer = Keypair.generate();
    const result = await mintAgentIdentity("https://rpc.invalid", signer, {
      doc: DOC,
      uri: "https://example.invalid/agent.json",
    });
    expect(result.confirmed).toBe(false);
    if (!result.confirmed) {
      expect(result.input.wallet).toBe(signer.publicKey.toBase58());
      expect(result.network).toBe("solana-devnet");
    }
    expect(mintAndSubmitAgentMock).not.toHaveBeenCalled();
  });

  test("confirm=true calls mintAndSubmitAgent and maps the result", async () => {
    mintAndSubmitAgentMock.mockResolvedValueOnce({
      assetAddress: "AgentAssetAddress111",
      signature: new Uint8Array([1, 2, 3, 4]),
    });
    const signer = Keypair.generate();
    const result = await mintAgentIdentity("https://rpc.invalid", signer, {
      doc: DOC,
      uri: "https://example.invalid/agent.json",
      confirm: true,
    });
    expect(result.confirmed).toBe(true);
    if (result.confirmed) {
      expect(result.assetAddress).toBe("AgentAssetAddress111");
      expect(result.signatureHex).toBe("01020304");
    }
    expect(mintAndSubmitAgentMock).toHaveBeenCalledTimes(1);
    const [, , calledInput] = mintAndSubmitAgentMock.mock.calls[0]!;
    expect(calledInput.wallet).toBe(signer.publicKey.toBase58());
  });
});
