import { defineFeature, loadFeature } from "jest-cucumber";
import { reactive, isProxy, isReactive } from "vue";

import {
    NodeShape,
    findChildByClass,
    findChildByPropNames,
    findChildByType,
} from "../../test-helpers";

const feature = loadFeature("src/__tests__/components/example/example.feature");

import { Example, PropsShape } from "../../../components/example";

type TopicShape = PropsShape["topic"];

defineFeature(feature, (test) => {
    let node: NodeShape;
    let props: PropsShape;
    let topic: TopicShape | undefined;

    const makeTopic = (): TopicShape => {
        const id = Math.floor(Math.random() * 1000);

        return {
            id,
            name: `Topic ${id}`,
        };
    };

    const makeProps = (topic: TopicShape) => ({ topic });

    const getNode = (props: PropsShape): NodeShape =>
        (node = Example({ ...props }) as NodeShape);

    beforeEach(() => {});

    test("No Topic", ({ given, when, then, and }) => {
        given("No topic", () => {
            topic = undefined;
            props = makeProps(topic);
        });

        when("Element created", () => {
            node = getNode(props);
        });

        then("topic should be undefined", () => {
            const actualProps = node.props as PropsShape;
            const actualTopic = actualProps?.topic;
            expect(actualTopic).toBeUndefined();
        });

        and('it should render text "Please select a topic"', () => {
            let text;
            const expected = "Please select a topic";
            expect(node).not.toBeNull();

            if (node?.type) {
                const textNode = findChildByType(node, "text");
                text = textNode?.children;
            }

            expect(text).toBe(expected);
        });
    });

    test("No Topic (reactive)", ({ given, when, then, and }) => {
        given("No Topic (reactive)", () => {
            topic = reactive(Object(undefined));
            props = makeProps(topic);
        });

        when("Element created", () => {
            node = getNode(props);
        });

        then("topic should be undefined", () => {
            const actualProps = node.props as PropsShape;
            const actualTopic = actualProps?.topic;
            expect(actualTopic).toBeUndefined();
        });

        and('it should render text "Please select a topic"', () => {
            let text;
            const expected = "Please select a topic";
            expect(node).not.toBeNull();

            if (node?.type) {
                const textNode = findChildByType(node, "text");
                text = textNode?.children;
            }

            expect(text).toBe(expected);
        });
    });

    test("Topic name and id should be used", ({ given, when, then, and }) => {
        given("A topic", () => {
            topic = { id: 1, name: "topic 1" };
            props = makeProps(topic);
        });

        when("Element created", () => {
            node = getNode(props);
        });

        then("the topic name should used", () => {
            const expectedName = props.topic?.name;
            const h3 = findChildByType(node, "h3");
            const text = (h3?.children as string[])[0];
            expect(text).toContain(expectedName);
        });

        and("the id should be used", () => {            
            // eslint-disable-next-line no-debugger
            debugger;
            const expectedId = props.topic?.id;
            const actualId = node?.props?.["data-topicId"]
            expect(actualId).toBe(expectedId);
        });
    });
});
