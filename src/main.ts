import { createApp } from "vue";
import { App } from "./App";
import { router } from "./router";
import "./assets/tailwind.css";

createApp(App)
  .use(router)
  .mount("#app");
