import useEventListener from "./useEventListener.js";

export default function useClickOutside(elementRef, callback) {
  useEventListener(document, "click", (e) => {
    if (elementRef.value && e.target) {
      if (!elementRef.value.contains(e.target)) {
        callback(e);
      }
    }
  });
}
