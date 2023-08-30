import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  // {
  //   path: "/",
  //   redirect: "/wholeIndex",
  // },
  {
    path: "/baseIndex",
    component: () => import("@/pages/pc/jcb/index.vue"),
    meta: {
      type: "base",
      title: "首页",
    },
    children: [],
  },
  {
    path: "/comIndex",
    component: () => import("@/pages/pc/tyb/index.vue"),
    meta: {
      type: "com",
      title: "首页",
    },
    children: [],
  },
  {
    path: "/wholeIndex",
    component: () => import("@/pages/pc/wzb/index.vue"),
    meta: {
      type: "whole",
      title: "首页",
    },
    children: [],
  },
  {
    path: "/mobile",
    component: () => import("@/pages/mobile/index.vue"),
    meta: {
      title: "首页",
    },
    children: [],
  },
    {
    path: "/login",
    component: () => import("@/pages/pc/login/index.vue"),
    meta: {
      type: "login",
      title: "登录",
    },
    children: [],
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
