import HelloWorld from "../components/HelloWorld";
// @ts-ignore
import logo from "../assets/logo.png";

const App = () => (
  <div id="app">
    <img alt="Vue logo" src={logo} />
    <HelloWorld
      msg={"Welcome to Your FUNCTIONAL Vue.js & TypeScript App using JSX!"}
    />
  </div>
);

export { App };
