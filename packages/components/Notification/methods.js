import { shallowReactive, isVNode, render, h } from "vue";
import { each, findIndex, isString, set, get } from "lodash-es";
import { useZIndex, useId } from "@su-130pm/hooks";
import NotificationConstructor from "./Notification.vue";

const { nextZIndex } = useZIndex();

export const notificationDefaults = {
  type: "info",
  position: "top-right",
  duration: 3000,
  offset: 20,
  transitionName: "fade",
  showClose: true,
};

const notificationPosition = ["top-right", "top-left", "bottom-right", "bottom-left"];
const instancesMap = new Map();
each(notificationPosition, (key) => instancesMap.set(key, shallowReactive([])));

const getInstancesByPosition = (position) => instancesMap.get(position);

function normalizeOptions(options) {
  const result =
    !options || isVNode(options) || isString(options)
      ? { message: options }
      : options;
  return { ...notificationDefaults, ...result };
}

function createNotification(props) {
  const id = useId().value;
  const container = document.createElement("div");
  const instances = getInstancesByPosition(props.position || "top-right");
  const destory = () => {
    const idx = findIndex(instances, { id });
    if (idx === -1) return;
    instances.splice(idx, 1);
    render(null, container);
  };

  const _props = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestory: destory,
  };

  const vnode = h(NotificationConstructor, _props);
  render(vnode, container);
  document.body.appendChild(container.firstElementChild);

  const vm = vnode.component;
  const handler = {
    close: () => vm.exposed?.close(),
  };
  const instance = { props: _props, id, vm, vnode, handler };
  instances.push(instance);
  return instance;
}

export const notification = function (options = {}) {
  const normalized = normalizeOptions(options);
  const instance = createNotification(normalized);
  return instance.handler;
};

export function closeAll(type) {
  instancesMap.forEach((instances) => {
    each(instances, (instance) => {
      if (type) {
        instance.props.type === type && instance.handler.close();
        return;
      }
      instance.handler.close();
    });
  });
}

export function getLastBottomOffset() {
  const instances = getInstancesByPosition(this.position || "top-right");
  const idx = findIndex(instances, { id: this.id });
  if (idx <= 0) return 0;
  return get(instances, [idx - 1, "vm", "exposed", "bottomOffset", "value"]);
}

const notificationTypes = ["info", "success", "warning", "danger"];
each(notificationTypes, (type) => {
  set(notification, type, (options) => {
    const normalized = normalizeOptions(options);
    return notification({ ...normalized, type });
  });
});

notification.closeAll = closeAll;

export default notification;
