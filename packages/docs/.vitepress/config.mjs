import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Toy Element",
  description: "Vue3 Component Library",
  base: "/toy-element/",
  themeConfig: {
    nav: [
      { text: "Guide", link: "/" },
      { text: "Components", link: "/components/button" },
      { text: "GitHub", link: "https://github.com/SU-130PM/toy-element" },
    ],
    sidebar: [
      {
        text: "Components",
        items: [{ text: "Button", link: "/components/button" }],
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

