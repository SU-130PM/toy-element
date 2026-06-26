# Message 消息提示

常用于主动操作后的反馈提示。

## 基础用法

<div class="demo-block">
  <p>不同类型的消息</p>
  <div class="demo-line">
    <er-button @click="showMsg('info')">Info</er-button>
    <er-button @click="showMsg('success')" type="success">Success</er-button>
    <er-button @click="showMsg('warning')" type="warning">Warning</er-button>
    <er-button @click="showMsg('danger')" type="danger">Danger</er-button>
  </div>
</div>

```vue
<script setup>
import message from "path/to/Message/methods.js";
</script>

<template>
  <er-button @click="message({ message: 'Info 提示', type: 'info' })">
    Info
  </er-button>
</template>
```

<script setup>
import message from "../../../components/Message/methods.js";
function showMsg(type) {
  message({ message: `${type} 消息提示`, type });
}
</script>

## Message API

调用 `message(options)` 或 `message.info(options)` 等，返回一个 handler，可用 `handler.close()` 手动关闭。

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `message` | 消息文字 | `string \| VNode` | - |
| `type` | 消息类型 | `"info" \| "success" \| "warning" \| "danger" \| "error"` | `"info"` |
| `duration` | 显示时间(ms)，0 为不自动关闭 | `number` | `3000` |
| `offset` | 偏移距离 | `number` | `10` |
| `showClose` | 是否显示关闭按钮 | `boolean` | `false` |
| `center` | 是否居中 | `boolean` | `false` |
