<template>
  <div class="demo-line">
    <er-button @click="show('info')">Info</er-button>
    <er-button @click="show('success')" type="success">Success</er-button>
    <er-button @click="show('warning')" type="warning">Warning</er-button>
    <er-button @click="show('danger')" type="danger">Danger</er-button>
  </div>
</template>
<script setup>
import notification from "../../../components/Notification/methods.js";
function show(type) {
  notification({ title: `${type} 通知`, message: `这是一条 ${type} 类型的通知`, type });
}
</script>
