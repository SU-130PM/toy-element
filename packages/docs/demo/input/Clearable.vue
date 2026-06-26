<template>
  <er-input v-model="val" placeholder="输入后会出现清除按钮" clearable />
</template>
<script setup>
import { ref } from "vue";
const val = ref("");
</script>
