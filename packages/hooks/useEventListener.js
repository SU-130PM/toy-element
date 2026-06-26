import { onMounted, onBeforeUnmount, watch, isRef, unref } from "vue";

export default function useEventListener(target, event, handler) {
  if (isRef(target)) {
    watch(target, (val, oldVal) => {
      oldVal?.removeEventListener(event, handler);
      val?.addEventListener(event, handler);
    });
  } else {
    onMounted(() => target?.addEventListener(event, handler));
  }

  onBeforeUnmount(() => unref(target)?.removeEventListener(event, handler));
}
