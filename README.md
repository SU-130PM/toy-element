# Toy Element

Toy Element is a Vue 3 component library monorepo built with `pnpm workspace`.

The project currently includes:

- `ErButton`
- `ErButtonGroup`
- `ErIcon`
- `ErCollapse`
- `ErCollapseItem`

Online resources:

- GitHub: `https://github.com/SU-130PM/toy-element`
- Docs: `https://su-130pm.github.io/toy-element/`

## Published Packages

The repository contains four publishable packages:

- `@su-130pm/core`: recommended entry, full install for application usage
- `@su-130pm/components`: component exports for on-demand usage
- `@su-130pm/theme`: shared theme tokens and global styles
- `@su-130pm/utils`: internal install helpers used by the library

## Quick Start

### Recommended: full install

Install the core package:

```bash
pnpm add @su-130pm/core
```

Register the library in your app:

```js
import { createApp } from "vue";
import App from "./App.vue";
import ToyElement from "@su-130pm/core";

createApp(App).use(ToyElement).mount("#app");
```

Use components in templates:

```vue
<template>
  <er-button type="primary">Primary</er-button>

  <er-button-group type="success">
    <er-button>Left</er-button>
    <er-button>Right</er-button>
  </er-button-group>

  <er-collapse>
    <er-collapse-item name="a" title="Section A">
      Content A
    </er-collapse-item>
  </er-collapse>
</template>
```

### On-demand usage

If you only want specific components, install:

```bash
pnpm add @su-130pm/components @su-130pm/theme
```

Then register the components you need:

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

If you use icon strings, loading buttons, or collapse arrows outside `@su-130pm/core`, register the needed Font Awesome icons yourself:

```js
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleRight, faSpinner } from "@fortawesome/free-solid-svg-icons";

library.add(faSpinner, faAngleRight);
```

## Package Notes

### `@su-130pm/core`

Use this when you want the simplest integration:

- global install via `app.use()`
- theme css included automatically
- default icons registered automatically

### `@su-130pm/components`

Use this when you want on-demand registration:

- import only the components you need
- theme css must be imported manually
- icon registration must be handled manually when needed

### `@su-130pm/theme`

Provides shared tokens and styles:

- reset styles
- css variables
- component visual foundation

### `@su-130pm/utils`

Internal package used by the library:

- `withInstall`
- `makeInstaller`

Application projects usually do not need to install it directly.

## Local Development

Install dependencies:

```bash
corepack pnpm install
```

Run the local playground:

```bash
corepack pnpm run dev
```

Run the docs site:

```bash
corepack pnpm run docs:dev
```

Run component tests:

```bash
corepack pnpm run test
```

Build the playground:

```bash
corepack pnpm run build:play
```

Build docs:

```bash
corepack pnpm run docs:build
```

Build publishable package output:

```bash
corepack pnpm run build:packages
```

## Repository Structure

```text
packages/
  components/   component source, styles, tests
  core/         full-install entry package
  docs/         vitepress docs site
  play/         local demo app
  theme/        theme variables and shared css
  utils/        install helpers
scripts/
  build-packages.mjs
.github/workflows/
  test-and-deploy.yaml
  publish-npm.yaml
```

## Release Workflow

### Local release check

Before publishing, run:

```bash
corepack pnpm run release
```

This does two things:

- runs the component test suite
- generates `dist/` output for publishable packages

### Local publish

If you publish from your machine, the safe order is:

```bash
corepack pnpm publish ./packages/utils/dist --access public --no-git-checks
corepack pnpm publish ./packages/theme/dist --access public --no-git-checks
corepack pnpm publish ./packages/components/dist --access public --no-git-checks
corepack pnpm publish ./packages/core/dist --access public --no-git-checks
```

If your npm account uses 2FA for publish, add `--otp=XXXXXX` to each command.

### GitHub Actions publish

The repository also includes `.github/workflows/publish-npm.yaml`.

To use it:

1. Add `NPM_TOKEN` in `GitHub -> Settings -> Secrets and variables -> Actions`
2. Ensure the token has publish permission for the `@su-130pm` scope
3. Trigger the workflow manually from the Actions page, or push a `v*` tag

## Versioning Notes

npm does not allow overwriting an already published version.

Before each release:

- bump package versions in `packages/utils/package.json`
- bump package versions in `packages/theme/package.json`
- bump package versions in `packages/components/package.json`
- bump package versions in `packages/core/package.json`

## License

MIT
