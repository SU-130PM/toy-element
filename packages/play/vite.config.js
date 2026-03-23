import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@su-130pm/core": fileURLToPath(new URL("../core/index.js", import.meta.url)),
      "@su-130pm/components": fileURLToPath(new URL("../components/index.js", import.meta.url)),
      "@su-130pm/theme": fileURLToPath(new URL("../theme", import.meta.url)),
      "@su-130pm/utils": fileURLToPath(new URL("../utils", import.meta.url))
    }
  }
});
