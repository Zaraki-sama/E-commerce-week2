<template>
  <div class="search-container">
    <div class="relative">
      <input
        v-model="searchQuery"
        @input="handleSearch"
        @keyup.enter="handleEnterKey"
        type="text"
        placeholder="Search products..."
        class="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff922b] focus:border-transparent"
      />
      <div
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <svg
          v-if="!isSearching"
          class="h-5 w-5 text-gray-400"
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
        <div
          v-else
          class="h-5 w-5 border-2 border-gray-300 border-t-[#ff922b] rounded-full animate-spin"
        ></div>
      </div>
      <button
        v-if="searchQuery"
        @click="clearSearch"
        class="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        <svg
          class="h-5 w-5 text-gray-400 hover:text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>

    <!-- Search Results -->
    <div
      v-if="showResults && searchResults.length > 0"
      class="search-results absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto z-50"
    >
      <div class="p-3">
        <div
          class="flex items-center justify-between mb-3 pb-2 border-b border-gray-100"
        >
          <p class="text-sm font-medium text-gray-700">
            {{ searchResults.length }} result{{
              searchResults.length !== 1 ? "s" : ""
            }}
            for "{{ searchQuery }}"
          </p>
          <button
            @click="goToSearchResults"
            class="text-xs text-black hover:text-black font-medium"
          >
            View all
          </button>
        </div>
        <div class="space-y-1">
          <div
            v-for="product in searchResults.slice(0, 5)"
            :key="product.id"
            @click="selectProduct(product)"
            class="flex items-center space-x-3 p-2 hover:bg-gray-50 cursor-pointer rounded-md transition-colors"
          >
            <img
              :src="product.image"
              :alt="product.title"
              class="w-10 h-10 object-cover rounded-md flex-shrink-0"
            />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">
                {{ product.title }}
              </p>
              <p class="text-sm text-black font-semibold">
                ${{ product.price }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No Results -->
    <div
      v-if="showResults && searchResults.length === 0 && searchQuery"
      class="search-results absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl p-4 z-50"
    >
      <div class="text-center">
        <div class="text-gray-400 mb-2">
          <svg
            class="mx-auto h-8 w-8"
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
        <p class="text-sm text-gray-600 mb-3">
          No products found for "{{ searchQuery }}"
        </p>
        <button
          @click="goToSearchResults"
          class="text-sm text-black hover:text-black font-medium underline"
        >
          Try different search terms
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { productService } from "../services/api";

const router = useRouter();
const searchQuery = ref("");
const searchResults = ref([]);
const showResults = ref(false);
const searchTimeout = ref(null);
const isSearching = ref(false);

const emit = defineEmits(["productSelected", "searchSubmitted"]);

const handleSearch = () => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }

  if (searchQuery.value.length < 2) {
    searchResults.value = [];
    showResults.value = false;
    return;
  }

  searchTimeout.value = setTimeout(() => {
    performSearch();
  }, 300); // Debounce search by 300ms
};

const performSearch = async () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = [];
    showResults.value = false;
    isSearching.value = false;
    return;
  }

  isSearching.value = true;
  try {
    const response = await productService.searchProducts(searchQuery.value);
    searchResults.value = response.products;
    showResults.value = true;
  } catch (error) {
    console.error("Search error:", error);
    searchResults.value = [];
    showResults.value = true;
  } finally {
    isSearching.value = false;
  }
};

// NEW: Handle Enter key press
const handleEnterKey = () => {
  if (searchQuery.value.trim()) {
    // Hide dropdown and go to search results page
    showResults.value = false;
    goToSearchResults();
  }
};

const selectProduct = (product) => {
  emit("productSelected", product);
  router.push(`/details/${product.id}`);
  clearSearch();
};

const goToSearchResults = () => {
  if (searchQuery.value.trim()) {
    router.push(`/search?q=${encodeURIComponent(searchQuery.value)}`);
    clearSearch();
  }
};

const clearSearch = () => {
  searchQuery.value = "";
  searchResults.value = [];
  showResults.value = false;
  isSearching.value = false;
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }
};

// Hide results when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest(".search-container")) {
    showResults.value = false;
  }
};

// Add event listener for clicking outside
if (typeof window !== "undefined") {
  document.addEventListener("click", handleClickOutside);
}
</script>

<style scoped>
.search-container {
  position: relative;
}

.search-results {
  z-index: 50;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Ensure smooth transitions */
.search-results {
  animation: fadeInDown 0.2s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Improve hover states */
.search-results .hover\:bg-gray-50:hover {
  background-color: #f9fafb;
}

/* Ensure proper text truncation */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
