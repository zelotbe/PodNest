<script>
import { login } from "@inrupt/solid-client-authn-browser";
import { mapGetters } from "vuex";

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
  computed: {
    ...mapGetters({
      error: "auth/error",
    }),
  },
};
</script>

<template>
  <main>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-8 rounded"
      @click="loginToProvider()"
    >
      Login
    </button>
    <p>{{ error }}</p>
  </main>
</template>
