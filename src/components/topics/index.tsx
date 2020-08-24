import { Topic, TopicShape } from "../topic";

export type TopicsShape = {
  topics?: TopicShape[];
};

const items = (topics: TopicShape[] = []) =>
  topics.map(topic => {
    return <Topic {...topic} />;
  });

/**
 * @displayName Topics
 */
const Topics = ({ topics }: TopicsShape) => (
  <>
    <h2>Topics</h2>
    <ul>{items(topics)}</ul>
  </>
);

export { Topics };
