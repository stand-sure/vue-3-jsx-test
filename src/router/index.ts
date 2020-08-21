import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { App } from "../App";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: App
  },
  {
    path: "/hello-world",
    name: "HelloWorld",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "hello-world" */ "../components/HelloWorld")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
