import { createInstance } from '@optimizely/optimizely-sdk'
import type {Client} from '@optimizely/optimizely-sdk'

let optimizelyClient: Client | null = null

export async function getOptimizelyClient() {
  if (!optimizelyClient) {
    const sdkKey = process.env.OPTIMIZELY_SDK_KEY
    const DATAFILE_URL = `https://cdn.optimizely.com/datafiles/${sdkKey}.json`
    const response = await fetch(DATAFILE_URL)
    const datafile = await response.json()

    optimizelyClient = createInstance({
      datafile, // Preload datafile
    })
  }
  
  return optimizelyClient
}

export async function closeOptimizelyClient() {
  if (optimizelyClient) {
    console.log('🛑 Closing Optimizely global instance...')
    await optimizelyClient.close()
    optimizelyClient = null
    console.log('✅ Optimizely global instance closed.')
  }
}
