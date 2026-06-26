import { computed, getCurrentInstance } from "vue";

export default function useProp(propName) {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error("useProp must be used within a component");
  }
  return computed(() => instance?.proxy?.$props?.[propName]);
}
