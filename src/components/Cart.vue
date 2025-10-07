<script setup>
import { ref, computed } from "vue";
import Header from "./Header.vue";
import { useCart } from "../stores/cart.js";

const { items, cartTotal, removeFromCart, updateQuantity } = useCart();

// Delivery charge
const deliveryCharge = 170;

// Total with delivery
const totalWithDelivery = computed(() => {
  return cartTotal.value + deliveryCharge;
});

// Remove item from cart
const handleRemoveItem = (productId) => {
  removeFromCart(productId);
};

// Update item quantity
const handleQuantityChange = (productId, newQuantity) => {
  updateQuantity(productId, newQuantity);
};
</script>

<template>
  <Header />
  <div class="flex flex-col justify-center items-center px-6">
    <!-- Title -->
    <div>
      <p class="font-semibold text-[28px] mb-6">Checkout</p>
    </div>

    <!-- Empty Cart State -->
    <div v-if="items.length === 0" class="text-center py-8">
      <p class="text-gray-500 mb-4">Your cart is empty</p>
      <RouterLink
        to="/"
        class="inline-block px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
      >
        Continue Shopping
      </RouterLink>
    </div>

    <!-- Cart Items -->
    <div v-else>
      <div
        v-for="item in items"
        :key="item.id"
        class="flex items-center gap-4 mb-6 w-full max-w-md"
      >
        <div class="relative">
          <img
            class="w-[84px] h-[86px] rounded-[8px] object-cover"
            :alt="item.title"
            :src="item.image"
          />
          <div
            class="absolute -top-2 -right-2 rounded-full w-6 h-6 bg-primary-700 flex items-center justify-center"
          >
            <p class="text-xs font-bold text-white">{{ item.quantity }}</p>
          </div>
        </div>
        <div class="flex-1">
          <p class="text-sm font-medium line-clamp-1">
            {{ item.title }}
          </p>
          <p class="currency mt-0.5 text-sm font-medium">
            {{ item.price.toLocaleString() }}
            <span class="text-xs text-dim">x {{ item.quantity }}</span>
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <!-- Quantity Controls -->
          <div class="flex items-center gap-2">
            <button
              @click="handleQuantityChange(item.id, item.quantity - 1)"
              class="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-100"
            >
              -
            </button>
            <span class="text-sm w-8 text-center">{{ item.quantity }}</span>
            <button
              @click="handleQuantityChange(item.id, item.quantity + 1)"
              class="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-100"
            >
              +
            </button>
          </div>
          <!-- Remove Button -->
          <button
            @click="handleRemoveItem(item.id)"
            class="text-red-500 text-xs hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    </div>

    <!-- Totals Section -->
    <div v-if="items.length > 0" class="w-full max-w-md mt-4 mb-6">
      <div class="flex justify-between py-2 border-b border-gray-200">
        <p class="text-sm">Sub-total</p>
        <p class="currency font-medium">{{ cartTotal.toLocaleString() }}</p>
      </div>
      <div class="flex justify-between py-2 border-b border-gray-200">
        <p class="text-sm">Delivery Charge</p>
        <p class="currency font-medium">
          {{ deliveryCharge.toLocaleString() }}
        </p>
      </div>
      <div class="flex justify-between py-2 font-semibold text-lg">
        <p>Total</p>
        <p class="currency">{{ totalWithDelivery.toLocaleString() }}</p>
      </div>
    </div>

    <!-- Place Order Button -->
    <button
      v-if="items.length > 0"
      class="w-full max-w-md px-6 py-3 transition rounded-md border border-transparent bg-[#ff922b] text-base font-medium text-white shadow-xs hover:bg-[#fd7e14] h-[55px] flex items-center justify-center"
      type="submit"
    >
      Place Order
    </button>
  </div>
</template>

<style scoped></style>
