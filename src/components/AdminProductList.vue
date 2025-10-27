<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import AdminSidebar from "@/components/AdminSidebar.vue";
import Header from "@/components/Header.vue";
import { productService } from "@/services/api.js";

const products = ref([]);
const searchQuery = ref("");
const loading = ref(false);
const error = ref(null);
const openMenuId = ref(null); // Track which menu is open
const deletingIds = ref(new Set()); // Track products being deleted

// Fetch products from API
const fetchProducts = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const data = await productService.getAllProducts();
    products.value = data;
  } catch (err) {
    error.value = "Failed to fetch products. Please try again.";
    console.error("Error fetching products:", err);
  } finally {
    loading.value = false;
  }
};

// Toggle menu visibility
const toggleMenu = (productId) => {
  if (openMenuId.value === productId) {
    openMenuId.value = null;
  } else {
    openMenuId.value = productId;
  }
};

// Close menu when clicking outside
const handleClickOutside = (event) => {
  // Check if click is outside menu
  if (!event.target.closest('.menu-container')) {
    openMenuId.value = null;
  }
};

// Delete product
const deleteProduct = async (id) => {
  if (!confirm("Are you sure you want to delete this product?")) {
    return;
  }
  
  // Close the menu
  openMenuId.value = null;
  
  // Add to deleting set
  deletingIds.value.add(id);
  
  try {
    // Call Laravel API to delete product
    const response = await productService.deleteProduct(id);
    
    // Remove from local array after successful deletion
    products.value = products.value.filter(p => p.id !== id);
    
    // Show success message from backend
    const successMsg = response?.message || "Product deleted successfully";
    alert(successMsg);
  } catch (err) {
    // Show error message from backend
    const errorMsg = err.response?.data?.message || "Failed to delete product. Please try again.";
    alert(errorMsg);
    console.error("Error deleting product:", err);
  } finally {
    // Remove from deleting set
    deletingIds.value.delete(id);
  }
};

const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value;
  return products.value.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Check if product is being deleted
const isDeleting = (id) => {
  return deletingIds.value.has(id);
};

// Fetch products on component mount
onMounted(() => {
  fetchProducts();
  // Add click listener to document
  document.addEventListener('click', handleClickOutside);
});

// Cleanup on unmount
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="flex bg-gray-100 min-h-screen">
    <!-- Sidebar -->
    <AdminSidebar />

    <!-- Main Content -->
    <div class="flex-1 md:ml-64 min-w-0 flex flex-col">
      <!-- Header -->
      <div class="bg-white border-b border-gray-200 flex-shrink-0">
        <Header />
      </div>

      <!-- Page Title -->
      <div class="bg-[#333333] text-white">
        <header class="p-6">
          <h1 class="text-xl font-semibold uppercase tracking-wide">
            Products List
          </h1>
        </header>
      </div>

      <!-- Main Table Section -->
      <div class="p-8 space-y-6">
        <!-- Error Message -->
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {{ error }}
          <button @click="fetchProducts" class="ml-4 underline">Retry</button>
        </div>

        <!-- Search / Filter & Add Button -->
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search products..."
            class="border rounded px-4 py-2 w-full md:w-1/3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <div class="flex items-center gap-3">
            <select class="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option>Status</option>
              <option>Published</option>
              <option>Inactive</option>
              <option>Draft</option>
            </select>
            <select class="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option>Category</option>
              <option>men</option>
              <option>women</option>
              <option>accessories</option>
            </select>
            <button
              @click="$router.push('/admin/products/add')"
              class="bg-black hover:bg-gray-800 text-white font-semibold px-4 py-2 rounded shadow whitespace-nowrap"
            >
              Add Product
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p class="mt-2 text-gray-600">Loading products...</p>
        </div>

        <!-- Product Table -->
        <div v-else class="overflow-x-auto bg-white rounded-xl shadow">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="(product, index) in filteredProducts"
                :key="product.id"
                class="hover:bg-gray-50 transition-colors duration-200"
                :class="{ 'opacity-50 pointer-events-none': isDeleting(product.id) }"
              >
                <td class="px-6 py-4 whitespace-nowrap text-gray-700">{{ index + 1 }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <img
                    :src="product.image"
                    :alt="product.title"
                    class="w-16 h-16 rounded-lg object-cover hover:scale-105 transition-transform duration-200"
                    @error="(e) => e.target.src = '/images/placeholder.jpg'"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">{{ product.title }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-500 capitalize">{{ product.category || 'N/A' }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="product.stock < 10 ? 'text-red-500 font-semibold' : 'text-gray-700'"
                  >
                    {{ product.stock < 10 && product.stock > 0 ? 'Low Stock' : product.stock === 0 ? 'Out of Stock' : product.stock }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-800 font-semibold">${{ parseFloat(product.price).toFixed(2) }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="{
                      'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium': product.status === 'Published',
                      'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium': product.status === 'Inactive',
                      'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium': product.status === 'Draft'
                    }"
                  >
                    {{ product.status || 'Published' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="relative menu-container">
                    <!-- Deleting spinner -->
                    <div v-if="isDeleting(product.id)" class="text-gray-400">
                      <div class="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400"></div>
                    </div>
                    <!-- Menu button -->
                    <button 
                      v-else
                      @click.stop="toggleMenu(product.id)"
                      class="text-gray-400 hover:text-gray-700 font-bold text-xl focus:outline-none"
                    >
                      •••
                    </button>
                    <!-- Dropdown menu -->
                    <div 
                      v-if="openMenuId === product.id"
                      class="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10 border border-gray-200"
                    >
                      <button
                        @click="$router.push(`/admin/products/edit/${product.id}`)"
                        class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-md"
                      >
                        Edit
                      </button>
                      <button
                        @click="deleteProduct(product.id)"
                        class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-b-md"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredProducts.length === 0">
                <td colspan="8" class="px-6 py-8 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
tbody tr:hover {
  transform: translateY(-1px);
}
</style>