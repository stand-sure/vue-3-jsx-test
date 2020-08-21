import { h as createElement } from "vue";
import { shallowMount } from "@vue/test-utils";

import { App } from "../App";

jest.mock("../components/HelloWorld");

//@ts-ignore
import logo from "../assets/logo.png";

describe("App", () => {
  it("should use logo", () => {
    const node = createElement(App());
    const actual = (node.children as any[]).find(c => c.type === "img").props
      .src;
    expect(actual).toBe(logo);
  });

  it("should use logo v2", () => {
    const wrapper = shallowMount(App(), {
        global: {
            stubs: {
                HelloWorld: true
            }
        }
    });

    const actual = (wrapper.vm as any).querySelector("img").getAttribute("src");
    expect(actual).toBe(logo);
  });
});
