# Input 输入框

通过鼠标或键盘输入内容的表单控件。

## 基础用法

<div class="demo-block">
  <p>基础输入框</p>
  <er-input v-model="inputVal" placeholder="请输入内容" />
</div>

```vue
<er-input v-model="inputVal" placeholder="请输入内容" />
```

<script setup>
import { ref } from "vue";
const inputVal = ref("");
const inputVal2 = ref("");
const inputVal3 = ref("");
const textareaVal = ref("");
</script>

## 可清除

<div class="demo-block">
  <p>带清除按钮</p>
  <er-input v-model="inputVal2" placeholder="输入后会出现清除按钮" clearable />
</div>

```vue
<er-input v-model="inputVal" placeholder="输入后会出现清除按钮" clearable />
```

## 密码框

<div class="demo-block">
  <p>可切换显示的密码</p>
  <er-input v-model="inputVal3" type="password" placeholder="密码" show-password />
</div>

```vue
<er-input v-model="inputVal" type="password" placeholder="密码" show-password />
```

## 文本域

<div class="demo-block">
  <er-input v-model="textareaVal" type="textarea" placeholder="多行文本" />
</div>

```vue
<er-input v-model="textareaVal" type="textarea" placeholder="多行文本" />
```

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
| `readonly` | 是否只读 | `boolean` | `false` |
