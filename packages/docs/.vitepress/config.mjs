import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Toy Element",
  description: "Vue 3 component library with rich UI components.",
  base: "/toy-element/",
  themeConfig: {
    nav: [
      { text: "Guide", link: "/" },
      { text: "Components", link: "/components/button" },
      { text: "GitHub", link: "https://github.com/SU-130PM/toy-element" },
    ],
    sidebar: [
      {
        text: "Basic",
        items: [
          { text: "Button", link: "/components/button" },
          { text: "Icon", link: "/components/icon" },
          { text: "Switch", link: "/components/switch" },
          { text: "Alert", link: "/components/alert" },
        ],
      },
      {
        text: "Form",
        items: [
          { text: "Input", link: "/components/input" },
          { text: "Select", link: "/components/select" },
          { text: "Form", link: "/components/form" },
        ],
      },
      {
        text: "Navigation",
        items: [
          { text: "Dropdown", link: "/components/dropdown" },
          { text: "Tooltip", link: "/components/tooltip" },
          { text: "Popconfirm", link: "/components/popconfirm" },
        ],
      },
      {
        text: "Feedback",
        items: [
          { text: "Collapse", link: "/components/collapse" },
          { text: "Message", link: "/components/message" },
          { text: "Notification", link: "/components/notification" },
          { text: "MessageBox", link: "/components/messagebox" },
          { text: "Loading", link: "/components/loading" },
        ],
      },
      {
        text: "Data",
        items: [
          { text: "Upload", link: "/components/upload" },
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
});
