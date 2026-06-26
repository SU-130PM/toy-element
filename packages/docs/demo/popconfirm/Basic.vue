<template>
  <er-popconfirm title="确定删除这条记录吗？" @confirm="handleConfirm" @cancel="handleCancel">
    <er-button type="danger">删除</er-button>
  </er-popconfirm>
</template>
<script setup>
import message from "../../../components/Message/methods.js";
function handleConfirm() {
  message({ message: "已确认删除", type: "success" });
}
function handleCancel() {
  message({ message: "已取消", type: "info" });
}
</script>
