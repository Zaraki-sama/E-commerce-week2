<script setup>
import { RouterLink, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { useCart } from "../stores/cart.js";
import { useAuthStore } from "@/stores/auth";
import SearchBar from "./SearchBar.vue";

const router = useRouter();
const authStore = useAuthStore();
const { cartCount } = useCart();

const isCategoriesOpen = ref(false);
const categories = ref([]);

const handleProductSelected = (selectedProduct) => {
  console.log("Product selected from header:", selectedProduct);
};

const handleLogout = async () => {
  await authStore.logout();
  router.push('/login');
};

// Fetch categories from API
const fetchCategories = async () => {
  try {
    // Replace with your actual API endpoint
    const response = await fetch('/api/categories');
    const data = await response.json();
    categories.value = data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Fallback categories if API fails
    categories.value = [
      { id: 1, name: 'Men', slug: 'men' },
      { id: 2, name: 'Women', slug: 'women' },
      { id: 3, name: 'Accessories', slug: 'accessories' }
    ];
  }
};

const navigateToCategory = (categorySlug) => {
  router.push(`/products/${categorySlug}`);
  isCategoriesOpen.value = false;
};

// Close dropdown when clicking outside
const closeDropdown = () => {
  isCategoriesOpen.value = false;
};

onMounted(() => {
  fetchCategories();
});
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
        <RouterLink to="/" class="text-gray-900 hover:text-gray-700 px-3 py-2 text-sm font-medium">Home</RouterLink>
        
<!-- Categories Dropdown -->
<div 
  class="relative"
  @mouseenter="isCategoriesOpen = true"
  @mouseleave="isCategoriesOpen = false"
>
  <!-- Trigger -->
  <button
    class="text-gray-900 hover:text-gray-700 px-3 py-2 text-sm font-medium flex items-center"
  >
    Categories
    <svg 
      class="w-4 h-4 ml-1 transition-transform duration-200" 
      :class="{ 'rotate-180': isCategoriesOpen }"
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  </button>
  
  <!-- Menu -->
  <div
    v-if="isCategoriesOpen"
    class="absolute top-full left-0 mt-0 w-48 bg-white rounded-md shadow-lg py-2 border border-gray-200 z-50"
  >
    <button
      v-for="category in categories"
      :key="category.id"
      @click="navigateToCategory(category.slug)"
      class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
    >
      {{ category.name }}
    </button>
  </div>
</div>


        <RouterLink to="/about" class="text-gray-900 hover:text-gray-700 px-3 py-2 text-sm font-medium">About</RouterLink>
        <RouterLink to="/contact" class="text-gray-900 hover:text-gray-700 px-3 py-2 text-sm font-medium">Contact</RouterLink>
      </div>

      <!-- Right side items - Search, Cart, User/Login -->
      <div class="flex items-center gap-x-4">
        <div class="hidden md:block w-64">
          <SearchBar @product-selected="handleProductSelected" />
        </div>
        
        <!-- User / Logout -->
        <div v-if="authStore.isAuthenticated" class="flex items-center gap-x-2">
          <RouterLink
            to="#"
            @click.prevent="handleLogout"
            class="flex items-center justify-center p-2 text-gray-900 hover:bg-gray-100 rounded-full"
            aria-label="Logout"
          >
            <i class="fas fa-sign-out-alt text-xl"></i>
          </RouterLink>
        </div>

        <!-- Login Icon if not authenticated -->
        <RouterLink
          v-else
          to="/login"
          class="flex items-center justify-center p-2 text-gray-900 hover:bg-gray-100 rounded-full"
          aria-label="Login"
        >
          <i class="fas fa-user text-xl"></i>
        </RouterLink>

        <!-- Cart -->
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
  position: relative;
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

/* Dropdown animations */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>