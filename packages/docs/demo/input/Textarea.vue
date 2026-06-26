<template>
  <er-input v-model="val" type="textarea" placeholder="多行文本" />
</template>
<script setup>
import { ref } from "vue";
const val = ref("");
</script>
