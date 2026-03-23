# Toy Element

Toy Element 是一个基于 Vue 3 的组件库 Monorepo，使用 `pnpm workspace` 管理 `components`、`core`、`theme`、`utils`、`docs` 和 `play` 多个包。当前仓库已经提供 `Button`、`ButtonGroup`、`Icon` 与 `Collapse` 组件，并配套测试、文档站和本地演示环境。

## 在线地址

- GitHub: https://github.com/SU-130PM/toy-element
- Docs: https://su-130pm.github.io/toy-element/

文档地址采用 GitHub Pages 路径，对应文档站配置里的 `base: "/toy-element/"`。

## 仓库结构

```text
packages/
  components/   # 组件源码、样式与测试
  core/         # 组件库入口与全量安装
  docs/         # VitePress 文档站
  play/         # 本地演示应用
  theme/        # 主题样式
  utils/        # withInstall / makeInstaller 等工具
```

## 当前组件

- `ErButton`
- `ErButtonGroup`
- `ErIcon`
- `ErCollapse`
- `ErCollapseItem`

## 开发命令

```bash
corepack pnpm install
corepack pnpm run dev
corepack pnpm run docs:dev
corepack pnpm run test
corepack pnpm run build:play
corepack pnpm run docs:build
```

## 使用方式

### 全量安装

```bash
pnpm add @su-130pm/core
```

```js
import { createApp } from "vue";
import App from "./App.vue";
import ToyElement from "@su-130pm/core";

createApp(App).use(ToyElement).mount("#app");
```

### 按需引入

```bash
pnpm add @su-130pm/components
```

```js
import { createApp } from "vue";
import App from "./App.vue";
import { ErCollapse, ErCollapseItem } from "@su-130pm/components";

const app = createApp(App);
app.use(ErCollapse);
app.use(ErCollapseItem);
app.mount("#app");
```

## 发布顺序

推荐按下面顺序发版，保证依赖引用关系稳定：

```bash
corepack pnpm --filter @su-130pm/utils publish --no-git-checks
corepack pnpm --filter @su-130pm/theme publish --no-git-checks
corepack pnpm --filter @su-130pm/components publish --no-git-checks
corepack pnpm --filter @su-130pm/core publish --no-git-checks
```

本次 `Collapse` 组件接入后，至少需要同步发布：

- `@su-130pm/components`
- `@su-130pm/core`

## 开发约定

- 组件新增后，同时更新 `components` 导出、`core` 安装入口、文档站和 README。
- 发布前至少完成一次组件测试、`play` 构建和 `docs` 构建。
- 如果仓库里存在与你当前任务无关的本地修改，优先只提交本次变更涉及的文件。

## License

MIT
