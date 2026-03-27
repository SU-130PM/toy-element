# Toy Element

Toy Element 是一个基于 Vue 3 的组件库 Monorepo，使用 `pnpm workspace` 管理多个子包。

当前仓库已经包含以下组件：

- `ErButton`
- `ErButtonGroup`
- `ErIcon`
- `ErCollapse`
- `ErCollapseItem`

在线地址：

- GitHub：`https://github.com/SU-130PM/toy-element`
- 文档站：`https://su-130pm.github.io/toy-element/`

## 已发布包

当前仓库包含 4 个可发布 npm 包：

- `@su-130pm/core`：推荐使用的入口，适合业务项目直接全量安装
- `@su-130pm/components`：组件导出包，适合按需引入
- `@su-130pm/theme`：主题样式与全局变量
- `@su-130pm/utils`：组件库内部工具包

## 快速开始

### 推荐方式：全量安装

安装：

```bash
pnpm add @su-130pm/core
```

在入口文件注册组件库：

```js
import { createApp } from "vue";
import App from "./App.vue";
import ToyElement from "@su-130pm/core";

createApp(App).use(ToyElement).mount("#app");
```

组件使用示例：

```vue
<template>
  <er-button type="primary">主要按钮</er-button>

  <er-button-group type="success">
    <er-button>左侧</er-button>
    <er-button>右侧</er-button>
  </er-button-group>

  <er-collapse>
    <er-collapse-item name="a" title="折叠面板 A">
      内容 A
    </er-collapse-item>
  </er-collapse>
</template>
```

### 按需引入

如果你只想注册部分组件，可以安装：

```bash
pnpm add @su-130pm/components @su-130pm/theme
```

然后按需注册：

```js
import { createApp } from "vue";
import App from "./App.vue";
import { ErButton, ErButtonGroup } from "@su-130pm/components";
import "@su-130pm/theme/index.css";

const app = createApp(App);

app.use(ErButton);
app.use(ErButtonGroup);
app.mount("#app");
```

如果你在按需模式下使用字符串图标、`loading` 按钮或折叠面板箭头，还需要手动注册默认图标：

```js
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleRight, faSpinner } from "@fortawesome/free-solid-svg-icons";

library.add(faSpinner, faAngleRight);
```

## 各包说明

### `@su-130pm/core`

推荐业务项目优先使用这个包。

它会自动完成：

- `app.use()` 全量注册组件
- 自动引入主题样式
- 自动注册默认图标

### `@su-130pm/components`

适合按需引入场景。

特点：

- 可以只引入需要的组件
- 需要手动引入主题样式
- 涉及默认图标时需要手动注册 Font Awesome 图标

### `@su-130pm/theme`

提供全局样式基础，包括：

- reset 样式
- CSS 变量
- 组件公共视觉基础

### `@su-130pm/utils`

这是组件库内部工具包，主要包含：

- `withInstall`
- `makeInstaller`

普通业务项目通常不需要直接安装它。

## 本地开发

安装依赖：

```bash
corepack pnpm install
```

启动本地演示项目：

```bash
corepack pnpm run dev
```

启动文档站：

```bash
corepack pnpm run docs:dev
```

运行组件测试：

```bash
corepack pnpm run test
```

构建本地演示项目：

```bash
corepack pnpm run build:play
```

构建文档站：

```bash
corepack pnpm run docs:build
```

生成 npm 发布产物：

```bash
corepack pnpm run build:packages
```

## 仓库结构

```text
packages/
  components/   组件源码、样式、测试
  core/         全量安装入口
  docs/         VitePress 文档站
  play/         本地演示项目
  theme/        主题样式与变量
  utils/        安装工具与公共方法
scripts/
  build-packages.mjs
.github/workflows/
  test-and-deploy.yaml
  publish-npm.yaml
```

## 发布流程

### 发布前检查

正式发布前建议先执行：

```bash
corepack pnpm run release
```

这条命令会做两件事：

- 运行组件测试
- 生成四个包的 `dist/` 发布目录

### 本地发布

本地手动发布时，建议按依赖顺序执行：

```bash
corepack pnpm publish ./packages/utils/dist --access public --no-git-checks
corepack pnpm publish ./packages/theme/dist --access public --no-git-checks
corepack pnpm publish ./packages/components/dist --access public --no-git-checks
corepack pnpm publish ./packages/core/dist --access public --no-git-checks
```

如果你的 npm 账号开启了发布 2FA，需要额外带上：

```bash
--otp=你的6位验证码
```

### GitHub Actions 自动发布

仓库已经包含自动发布工作流：

- `.github/workflows/publish-npm.yaml`

使用前需要先配置：

1. 打开 `GitHub -> Settings -> Secrets and variables -> Actions`
2. 新增仓库密钥：`NPM_TOKEN`
3. 确保该 token 对 `@su-130pm` scope 具有发布权限

触发方式有两种：

1. 在 GitHub Actions 页面手动运行 `Publish npm packages`
2. 推送符合 `v*` 规则的 tag

## 版本说明

npm 不允许覆盖已发布的版本。

所以每次发布前，都要先修改以下文件中的版本号：

- `packages/utils/package.json`
- `packages/theme/package.json`
- `packages/components/package.json`
- `packages/core/package.json`

建议同一轮发布统一升级版本，避免内部依赖版本不一致。

## License

MIT
