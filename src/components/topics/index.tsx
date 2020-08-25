import { Topic, TopicShape } from "../topic";

export type TopicsShape = {
  topics?: TopicShape[];
};

type TopicChangeHandlerShape = (topic: TopicShape) => void;

type PropsShape = TopicsShape & {
  topicChangeHandler: TopicChangeHandlerShape;
};

const items = (
  topics: TopicShape[] = [],
  topicChangeHandler: TopicChangeHandlerShape
) =>
  topics.map(topic => {
    return <Topic {...topic} clickHandler={topicChangeHandler} />;
  });

/**
 * @displayName Topics
 */
const Topics = ({ topics, topicChangeHandler }: PropsShape) => {
  return (
    <>
      <h2>Topics</h2>
      <ul class="demo-topics-list">{items(topics, topicChangeHandler)}</ul>
    </>
  );
};

export { Topics };
