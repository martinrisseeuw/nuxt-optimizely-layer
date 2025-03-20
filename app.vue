<template>
  <div>
    {{ variation }}
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp();
const { variation } = useOptimizely({
  experimentKey: "optimizely_debug_test",
  userAttributes: {},
});

</script>
