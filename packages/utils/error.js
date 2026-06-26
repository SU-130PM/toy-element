import { isString } from "lodash-es";

class ErUIError extends Error {
  constructor(message) {
    super(message);
    this.name = "ErUIError";
  }
}

export function throwError(scope, msg) {
  throw new ErUIError(`[${scope}] ${msg}`);
}

export function debugWarn(scope, msg) {
  if (process.env.NODE_ENV !== "production") {
    const err = isString(scope) ? new ErUIError(`[${scope}] ${msg}`) : scope;
    console.warn(err);
  }
}
