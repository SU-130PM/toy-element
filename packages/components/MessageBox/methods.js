import { createVNode, isVNode, ref, render, nextTick } from "vue";
import { assign, each, isFunction, isObject, isString, isUndefined, set } from "lodash-es";
import MessageBoxConstructor from "./MessageBox.vue";

const messageInstanceMap = new Map();

function initInstance(props, container) {
  const visible = ref(false);
  const isVNodeMsg = isFunction(props?.message) || isVNode(props?.message);
  const genDefaultSlot = (message) =>
    isFunction(message) ? message : () => message;

  const vnode = createVNode(
    MessageBoxConstructor,
    { ...props, visible },
    isVNodeMsg ? { default: genDefaultSlot(props.message) } : void 0
  );
  render(vnode, container);
  document.body.appendChild(container.firstElementChild);
  return vnode.component;
}

function genContainer() {
  return document.createElement("div");
}

function showMessage(options) {
  const container = genContainer();
  const props = {
    ...options,
    doClose: () => {
      vm.visible.value = false;
    },
    doAction: (action, inputVal) => {
      const currentMsg = messageInstanceMap.get(vm);
      let resolve;

      nextTick(() => vm.doClose());
      if (options.showInput) {
        resolve = { value: inputVal, action };
      } else {
        resolve = action;
      }
      if (options.callback) {
        options.callback(resolve);
        return;
      }
      if (action === "cancel" || action === "close") {
        currentMsg?.reject(action);
        return;
      }
      currentMsg?.resolve(resolve);
    },
    destroy: () => {
      render(null, container);
      messageInstanceMap.delete(vm);
    },
  };

  const instance = initInstance(props, container);
  const vm = instance?.proxy;

  vm.visible.value = true;
  return vm;
}

function MessageBox(options) {
  let callback;
  if (isString(options) || isVNode(options)) {
    options = { message: options };
  } else {
    callback = options.callback;
  }

  return new Promise((resolve, reject) => {
    const vm = showMessage(options);
    messageInstanceMap.set(vm, { options, callback, resolve, reject });
  });
}

const MESSAGE_BOX_VARIANTS = ["alert", "confirm", "prompt"];
const MESSAGE_BOX_DEFAULT_OPTS = {
  alert: { closeOnClickModal: false },
  confirm: { showCancelButton: true },
  prompt: { showCancelButton: true, showInput: true },
};

each(MESSAGE_BOX_VARIANTS, (type) =>
  set(MessageBox, type, messageBoxFactory(type))
);

function messageBoxFactory(boxType) {
  return (message, title, options) => {
    let titleOrOpts = "";
    if (isObject(title)) {
      options = title;
      titleOrOpts = "";
    } else if (isUndefined(title)) {
      titleOrOpts = "";
    } else {
      titleOrOpts = title;
    }

    return MessageBox(
      assign(
        {
          title: titleOrOpts,
          message,
          type: "",
          boxType,
          ...MESSAGE_BOX_DEFAULT_OPTS[boxType],
        },
        options
      )
    );
  };
}

set(MessageBox, "close", () => {
  messageInstanceMap.forEach((_, vm) => {
    vm.doClose();
  });
  messageInstanceMap.clear();
});

export default MessageBox;
