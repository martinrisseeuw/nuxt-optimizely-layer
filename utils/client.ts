import optimizely from "@optimizely/optimizely-sdk";
import type { Client } from "@optimizely/optimizely-sdk";

let client: Client | null = null;

export function createClient(datafile: object | string) {
  // Return existing client if it exists
  if (client) return client;

  // Create new client if it doesn't exist
  client = optimizely.createInstance({ datafile });

  // Return the client
  return client;
}

export async function stopClient() {
  if (client) {
    await client.close();
    client = null;
  }
}
