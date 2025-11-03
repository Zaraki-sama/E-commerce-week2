import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import { useCartStore } from "./stores/cart";
import { useAuthStore } from "./stores/auth";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia); // This must come before using any stores
app.use(router);

// Initialize auth first so cart knows whether to sync
const authStore = useAuthStore();
authStore.initAuth();

// Initialize cart on app start for persistent cart across refreshes
const cartStore = useCartStore();
cartStore.init();

app.mount("#app");
