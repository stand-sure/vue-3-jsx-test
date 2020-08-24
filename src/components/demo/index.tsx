// @ts-ignore
import style from "./style.css";

import { Topics } from "../topics";

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
        <Topics />
      </div>
      <main class="demo-main">Main content to go here</main>
      <div class="demo-right-sidebar">See files to go here</div>
      <footer class="demo-footer">Footer</footer>
    </div>
  );
};

export { demo as Demo };
