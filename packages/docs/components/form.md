# Form 表单

包含表单验证功能的表单容器。

## 基础用法

<div class="demo-block">
  <er-form ref="formRef" :model="formData" :rules="rules" label-width="100">
    <er-form-item label="用户名" prop="name">
      <er-input v-model="formData.name" placeholder="请输入用户名" />
    </er-form-item>
    <er-form-item label="邮箱" prop="email">
      <er-input v-model="formData.email" placeholder="请输入邮箱" />
    </er-form-item>
    <er-form-item>
      <er-button type="primary" @click="submitForm">提交</er-button>
      <er-button @click="resetForm">重置</er-button>
    </er-form-item>
  </er-form>
</div>

```vue
<er-form ref="formRef" :model="formData" :rules="rules" label-width="100">
  <er-form-item label="用户名" prop="name">
    <er-input v-model="formData.name" placeholder="请输入用户名" />
  </er-form-item>
  <er-form-item label="邮箱" prop="email">
    <er-input v-model="formData.email" placeholder="请输入邮箱" />
  </er-form-item>
  <er-form-item>
    <er-button type="primary">提交</er-button>
    <er-button>重置</er-button>
  </er-form-item>
</er-form>
```

<script setup>
import { ref, reactive } from "vue";
const formRef = ref();
const formData = reactive({ name: "", email: "" });
const rules = {
  name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
};
function submitForm() {
  formRef.value?.validate((valid) => {
    if (valid) alert("提交成功!");
  });
}
function resetForm() {
  formRef.value?.resetFields();
}
</script>

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
| `error` | 错误信息 | `string` | - |
