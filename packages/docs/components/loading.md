# Loading 加载

加载数据时显示的动效。

## 基础用法

<div class="demo-block">
  <p>指令方式</p>
  <div class="demo-line">
    <er-button @click="openLoading">显示 Loading</er-button>
    <er-button @click="closeLoading">关闭</er-button>
  </div>
  <div
    v-loading="loadingVisible"
    style="height: 100px; border: 1px solid var(--vp-c-divider); border-radius: 8px; margin-top: 12px; display: flex; align-items: center; justify-content: center;"
  >
    加载区域
  </div>
</div>

```vue
<div v-loading="loadingVisible" style="height: 100px;">
  加载区域
</div>
```

<script setup>
import { ref } from "vue";
const loadingVisible = ref(false);
function openLoading() { loadingVisible.value = true; }
function closeLoading() { loadingVisible.value = false; }
</script>

## 服务方式

```js
import { Loading } from "@su-130pm/components";

const loading = Loading({ text: "加载中..." });
// 关闭
loading.close();
```

## Loading API

| 指令 | 说明 |
| --- | --- |
| `v-loading` | 加载状态指示 |

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `target` | 目标元素 | `HTMLElement \| string` | - |
| `text` | 加载文字 | `string` | - |
| `spinner` | 自定义图标 | `boolean \| string` | `"spinner"` |
| `background` | 遮罩背景色 | `string` | `"rgba(0, 0, 0, 0.5)"` |
| `fullscreen` | 是否全屏 | `boolean` | `false` |
| `lock` | 是否锁定滚动 | `boolean` | `false` |
