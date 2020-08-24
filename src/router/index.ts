import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { App } from "../App";
import { Demo } from "../components/demo"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: App
  },
  {
    path: "/demo",
    name: "Demo",
    component: Demo
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export { router };
