// import optimizely from '@optimizely/optimizely-sdk';

// export default defineNuxtPlugin({
//   name: 'optimizely',
//   enforce: 'post',
//   async setup(nuxtApp) {
//     const sdkKey = useRuntimeConfig().public.optimizelySdkKey;
//     const DATAFILE_URL = `https://cdn.optimizely.com/datafiles/${sdkKey}.json`;
//     const datafile = await $fetch<object>(DATAFILE_URL);
//     const optimizelyClient = optimizely.createInstance({ datafile });

//     return {
//       provide: {
//         optimizely: optimizelyClient,
//       },
//     }
//   }
// })


import optimizely from '@optimizely/optimizely-sdk'
import { getOptimizelyClient } from '@/server/utils/optimizely'
import type {Client} from '@optimizely/optimizely-sdk'

export default defineNuxtPlugin(async (nuxtApp) => {
  let optimizelyClient: Client | null = null

  if (import.meta.server) {
    // Use server instance when running SSR
    optimizelyClient = await getOptimizelyClient()
  } else {
    // Fetch datafile for client-side usage
    const sdkKey = useRuntimeConfig().public.optimizelySdkKey;
    const DATAFILE_URL = `https://cdn.optimizely.com/datafiles/${sdkKey}.json`;
    const datafile = await $fetch<object>(DATAFILE_URL);
    
    optimizelyClient = optimizely.createInstance({ datafile });
  }

  return {
    provide: {
      optimizely: optimizelyClient,
    },
  }
})
