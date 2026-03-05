# Toy Element

Toy Element 是一个基于 Vue 3 的组件库 Monorepo（JavaScript 版本），使用 `pnpm workspace` 管理多包开发。  
当前主打组件为 `Button`，并配套 `Icon`、`ButtonGroup`、主题样式、文档站与本地演示环境。

## 1. 项目目标

- 提供可复用、可扩展的 Vue 3 组件库基础架构
- 支持组件库全量安装与按需引入
- 提供统一主题样式能力
- 提供 `play` 调试应用与 `docs` 文档站点，便于边开发边验证

## 2. 技术栈

- Vue 3
- Vite 5
- VitePress
- Vitest
- pnpm workspace
- Font Awesome（图标）

## 3. 环境要求

- Node.js 18+
- pnpm 9（推荐通过 `corepack` 使用）

## 4. 安装依赖

```bash
corepack pnpm install
```

## 5. 仓库结构

```text
packages/
  components/   # 组件源码与测试（Button、Icon 等）
  core/         # 组件库入口（install）、统一导出
  theme/        # 主题样式与全局 CSS
  utils/        # 通用工具（withInstall、makeInstaller）
  play/         # 本地演示应用（Vite）
  docs/         # 文档站点（VitePress）
```

各包职责简述：

- `@su-130pm/components`：组件定义与导出
- `@su-130pm/core`：整库安装入口，内部注入主题与组件
- `@su-130pm/theme`：样式资源
- `@su-130pm/utils`：安装器与工具函数
- `@su-130pm/play`：手动联调和效果验证
- `@su-130pm/docs`：组件文档网站

## 6. 常用开发命令

在仓库根目录执行：

```bash
# 安装全部依赖
corepack pnpm run install:all

# 启动 play 应用
corepack pnpm run dev

# 启动文档站
corepack pnpm run docs:dev

# 组件测试
corepack pnpm run test

# 构建 play
corepack pnpm run build:play

# 构建 docs
corepack pnpm run docs:build
```

## 7. 在业务项目中使用

### 7.1 通过 core 全量安装（推荐入门）

```bash
pnpm add @su-130pm/core
```

```js
import { createApp } from "vue";
import App from "./App.vue";
import ToyElement from "@su-130pm/core";

createApp(App).use(ToyElement).mount("#app");
```

`@su-130pm/core` 会统一处理：

- 组件安装（`ErButton`、`ErButtonGroup`、`ErIcon`）
- 主题样式引入（`@su-130pm/theme/index.css`）
- Font Awesome 必要图标注册

### 7.2 按需引入组件

```bash
pnpm add @su-130pm/components
```

```js
import { createApp } from "vue";
import App from "./App.vue";
import { ErButton } from "@su-130pm/components";

const app = createApp(App);
app.use(ErButton);
app.mount("#app");
```

如按需使用，建议自行确认样式引入策略（可结合 `@su-130pm/theme`）。

## 8. 文档与演示

- 本地文档入口：`/components/button`
- 文档构建工具：VitePress
- Play 应用用于本地快速验证真实交互效果

## 9. 包发布说明

当前已发布的公共包：

- `@su-130pm/utils`
- `@su-130pm/theme`
- `@su-130pm/components`
- `@su-130pm/core`

发布顺序建议：

```bash
corepack pnpm --filter @su-130pm/utils publish --no-git-checks
corepack pnpm --filter @su-130pm/theme publish --no-git-checks
corepack pnpm --filter @su-130pm/components publish --no-git-checks
corepack pnpm --filter @su-130pm/core publish --no-git-checks
```

## 10. 贡献建议

- 新增组件优先放在 `packages/components`
- 组件导出后同步更新 `packages/core/component.js`
- 变更后至少完成一次 `play` 手动验证和 `test` 自动测试
- 更新文档示例，确保文档与实现一致

## 11. License

MIT

