<template>
  <div>
    <div class="demo-line">
      <er-button @click="open">服务方式 Loading</er-button>
    </div>
    <p style="margin-top: 12px; color: var(--vp-c-text-2);">通过 Loading() 函数创建实例，2秒后自动关闭</p>
  </div>
</template>
<script setup>
import { Loading } from "@su-130pm/components";
function open() {
  const loading = Loading({
    text: "服务方式加载中...",
    background: "rgba(0, 0, 0, 0.7)",
  });
  setTimeout(() => {
    loading.close();
  }, 2000);
}
</script>
<style scoped>
.demo-line {
  display: flex;
  gap: 8px;
}
</style>