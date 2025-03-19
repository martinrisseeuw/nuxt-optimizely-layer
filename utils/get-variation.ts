import type { LocationQuery } from "vue-router";
import type { Client, UserAttributes } from "@optimizely/optimizely-sdk";

export function getVariation(
  experimentKey: string,
  userId: string,
  userAttributes: UserAttributes,
  query: LocationQuery,
  optimizely: Client
) {
  const forceQuery = query[`optimizely_force_variation[${experimentKey}]`];
  const forcedVariationRouteQuery =
    typeof forceQuery === "string" ? forceQuery : null;

  if (forcedVariationRouteQuery) {
    optimizely.setForcedVariation(
      experimentKey,
      userId,
      forcedVariationRouteQuery
    );

    return optimizely.getForcedVariation(experimentKey, userId);
  }

  try {
    console.log(userAttributes)
    console.log(userId)
    console.log(experimentKey)
    optimizely.getVariation(experimentKey, userId, userAttributes)
  } catch (error) {
    console.log('Error getting variation', error)
  }

  return optimizely.getVariation(experimentKey, userId, userAttributes) ?? null;
}
