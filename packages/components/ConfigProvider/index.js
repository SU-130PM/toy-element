import ConfigProvider from "./ConfigProvider.vue";
import { withInstall } from "@su-130pm/utils";

export const ErConfigProvider = withInstall(ConfigProvider);
export * from "./hooks.js";
export * from "./constants.js";
