import { defineNitroPlugin } from "#imports";
import { createInstance, enums } from "@optimizely/optimizely-sdk";
import type { Client } from "@optimizely/optimizely-sdk";


export default defineNitroPlugin(async (nitroApp) => {
  const config = useRuntimeConfig();
  const key = config.public.optimizelySdkKey;

  let client: Client | null = null;

  try {
    client = createInstance({
      sdkKey: key,
      logLevel: enums.LOG_LEVEL.DEBUG,
    });


    client?.notificationCenter.addNotificationListener(
      enums.NOTIFICATION_TYPES.OPTIMIZELY_CONFIG_UPDATE,
      () => {
        const newConfig = client?.getOptimizelyConfig();
        console.log(`[OptimizelyConfig] revision = ${newConfig?.revision}`);
      }
    );

  } catch (error) {
    console.error("Failed to create Optimizely client", error);
  }

  nitroApp.hooks.hook("request", (event) => {
    event.context.optimizely = client;
  });

  nitroApp.hooks.hook("close", async () => {
    client?.close();
  });
});
