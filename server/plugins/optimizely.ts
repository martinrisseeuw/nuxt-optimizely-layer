// import { defineNitroPlugin } from '#imports'
// import { closeOptimizelyClient } from '../utils/optimizely'

// export default defineNitroPlugin((nitroApp) => {
//   nitroApp.hooks.hook('close', async () => {
//     console.log('Close hook triggered');
//     // Your cleanup or shutdown logic here
//   });
// })

export default defineNitroPlugin((nitroApp) => {
  console.log('Nitro plugin', nitroApp)
  nitroApp.hooks.hook('close', async () => {
        console.log('Close hook triggered');
        // Your cleanup or shutdown logic here
      });
})
