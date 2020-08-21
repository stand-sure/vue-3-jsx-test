import { h as createElement } from "vue";

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
});
