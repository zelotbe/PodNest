import { createRouter, createWebHistory } from "vue-router";

import store from "../store";

import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: false, hiddenAfterAuth: true, title: "PodNest" },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
      meta: { requiresAuth: true, title: "Dashboard" },
    },
    {
      path: "/:pathMatch(.*)",
      redirect: "/",
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (
    to.meta.hiddenAfterAuth &&
    JSON.parse(localStorage.getItem("isLoggedIn"))
  ) {
    next({ path: "/dashboard" });
    return;
  }

  if (to.meta.requiresAuth && !JSON.parse(localStorage.getItem("isLoggedIn"))) {
    next({ path: "/" });
    return;
  }

  next();
});

router.afterEach((to) => {
  document.title = to.meta.title;
});

export default router;
