<script>
import { login } from "@inrupt/solid-client-authn-browser";

export default {
  methods: {
    loginToProvider() {
      return login({
        oidcIssuer: "https://solidcommunity.net",
        redirectUrl: window.location.href,
        clientName: "PodNest",
      });
    },
  },
};
</script>

<template>
  <main>
    <button @click="loginToProvider()">Login</button>
  </main>
</template>
