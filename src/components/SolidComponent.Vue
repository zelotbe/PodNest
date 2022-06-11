<script>
import {
  login,
  handleIncomingRedirect,
  getDefaultSession,
} from "@inrupt/solid-client-authn-browser";

export default {
  methods: {
    loginToProvider() {
      return login({
        oidcIssuer: "https://solidcommunity.net",
        redirectUrl: window.location.href,
        clientName: "PodNest",
      });
    },
    setUser(bool, webID) {
      this.$store.dispatch("auth/setLoggedIn", bool);
      this.$store.dispatch("auth/setWebID", webID);
    },
    async getLocalStorage() {
      const session = getDefaultSession();
      if (session.info.isLoggedIn) {
        return this.setUser(true, session.info.webId);
      } else {
        return this.setUser(false, "");
      }
    },
  },
  async mounted() {
    async function handleRedirectAfterLogin() {
      await handleIncomingRedirect();
    }
    await handleRedirectAfterLogin();
    await this.getLocalStorage();
  },
};
</script>

<template>
  <div><button @click="loginToProvider()">Login</button></div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
