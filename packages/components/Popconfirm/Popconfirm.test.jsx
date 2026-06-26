/** @jsxImportSource vue */
import { describe, it, expect, vi } from "vitest";
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

    const wrapper = mount(Popconfirm, {
      props: { title: "title", hideIcon: true, onConfirm, onCancel },
      slots: { default: "trigger" },
    });

    expect(wrapper.text()).toContain("trigger");
  });
});
