/* eslint-disable no-debugger */
import { VNode, RendererNode, RendererElement } from "vue";
import { Demo, selectedTopic } from "../../components/demo";

type Node = JSX.Element & VNode<RendererNode, RendererElement>;

//@ts-ignore
import demoStyle from "../../components/demo/style.scss";

describe("Demo", () => {
  let node: Node;

  const findTopicsNode = () => {
    const children = node.children as Array<Node>;
    const parentNode = children.find(
      el => (el.props as { class?: string })?.class === "demo-topics"
    );

    // match on props shape
    const topicsNode = (parentNode?.children as Node[]).find(
      n => n.props?.topics && n.props?.topicChangeHandler
    );

    return topicsNode;
  };

  const findExampleNode = () => {
    const children = node.children as Array<Node>;
    const parentNode = children.find(
      el => (el.props as { class?: string })?.class === "demo-main"
    );
    const exampleNode = (parentNode?.children as Node[]).find(
      n => n.props?.topic
    );
    return exampleNode;
  };

  beforeEach(() => {
    node = Demo() as Node;
  });

  it("should use styles", () => {
    const style = (node.children as Node[]).find(c => c.type === "style");
    expect(style).not.toBeNull();

    const styleContent = style!.children as Node[];
    const actual = styleContent![0];

    // Object.is comparison
    expect(actual).toBe(demoStyle);
  });

  it("should use Topics", () => {
    const actual = findTopicsNode();
    // anything matches anything except null or undefined
    expect(actual).toEqual(expect.anything());
  });

  it("should use Example", () => {
    const actual = findExampleNode();

    // shallow == test
    // use toStrictEqual is deep equality
    expect(actual).toEqual(expect.anything());
  });

  it("should notify Example when Topics changes the topic", () => {
    const topicsNode = findTopicsNode();
    const props = topicsNode?.props;

    const topicChangeHandler = props?.topicChangeHandler as (t: {}) => {};

    const expected = { id: 123, name: "Ishmael" };

    topicChangeHandler(expected);

    const actual = selectedTopic;

    expect(actual).toEqual(expected);
  });
});
