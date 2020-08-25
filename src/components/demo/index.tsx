// @ts-ignore
import style from "./style.scss";

import { Topics, TopicsShape } from "../topics";
import { TopicShape } from "../topic";

const fakeTopics: TopicsShape["topics"] = [
  { id: 1, name: "Topic 1" },
  { id: 2, name: "Topic 2" }
];

/**
 * @displayName Demo
 */
const demo = () => (
  <div class="demo">
    <style>{style}</style>
    <header class="demo-header">Vue 3 + JSX + Jest</header>
    <div class="demo-topics">
      <Topics
        topics={fakeTopics}
        topicChangeHandler={(topic: TopicShape) => {
          /* TODO */
        }}
      />
    </div>
    <main class="demo-main">Main content to go here</main>
    <div class="demo-files">See files to go here</div>
    <footer class="demo-footer">Footer</footer>
  </div>
);

export { demo as Demo };
