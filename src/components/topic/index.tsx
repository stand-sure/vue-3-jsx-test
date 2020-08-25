export type TopicShape = {
  id: number;
  name: string;
};

export type PropsShape = TopicShape & {
  clickHandler: (topic: TopicShape) => void;
};

/**
 *
 * @displayName Topic
 */
const Topic = ({ id, name, clickHandler }: PropsShape) => (
  <li key={id} onClick={() => clickHandler({ id, name })} class="demo-topics-list-item">
    {name}
  </li>
);

export { Topic };
