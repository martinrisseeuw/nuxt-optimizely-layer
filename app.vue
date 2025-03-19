<template>
  <div>
    aaa:
    {{ variation }}
  </div>
</template>

<script setup>
const { variation } = useOptimizely({
  experimentKey: "progress_bar_shops",
  userAttributes: {
    channel: "",
    title: "AD",
    otag: "",
    mid: "CAM-wxvanx|TCH-5g6nol|TCO-lx2qmx|CTY-5g6nol|CCO-5g6nol|PRG-xvd3rx",
    flowStep: "",
    campaign: "",
    returning: "",
    productType: "",
    device: "desktop",
    magazines: false,
    host: "abonnement-dev.ad.nl",
    url: "https://abonnement-dev.ad.nl/",
    environment: "shops",
    country: "",
  },
});
</script>
