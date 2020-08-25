// @ts-ignore
import style from "./style.css";

import { Topics, TopicsShape } from "../topics";

const fakeTopics: TopicsShape["topics"] = [
  { id: 1, name: "Topic 1" },
  { id: 2, name: "Topic 2" }
];

/**
 * @displayName Demo
 */
const demo = () => {
  return (
    <div class="demo-parent">
      <style>{style}</style>
      <div class="demo-header">
        <h1>Vue 3 + JSX + Jest</h1>
      </div>
      <div class="demo-left-sidebar">
        <Topics topics={fakeTopics} />
      </div>
      <main class="demo-main">Main content to go here</main>
      <div class="demo-right-sidebar">See files to go here</div>
      <footer class="demo-footer">Footer</footer>
    </div>
  );
};

export { demo as Demo };
