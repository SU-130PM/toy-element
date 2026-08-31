/** @jsxImportSource vue */
import { describe, test, expect, vi, afterEach } from "vitest";
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

// 竞态场景:close 后 500ms 内再 show,实例不应被销毁
describe("Loading service - race condition", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  test("should not destroy when show() is called after close() before timer fires", () => {
    vi.useFakeTimers();

    const instance = Loading({ text: "race condition", duration: 0 });
    expect(instance.visible.value).toBe(true);

    // close() 启动 500ms 的 destroy 定时器,遮罩开始淡出
    instance.close();
    expect(instance.visible.value).toBe(false);

    // 在定时器触发前(500ms 内)再次 show()
    // show() 应重置 afterLeaveFlag 并清除 destroy 定时器
    instance.show();
    expect(instance.visible.value).toBe(true);

    // 推进时间超过 500ms,如果定时器没被清除,这里会触发 destroy
    vi.advanceTimersByTime(600);

    // 实例未被销毁:show() 仍能恢复显示
    instance.show();
    expect(instance.visible.value).toBe(true);

    // 再次 close,这次让它真正销毁
    instance.close();
    vi.advanceTimersByTime(600);

    // destroy 已执行,show() 被拦截,visible 不再变 true
    instance.show();
    expect(instance.visible.value).toBe(false);
  });
});
