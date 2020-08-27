
import { Topic, TopicShape, PropsShape } from "../../components/topic";

import { NodeShape } from "../test-helpers";

describe(Topic, () => {
    let topic: TopicShape;
    let props: PropsShape;
    let node: NodeShape;
    const mockClickHandler = jest.fn((topic: TopicShape) => {});

    beforeEach(() => {
        const id = Math.floor(Math.random() * 100);
        topic = {
            id,
            name: `Topic ${id}`,
        };

        props = { ...topic, clickHandler: mockClickHandler };

        node = Topic(props) as NodeShape;
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
        const actual = (node.children as NodeShape[])?.[0];
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
