# Popconfirm 气泡确认框

点击元素弹出确认框。

## 基础用法

<div class="demo-block">
  <er-popconfirm title="确定删除这条记录吗？" @confirm="handleConfirm" @cancel="handleCancel">
    <er-button type="danger">删除</er-button>
  </er-popconfirm>
</div>

```vue
<er-popconfirm
  title="确定删除这条记录吗？"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
  <er-button type="danger">删除</er-button>
</er-popconfirm>
```

<script setup>
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
function handleConfirm() {
  proxy.$message({ message: "已确认删除", type: "success" });
}
function handleCancel() {
  proxy.$message({ message: "已取消", type: "info" });
}
</script>

## Popconfirm API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 标题 | `string` | `""` |
| `confirmButtonText` | 确认按钮文字 | `string` | - |
| `cancelButtonText` | 取消按钮文字 | `string` | - |
| `confirmButtonType` | 确认按钮类型 | `string` | `"primary"` |
| `cancelButtonType` | 取消按钮类型 | `string` | - |
| `icon` | 图标 | `string` | `"question-circle"` |
| `iconColor` | 图标颜色 | `string` | `"#f90"` |
| `hideIcon` | 是否隐藏图标 | `boolean` | `false` |
| `width` | 宽度 | `number \| string` | `150` |
