<script>
// Import from "@inrupt/solid-client-authn-browser"
import {
  login,
  handleIncomingRedirect,
  getDefaultSession,
  fetch,
  logout,
} from "@inrupt/solid-client-authn-browser";

// Import from "@inrupt/solid-client"
import {
  addUrl,
  addStringNoLocale,
  createSolidDataset,
  createThing,
  getPodUrlAll,
  getSolidDataset,
  getThing,
  getThingAll,
  getStringNoLocale,
  removeThing,
  saveSolidDatasetAt,
  setThing,
  getContainedResourceUrlAll,
} from "@inrupt/solid-client";

import { VCARD, RDF, AS, SCHEMA_INRUPT, FOAF } from "@inrupt/vocab-common-rdf";

export default {
  methods: {
    loginToProvider() {
      return login({
        oidcIssuer: "https://solidcommunity.net",
        redirectUrl: window.location.href,
        clientName: "Workshop Solid",
      });
    },
  },
  setUser(bool, webID) {
    this.$store.dispatch("auth/setLoggedIn", true);
    this.$store.dispatch("auth/setWebID", webID);
  },
  async getLocalStorage() {
    const session = getDefaultSession();
    if (session) {
      return this.setUser(true, session.info.webId);
    } else {
      return this.setUser(false, "");
    }
  },
  mounted() {
    async function handleRedirectAfterLogin() {
      await handleIncomingRedirect();

      this.getLocalStorage();
    }
    handleRedirectAfterLogin();
  },
};

// function loginToProvider() {
//   return login({
//     oidcIssuer: "https://solidcommunity.net",
//     redirectUrl: window.location.href,
//     clientName: "Workshop Solid",
//   });
// }

//AFTER LOGIN -> READ DATA
// async function handleRedirectAfterLogin() {
//   const session = getDefaultSession();
//   await handleIncomingRedirect();

//   if (session.info.isLoggedIn) {
//     store.dispatch("auth/setLoggedIn", true);
//   }
// }
</script>

<template>
  <div class="greetings">
    <h1 class="green" v-if="loggedIn">hai</h1>
    <button @click="loginToProvider()">Login</button>
  </div>
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
