# 快速开始

## 安装

推荐使用全量安装方式，一个包搞定全部组件：

```bash
pnpm add @su-130pm/core
```

或者按需引入：

```bash
pnpm add @su-130pm/components @su-130pm/theme
```

## 全量安装

在入口文件注册组件库：

```js
import { createApp } from "vue";
import App from "./App.vue";
import ToyElement from "@su-130pm/core";

createApp(App).use(ToyElement).mount("#app");
```

注册后所有组件全局可用，无需额外 import。

## 按需引入

```js
import { createApp } from "vue";
import { ErButton, ErInput, ErForm, ErFormItem, ErIcon } from "@su-130pm/components";
import "@su-130pm/theme/index.css";

const app = createApp(App);
app.use(ErButton);
app.use(ErInput);
app.use(ErForm);
app.use(ErFormItem);
app.use(ErIcon);
app.mount("#app");
```

## 命令式 API

Message、Notification、MessageBox 无需注册，直接 import 使用：

```js
import { ErMessage, ErNotification, ErMessageBox, ErLoadingService } from "@su-130pm/components";

// 消息提示
ErMessage({ message: "操作成功", type: "success" });
ErMessage.info("提示信息");

// 通知
ErNotification({ title: "标题", message: "内容", type: "warning" });

// 弹框
ErMessageBox.alert("消息内容", "提示", { confirmButtonText: "确定" });

// 加载
const loading = ErLoadingService({ text: "加载中...", fullscreen: true });
loading.close();
```

## 指令

`v-loading` 指令由 `@su-130pm/core` 自动注册。按需使用时需要额外安装：

```js
import { ErLoading } from "@su-130pm/components";
app.use(ErLoading);
```

## 组件列表

| 组件名 | 说明 |
|--------|------|
| ErButton / ErButtonGroup | 按钮 / 按钮组 |
| ErIcon | 图标（基于 FontAwesome） |
| ErSwitch | 开关 |
| ErAlert | 警告提示 |
| ErCollapse / ErCollapseItem | 折叠面板 |
| ErInput | 输入框（支持 text / password / textarea） |
| ErSelect / ErOption | 选择器 |
| ErForm / ErFormItem | 表单（支持 async-validator 校验） |
| ErDropdown / ErDropdownItem | 下拉菜单 |
| ErTooltip | 文字提示 |
| ErPopconfirm | 气泡确认框 |
| ErMessage | 消息提示（命令式） |
| ErNotification | 通知（命令式） |
| ErMessageBox | 弹框（$alert / $confirm / $prompt） |
| ErLoading | 加载（指令 v-loading + 服务式） |
| ErUpload | 文件上传 |
| ErConfigProvider | 全局配置 |
