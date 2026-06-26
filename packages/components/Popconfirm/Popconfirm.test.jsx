/** @jsxImportSource vue */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { each, get } from "lodash-es";

import Popconfirm from "./Popconfirm.vue";

const props = {
  title: "test title",
  confirmButtonText: "确定",
  cancelButtonText: "取消",
  confirmButtonType: "primary",
  cancelButtonType: "default",
  icon: "question-circle",
  iconColor: "#f90",
  hideIcon: false,
  hideAfter: 200,
  width: 150,
};

describe("Popconfirm.vue", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  it("should accept all props", () => {
    const wrapper = mount(Popconfirm, { props });
    each(props, (value, key) => {
      expect(get(wrapper.props(), key)).toBe(value);
    });
  });

  it("should renders slot content correctly", () => {
    const wrapper = mount(Popconfirm, {
      props: { title: "title" },
      slots: { default: "Slot Content" },
    });
    expect(wrapper.text()).toContain("Slot Content");
  });

  it("popconfirm emits", async () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();

    const wrapper = mount({
      setup() {
        return () => (
          <div>
            <div id="outside"></div>
            <Popconfirm
              title="title"
              hideIcon={true}
              onConfirm={onConfirm}
              onCancel={onCancel}
            >
              <button id="trigger">trigger</button>
            </Popconfirm>
          </div>
        );
      },
    });

    // 点击触发按钮打开 popconfirm
    await wrapper.find("#trigger").trigger("click");
    vi.runAllTimers();
    expect(document.querySelector(".er-popconfirm")).toBeTruthy();

    // 点击确认
    await document.querySelector(".er-popconfirm__confirm").click();
    vi.runAllTimers();
    expect(onConfirm).toHaveBeenCalled();

    // 重新打开并点击取消
    await wrapper.find("#trigger").trigger("click");
    vi.runAllTimers();
    await document.querySelector(".er-popconfirm__cancel").click();
    vi.runAllTimers();
    expect(onCancel).toHaveBeenCalled();
  });
});
