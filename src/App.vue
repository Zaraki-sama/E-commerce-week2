<script setup>
import Home from "./components/Home.vue";
import Details from "./components/Details.vue";
import Cart from "./components/Cart.vue";
import { ref, computed } from "vue";

// const routes = {
//   "/": Home,
//   "/details": Details,
//   "/cart": Cart,
// };

// const currentPath = ref(window.location.hash);

// window.addEventListener("hashchange", () => {
//   currentPath.value = window.location.hash;
// });

// const currentView = computed(() => {
//   return routes[currentPath.value.slice(1) || "/"] || NotFound;
// });
</script>

<template>
  <!-- <component :is="currentView" /> -->

  <!-- <Home /> -->
  <router-view />
</template>

<style scoped></style>
