# MessageBox 弹框

模拟系统的消息提示框而实现的一套模态对话框。

## 基础用法

::: preview
demo-preview=../demo/messagebox/Basic.vue
:::

## MessageBox API

| 方法 | 说明 | 返回值 |
| --- | --- | --- |
| `msgbox.alert(message, title, options)` | 提示 | `Promise` |
| `msgbox.confirm(message, title, options)` | 确认 | `Promise` |
| `msgbox.prompt(message, title, options)` | 输入 | `Promise` |

```js
import { ErMessageBox } from "@su-130pm/components";
ErMessageBox.alert("消息内容", "标题", { confirmButtonText: "确定" });
```

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 标题 | `string` | - |
| `message` | 消息内容 | `string \| VNode` | - |
| `type` | 图标类型 | `"info" \| "success" \| "warning" \| "danger"` | - |
| `confirmButtonText` | 确认按钮文字 | `string` | `"Ok"` |
| `cancelButtonText` | 取消按钮文字 | `string` | `"Cancel"` |
| `closeOnClickModal` | 点击遮罩是否关闭 | `boolean` | `true` |
| `center` | 是否居中 | `boolean` | `false` |
