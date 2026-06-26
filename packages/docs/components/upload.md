# Upload 上传

通过点击上传文件。

## 基础用法

<div class="demo-block">
  <er-upload
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    @on-change="handleChange"
    @on-success="handleSuccess"
  >
    <er-button type="primary">点击上传</er-button>
  </er-upload>
</div>

```vue
<er-upload
  action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
  @on-change="handleChange"
  @on-success="handleSuccess"
>
  <er-button type="primary">点击上传</er-button>
</er-upload>
```

<script setup>
function handleChange(file) {
  console.log("change:", file);
}
function handleSuccess(data, file) {
  console.log("success:", data, file);
}
</script>

## Upload API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `action` | 上传地址 | `string` | - |
| `defaultFileList` | 默认文件列表 | `UploadFile[]` | - |
| `beforeUpload` | 上传前钩子 | `Function` | - |
| `onChange` | 文件状态改变时 | `Function` | - |
| `onProgress` | 上传进度回调 | `Function` | - |
| `onSuccess` | 上传成功回调 | `Function` | - |
| `onError` | 上传失败回调 | `Function` | - |
| `onRemove` | 文件移除回调 | `Function` | - |
