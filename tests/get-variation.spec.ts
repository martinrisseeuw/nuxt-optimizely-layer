import { describe, it, expect, vi } from "vitest";
import { getVariation } from "../utils/get-variation";
import type { Client } from "@optimizely/optimizely-sdk";

describe("getVariation", () => {
  const experimentKey = "test_experiment";
  const userId = "test_user";
  const userAttributes = {
    channel: "",
    title: "AD",
    otag: "",
    mid: "CAM-wxvanx|TCH-5g6nol|TCO-lx2qmx|CTY-5g6nol|CCO-5g6nol|PRG-xvd3rx",
    flowStep: "",
    campaign: "",
    returning: "",
    productType: "",
    device: "desktop",
    magazines: false,
    host: "abonnement-dev.ad.nl",
    url: "https://abonnement-dev.ad.nl/",
    environment: "shops",
    country: "",
  };

  it("should set and return forced variation when query contains forced variation parameter", () => {
    const forcedVariationValue = "variation_1";
    const query = {
      [`optimizely_force_variation[${experimentKey}]`]: forcedVariationValue,
    };

    const optimizely = {
      setForcedVariation: vi.fn(),
      getForcedVariation: vi.fn().mockReturnValue(forcedVariationValue),
      getVariation: vi.fn(),
    } satisfies Partial<Client> as unknown as Client;

    const result = getVariation(
      experimentKey,
      userId,
      userAttributes,
      query,
      optimizely
    );

    // Verify the forced variation was set
    expect(optimizely.setForcedVariation).toHaveBeenCalledWith(
      experimentKey,
      userId,
      forcedVariationValue
    );
    
    // Verify the forced variation was retrieved
    expect(optimizely.getForcedVariation).toHaveBeenCalledWith(
      experimentKey,
      userId
    );
    
    // The function should return the forced variation
    expect(result).toBe(forcedVariationValue);
  });

  it("should return the normal variation when no forced variation is provided", () => {
    const variationValue = "control";
    const query = {}; // No forced variation parameter

    const optimizely = {
      setForcedVariation: vi.fn(),
      getForcedVariation: vi.fn(),
      getVariation: vi.fn().mockReturnValue(variationValue),
    } satisfies Partial<Client> as unknown as Client;

    const result = getVariation(
      experimentKey,
      userId,
      userAttributes,
      query,
      optimizely
    );

    // Ensure that setForcedVariation was not called
    expect(optimizely.setForcedVariation).not.toHaveBeenCalled();
    // Ensure that getVariation was called with the correct arguments
    expect(optimizely.getVariation).toHaveBeenCalledWith(
      experimentKey,
      userId,
      userAttributes
    );
    expect(result).toBe(variationValue);
  });

  it("should return null when no variation is found", () => {
    const query = {};
    const optimizely = {
      setForcedVariation: vi.fn(),
      getForcedVariation: vi.fn(),
      // Simulate getVariation returning undefined (i.e. no variation found)
      getVariation: vi.fn().mockReturnValue(undefined),
    } satisfies Partial<Client> as unknown as Client;

    const result = getVariation(
      experimentKey,
      userId,
      userAttributes,
      query,
      optimizely
    );

    expect(result).toBe(null);
  });
});
