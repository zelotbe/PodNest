<script>
import { mapGetters } from "vuex";
import {
  handleIncomingRedirect,
  getDefaultSession,
} from "@inrupt/solid-client-authn-browser";

export default {
  computed: {
    ...mapGetters({
      loggedIn: "auth/loggedIn",
      name: "pod/name",
    }),
  },
  methods: {
    setUser(bool, webID) {
      this.$store.dispatch("auth/setLoggedIn", bool);
      this.$store.dispatch("auth/setWebID", webID);
    },
    async getLocalStorage() {
      const session = getDefaultSession();
      if (session.info.isLoggedIn) {
        if (
          !localStorage.getItem("isLoggedIn") &&
          !localStorage.getItem("webID")
        ) {
          localStorage.setItem("isLoggedIn", JSON.stringify(true));
          localStorage.setItem("webID", JSON.stringify(session.info.webId));

          this.setUser(
            JSON.parse(localStorage.getItem("isLoggedIn")),
            JSON.parse(localStorage.getItem("webID"))
          );
        }
      } else if (
        localStorage.getItem("isLoggedIn") &&
        localStorage.getItem("webID")
      ) {
        this.setUser(
          JSON.parse(localStorage.getItem("isLoggedIn")),
          JSON.parse(localStorage.getItem("webID"))
        );
      }
    },
    logoutUser() {
      this.$store.dispatch("auth/logoutUser");
    },
  },
  async mounted() {
    async function handleRedirectAfterLogin() {
      await handleIncomingRedirect();
      //await handleIncomingRedirect({ restorePreviousSession: true });
    }
    console.log("handling....");
    await handleRedirectAfterLogin();
    console.log("getting localstorage");
    await this.getLocalStorage();
    this.$router.push("/dashboard");
  },
};
</script>

<template>
  <header>
    <div class="flex">
      <h1 class="text-5xl font-mono">
        PodNest <span v-if="name !== ''">- {{ name }}</span>
      </h1>
      <div class="flex-auto w-64"></div>
      <nav class="flex sm:justify-center">
        <button
          v-show="loggedIn"
          @click="logoutUser"
          class="rounded px-3 py-2 text-slate-700 font-medium bg-rose-700 text-neutral-50 hover:text-slate-900 hover:text-black hover:bg-transparent hover:underline hover:decoration-rose-700"
        >
          Logout
        </button>
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
