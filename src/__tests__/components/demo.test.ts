import { Demo, selectedTopic } from "../../components/demo";

import {
    NodeShape,
    findChildByClass,
    findChildByPropNames,
    findChildByType,
} from "../test-helpers";

//@ts-ignore
import demoStyle from "../../components/demo/style.scss";

describe("Demo", () => {
    let node: NodeShape;

    const findTopicsNode = () => {
        const parentNode = findChildByClass(node, "demo-topics");
        if (!parentNode) {
            return;
        }

        return findChildByPropNames(parentNode, [
            "topics",
            "topicChangeHandler",
        ]);
    };

    const findExampleNode = () => {
        const parentNode = findChildByClass(node, "demo-main");
        if (!parentNode) {
            return;
        }

        return findChildByPropNames(parentNode, ["topic"]);
    };

    beforeEach(() => {
        node = Demo() as NodeShape;
    });

    it("should use styles", () => {
        const style = findChildByType(node, "style");
        expect(style).not.toBeNull();

        const styleContent = style!.children as NodeShape[];
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

        expect(actual.value).toEqual(expected);
    });
});
