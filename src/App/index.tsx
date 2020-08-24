// @ts-ignore
import logo from "../assets/logo.png";
import { Demo } from "../components/demo";

/**
 * @displayName Home
 */
const App = () => {
  return (
    <div id="app">
      <img alt="Vue logo" src={logo} />
      <Demo />
    </div>
  );
};

export { App };
