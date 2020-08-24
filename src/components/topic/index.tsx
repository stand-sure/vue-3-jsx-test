export type TopicShape = {
  id: number;
  name: string;
};

/**
 *
 * @displayName Topic
 */
const Topic = ({ id, name }: TopicShape) => <li key={id}>{name}</li>;

export { Topic };
