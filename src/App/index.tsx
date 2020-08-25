// @ts-ignore
import logo from "../assets/logo.png";
import { Demo } from "../components/demo";

/**
 * @displayName Home
 */
const App = () => {
  return (
    <div class="container mx-auto">
      <img alt="Vue logo" src={logo} class="mx-auto" />
      <Demo />
    </div>
  );
};

export { App };
