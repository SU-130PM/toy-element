import { ref, getCurrentInstance, inject, computed, provide, unref } from "vue";
import { configProviderContextKey } from "./constants.js";

const globalConfig = ref();

export function useGlobalConfig(key, defaultVal = void 0) {
  const config = getCurrentInstance()
    ? inject(configProviderContextKey, globalConfig)
    : globalConfig;

  return key
    ? computed(() => config.value?.[key] ?? defaultVal)
    : config;
}

export function provideGlobalConfig(config, app, global = false) {
  const instance = getCurrentInstance();
  const oldConfig = instance ? useGlobalConfig() : void 0;
  const provideFn = app?.provide ?? (instance ? provide : void 0);

  if (!provideFn) {
    console.warn("[ErConfigProvider] provideGlobalConfig() can only be used inside setup()");
    return;
  }

  const context = computed(() => {
    const cfg = unref(config);
    if (!oldConfig?.value) return cfg;
    return { ...oldConfig.value, ...cfg };
  });

  provideFn(configProviderContextKey, context);

  if (global || !globalConfig.value) globalConfig.value = context.value;

  return context;
}
