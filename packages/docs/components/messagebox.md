# MessageBox 弹框

模拟系统的消息提示框而实现的一套模态对话框。

## 基础用法

<div class="demo-block">
  <div class="demo-line">
    <er-button @click="handleAlert">Alert</er-button>
    <er-button @click="handleConfirm" type="primary">Confirm</er-button>
    <er-button @click="handlePrompt" type="success">Prompt</er-button>
  </div>
</div>

```vue
<script setup>
import msgbox from "path/to/MessageBox/methods.js";
</script>

<template>
  <er-button @click="msgbox.alert('消息', '提示')">Alert</er-button>
</template>
```

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

## MessageBox API

| 方法 | 说明 | 返回值 |
| --- | --- | --- |
| `msgbox.alert(message, title, options)` | 提示 | `Promise` |
| `msgbox.confirm(message, title, options)` | 确认 | `Promise` |
| `msgbox.prompt(message, title, options)` | 输入 | `Promise` |

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 标题 | `string` | - |
| `message` | 消息内容 | `string \| VNode` | - |
| `type` | 图标类型 | `"info" \| "success" \| "warning" \| "danger"` | - |
| `confirmButtonText` | 确认按钮文字 | `string` | `"Ok"` |
| `cancelButtonText` | 取消按钮文字 | `string` | `"Cancel"` |
| `showConfirmButton` | 是否显示确认按钮 | `boolean` | `true` |
| `showCancelButton` | 是否显示取消按钮 | `boolean` | `false` |
| `closeOnClickModal` | 点击遮罩是否关闭 | `boolean` | `true` |
| `center` | 是否居中 | `boolean` | `false` |
