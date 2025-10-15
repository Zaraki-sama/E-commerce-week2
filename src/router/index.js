import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import AdminDashboard from "../components/AdminDashboard.vue";
import AdminProductList from "../components/AdminProductList.vue";
import Details from "../components/Details.vue";
import SignUp from "../components/SignUp.vue";
import Cart from "../components/Cart.vue"; // If you have a Cart page
import SearchResults from "../components/SearchResults.vue";
import Checkout from "../components/Checkout.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
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
  {
    path: "/search",
    name: "SearchResults",
    component: SearchResults,
  },
  {
    path: "/admindashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
  }, 
  {
    path: "/adminlist",
    name: "AdminProductList",
    component: AdminProductList,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
