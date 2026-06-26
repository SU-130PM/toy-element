# Button 按钮

常用的操作按钮，支持类型、尺寸、朴素、圆角、圆形、禁用、加载和按钮组。

## 基础用法

::: preview
demo-preview=../demo/button/Basic.vue
:::

## 朴素按钮

::: preview
demo-preview=../demo/button/Plain.vue
:::

## 圆角 / 圆形

::: preview
demo-preview=../demo/button/Round.vue
:::

## 尺寸

::: preview
demo-preview=../demo/button/Size.vue
:::

## 禁用与加载

::: preview
demo-preview=../demo/button/Disabled.vue
:::

## 按钮组

::: preview
demo-preview=../demo/button/Group.vue
:::

## Button API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `tag` | 根标签 | `string \| Component` | `"button"` |
| `type` | 按钮类型 | `"primary" \| "success" \| "warning" \| "danger" \| "info"` | - |
| `size` | 按钮尺寸 | `"large" \| "default" \| "small"` | - |
| `plain` | 是否朴素按钮 | `boolean` | `false` |
| `round` | 是否圆角 | `boolean` | `false` |
| `circle` | 是否圆形 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `loading` | 是否加载中 | `boolean` | `false` |
| `icon` | 图标名 | `string` | - |
| `nativeType` | 原生 type | `"button" \| "submit" \| "reset"` | `"button"` |

## Button Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `click` | 点击时触发 | `(event: MouseEvent)` |
