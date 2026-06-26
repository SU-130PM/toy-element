import { computed } from "vue";

const defaultIdInjection = {
  prefix: Math.floor(Math.random() * 10000),
  current: 0,
};

export function useId(namespace = "er") {
  const idRef = computed(
    () =>
      `${namespace}-id-${defaultIdInjection.prefix}-${defaultIdInjection.current++}`
  );
  return idRef;
}

export default useId;
