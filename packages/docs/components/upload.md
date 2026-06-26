# Upload 上传

通过点击上传文件。

## 基础用法

::: preview
demo-preview=../demo/upload/Basic.vue
:::

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
