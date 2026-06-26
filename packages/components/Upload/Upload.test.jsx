/** @jsxImportSource vue */
import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";

import Upload from "./Upload.vue";

describe("Upload.vue", () => {
  it("should render default slot", () => {
    const wrapper = mount(Upload, {
      props: { action: "/upload" },
    });
    expect(wrapper.find(".er-upload").exists()).toBeTruthy();
  });

  it("should render custom slot", () => {
    const wrapper = mount(Upload, {
      props: { action: "/upload" },
      slots: { default: "自定义上传" },
    });
    expect(wrapper.text()).toContain("自定义上传");
  });

  it("should accept action prop", () => {
    const wrapper = mount(Upload, {
      props: { action: "https://example.com/upload" },
    });
    expect(wrapper.props("action")).toBe("https://example.com/upload");
  });
});
