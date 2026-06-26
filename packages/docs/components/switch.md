# Switch 开关

表示两种相互对立的状态的开关切换。

## 基础用法

<div class="demo-block">
  <p>基础开关</p>
  <div class="demo-line">
    <er-switch v-model="switchVal1" />
    <er-switch v-model="switchVal2" active-text="开" inactive-text="关" />
  </div>
</div>

```vue
<er-switch v-model="switchVal" />
<er-switch v-model="switchVal" active-text="开" inactive-text="关" />
```

<script setup>
import { ref } from "vue";
const switchVal1 = ref(true);
const switchVal2 = ref(true);
</script>

## 尺寸

<div class="demo-block">
  <p>Size</p>
  <div class="demo-line">
    <er-switch size="large" />
    <er-switch />
    <er-switch size="small" />
  </div>
</div>

```vue
<er-switch size="large" />
<er-switch />
<er-switch size="small" />
```

## Switch API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `modelValue` | 绑定值 | `boolean \| string \| number` | `false` |
| `activeValue` | 打开时的值 | `boolean \| string \| number` | `true` |
| `inactiveValue` | 关闭时的值 | `boolean \| string \| number` | `false` |
| `activeText` | 打开时的文字 | `string` | - |
| `inactiveText` | 关闭时的文字 | `string` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `size` | 尺寸 | `"large" \| "small"` | - |
