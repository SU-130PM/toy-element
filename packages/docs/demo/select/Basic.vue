<template>
  <er-select v-model="val" placeholder="请选择" :options="options" />
</template>
<script setup>
import { ref } from "vue";
const val = ref("");
const options = [
  { value: "option1", label: "选项一" },
  { value: "option2", label: "选项二" },
  { value: "option3", label: "选项三" },
];
</script>
