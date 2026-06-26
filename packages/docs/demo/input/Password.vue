<template>
  <er-input v-model="val" type="password" placeholder="密码" show-password />
</template>
<script setup>
import { ref } from "vue";
const val = ref("");
</script>
