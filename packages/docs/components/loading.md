# Loading 加载

加载数据时显示的动效。

## 基础用法

::: preview
demo-preview=../demo/loading/Basic.vue
:::

## 服务方式

```js
import { Loading } from "@su-130pm/components";
const loading = Loading({ text: "加载中..." });
loading.close();
```

## Loading API

| 指令 | 说明 |
| --- | --- |
| `v-loading` | 加载状态指示 |

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `target` | 目标元素 | `HTMLElement \| string` | `document.body` |
| `text` | 加载文字 | `string` | - |
| `spinner` | 自定义图标 | `boolean \| string` | `"spinner"` |
| `background` | 遮罩背景色 | `string` | `"rgba(0, 0, 0, 0.5)"` |
| `fullscreen` | 是否全屏 | `boolean` | `false` |
| `lock` | 是否锁定滚动 | `boolean` | `false` |
