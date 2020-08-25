import { VNode, RendererNode, RendererElement } from "vue";

import { Topic, TopicShape } from "../../components/topic";

type Node = JSX.Element & VNode<RendererNode, RendererElement>;

describe(Topic, () => {
  let topic: TopicShape;
  let node: JSX.Element & VNode<RendererNode, RendererElement>;

  beforeEach(() => {
    const id = Math.floor(Math.random() * 100);
    topic = {
      id,
      name: `Topic ${id}`
    };

    node = Topic(topic) as Node;
  });

  it("should render <li>", () => {
    const actual = node.type;
    expect(actual).toBe("li");
  });

  it("should set key", () => {
    const actual = node.key;
    expect(actual).toBe(topic.id);
  });

  it("should use name", () => {
    const actual = (node.children as Node[])?.[0];
    expect(actual).toBe(topic.name);
  });
});
