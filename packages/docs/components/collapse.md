# Collapse 折叠面板

用来承载分组信息，支持多项展开与手风琴模式。

## 基础用法

::: preview
demo-preview=../demo/collapse/Basic.vue
:::

## 手风琴模式

::: preview
demo-preview=../demo/collapse/Accordion.vue
:::

## Collapse API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `modelValue` | 当前展开项数组 | `(string \| number)[]` | `[]` |
| `accordion` | 是否开启手风琴模式 | `boolean` | `false` |

## CollapseItem API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 当前面板唯一标识 | `string \| number` | - |
| `title` | 面板标题 | `string` | `""` |
| `disabled` | 是否禁用 | `boolean` | `false` |
