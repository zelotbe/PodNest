<script setup>
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

function loginToProvider() {
  return login({
    oidcIssuer: "https://solidcommunity.net",
    redirectUrl: window.location.href,
    clientName: "Workshop Solid",
  });
}

//AFTER LOGIN -> READ DATA
async function handleRedirectAfterLogin() {
  const session = getDefaultSession();
  await handleIncomingRedirect();

  if (session.info.isLoggedIn) {
    this.$store.dispatch("auth/setLoggedIn", true);
  }
}
handleRedirectAfterLogin();
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
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
