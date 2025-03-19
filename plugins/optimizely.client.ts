import optimizely from '@optimizely/optimizely-sdk'

export default defineNuxtPlugin(async () => {
  const sdkKey = useRuntimeConfig().public.optimizelySdkKey;
  const DATAFILE_URL = `https://cdn.optimizely.com/datafiles/${sdkKey}.json`;
  const datafile = await $fetch<object>(DATAFILE_URL);
  const optimizelyClient = optimizely.createInstance({ datafile });

  return {
    provide: {
      optimizely: optimizelyClient,
    },
  }
})
