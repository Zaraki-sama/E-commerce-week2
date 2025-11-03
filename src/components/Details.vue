<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { productService } from "../services/api";
import Header from "./Header.vue";
import { useCart } from "../stores/cart.js";

const props = defineProps({
  id: { type: [String, Number], required: false },
});

const route = useRoute();
const product = ref(null);
const loading = ref(true);
const error = ref(null);
const selectedSize = ref(null);

const cart = useCart();

const sizes = ['S', 'M', 'L', 'XL'];

const currentQuantity = computed(() => {
  if (!product.value) return 0;
  const list = Array.isArray(cart.items) ? cart.items : cart.items?.value || [];
  const found = list.find((i) => i.id === product.value.id);
  const qty = found ? found.quantity : 0;
  return Number.isFinite(qty) ? Number(qty) : 0;
});

// Add to cart should only add once; quantity changes via +/- only
const addToCartClick = () => {
  if (!product.value) return;
  if (!selectedSize.value) {
    alert('Please select a size');
    return;
  }
  if (currentQuantity.value === 0) {
    cart.addToCart({
      id: product.value.id,
      title: product.value.title,
      price: product.value.price,
      image: product.value.image,
      size: selectedSize.value,
    });
  }
};

const increment = () => {
  if (!product.value) return;
  if (!selectedSize.value) {
    alert('Please select a size');
    return;
  }

  // If item is not in cart yet, add it first
  if (currentQuantity.value === 0) {
    cart.addToCart({
      id: product.value.id,
      title: product.value.title,
      price: product.value.price,
      image: product.value.image,
      size: selectedSize.value,
    });
  } else {
    cart.updateQuantity(product.value.id, currentQuantity.value + 1);
  }
};

const decrement = () => {
  if (!product.value || currentQuantity.value === 0) return;
  cart.updateQuantity(product.value.id, currentQuantity.value - 1);
};

const fetchProduct = async () => {
  try {
    loading.value = true;
    const productId = props.id ?? route.params.id;
    const p = await productService.getProductById(productId);
    product.value = {
      id: p?.id ?? p?.product_id ?? productId,
      title: p?.title ?? p?.name ?? "Untitled",
      description: p?.description ?? p?.details ?? "",
      price: p?.price ?? 0,
      image: p?.image ?? p?.image_url ?? p?.imagePath ?? "",
      features: p?.features ?? [],
    };
  } catch (err) {
    error.value = "Failed to fetch product details";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProduct();
});
</script>

<template>
  <Header />

  <div v-if="loading" class="text-center py-20">
    <div
      class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"
    ></div>
    <p class="mt-2 text-gray-600">Loading product details...</p>
  </div>

  <div v-else-if="error" class="text-center py-20">
    <p class="text-red-600">{{ error }}</p>
  </div>

  <div v-else-if="product" class="container mx-auto px-4 py-8 md:py-16">
    <div class="grid md:grid-cols-2 gap-8 items-start">
      <div>
        <img
          :src="product.image"
          :alt="product.title"
          class="w-full aspect-square object-cover"
        />
      </div>
      <div>
        <h1 class="text-3xl font-bold mb-6">{{ product.title }}</h1>
        <p class="text-gray-600 mb-6">{{ product.description }}</p>
        <p class="text-2xl font-bold text-black-600 mb-8">
          ${{ product.price }}
        </p>

        <!-- Size Selection -->
        <div class="mb-8">
          <h3 class="text-sm font-medium mb-4">SELECT SIZE</h3>
          <div class="flex gap-3">
            <button
              v-for="size in sizes"
              :key="size"
              @click="selectedSize = size"
              :class="[
                'px-4 py-2 border transition-colors',
                selectedSize === size
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'
              ]"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <div class="flex flex-col items-start gap-4 mb-8">
          <div class="flex items-center gap-3">
            <button
              @click="decrement"
              class="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-lg hover:bg-gray-100"
            >
              -
            </button>
            <span class="min-w-8 text-center">{{ currentQuantity }}</span>
            <button
              @click="increment"
              class="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-lg hover:bg-gray-100"
            >
              +
            </button>
          </div>
          <button
            @click="addToCartClick"
            class="px-6 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors"
          >
            Add to Cart
          </button>
        </div>

        <h3 class="text-lg font-semibold mb-3">Features:</h3>
        <ul class="list-disc list-inside space-y-2">
          <li
            v-for="feature in product.features || []"
            :key="feature"
            class="text-gray-700"
          >
            {{ feature }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>