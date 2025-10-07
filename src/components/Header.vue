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
      <div class="flex">
        <RouterLink to="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img src="../assets/logo.jpg" alt="" class="h-8 w-auto" />
        </RouterLink>
      </div>
      <div class="flex items-center gap-x-4">
        <div class="hidden md:block w-64">
          <SearchBar @product-selected="handleProductSelected" />
        </div>
        <RouterLink
          to="/cart"
          class="relative flex items-center justify-center p-2 text-gray-900 hover:bg-gray-100 rounded-full"
          aria-label="Cart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
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
</style>
