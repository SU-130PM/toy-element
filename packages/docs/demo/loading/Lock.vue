<template>
  <div>
    <div class="demo-line">
      <er-button @click="open">显示带锁定的 Loading</er-button>
      <er-button @click="close">关闭</er-button>
    </div>
    <div
      v-loading.lock="loading"
      er-loading-text="加载中..."
      class="loading-demo-box"
    >
      加载区域
    </div>
    <p style="margin-top: 12px; color: var(--vp-c-text-2);">开启 lock 后，背景滚动会被锁定</p>
  </div>
</template>
<script setup>
import { ref } from "vue";
const loading = ref(false);
function open() { loading.value = true; }
function close() { loading.value = false; }
</script>
<style scoped>
.loading-demo-box {
  height: 100px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.demo-line {
  display: flex;
  gap: 8px;
}
</style>