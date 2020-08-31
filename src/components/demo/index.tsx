// @ts-ignore
import style from "./style.scss";

import { Topics, TopicsShape } from "../topics";
import { Example } from "../example";

import { useState } from "../../helpers";

const fakeTopics: TopicsShape["topics"] = [
  { id: 1, name: "Topic 1" },
  { id: 2, name: "Topic 2" }
];

const [selectedTopic, setSelectedTopic] = useState(Object(null));

/**
 * @displayName Demo
 */
const demo = () => (
  <div class="demo">
    <style>{style}</style>
    <header class="demo-header">Vue 3 + JSX + Jest</header>
    <div class="demo-topics">
      <Topics topics={fakeTopics} topicChangeHandler={setSelectedTopic} />
    </div>
    <main class="demo-main">
      <Example topic={selectedTopic} />
    </main>
    <div class="demo-files">See files to go here</div>
    <footer class="demo-footer">Footer</footer>
  </div>
);

export { demo as Demo, selectedTopic };
