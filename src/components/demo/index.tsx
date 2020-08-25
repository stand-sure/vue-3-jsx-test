// @ts-ignore
import style from "./style.scss";

import { Topics, TopicsShape } from "../topics";
import { TopicShape } from "../topic";
import { Example, PropsShape as ExampleShape } from "../example";
import { ref } from "vue";

const fakeTopics: TopicsShape["topics"] = [
  { id: 1, name: "Topic 1" },
  { id: 2, name: "Topic 2" }
];

const selectedTopic = ref<TopicShape>({
  id: -1,
  name: "Please choose..."
});

const topicChangeHandler = (t: TopicShape) => {
  selectedTopic.value = { ...t };
  return selectedTopic.value;
};

/**
 * @displayName Demo
 */
const demo = () => (
  <div class="demo">
    <style>{style}</style>
    <header class="demo-header">Vue 3 + JSX + Jest</header>
    <div class="demo-topics">
      <Topics topics={fakeTopics} topicChangeHandler={topicChangeHandler} />
    </div>
    <main class="demo-main">
      <Example topic={selectedTopic.value} />
    </main>
    <div class="demo-files">See files to go here</div>
    <footer class="demo-footer">Footer</footer>
  </div>
);

export { demo as Demo, selectedTopic };
