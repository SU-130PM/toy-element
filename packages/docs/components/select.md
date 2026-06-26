# Select 选择器

当选项较多时，使用下拉菜单进行选择。

## 基础用法

<div class="demo-block">
  <p>基础选择器</p>
  <er-select v-model="selectVal" placeholder="请选择" :options="options" />
</div>

```vue
<er-select v-model="selectVal" placeholder="请选择" :options="options" />
```

<script setup>
import { ref } from "vue";
const selectVal = ref("");
const selectVal2 = ref("");
const options = [
  { value: "option1", label: "选项一" },
  { value: "option2", label: "选项二" },
  { value: "option3", label: "选项三" },
];
const options2 = [
  { value: "beijing", label: "北京" },
  { value: "shanghai", label: "上海" },
  { value: "shenzhen", label: "深圳" },
];
</script>

## 可清除

<div class="demo-block">
  <p>带清除按钮</p>
  <er-select v-model="selectVal2" placeholder="可清除" :options="options2" clearable />
</div>

```vue
<er-select v-model="selectVal" placeholder="可清除" :options="options" clearable />
```

## Select API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `modelValue` | 绑定值 | `string` | - |
| `options` | 选项数组 | `SelectOption[]` | `[]` |
| `placeholder` | 占位文本 | `string` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `clearable` | 是否可清除 | `boolean` | `false` |
| `filterable` | 是否可搜索 | `boolean` | `false` |
| `remote` | 是否远程搜索 | `boolean` | `false` |

## Option API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `value` | 选项值 | `string` | - |
| `label` | 选项标签 | `string` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |
