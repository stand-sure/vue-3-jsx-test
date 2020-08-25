import { VNode, RendererNode, RendererElement } from "vue";
import { Topics, TopicsShape } from "../../components/topics";

type Node = JSX.Element & VNode<RendererNode, RendererElement>;

describe(Topics, () => {
  let node: Node;
  let topics: TopicsShape["topics"] = [];
  beforeEach(() => {
    [1, 2, 3].forEach(id => {
      topics?.push({ id, name: `Topic ${id}` });
    });

    node = Topics({ topics }) as Node;
  });

  it("should have h2", () => {
    const actual = (node.children as Node[]).find(child => child.type === "h2");
    expect(actual).not.toBeNull();

    const textNode = (actual?.children as Node[])[0] as Node;
    const text = textNode.children;
    expect(text).toBe("Topics");
  });

  it("should render each topic", () => {
    const ul = (node.children as Node[]).find(
      child => child.type === "ul"
    ) as Node;

    const children = ((ul.children as any) as Array<Node>).flat();
    expect(children).toHaveLength(topics!.length);

    // collection assertions are a bit weird
    // see https://jestjs.io/docs/en/expect#expectarraycontainingarray
    expect(children.map(c => c.props)).toEqual(
      expect.arrayContaining(topics as [])
    );
  });
});

// sometimes, I really dislike TypeScript [most of the time]
// setting the lib to include ES2020 really should have picked this up :/
interface Array<T> {
  flat(): T[];
  flatMap(func: (x: T) => T): T[];
}
