import { Topics, TopicsShape } from "../../components/topics";
import { TopicShape } from "../../components/topic";

import { NodeShape, findChildByType } from "../test-helpers";

describe(Topics, () => {
    let node: NodeShape;
    let topics: TopicsShape["topics"] = [];
    const mockTopicChangeHandler = jest.fn((topic: TopicShape) => {});

    beforeEach(() => {
        [1, 2, 3].forEach((id) => {
            topics?.push({ id, name: `Topic ${id}` });
        });

        node = Topics({
            topics,
            topicChangeHandler: mockTopicChangeHandler,
        }) as NodeShape;
    });

    it("should have h2", () => {
        const actual = findChildByType(node, "h2");
        expect(actual).not.toBeNull();
        const textNode = findChildByType(actual!, "text");
        const text = textNode?.children;
        expect(text).toBe("Topics");
    });

    it("should render each topic", () => {
        const ul = findChildByType(node, "ul");

        const children: any[] =
            ul && Array.isArray(ul?.children) ? ul.children.flat() : [];

        expect(children).toHaveLength(topics!.length);

        // collection assertions are a bit weird
        // see https://jestjs.io/docs/en/expect#expectarraycontainingarray
        expect(
            children.map((c) => {
                const { clickHandler, ...topic }: { [name: string]: any } = {
                    ...c.props,
                };

                expect(clickHandler).toBe(mockTopicChangeHandler);

                return topic;
            })
        ).toEqual(expect.arrayContaining(topics as []));
    });
});
