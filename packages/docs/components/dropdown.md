# Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中。

## 基础用法

::: preview
demo-preview=../demo/dropdown/Basic.vue
:::

## Dropdown API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `items` | 菜单项 | `DropdownItem[]` | `[]` |
| `hideOnClick` | 点击后是否隐藏 | `boolean` | `true` |
| `splitButton` | 是否分割按钮 | `boolean` | `false` |
| `type` | 按钮类型 | `string` | - |

## DropdownItem API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `command` | 指令标识 | `string \| number` | - |
| `label` | 显示文本 | `string` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `divided` | 是否显示分隔线 | `boolean` | `false` |
