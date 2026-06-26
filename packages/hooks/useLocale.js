import { inject, computed } from "vue";

const i18nSymbol = Symbol("i18n");

// Simplified locale hook - returns a minimal i18n-like object
export function useLocale(localeOverrides) {
  if (localeOverrides) {
    return {
      t: (path) => {
        // Simple dot-notation path resolver
        const keys = path.split(".");
        let result = localeOverrides.value?.el;
        for (const key of keys) {
          if (result) result = result[key];
        }
        return result || path;
      },
    };
  }

  const i18n = inject(i18nSymbol, {
    t: (path) => path,
  });

  return {
    t: i18n.t,
  };
}

export default useLocale;
export { i18nSymbol };
