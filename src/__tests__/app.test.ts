import { VNode, RendererNode, RendererElement } from "vue";
import { App } from "../App";

type Node = JSX.Element & VNode<RendererNode, RendererElement>;

//@ts-ignore
import logo from "../assets/logo.png";

describe("App", () => {
  it("should use logo", () => {
    const node = App() as Node;
    const children = node?.children as Node[];
    const img = children?.find(c => c.type === "img");
    const actual = img?.props?.src;
    expect(actual).toBe(logo);
  });

  it("should use Demo", ()=> {
    const node = App() as Node;
    const children = node?.children as Node[];
    const demo = children?.find(c => c.type === "Demo");
    expect(demo).not.toBeNull();
  })
});
