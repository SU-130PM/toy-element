<template>
  <er-upload
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    @on-change="handleChange"
    @on-success="handleSuccess"
  >
    <er-button type="primary">点击上传</er-button>
  </er-upload>
</template>
<script setup>
function handleChange(file) {
  console.log("change:", file);
}
function handleSuccess(data, file) {
  console.log("success:", data, file);
}
</script>
