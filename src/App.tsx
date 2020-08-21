import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld";
// @ts-ignore
import logo from "./assets/logo.png";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld
  },
  render() {
    return (
      <div id="app">
        <img alt="Vue logo" src={logo} />
        <HelloWorld msg={"Welcome to Your Vue.js & TypeScript App using JSX!"} />
      </div>
    );
  }
});
