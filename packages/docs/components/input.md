# Input 输入框

通过鼠标或键盘输入内容的表单控件。

## 基础用法

::: preview
demo-preview=../demo/input/Basic.vue
:::

## 可清除

::: preview
demo-preview=../demo/input/Clearable.vue
:::

## 密码框

::: preview
demo-preview=../demo/input/Password.vue
:::

## 文本域

::: preview
demo-preview=../demo/input/Textarea.vue
:::

## Input API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `modelValue` | 绑定值 | `string` | - |
| `type` | 类型 | `"text" \| "textarea" \| "password"` | `"text"` |
| `size` | 尺寸 | `"large" \| "small"` | - |
| `placeholder` | 占位文本 | `string` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `clearable` | 是否可清除 | `boolean` | `false` |
| `showPassword` | 是否可切换密码显示 | `boolean` | `false` |
