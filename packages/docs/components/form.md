# Form 表单

包含表单验证功能的表单容器。

## 基础用法

::: preview
demo-preview=../demo/form/Basic.vue
:::

## Form API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model` | 表单数据对象 | `object` | - |
| `rules` | 验证规则 | `object` | - |
| `labelWidth` | 标签宽度 | `string \| number` | - |
| `labelPosition` | 标签位置 | `"left" \| "right" \| "top"` | `"right"` |
| `disabled` | 是否禁用 | `boolean` | `false` |

## FormItem API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `prop` | 字段名 | `string` | - |
| `label` | 标签文本 | `string` | - |
| `required` | 是否必填 | `boolean` | - |
| `rules` | 验证规则 | `FormItemRule[]` | - |
