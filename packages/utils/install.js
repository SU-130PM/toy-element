import { each } from "lodash-es";

export function makeInstaller(components) {
  return (app) => each(components, (c) => app.use(c));
}

export const withInstall = (component) => {
  component.install = (app) => {
    const name = component?.name;
    app.component(name, component);
  };

  return component;
};
