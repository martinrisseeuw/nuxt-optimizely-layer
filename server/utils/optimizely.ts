import { createInstance } from "@optimizely/optimizely-sdk";
import type { Client } from "@optimizely/optimizely-sdk";

let optimizelyClient: Client | null = null;

export async function getOptimizelyClient() {
  if (!optimizelyClient) {
    const config = useRuntimeConfig();
    const sdkKey = config.public.optimizelySdkKey;
    const DATAFILE_URL = `https://cdn.optimizely.com/datafiles/${sdkKey}.json`;
    const response = await fetch(DATAFILE_URL);
    const datafile = await response.json();

    optimizelyClient = createInstance({ datafile });
  }

  return optimizelyClient;
}

export async function closeOptimizelyClient() {
  if (optimizelyClient) {
    await optimizelyClient.close();
    optimizelyClient = null;
  }
}
