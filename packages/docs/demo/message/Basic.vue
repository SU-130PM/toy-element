<template>
  <div class="demo-line">
    <er-button @click="show('info')">Info</er-button>
    <er-button @click="show('success')" type="success">Success</er-button>
    <er-button @click="show('warning')" type="warning">Warning</er-button>
    <er-button @click="show('danger')" type="danger">Danger</er-button>
  </div>
</template>
<script setup>
import { ErMessage } from "@su-130pm/components";
function show(type) {
  ErMessage({ message: `${type} 消息提示`, type });
}
</script>
