<template>
  <div class="demo-line">
    <er-button @click="handleAlert">Alert</er-button>
    <er-button @click="handleConfirm" type="primary">Confirm</er-button>
    <er-button @click="handlePrompt" type="success">Prompt</er-button>
  </div>
</template>
<script setup>
import { ErMessageBox, ErMessage } from "@su-130pm/components";
function handleAlert() {
  ErMessageBox.alert("这是一条 Alert 消息", "提示", { confirmButtonText: "确定" });
}
function handleConfirm() {
  ErMessageBox.confirm("此操作将永久删除该文件, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    ErMessage({ message: "删除成功", type: "success" });
  }).catch(() => {
    ErMessage({ message: "已取消删除", type: "info" });
  });
}
function handlePrompt() {
  ErMessageBox.prompt("请输入邮箱", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  }).then(({ value }) => {
    ErMessage({ message: `你的邮箱是: ${value}`, type: "success" });
  }).catch(() => {
    ErMessage({ message: "取消输入", type: "info" });
  });
}
</script>
