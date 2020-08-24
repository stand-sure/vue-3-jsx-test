export type TopicShape = {
  id: number;
  name: string;
};

const onClick = (ev : MouseEvent) => {
  ev.preventDefault();
}

/**
 *
 * @displayName Topic
 */
const Topic = ({ id, name }: TopicShape) => <li key={id} onClick={onClick}>{name}</li>;

export { Topic };
