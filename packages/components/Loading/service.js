import { ref, createApp, reactive, nextTick } from "vue";
import { useZIndex } from "@su-130pm/hooks";
import LoadingComp from "./Loading.vue";
import { delay, isNil, isString } from "lodash-es";

const RELATIVE_CLASS = "er-loading-parent--relative";
const HIDDEN_CLASS = "er-loading-parent--hiden";
const LOADING_NUMB_KEY = "er-loading-numb";

const instanceMap = new Map();
const { nextZIndex } = useZIndex(30000);

function createLoadingComponent(options) {
  const visible = ref(false);
  const afterLeaveFlag = ref(false);
  const handleAfterLeave = () => {
    if (!afterLeaveFlag.value) return;
    destroy();
  };

  const data = reactive({
    ...options,
    onAfterLeave: handleAfterLeave,
  });

  const setText = (text) => (data.text = text);

  const destroy = () => {
    const target = data.parent;
    subtLoadingNumb(target);
    if (getLoadingNumb(target)) return;
    delay(() => {
      removeRelativeClass(target);
      removeHiddenClass(target);
    }, 1);
    instanceMap.delete(target ?? document.body);
    vm.$el?.parentNode?.removeChild(vm.$el);
    app.unmount();
  };

  let afterLeaveTimer;
  const close = () => {
    if (options.beforeClose && !options.beforeClose()) return;
    afterLeaveFlag.value = true;
    clearTimeout(afterLeaveTimer);
    afterLeaveTimer = delay(handleAfterLeave, 500);
    visible.value = false;
    options.closed?.();
  };

  const app = createApp(LoadingComp, {
    ...data,
    zIndex: data.fullscreen ? nextZIndex() : void 0,
    visible,
  });
  const vm = app.mount(document.createElement("div"));

  return {
    get $el() {
      return vm.$el;
    },
    vm,
    close,
    visible,
    setText,
  };
}

function resolveOptions(options) {
  let target;
  if (isString(options.target)) {
    target = document.querySelector(options.target) ?? document.body;
  } else {
    target = options.target || document.body;
  }
  return {
    parent: target === document.body || options.body ? document.body : target,
    background: options.background ?? "rgba(0, 0, 0, 0.5)",
    spinner: options.spinner,
    text: options.text,
    fullscreen: target === document.body && (options.fullscreen ?? true),
    lock: options.lock ?? false,
    visible: options.visible ?? true,
    target,
  };
}

function addRelativeClass(target = document.body) {
  target.classList.add(RELATIVE_CLASS);
}

function removeRelativeClass(target = document.body) {
  target.classList.remove(RELATIVE_CLASS);
}

function addHiddenClass(target = document.body) {
  target.classList.add(HIDDEN_CLASS);
}

function removeHiddenClass(target = document.body) {
  target.classList.remove(HIDDEN_CLASS);
}

function getLoadingNumb(target = document.body) {
  return target.getAttribute(LOADING_NUMB_KEY);
}

function removeLoadingNumb(target = document.body) {
  target.removeAttribute(LOADING_NUMB_KEY);
}

function addLoadingNumb(target = document.body) {
  const numb = getLoadingNumb(target) ?? "0";
  target.setAttribute(LOADING_NUMB_KEY, `${Number.parseInt(numb) + 1}`);
}

function subtLoadingNumb(target = document.body) {
  const numb = getLoadingNumb(target);
  if (numb) {
    const newNumb = Number.parseInt(numb) - 1;
    if (newNumb === 0) {
      removeLoadingNumb(target);
    } else {
      target.setAttribute(LOADING_NUMB_KEY, `${newNumb}`);
    }
  }
}

function addClass(options, parent = document.body) {
  if (options.lock) {
    addHiddenClass(parent);
  } else {
    removeHiddenClass(parent);
  }
  addRelativeClass(parent);
}

let fullscreenInstance = null;

export function Loading(options = {}) {
  const resolved = resolveOptions(options);
  const target = resolved.parent ?? document.body;

  if (resolved.fullscreen && !isNil(fullscreenInstance)) {
    return fullscreenInstance;
  }

  addLoadingNumb(resolved?.parent);
  if (instanceMap.has(target)) {
    return instanceMap.get(target);
  }

  const instance = createLoadingComponent({
    ...resolved,
    closed: () => {
      resolved.closed?.();
      if (resolved.fullscreen) {
        fullscreenInstance = null;
      }
    },
  });

  addClass(options, resolved?.parent);
  resolved.parent?.appendChild(instance.$el);

  nextTick(() => (instance.visible.value = !!resolved.visible));

  if (resolved.fullscreen) {
    fullscreenInstance = instance;
  }
  instanceMap.set(target, instance);
  return instance;
}
