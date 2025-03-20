import { getOptimizelyClient } from '@/server/utils/optimizely'

export default defineNuxtPlugin(async () => {
  const optimizelyClient = await getOptimizelyClient()
  return {
    provide: {
      optimizely: optimizelyClient,
    },
  }
})
