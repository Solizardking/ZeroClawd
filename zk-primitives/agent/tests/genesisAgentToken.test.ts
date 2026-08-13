import { Keypair } from "@solana/web3.js";
import { describe, expect, test, vi } from "vitest";
import type { TokenMetadata } from "@metaplex-foundation/genesis";

const createAndRegisterLaunchMock = vi.fn();

vi.mock("@metaplex-foundation/genesis", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@metaplex-foundation/genesis")>();
  return { ...actual, createAndRegisterLaunch: createAndRegisterLaunchMock };
});

const { buildLaunchInput, launchAgentToken, validateTokenMetadata } = await import("../src/genesisAgentToken.js");

const VALID_TOKEN: TokenMetadata = {
  name: "Agent Token",
  symbol: "AGT",
  image: "https://gateway.irys.xyz/some-id",
};

describe("validateTokenMetadata", () => {
  test("accepts valid metadata", () => {
    expect(() => validateTokenMetadata(VALID_TOKEN)).not.toThrow();
  });

  test("rejects a name that is too long", () => {
    expect(() => validateTokenMetadata({ ...VALID_TOKEN, name: "x".repeat(33) })).toThrow("1-32 characters");
  });

  test("rejects an empty symbol", () => {
    expect(() => validateTokenMetadata({ ...VALID_TOKEN, symbol: "" })).toThrow("1-10 characters");
  });

  test("rejects a non-Irys image URL", () => {
    expect(() => validateTokenMetadata({ ...VALID_TOKEN, image: "https://example.com/img.png" })).toThrow(
      "Irys URL",
    );
  });

  test("rejects a description over 250 characters", () => {
    expect(() => validateTokenMetadata({ ...VALID_TOKEN, description: "x".repeat(251) })).toThrow(
      "at most 250 characters",
    );
  });
});

describe("buildLaunchInput", () => {
  test("defaults to devnet and setToken=false", () => {
    const input = buildLaunchInput("SomeWallet111", { agentAssetAddress: "AgentAsset111", token: VALID_TOKEN });
    expect(input.network).toBe("solana-devnet");
    expect(input.agent).toEqual({ mint: "AgentAsset111", setToken: false });
    expect(input.launchType).toBe("bondingCurve");
  });

  test("propagates an explicit setToken=true", () => {
    const input = buildLaunchInput("SomeWallet111", {
      agentAssetAddress: "AgentAsset111",
      token: VALID_TOKEN,
      setToken: true,
    });
    expect(input.agent).toEqual({ mint: "AgentAsset111", setToken: true });
  });

  test("validates the token metadata before building", () => {
    expect(() =>
      buildLaunchInput("SomeWallet111", { agentAssetAddress: "AgentAsset111", token: { ...VALID_TOKEN, name: "" } }),
    ).toThrow("1-32 characters");
  });
});

describe("launchAgentToken", () => {
  test("throws without a signer", async () => {
    await expect(
      launchAgentToken("https://rpc.invalid", undefined, { agentAssetAddress: "AgentAsset111", token: VALID_TOKEN }),
    ).rejects.toThrow("requires a signer");
  });

  test("dry run: returns the built input without calling the SDK", async () => {
    const signer = Keypair.generate();
    const result = await launchAgentToken("https://rpc.invalid", signer, {
      agentAssetAddress: "AgentAsset111",
      token: VALID_TOKEN,
    });
    expect(result.confirmed).toBe(false);
    expect(createAndRegisterLaunchMock).not.toHaveBeenCalled();
  });

  test("confirm=true calls createAndRegisterLaunch and maps the result", async () => {
    createAndRegisterLaunchMock.mockResolvedValueOnce({
      mintAddress: "MintAddress111",
      genesisAccount: "GenesisAccount111",
      launch: { id: "launch-1", link: "https://metaplex.com/launch/1" },
      token: { id: "token-1", mintAddress: "MintAddress111" },
      signatures: [],
    });
    const signer = Keypair.generate();
    const result = await launchAgentToken("https://rpc.invalid", signer, {
      agentAssetAddress: "AgentAsset111",
      token: VALID_TOKEN,
      confirm: true,
    });
    expect(result.confirmed).toBe(true);
    if (result.confirmed) {
      expect(result.mintAddress).toBe("MintAddress111");
      expect(result.launchLink).toBe("https://metaplex.com/launch/1");
    }
    expect(createAndRegisterLaunchMock).toHaveBeenCalledTimes(1);
  });

  test("wraps a Genesis validation error with a clear message", async () => {
    const { isGenesisValidationError, genesisValidationError } =
      await vi.importActual<typeof import("@metaplex-foundation/genesis")>("@metaplex-foundation/genesis");
    expect(isGenesisValidationError).toBeDefined();
    createAndRegisterLaunchMock.mockRejectedValueOnce(genesisValidationError("bad image", "token.image"));
    const signer = Keypair.generate();
    await expect(
      launchAgentToken("https://rpc.invalid", signer, {
        agentAssetAddress: "AgentAsset111",
        token: VALID_TOKEN,
        confirm: true,
      }),
    ).rejects.toThrow('Genesis validation error on "token.image"');
  });
});
