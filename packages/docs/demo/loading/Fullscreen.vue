<template>
  <div>
    <er-button @click="open">显示全屏 Loading</er-button>
    <p style="margin-top: 12px; color: var(--vp-c-text-2);">点击后会全屏显示加载遮罩，2秒后自动关闭</p>
  </div>
</template>
<script setup>
import { Loading } from "@su-130pm/components";
function open() {
  const loading = Loading({
    text: "全屏加载中...",
    fullscreen: true,
  });
  setTimeout(() => {
    loading.close();
  }, 2000);
}
</script>