# Message 消息提示

常用于主动操作后的反馈提示。

## 基础用法

::: preview
demo-preview=../demo/message/Basic.vue
:::

## Message API

直接引入 `message` 函数调用：

```js
import { ErMessage } from "@su-130pm/components";
ErMessage({ message: "提示信息", type: "info" });
ErMessage.info("快捷方式");
ErMessage.success("成功");
ErMessage.warning("警告");
ErMessage.danger("危险");
ErMessage.closeAll(); // 关闭所有
```

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `message` | 消息文字 | `string \| VNode` | - |
| `type` | 消息类型 | `"info" \| "success" \| "warning" \| "danger" \| "error"` | `"info"` |
| `duration` | 显示时间(ms)，0 为不自动关闭 | `number` | `3000` |
| `offset` | 偏移距离 | `number` | `10` |
| `showClose` | 是否显示关闭按钮 | `boolean` | `false` |
| `center` | 是否居中 | `boolean` | `false` |
