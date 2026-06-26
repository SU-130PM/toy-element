<template>
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
</template>
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
