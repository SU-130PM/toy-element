# Alert 警告

用于页面中展示重要的提示信息。

## 基础用法

::: preview
demo-preview=../demo/alert/Basic.vue
:::

## 带描述

::: preview
demo-preview=../demo/alert/Description.vue
:::

## 可关闭

::: preview
demo-preview=../demo/alert/Closable.vue
:::

## Alert API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 标题 | `string` | - |
| `type` | 类型 | `"success" \| "info" \| "warning" \| "danger"` | `"info"` |
| `description` | 描述文字 | `string` | - |
| `effect` | 效果 | `"light" \| "dark"` | `"light"` |
| `closable` | 是否可关闭 | `boolean` | `true` |
| `center` | 是否居中 | `boolean` | `false` |
| `showIcon` | 是否显示图标 | `boolean` | `false` |
