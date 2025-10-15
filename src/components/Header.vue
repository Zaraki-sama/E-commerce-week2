<script setup>
import { RouterLink } from "vue-router";
import { useCart } from "../stores/cart.js";
import SearchBar from "./SearchBar.vue";

const { cartCount } = useCart();

const handleProductSelected = (selectedProduct) => {
  // The SearchBar component already handles navigation
  console.log("Product selected from header:", selectedProduct);
};
</script>

<template>
  <header class="bg-white">
    <nav
      aria-label="Global"
      class="flex items-center justify-between p-6 lg:px-8"
    >
      <!-- Logo - Left -->
      <div class="flex">
        <RouterLink to="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img src="../assets/logo.jpg" alt="" class="h-8 w-auto" />
        </RouterLink>
      </div>

      <!-- Navigation Links - Center -->
      <div class="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8">
        <RouterLink
          to="/"
          class="text-gray-900 hover:text-gray-700 px-3 py-2 text-sm font-medium"
        >
          Home
        </RouterLink>
        <RouterLink
          to="/products"
          class="text-gray-900 hover:text-gray-700 px-3 py-2 text-sm font-medium"
        >
          Products
        </RouterLink>
        <RouterLink
          to="/about"
          class="text-gray-900 hover:text-gray-700 px-3 py-2 text-sm font-medium"
        >
          About
        </RouterLink>
        <RouterLink
          to="/contact"
          class="text-gray-900 hover:text-gray-700 px-3 py-2 text-sm font-medium"
        >
          Contact
        </RouterLink>
      </div>

      <!-- Right side items - Search and Cart -->
      <div class="flex items-center gap-x-4">
        <div class="hidden md:block w-64">
          <SearchBar @product-selected="handleProductSelected" />
        </div>
        
        <!-- User Login Icon -->
        <RouterLink
          to="/login"
          class="flex items-center justify-center p-2 text-gray-900 hover:bg-gray-100 rounded-full"
          aria-label="Login"
        >
          <i class="fas fa-user text-xl"></i>
        </RouterLink>

        <RouterLink
          to="/cart"
          class="relative flex items-center justify-center p-2 text-gray-900 hover:bg-gray-100 rounded-full"
          aria-label="Cart"
        >
          <i class="fas fa-shopping-cart text-xl"></i>
          <span
            v-if="cartCount > 0"
            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
            style="min-width: 20px"
          >
            {{ cartCount > 99 ? "99+" : cartCount }}
          </span>
        </RouterLink>
      </div>
    </nav>
  </header>
</template>

<style scoped>
/* Ensure header has consistent positioning */
header {
  position: sticky;
  top: 0;
  z-index: 40;
  width: 100%;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

/* Ensure navigation maintains consistent height */
nav {
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative; /* Important for absolute positioning of center nav */
}

/* Ensure cart badge doesn't cause layout shifts */
.relative {
  position: relative;
}

/* Ensure consistent spacing */
.lg\:gap-x-4 > * + * {
  margin-left: 1rem;
}

/* Prevent layout shifts from cart count changes */
.absolute {
  position: absolute;
  transform: translateZ(0);
}

/* Ensure consistent button sizing */
button,
a {
  transition: all 0.2s ease-in-out;
}

/* Prevent text wrapping in cart badge */
.font-bold {
  font-weight: 700;
  white-space: nowrap;
}

/* Active navigation link styling */
.router-link-active {
  color: #1f2937;
  font-weight: 600;
}
</style>