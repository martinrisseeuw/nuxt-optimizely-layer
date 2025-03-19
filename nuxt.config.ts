// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/test-utils/module'],
  runtimeConfig: {
    public: {
      optimizelySdkKey: import.meta.env.OPTIMIZELY_SDK_KEY,
    },
  },
})
