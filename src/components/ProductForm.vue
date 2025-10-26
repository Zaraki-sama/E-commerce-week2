<script setup>
import { ref } from "vue";
import { productService } from "@/services/api"; // Import productService instead of axios

const productTitle = ref("");
const category = ref("");
const price = ref("");
const stock = ref("");
const status = ref("Published");
const description = ref("");
const imageFile = ref(null);
const imagePreview = ref(null);
const features = ref([""]);
const details = ref("");

// Loading and error states
const isSubmitting = ref(false);
const submitMessage = ref("");
const submitError = ref("");

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
    imagePreview.value = URL.createObjectURL(file);
  }
}

function addFeature() {
  features.value.push("");
}

function removeFeature(index) {
  features.value.splice(index, 1);
}

// Convert image to base64 string
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

async function handleSubmit() {
  isSubmitting.value = true;
  submitMessage.value = "";
  submitError.value = "";

  try {
    // Convert image to base64 if exists
    let imageBase64 = "";
    if (imageFile.value) {
      imageBase64 = await fileToBase64(imageFile.value);
    }

    // Filter out empty features
    const filteredFeatures = features.value.filter((f) => f.trim() !== "");

    // Prepare the data
    const productData = {
      title: productTitle.value,
      category: category.value || null,
      details: details.value,
      description: description.value,
      price: parseFloat(price.value),
      stock: stock.value ? parseInt(stock.value) : 0,
      status: status.value,
      image: imageBase64,
      features: filteredFeatures,
    };

    // Use productService instead of direct axios call
    const response = await productService.createProduct(productData);

    // Success!
    submitMessage.value = "Product added successfully!";
    console.log("Product created:", response);

    // Reset form
    resetForm();
  } catch (error) {
    console.error("Error adding product:", error);
    
    // Check if it's an authentication error
    if (error.response?.status === 401) {
      submitError.value = "You must be logged in to add products. Please login and try again.";
    } else {
      submitError.value =
        error.response?.data?.message ||
        "Failed to add product. Please try again.";

      // Show validation errors if any
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        submitError.value = Object.values(errors).flat().join(", ");
      }
    }
  } finally {
    isSubmitting.value = false;
  }
}

function resetForm() {
  productTitle.value = "";
  category.value = "";
  price.value = "";
  stock.value = "";
  status.value = "Published";
  description.value = "";
  details.value = "";
  features.value = [""];
  imageFile.value = null;
  imagePreview.value = null;
}
</script>

<template>
  <div class="bg-white shadow-lg rounded-lg p-6">
    <h2 class="text-xl font-semibold text-gray-700 mb-6">Product Details</h2>

    <!-- Success Message -->
    <div
      v-if="submitMessage"
      class="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md"
    >
      {{ submitMessage }}
    </div>

    <!-- Error Message -->
    <div
      v-if="submitError"
      class="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md"
    >
      {{ submitError }}
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- First Row: Product Name + Category -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="text-sm font-medium text-gray-500 mb-1 block"
            >Product Title</label
          >
          <input
            v-model="productTitle"
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
            step="0.01"
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
          />
        </div>
      </div>

      <!-- Status -->
      <div>
        <label class="text-sm font-medium text-gray-500 mb-1 block"
          >Status</label
        >
        <select
          v-model="status"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
          <option value="Inactive">Inactive</option>
        </select>
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
          required
        ></textarea>
      </div>

      <!-- Features (Dynamic List) -->
      <div>
        <label class="text-sm font-medium text-gray-500 mb-1 block"
          >Features</label
        >
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="flex items-center gap-2 mb-2"
        >
          <input
            v-model="features[index]"
            type="text"
            placeholder="Enter feature"
            class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <button
            type="button"
            @click="removeFeature(index)"
            v-if="features.length > 1"
            class="text-gray-500 hover:text-gray-700 font-semibold"
          >
            ✕
          </button>
        </div>
        <button
          type="button"
          @click="addFeature"
          class="mt-1 text-sm text-gray-600 hover:text-gray-800 font-semibold"
        >
          + Add another feature
        </button>
      </div>

      <!-- Details -->
      <div>
        <label class="text-sm font-medium text-gray-500 mb-1 block"
          >Details</label
        >
        <textarea
          v-model="details"
          rows="5"
          placeholder="Enter product details"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        ></textarea>
      </div>

      <!-- Image Upload -->
      <div>
        <label class="text-sm font-medium text-gray-500 mb-1 block"
          >Product Image</label
        >
        <input
          type="file"
          accept="image/*"
          @change="handleImageUpload"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
          required
        />
        <div v-if="imagePreview" class="mt-3">
          <img
            :src="imagePreview"
            alt="Product preview"
            class="w-32 h-32 object-cover rounded-md border border-gray-300"
          />
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="isSubmitting"
        class="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full font-semibold transition disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {{ isSubmitting ? "Saving..." : "Save Product" }}
      </button>
    </form>
  </div>
</template>