import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Toy Element",
  description: "Vue 3 component library with Button, Collapse, and Icon primitives.",
  base: "/toy-element/",
  themeConfig: {
    nav: [
      { text: "Guide", link: "/" },
      { text: "Components", link: "/components/collapse" },
      { text: "GitHub", link: "https://github.com/SU-130PM/toy-element" },
    ],
    sidebar: [
      {
        text: "Components",
        items: [
          { text: "Collapse", link: "/components/collapse" },
          { text: "Button", link: "/components/button" },
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
