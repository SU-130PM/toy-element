# Icon 图标

基于 FontAwesome 的图标组件，支持所有 FA 图标和类型颜色。

## 基础用法

::: preview
demo-preview=../demo/icon/Basic.vue
:::

## 类型颜色

::: preview
demo-preview=../demo/icon/Type.vue
:::

## 自定义颜色

::: preview
demo-preview=../demo/icon/Color.vue
:::

## Icon API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `icon` | 图标名称 | `string \| string[] \| object` | - |
| `size` | 图标尺寸 | `string` | - |
| `type` | 类型（设置颜色） | `"info" \| "success" \| "warning" \| "danger"` | - |
| `color` | 自定义颜色 | `string` | - |
| `spin` | 是否旋转 | `boolean` | `false` |
