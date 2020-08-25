import { VNode, RendererNode, RendererElement } from "vue";
import { Demo } from "../../components/demo";

type Node = JSX.Element & VNode<RendererNode, RendererElement>;

//@ts-ignore
import demoStyle from "../../components/demo/style.scss";

describe("Demo", () => {
  let node: Node;
  beforeEach(() => {
    node = Demo() as Node;
  });

  it("should use styles", () => {
    const style = (node.children as Node[]).find(c => c.type === "style");
    expect(style).not.toBeNull();

    const styleContent = style!.children as Node[];
    const actual = styleContent![0];

    expect(actual).toBe(demoStyle);
  });

  it("should use Topics", () => {});
});
