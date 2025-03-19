import optimizely from '@optimizely/optimizely-sdk';
import type {Client} from '@optimizely/optimizely-sdk'

let client: Client | null = null;

export function createClient(datafile: object | string) {
  if (client) {
    return client;
  }

  client = optimizely.createInstance({ datafile });
  
  return client;
}
