<template>
  <div class="demo-line">
    <er-button @click="show('info')">Info</er-button>
    <er-button @click="show('success')" type="success">Success</er-button>
    <er-button @click="show('warning')" type="warning">Warning</er-button>
    <er-button @click="show('danger')" type="danger">Danger</er-button>
  </div>
</template>
<script setup>
import message from "../../../components/Message/methods.js";
function show(type) {
  message({ message: `${type} 消息提示`, type });
}
</script>
