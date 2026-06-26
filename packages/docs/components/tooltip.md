# Tooltip 文字提示

常用于展示鼠标悬浮或点击时的提示信息。

## 基础用法

::: preview
demo-preview=../demo/tooltip/Basic.vue
:::

## 不同位置

::: preview
demo-preview=../demo/tooltip/Placement.vue
:::

## Tooltip API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `content` | 提示内容 | `string` | - |
| `placement` | 弹出位置 | `string` | `"bottom"` |
| `trigger` | 触发方式 | `"hover" \| "click" \| "contextmenu"` | `"hover"` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `showTimeout` | 显示延迟(ms) | `number` | `0` |
| `hideTimeout` | 隐藏延迟(ms) | `number` | `200` |
