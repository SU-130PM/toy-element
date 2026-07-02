# Notification 通知

在系统右上角显示通知弹窗。

## 基础用法

::: preview
demo-preview=../demo/notification/Basic.vue
:::

## Notification API

直接引入 `notification` 函数调用：

```js
import { ErNotification } from "@su-130pm/components";
ErNotification({ title: "标题", message: "内容", type: "success" });
ErNotification.success("快捷方式");
ErNotification.closeAll();
```

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 标题 | `string` | - |
| `message` | 消息文字 | `string \| VNode` | - |
| `type` | 类型 | `"info" \| "success" \| "warning" \| "danger"` | `"info"` |
| `position` | 位置 | `"top-right" \| "top-left" \| "bottom-right" \| "bottom-left"` | `"top-right"` |
| `duration` | 显示时间(ms) | `number` | `3000` |
| `offset` | 偏移距离 | `number` | `20` |
| `showClose` | 是否显示关闭按钮 | `boolean` | `true` |
