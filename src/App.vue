<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      loggedIn: "auth/loggedIn",
    }),
  },
};
</script>

<template>
  <header>
    <div class="flex">
      <h1 class="text-5xl font-mono">PodNest</h1>
      <div class="flex-auto w-64"></div>
      <nav class="flex sm:justify-center">
        <RouterLink
          class="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
          to="/"
          v-show="loggedIn"
          >Logout</RouterLink
        >
      </nav>
      <div class="flex w-10"></div>
    </div>
  </header>

  <RouterView />
</template>

<style>
nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
