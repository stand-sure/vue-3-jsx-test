import { VNode, RendererNode, RendererElement } from "vue";
import { App } from "../App";

type Node = JSX.Element & VNode<RendererNode, RendererElement>;

//@ts-ignore
import logo from "../assets/logo.png";

describe("App", () => {
  it("should use logo", () => {
    const node = App() as Node;
    const actual = (node.children as Node[]).find(c => c.type === "img").props
      .src;
    expect(actual).toBe(logo);
  });
});
