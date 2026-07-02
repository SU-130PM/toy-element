# Toy Element

Toy Element 是一个基于 Vue 3 的组件库 Monorepo，使用 `pnpm workspace` 管理多个子包。

当前仓库已经包含 **22+ 个组件**：

| 分类 | 组件 |
|------|------|
| 基础 | ErButton, ErButtonGroup, ErIcon, ErSwitch, ErAlert, ErCollapse, ErCollapseItem |
| 表单 | ErInput, ErSelect, ErOption, ErForm, ErFormItem |
| 导航 | ErDropdown, ErDropdownItem, ErTooltip, ErPopconfirm |
| 反馈 | ErMessage, ErNotification, ErMessageBox, ErLoading |
| 数据 | ErUpload |
| 其他 | ErConfigProvider, ErOverlay |

在线地址：

- GitHub：`https://github.com/SU-130PM/toy-element`
- 文档站：`https://su-130pm.github.io/toy-element/`

## 已发布包

| 包名 | 版本 | 说明 |
|------|------|------|
| `@su-130pm/core` | [![npm](https://img.shields.io/npm/v/@su-130pm/core)](https://www.npmjs.com/package/@su-130pm/core) | 推荐入口，全量安装 |
| `@su-130pm/components` | [![npm](https://img.shields.io/npm/v/@su-130pm/components)](https://www.npmjs.com/package/@su-130pm/components) | 组件导出包，支持按需引入 |
| `@su-130pm/hooks` | [![npm](https://img.shields.io/npm/v/@su-130pm/hooks)](https://www.npmjs.com/package/@su-130pm/hooks) | 组合式 API 工具集 |
| `@su-130pm/theme` | [![npm](https://img.shields.io/npm/v/@su-130pm/theme)](https://www.npmjs.com/package/@su-130pm/theme) | 主题样式与 CSS 变量 |
| `@su-130pm/utils` | [![npm](https://img.shields.io/npm/v/@su-130pm/utils)](https://www.npmjs.com/package/@su-130pm/utils) | 内部工具包 |
| `@su-130pm/constants` | [![npm](https://img.shields.io/npm/v/@su-130pm/constants)](https://www.npmjs.com/package/@su-130pm/constants) | 共享常量 |

## 快速开始

### 推荐方式：全量安装

```bash
pnpm add @su-130pm/core
```

在入口文件注册：

```js
import { createApp } from "vue";
import App from "./App.vue";
import ToyElement from "@su-130pm/core";

createApp(App).use(ToyElement).mount("#app");
```

组件使用示例：

```vue
<template>
  <!-- 按钮 -->
  <er-button type="primary">主要按钮</er-button>
  <er-button type="success" :icon="check" circle />

  <!-- 表单 -->
  <er-form :model="formData" :rules="rules">
    <er-form-item label="用户名" prop="name">
      <er-input v-model="formData.name" />
    </er-form-item>
    <er-form-item label="邮箱" prop="email">
      <er-input v-model="formData.email" />
    </er-form-item>
  </er-form>

  <!-- 反馈 -->
  <er-alert title="提示" type="success" show-icon />
  <er-button @click="$message({ message: '成功', type: 'success' })">
    消息提示
  </er-button>

  <!-- 折叠面板 -->
  <er-collapse :model-value="['a']">
    <er-collapse-item name="a" title="面板 A">内容 A</er-collapse-item>
  </er-collapse>

  <!-- loading -->
  <div v-loading="loading">加载区域</div>
</template>
```

### 按需引入

```bash
pnpm add @su-130pm/components @su-130pm/theme
```

```js
import { createApp } from "vue";
import { ErButton, ErInput, ErForm } from "@su-130pm/components";
import "@su-130pm/theme/index.css";

const app = createApp(App);
app.use(ErButton);
app.use(ErInput);
app.use(ErForm);
app.mount("#app");
```

命令式 API（Message / Notification / MessageBox）无需注册，直接引入调用即可：

```js
import { ErMessage, ErNotification, ErMessageBox } from "@su-130pm/components";

ErMessage({ message: "提示", type: "success" });
ErNotification({ title: "通知", message: "内容" });
ErMessageBox.alert("消息内容", "标题");
```

## 各包说明

### `@su-130pm/core`

推荐业务项目优先使用。会自动完成：

- `app.use()` 全量注册 22+ 个组件
- 自动引入主题样式
- 自动注册 FontAwesome 图标库
- 注册 `v-loading` 指令

### `@su-130pm/components`

适合按需引入。每个组件可单独 `app.use()`，命令式 API 直接 import 使用。

### `@su-130pm/hooks`

组件库内部使用的组合式 API 集合，包括：

- `useEventListener`、`useClickOutside`、`useFocusController`
- `useZIndex`、`useId`、`useOffset`
- `useProp`、`useDisabledStyle`、`useLocale`

### `@su-130pm/theme`

CSS 变量定义 + reset 样式，所有组件样式基于 CSS 变量实现主题定制。

### `@su-130pm/utils`

内部工具包：`withInstall`、`makeInstaller`、`debugWarn`、`addUnit`、`RenderVnode`。

### `@su-130pm/constants`

共享常量，如 `INSTALLED_KEY`。

## 本地开发

```bash
# 安装依赖
corepack pnpm install

# 启动文档站
corepack pnpm run docs:dev

# 运行测试
corepack pnpm run test

# 构建 npm 发布产物
corepack pnpm run build:packages
```

## 仓库结构

```
packages/
  components/   22+ 个组件源码、样式、测试
  core/         全量安装入口
  docs/         VitePress 文档站（含交互式 demo）
  hooks/        组合式 API
  constants/    共享常量
  theme/        CSS 变量与 reset 样式
  utils/        安装工具与公共方法
  play/         本地演示项目
scripts/
  build-packages.mjs
.github/workflows/
  test-and-deploy.yaml     # push master → test → build docs → deploy Pages
  publish-npm.yaml         # tag v* → publish to npm
```

## 发布流程

### GitHub Actions 自动发布

推 tag 即可触发：

```bash
git tag v0.3.0
git push origin v0.3.0
```

需要先在 GitHub Secrets 中配置 `NPM_TOKEN`。

### 本地手动发布

```bash
# 构建所有包
node scripts/build-packages.mjs

# 按依赖顺序发布
npm publish ./packages/constants/dist --access public
npm publish ./packages/hooks/dist --access public
npm publish ./packages/utils/dist --access public
npm publish ./packages/theme/dist --access public
npm publish ./packages/components/dist --access public
npm publish ./packages/core/dist --access public
```

## License

MIT
