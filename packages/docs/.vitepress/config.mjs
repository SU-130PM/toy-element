import { defineConfig } from "vitepress";
import { containerPreview, componentPreview } from "@vitepress-demo-preview/plugin";

export default defineConfig({
  title: "Toy Element",
  description: "Vue 3 component library with rich UI components.",
  base: "/toy-element/",
  themeConfig: {
    nav: [
      { text: "开始使用", link: "/" },
      { text: "组件", link: "/components/button" },
      { text: "GitHub", link: "https://github.com/SU-130PM/toy-element" },
    ],
    sidebar: [
      {
        text: "基础组件",
        collapsed: false,
        items: [
          { text: "Button 按钮", link: "/components/button" },
          { text: "Icon 图标", link: "/components/icon" },
          { text: "Switch 开关", link: "/components/switch" },
          { text: "Collapse 折叠面板", link: "/components/collapse" },
        ],
      },
      {
        text: "反馈组件",
        collapsed: false,
        items: [
          { text: "Alert 警告", link: "/components/alert" },
          { text: "Message 消息提示", link: "/components/message" },
          { text: "Notification 通知", link: "/components/notification" },
          { text: "MessageBox 弹框", link: "/components/messagebox" },
          { text: "Loading 加载", link: "/components/loading" },
          { text: "Popconfirm 气泡确认框", link: "/components/popconfirm" },
          { text: "Tooltip 文字提示", link: "/components/tooltip" },
        ],
      },
      {
        text: "表单组件",
        collapsed: false,
        items: [
          { text: "Input 输入框", link: "/components/input" },
          { text: "Select 选择器", link: "/components/select" },
          { text: "Form 表单", link: "/components/form" },
          { text: "Dropdown 下拉菜单", link: "/components/dropdown" },
        ],
      },
      {
        text: "数据组件",
        collapsed: false,
        items: [
          { text: "Upload 上传", link: "/components/upload" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/SU-130PM/toy-element" },
    ],
    search: {
      provider: "local",
    },
  },
  markdown: {
    config(md) {
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },
});
