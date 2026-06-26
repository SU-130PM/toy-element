<template>
  <er-dropdown
    :items="[
      { label: '黄金糕', command: 'a' },
      { label: '双皮奶', command: 'b' },
      { label: '蚵仔煎', command: 'c', divided: true },
    ]"
    @command="handleCommand"
  >
    <er-button type="primary">下拉菜单</er-button>
  </er-dropdown>
</template>
<script setup>
function handleCommand(cmd) {
  alert(`点击了: ${cmd}`);
}
</script>
