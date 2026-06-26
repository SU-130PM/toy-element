/** @jsxImportSource vue */
import { describe, test, expect } from "vitest";
import { nextTick } from "vue";
import { notification, closeAll } from "./methods";

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

function getTopValue(element) {
  const styles = window.getComputedStyle(element);
  return Number.parseFloat(styles.getPropertyValue("top"));
}

describe("createNotification", () => {
  test("调用方法应该创建对应的 Notification 组件", async () => {
    const handler = notification({ title: "test", message: "hello", duration: 0 });
    await rAF();
    expect(document.querySelector(".er-notification")).toBeTruthy();
    handler.close();
    await rAF();
    expect(document.querySelector(".er-notification")).toBeFalsy();
  });

  test("多次调用应该创建多个实例", async () => {
    notification({ title: "t1", message: "msg1", duration: 0 });
    notification({ title: "t2", message: "msg2", duration: 0 });
    await rAF();
    expect(document.querySelectorAll(".er-notification").length).toBe(2);
    closeAll();
    await rAF();
    expect(document.querySelectorAll(".er-notification").length).toBe(0);
  });

  test("创建多个实例应该设置正确的 offset", async () => {
    notification({ title: "t1", message: "m1", duration: 0, offset: 100 });
    notification({ title: "t2", message: "m2", duration: 0, offset: 50 });
    await rAF();
    const elements = document.querySelectorAll(".er-notification");
    expect(elements.length).toBe(2);
    expect(getTopValue(elements[0])).toBe(100);
    expect(getTopValue(elements[1])).toBe(150);
  });
});
