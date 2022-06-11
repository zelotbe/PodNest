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
      meta: { hiddenAfterAuth: true, title: "PodNest" },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
      meta: { requiresAuth: true, title: "Dashboard" },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth && !store.getters["auth/loggedIn"]) {
    next({ path: "/" });
    return;
  }

  if (to.meta.hiddenAfterAuth && store.getters["auth/loggedIn"]) {
    next({ path: "/dashboard" });
    return;
  }
  next();
});

router.afterEach((to) => {
  document.title = to.meta.title;
});

export default router;
