import optimizely from '@optimizely/optimizely-sdk'
import { enums } from '@optimizely/optimizely-sdk';

export default defineNuxtPlugin(async (nuxtApp) => {
  const optimizelyClient = optimizely.createInstance({ 
    sdkKey: useRuntimeConfig().public.optimizelySdkKey,
    datafile: useState<object>('optimizely-datafile').value,
    logLevel: enums.LOG_LEVEL.ERROR,
    datafileOptions: {
      autoUpdate: false,
    }
  });

  return {
    provide: {
      optimizely: optimizelyClient,
    },
  }
})
