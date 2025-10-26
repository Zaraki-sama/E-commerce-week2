import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import AdminDashboard from "../components/AdminDashboard.vue";
import AdminProductList from "../components/AdminProductList.vue";
import Details from "../components/Details.vue";
import SignUp from "../components/SignUp.vue";
import Cart from "../components/Cart.vue";
import SearchResults from "../components/SearchResults.vue";
import Checkout from "../components/Checkout.vue";
import Product from "../components/Product.vue";
import AboutUs from "../components/AboutUs.vue";
  import ContactUs from "../components/ContactUs.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/contact",
    name: "ContactUs",
    component: ContactUs,
  },
  {
    path: "/about",
    name: "AboutUs",
    component: AboutUs,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { guest: true }, // Only accessible when NOT logged in
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    meta: { guest: true }, // Only accessible when NOT logged in
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
    meta: { requiresAuth: true }, // Must be logged in
  },
  {
    path: "/search",
    name: "SearchResults",
    component: SearchResults,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
    meta: { requiresAuth: true }, // Must be logged in
  },
  // Admin routes
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true, requiresAdmin: true }, // Must be admin
  },
  {
    path: "/admin/list",
    name: "AdminProductList",
    component: AdminProductList,
    meta: { requiresAuth: true, requiresAdmin: true }, // Must be admin
  },
 {
  path: "/products/:category?",
  name: "Product",
  component: Product,
  props: true, // this allows us to receive the category as a prop in the component
}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Initialize auth from localStorage on first load
  if (!authStore.user && authStore.token) {
    authStore.initAuth();
  }

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // User not logged in, redirect to login
    next('/login');
  }
  // Check if route requires admin role
  else if (to.meta.requiresAdmin && !authStore.isAdmin) {
    // User is not admin, redirect to home
    next('/');
  }
  // Check if route is guest-only (login/signup)
  else if (to.meta.guest && authStore.isAuthenticated) {
    // User is already logged in, redirect to home
    next('/');
  }
  // Everything is fine, proceed
  else {
    next();
  }
});

export default router;