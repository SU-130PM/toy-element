<script setup>
import { provideGlobalConfig } from "./hooks.js";

defineOptions({
  name: "ErConfigProvider",
});

const props = defineProps({
  locale: Object,
});

const config = provideGlobalConfig(props);
</script>

<template>
  <slot :config="config"></slot>
</template>
