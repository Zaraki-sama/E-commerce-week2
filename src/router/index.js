import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Details from "../components/Details.vue";
import Cart from "../components/Cart.vue"; // If you have a Cart page

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/details/:id?",
    name: "Details",
    component: Details,
    props: true,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
