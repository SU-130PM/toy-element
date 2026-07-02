# Loading 加载

加载数据时显示的动效。

## 基础用法

通过 `v-loading` 指令控制加载状态。

::: preview
demo-preview=../demo/loading/Basic.vue
:::

## 自定义文字

通过 `er-loading-text` 属性设置加载提示文字。

::: preview
demo-preview=../demo/loading/CustomText.vue
:::

```vue
<div v-loading="loading" er-loading-text="正在加载中...">
  加载区域
</div>
```

## 自定义背景色

通过 `er-loading-background` 属性设置遮罩背景色。

::: preview
demo-preview=../demo/loading/CustomBackground.vue
:::

```vue
<div v-loading="loading" er-loading-background="rgba(255, 255, 255, 0.85)">
  加载区域
</div>
```

## 自定义图标

通过 `er-loading-spinner` 属性设置自定义图标。

::: preview
demo-preview=../demo/loading/CustomSpinner.vue
:::

```vue
<div v-loading="loading" er-loading-spinner="circle">
  加载区域
</div>
```

## 全屏加载

使用 `v-loading.fullscreen` 修饰符或服务方式实现全屏加载。

::: preview
demo-preview=../demo/loading/Fullscreen.vue
:::

```js
import { ErLoadingService } from "@su-130pm/components";

const loading = ErLoadingService({
  text: "全屏加载中...",
  fullscreen: true,
});
setTimeout(() => {
  loading.close();
}, 2000);
```

## 锁定滚动

使用 `v-loading.lock` 修饰符锁定背景滚动。

::: preview
demo-preview=../demo/loading/Lock.vue
:::

```vue
<div v-loading.lock="loading">
  加载区域
</div>
```

## 服务方式

通过调用 `Loading` 函数创建 loading 实例。

::: preview
demo-preview=../demo/loading/Service.vue
:::

```js
import { ErLoadingService } from "@su-130pm/components";

const loading = ErLoadingService({
  text: "服务方式加载中...",
  background: "rgba(0, 0, 0, 0.7)",
});
loading.close();
```

## Loading API

### 指令

| 指令 | 说明 |
| --- | --- |
| `v-loading` | 加载状态指示 |
| `v-loading.fullscreen` | 全屏加载 |
| `v-loading.lock` | 锁定背景滚动 |

### 指令属性

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `er-loading-text` | 加载文字 | `string` | - |
| `er-loading-spinner` | 自定义图标 | `boolean \| string` | `"spinner"` |
| `er-loading-background` | 遮罩背景色 | `string` | `"rgba(0, 0, 0, 0.5)"` |

### 服务方式参数

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `target` | 目标元素 | `HTMLElement \| string` | `document.body` |
| `text` | 加载文字 | `string` | - |
| `spinner` | 自定义图标 | `boolean \| string` | `"spinner"` |
| `background` | 遮罩背景色 | `string` | `"rgba(0, 0, 0, 0.5)"` |
| `fullscreen` | 是否全屏 | `boolean` | `false` |
| `lock` | 是否锁定滚动 | `boolean` | `false` |
| `visible` | 是否初始显示 | `boolean` | `true` |
| `beforeClose` | 关闭前回调 | `function` | - |
| `closed` | 关闭后回调 | `function` | - |

### 服务方式返回值

| 方法/属性 | 说明 |
| --- | --- |
| `close()` | 关闭 loading |
| `setText(text)` | 设置加载文字 |
| `$el` | loading 元素 |
| `visible` | 可见性状态（ref） |