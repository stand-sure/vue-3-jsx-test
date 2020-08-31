import { isReactive, toRaw } from "vue";
import { TopicShape } from "../topic";

export type PropsShape = {
    topic?: TopicShape;
};

const Example = ({ topic }: PropsShape = {}) => {
    // eslint-disable-next-line
    // debugger;
    // topic = isReactive(topic) ? toRaw(topic) : topic;
    if (!topic?.id) {
        return <div>Please select a topic</div>;
    }

    return (
        <div data-topicId={topic.id}>
            <h3>{topic.name}</h3>
        </div>
    );
};

export { Example };
