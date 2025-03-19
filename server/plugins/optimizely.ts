import { defineNitroPlugin } from '#imports'
import { closeOptimizelyClient } from '../utils/optimizely'

export default defineNitroPlugin(async (nitroApp) => {
  nitroApp.hooks.hook('close', async () => {
    closeOptimizelyClient()
  });
})
