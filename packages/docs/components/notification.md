# Notification 通知

在系统右上角显示通知弹窗。

## 基础用法

<div class="demo-block">
  <div class="demo-line">
    <er-button @click="showNotify('info')">Info</er-button>
    <er-button @click="showNotify('success')" type="success">Success</er-button>
    <er-button @click="showNotify('warning')" type="warning">Warning</er-button>
    <er-button @click="showNotify('danger')" type="danger">Danger</er-button>
  </div>
</div>

```vue
<script setup>
import notification from "path/to/Notification/methods.js";
</script>

<template>
  <er-button @click="notification({ title: '通知', message: '内容', type: 'success' })">
    通知
  </er-button>
</template>
```

<script setup>
import notification from "../../../components/Notification/methods.js";
function showNotify(type) {
  notification({ title: `${type} 通知`, message: `这是一条 ${type} 类型的通知`, type });
}
</script>

## Notification API

调用 `notification(options)` 或 `notification.success(options)` 等。

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 标题 | `string` | - |
| `message` | 消息文字 | `string \| VNode` | - |
| `type` | 类型 | `"info" \| "success" \| "warning" \| "danger"` | `"info"` |
| `position` | 位置 | `"top-right" \| "top-left" \| "bottom-right" \| "bottom-left"` | `"top-right"` |
| `duration` | 显示时间(ms) | `number` | `3000` |
| `offset` | 偏移距离 | `number` | `20` |
| `showClose` | 是否显示关闭按钮 | `boolean` | `true` |
