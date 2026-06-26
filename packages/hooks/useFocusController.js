import { isFunction } from "lodash-es";
import { getCurrentInstance, ref } from "vue";
import useEventListener from "./useEventListener.js";

export function useFocusController(target, { afterFocus, beforeBlur, afterBlur } = {}) {
  const instance = getCurrentInstance();
  const { emit } = instance;
  const wrapperRef = ref();
  const isFocused = ref(false);

  const handleFocus = (event) => {
    if (isFocused.value) return;
    isFocused.value = true;
    emit("focus", event);
    afterFocus?.();
  };

  const handleBlur = (event) => {
    const cancelBlur = isFunction(beforeBlur) ? beforeBlur(event) : false;
    if (
      cancelBlur ||
      (event.relatedTarget && wrapperRef.value?.contains(event.relatedTarget))
    )
      return;

    isFocused.value = false;
    emit("blur", event);
    afterBlur?.();
  };

  const handleClick = () => {
    target.value?.focus();
  };

  useEventListener(wrapperRef, "click", handleClick);

  return {
    wrapperRef,
    isFocused,
    handleFocus,
    handleBlur,
  };
}

export default useFocusController;
