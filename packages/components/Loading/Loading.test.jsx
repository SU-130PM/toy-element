/** @jsxImportSource vue */
import { describe, test, expect } from "vitest";
import { nextTick } from "vue";

import { Loading } from "./service";

const rAF = async () => {
  return new Promise((res) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        res(null);
        await nextTick();
      });
    });
  });
};

describe("Loading service", () => {
  test("should create loading instance", async () => {
    const instance = Loading({ text: "加载中..." });
    expect(instance).toBeTruthy();
    expect(instance.$el).toBeTruthy();
    instance.close();
  });

  test("should close loading instance", async () => {
    const instance = Loading({ text: "加载中...", duration: 0 });
    instance.close();
    await rAF();
    // 关闭后应移除 DOM
  });
});
