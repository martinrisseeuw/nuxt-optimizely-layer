import optimizely from "@optimizely/optimizely-sdk";

export default defineNuxtPlugin(async (nuxtApp) => {
  const sdkKey = useRuntimeConfig().public.optimizelySdkKey;
  const DATAFILE_URL = `https://cdn.optimizely.com/datafiles/${sdkKey}.json`;
  const { data } = await useFetch<object>(DATAFILE_URL);
  
  const optimizelyClient = data.value ? optimizely.createInstance({ datafile: data.value }) : null;

  return {
    provide: {
      optimizely: optimizelyClient,
    },
  };
});
