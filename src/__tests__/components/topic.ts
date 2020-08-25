import { VNode, RendererNode, RendererElement } from "vue";

import { Topic, TopicShape, PropsShape } from "../../components/topic";

type Node = JSX.Element & VNode<RendererNode, RendererElement>;

describe(Topic, () => {
  let topic: TopicShape;
  let props: PropsShape;
  let node: JSX.Element & VNode<RendererNode, RendererElement>;
  const mockClickHandler = jest.fn((topic: TopicShape) => {});

  beforeEach(() => {
    const id = Math.floor(Math.random() * 100);
    topic = {
      id,
      name: `Topic ${id}`
    };

    props = { ...topic, clickHandler: mockClickHandler };

    node = Topic(props) as Node;
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

  it("should call clickHandler when clicked", () => {
    const actual = node.props?.onClick;
    expect(actual).not.toBeNull();

    // the following is sometimes needed -- it "resets" state between calls
    // mockClickHandler.mockClear();
    actual();
    expect(mockClickHandler).toBeCalled();
  });
});
