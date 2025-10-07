<template>
  <Header />

  <section class="bg-white pt-20 pb-10 lg:pt-[120px] lg:pb-20">
    <div class="container mx-auto">
      <!-- Search Bar -->
      <div class="max-w-2xl mx-auto mb-8">
        <SearchBar @product-selected="handleProductSelected" />
      </div>

      <!-- Search Results Header -->
      <div v-if="searchQuery" class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Search Results for "{{ searchQuery }}"
        </h1>
        <p class="text-lg text-gray-600">
          Found {{ searchResults.length }} product(s)
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"
        ></div>
        <p class="mt-2 text-gray-600">Searching products...</p>
      </div>

      <!-- No Results -->
      <div
        v-else-if="searchQuery && searchResults.length === 0"
        class="text-center py-20"
      >
        <div class="text-gray-400 mb-4">
          <svg
            class="mx-auto h-12 w-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          No products found
        </h3>
        <p class="text-gray-600">Try searching with different keywords</p>
      </div>

      <!-- Side by Side Grid Layout -->
      <div
        v-else-if="searchResults.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="product in searchResults"
          :key="product.id"
          class="text-center p-4"
        >
          <!-- Product Image -->
          <div class="mb-6 flex justify-center">
            <img
              :src="product.image"
              :alt="product.title"
              class="w-48 h-48 object-contain mx-auto"
            />
          </div>

          <!-- Product Info -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">
              {{ product.title }}
            </h3>
            <p class="text-gray-600 mb-4 text-sm leading-relaxed">
              {{ product.description }}
            </p>
            <p class="text-xl font-bold text-[#ff922b] mb-4">
              ${{ product.price }}
            </p>
          </div>

          <!-- Action Button -->
          <RouterLink
            :to="`/details/${product.id}`"
            class="inline-block py-2 text-base font-medium transition border rounded-full text-body-color hover:border-primary hover:bg-black border-gray-3 px-7 hover:text-white"
          >
            View Details
          </RouterLink>
        </div>
      </div>

      <!-- Initial State -->
      <div v-else class="text-center py-20">
        <div class="text-gray-400 mb-4">
          <svg
            class="mx-auto h-12 w-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          Search for products
        </h3>
        <p class="text-gray-600">Use the search bar above to find products</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { productService } from "../services/api";
import { useCart } from "../stores/cart.js";
import Header from "./Header.vue";
import SearchBar from "./SearchBar.vue";

const route = useRoute();
const router = useRouter();
const cart = useCart();

const searchQuery = ref("");
const searchResults = ref([]);
const loading = ref(false);

const handleProductSelected = (product) => {
  router.push(`/details/${product.id}`);
};

const goToProduct = (productId) => {
  router.push(`/details/${productId}`);
};

const addToCart = (product) => {
  cart.addToCart({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
  });
};

const performSearch = async (query) => {
  if (!query.trim()) return;

  loading.value = true;
  try {
    const response = await productService.searchProducts(query);
    searchResults.value = response.products;
    searchQuery.value = query;
  } catch (error) {
    console.error("Search error:", error);
    searchResults.value = [];
  } finally {
    loading.value = false;
  }
};

// Check for initial search query in URL
onMounted(() => {
  const query = route.query.q;
  if (query) {
    performSearch(query);
  }
});

// Watch for route changes to handle new searches from the same page
watch(
  () => route.query.q,
  (newQuery) => {
    if (newQuery) {
      performSearch(newQuery);
    } else {
      // Clear results if no query
      searchQuery.value = "";
      searchResults.value = [];
    }
  }
);
</script>

<style scoped>
/* Simple styling for clean layout */
.transition-colors {
  transition: all 0.2s ease-in-out;
}

/* Button styling to match home page */
.text-body-color {
  color: #64748b;
}

.hover\:text-primary:hover {
  color: #ff922b;
}

.border-gray-3 {
  border-color: #d1d5db;
}

.hover\:border-primary:hover {
  border-color: #ff922b;
}

.hover\:bg-black:hover {
  background-color: #000;
}

.hover\:text-white:hover {
  color: #fff;
}
</style>
