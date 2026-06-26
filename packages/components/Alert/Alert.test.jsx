/** @jsxImportSource vue */
import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";

import Alert from "./Alert.vue";

describe("Alert.vue", () => {
  it("should render the alert with default props", () => {
    const wrapper = mount(Alert, {
      props: { title: "test title" },
      slots: { default: "desc" },
      global: { stubs: ["ErIcon"] },
    });
    expect(wrapper.text()).toContain("test title");
    expect(wrapper.text()).toContain("desc");
  });

  it.each([
    ["info", "circle-info"],
    ["success", "check-circle"],
    ["warning", "circle-exclamation"],
    ["danger", "circle-xmark"],
  ])("should has the correct icon when props type is %s", (type, iconName) => {
    const wrapper = mount(Alert, {
      props: { title: "test", type, showIcon: true },
      global: { stubs: ["ErIcon"] },
    });
    const icon = wrapper.findComponent({ name: "ErIcon" });
    expect(icon.exists()).toBeTruthy();
  });

  it("should emit close event when close icon is clicked", async () => {
    const wrapper = mount(Alert, {
      props: { title: "test", closable: true },
      global: { stubs: ["ErIcon"] },
    });
    await wrapper.find(".er-alert__close").trigger("click");
    expect(wrapper.emitted("close")).toBeTruthy();
  });

  it("should allow custom content via slots", () => {
    const wrapper = mount(Alert, {
      props: { title: "test title" },
      slots: { default: "custom desc", title: "slot title" },
      global: { stubs: ["ErIcon"] },
    });
    expect(wrapper.text()).toContain("slot title");
    expect(wrapper.text()).not.toContain("test title");
  });

  it("should support centering text", () => {
    const wrapper = mount(Alert, {
      props: { title: "test", center: true },
      global: { stubs: ["ErIcon"] },
    });
    expect(wrapper.find(".er-alert").classes()).toContain("text-center");
  });

  it("should not render close icon when closable is false", () => {
    const wrapper = mount(Alert, {
      props: { title: "test", closable: false },
      global: { stubs: ["ErIcon"] },
    });
    expect(wrapper.find(".er-alert__close").exists()).toBeFalsy();
  });

  it("should toggle visibility when open and close methods are called", async () => {
    const wrapper = mount(Alert, {
      props: { title: "test" },
      global: { stubs: ["ErIcon"] },
    });
    expect(wrapper.find(".er-alert").isVisible()).toBeTruthy();
    wrapper.vm.close();
    await wrapper.vm.$nextTick();
    wrapper.vm.open();
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".er-alert").isVisible()).toBeTruthy();
  });
});
