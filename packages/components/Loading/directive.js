import { Loading } from "./service.js";

const INSTANCE_KEY = Symbol("loading");

function createInstance(el, binding) {
  const getProp = (name) => {
    return el.getAttribute(`er-loading-${name}`);
  };

  const getModifier = (name) => {
    return binding.modifiers[name];
  };

  const fullscreen = getModifier("fullscreen");

  const options = {
    text: getProp("text"),
    spinner: getProp("spinner"),
    background: getProp("background"),
    target: fullscreen ? void 0 : el,
    body: getModifier("body"),
    lock: getModifier("lock"),
    fullscreen,
  };
  el[INSTANCE_KEY] = {
    options,
    instance: Loading(options),
  };
}

export const vLoading = {
  mounted(el, binding) {
    if (binding.value) createInstance(el, binding);
  },
  updated(el, binding) {
    if (binding.oldValue === binding.value) return;
    if (binding.value && !binding.oldValue) {
      createInstance(el, binding);
      return;
    }
    el[INSTANCE_KEY]?.instance?.close();
  },
  unmounted(el) {
    el[INSTANCE_KEY]?.instance.close();
    el[INSTANCE_KEY] = void 0;
  },
};
