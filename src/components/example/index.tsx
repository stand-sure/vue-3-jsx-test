import { TopicShape } from "../topic";

export type PropsShape = {
  topic?: TopicShape;
};

const Example = ({ topic }: PropsShape = {}) => <>{JSON.stringify(topic)}</>;

export { Example };
