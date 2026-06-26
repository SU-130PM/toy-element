/** @jsxImportSource vue */
import { describe, test, expect } from "vitest";
import { nextTick } from "vue";
import msgbox from "./methods";

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

describe("MessageBox", () => {
  test("alert should create and close", async () => {
    msgbox.alert("这是一条消息", "提示", { confirmButtonText: "确定" });
    await rAF();
    expect(document.querySelector(".er-message-box")).toBeTruthy();
    document.querySelector(".er-message-box__confirm-btn").click();
    await rAF();
  });

  test("confirm should work", async () => {
    msgbox.confirm("确认删除?", "提示", { confirmButtonText: "确定", cancelButtonText: "取消" });
    await rAF();
    expect(document.querySelector(".er-message-box")).toBeTruthy();
    document.querySelector(".er-message-box__cancel-btn").click();
    await rAF();
  });
});
