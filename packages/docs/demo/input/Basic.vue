<template>
  <er-input v-model="val" placeholder="请输入内容" />
</template>
<script setup>
import { ref } from "vue";
const val = ref("");
</script>
