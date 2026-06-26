# Select 选择器

当选项较多时，使用下拉菜单进行选择。

## 基础用法

::: preview
demo-preview=../demo/select/Basic.vue
:::

## 可清除

::: preview
demo-preview=../demo/select/Clearable.vue
:::

## Select API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `modelValue` | 绑定值 | `string` | - |
| `options` | 选项数组 | `SelectOption[]` | `[]` |
| `placeholder` | 占位文本 | `string` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `clearable` | 是否可清除 | `boolean` | `false` |
| `filterable` | 是否可搜索 | `boolean` | `false` |

## Option API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 选项值 | `string` | - |
| `label` | 选项标签 | `string` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |
