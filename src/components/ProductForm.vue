<script setup>
import { ref } from "vue";

const productName = ref("");
const category = ref("");
const price = ref("");
const stock = ref("");
const description = ref("");

function handleSubmit() {
  console.log("Product Name:", productName.value);
  console.log("Category:", category.value);
  console.log("Price:", price.value);
  console.log("Stock:", stock.value);
  console.log("Description:", description.value);
}
</script>

<template>
  <div class="bg-white shadow-lg rounded-lg p-6">
    <h2 class="text-xl font-semibold text-gray-700 mb-6">Product Details</h2>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- First Row: Product Name + Category -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="text-sm font-medium text-gray-500 mb-1 block"
            >Product Name</label
          >
          <input
            v-model="productName"
            type="text"
            placeholder="Enter product name"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label class="text-sm font-medium text-gray-500 mb-1 block"
            >Category</label
          >
          <input
            v-model="category"
            type="text"
            placeholder="Enter category"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>
      </div>

      <!-- Second Row: Price + Stock -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="text-sm font-medium text-gray-500 mb-1 block"
            >Price ($)</label
          >
          <input
            v-model="price"
            type="number"
            placeholder="Enter price"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label class="text-sm font-medium text-gray-500 mb-1 block"
            >Stock Quantity</label
          >
          <input
            v-model="stock"
            type="number"
            placeholder="Enter stock quantity"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>
      </div>

      <!-- Description -->
      <div>
        <label class="text-sm font-medium text-gray-500 mb-1 block"
          >Description</label
        >
        <textarea
          v-model="description"
          rows="4"
          placeholder="Enter product description"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        ></textarea>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full font-semibold transition"
      >
        Save Product
      </button>
    </form>
  </div>
</template>
