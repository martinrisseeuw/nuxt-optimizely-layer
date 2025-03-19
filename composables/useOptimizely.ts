import type { UserAttributes } from "@optimizely/optimizely-sdk";

export default function ({
  experimentKey,
  userAttributes,
  featureKey,
}: {
  experimentKey: string;
  featureKey?: string;
  userAttributes: UserAttributes;
}) {
  const route = useRoute();
  const { $optimizely } = useNuxtApp();
  const userId = useUserId();

  // If the plugin is not enabled, return null values
  if (!$optimizely) {
    return {
      variation: null,
      variables: null,
    };
  }

  const variation = getVariation(
    experimentKey,
    userId.value,
    userAttributes,
    route.query,
    $optimizely
  );

  const variables = featureKey && $optimizely.getAllFeatureVariables(
    featureKey,
    userId.value,
    userAttributes
  )

  return {
    variation,
    variables: variables ?? null,
  };
}
