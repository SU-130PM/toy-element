# Toy Element

Toy Element is a Vue 3 component library workspace (JS version).  
Current public component set is focused on `Button`.

## Requirements

- Node.js 18+
- pnpm 9 (via `corepack`)

## Install

```bash
corepack pnpm install
```

## Local Development

### 1) Run playground

```bash
corepack pnpm run dev
```

This starts `@toy-element/play` (Vite app).

### 2) Run docs site

```bash
corepack pnpm run docs:dev
```

### 3) Run tests

```bash
corepack pnpm run test
```

### 4) Build playground

```bash
corepack pnpm run build:play
```

### 5) Build docs

```bash
corepack pnpm run docs:build
```

## How to Use in Vue App

Register the plugin:

```js
import { createApp } from "vue";
import App from "./App.vue";
import ToyElement from "@toy-element/core";

createApp(App).use(ToyElement).mount("#app");
```

Use components:

```vue
<template>
  <er-button type="primary">Primary</er-button>
  <er-button-group type="success">
    <er-button>Left</er-button>
    <er-button>Right</er-button>
  </er-button-group>
</template>
```

## Workspace Layout

- `packages/components`: UI components (`Button`, `Icon`) + tests
- `packages/core`: plugin installer and exports
- `packages/theme`: global css tokens/styles
- `packages/play`: local demo app
- `packages/docs`: VitePress docs site
- `packages/utils`: shared installer helpers

## Docs

- Local docs entry: `/components/button`
- GitHub Pages base: `/toy-element/`
