<template>
  <er-select v-model="val" placeholder="可清除" :options="options" clearable />
</template>
<script setup>
import { ref } from "vue";
const val = ref("");
const options = [
  { value: "beijing", label: "北京" },
  { value: "shanghai", label: "上海" },
  { value: "shenzhen", label: "深圳" },
];
</script>
