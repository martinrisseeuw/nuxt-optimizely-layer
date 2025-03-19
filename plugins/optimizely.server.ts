import { getOptimizelyClient } from '@/server/utils/optimizely'

export default defineNuxtPlugin(async (nuxtApp) => {
  const optimizelyClient = await getOptimizelyClient()

  return {
    provide: {
      optimizely: optimizelyClient,
    },
  }
})
