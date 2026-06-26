<template>
  <div class="demo-line">
    <er-button @click="handleAlert">Alert</er-button>
    <er-button @click="handleConfirm" type="primary">Confirm</er-button>
    <er-button @click="handlePrompt" type="success">Prompt</er-button>
  </div>
</template>
<script setup>
import msgbox from "../../../components/MessageBox/methods.js";
import message from "../../../components/Message/methods.js";
function handleAlert() {
  msgbox.alert("这是一条 Alert 消息", "提示", { confirmButtonText: "确定" });
}
function handleConfirm() {
  msgbox.confirm("此操作将永久删除该文件, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    message({ message: "删除成功", type: "success" });
  }).catch(() => {
    message({ message: "已取消删除", type: "info" });
  });
}
function handlePrompt() {
  msgbox.prompt("请输入邮箱", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  }).then(({ value }) => {
    message({ message: `你的邮箱是: ${value}`, type: "success" });
  }).catch(() => {
    message({ message: "取消输入", type: "info" });
  });
}
</script>
