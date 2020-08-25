import { VNode, RendererNode, RendererElement } from "vue";
import { Example, PropsShape } from "../../components/example";

type Node = JSX.Element & VNode<RendererNode, RendererElement>;

describe(Example, () => {
  let node: Node;
  let props: PropsShape;

  beforeEach(() => {
    const id = Math.floor(Math.random() * 1000);
    props = {
      topic: {
        id,
        name: `Topic ${id}`
      }
    };

    node = Example({ ...props }) as Node;
  });
  
  it("should have tests", () => {});
});
