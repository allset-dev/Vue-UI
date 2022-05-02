import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Home from "@/views/home/index.vue";
const Chat = () => import("@/views/chat/index.vue");

declare module "vue-router" {
  interface RouteMeta {
    asynCheckAuth?: boolean;
  }
}

/**
 * Stanlone routes doesn't needs user to be logged in. Still it will check user login in background. So when user routes to route that requires user data we won't fetch then.
 */
const standaloneRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
].map((route: RouteRecordRaw) => {
  return {
    ...route,
    meta: { ...route.meta, asynCheckAuth: true },
  };
});

/**
 * Routes that only can be accessed by logged in users.
 */
const loggedInRoutes: Array<RouteRecordRaw> = [
  {
    path: "/chat",
    name: "chat",
    component: Chat,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [...standaloneRoutes, ...loggedInRoutes],
});

export default router;
