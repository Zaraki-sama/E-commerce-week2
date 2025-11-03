<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import Header from "./Header.vue";
import { useCart } from "../stores/cart.js";
import { orderService } from "../services/api";

const cart = useCart();
const router = useRouter();

// Delivery charge
const deliveryCharge = 170;

// Total with delivery - add safety checks
const totalWithDelivery = computed(() => {
  const subtotal = Number(cart.cartTotal?.value ?? 0);
  return subtotal + deliveryCharge;
});

// Track per-item updates to disable controls during API calls
const updatingMap = ref({});
// Force-list refresh key to re-render list after updates
const refreshKey = ref(0);

const setUpdating = (productId, val) => {
  updatingMap.value = { ...updatingMap.value, [productId]: val };
};

// Remove item from cart
const handleRemoveItem = async (productId) => {
  setUpdating(productId, true);
  try {
    await cart.removeFromCart(productId);
    // Full page reload as requested to reflect updates everywhere
    window.location.reload();
  } catch (e) {
    console.error('Remove failed', e);
    alert('Could not remove item. Please try again.');
  } finally {
    setUpdating(productId, false);
  }
};

// Update item quantity
const handleQuantityChange = async (productId, newQuantity) => {
  setUpdating(productId, true);
  try {
    await cart.updateQuantity(productId, newQuantity);
    // Full page reload as requested to reflect updates everywhere
    window.location.reload();
  } catch (e) {
    console.error('Update quantity failed', e);
    alert('Could not update quantity. Please try again.');
  } finally {
    setUpdating(productId, false);
  }
};

// Create order from cart then navigate to checkout
const isPlacingOrder = ref(false);
const handlePlaceOrder = async () => {
  try {
    isPlacingOrder.value = true;
    const order = await orderService.checkoutFromCart();
    localStorage.setItem('currentOrderId', String(order?.id));
    router.push("/checkout");
  } catch (e) {
    console.error('Checkout failed', e);
    alert('Could not proceed to checkout. Please try again.');
  } finally {
    isPlacingOrder.value = false;
  }
};

onMounted(async () => {
  // Always fetch latest cart when visiting the page
  await cart.loadCart();
});
</script>

<template>
  <div>
    <Header />
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <!-- Header -->
      <div class="my-8 text-center">
        <h1 class="text-4xl font-bold text-neutral-900 tracking-tight">SHOPPING CART</h1>
        <div class="w-24 h-1 bg-black mx-auto mt-4"></div>
      </div>

      <!-- Empty Cart State - Moved outside the grid -->
      <div v-if="cart.items.length === 0" class="flex justify-center items-center min-h-[400px]">
        <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center max-w-md w-full">
          <svg class="w-24 h-24 mx-auto text-neutral-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <h3 class="text-2xl font-bold text-neutral-700 mb-4">Your cart is empty</h3>
          <p class="text-neutral-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <RouterLink
            to="/"
            class="inline-block px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-neutral-800 transition-all duration-200 transform hover:scale-[1.02]"
          >
            Continue Shopping
          </RouterLink>
        </div>
      </div>

      <!-- Cart with Items - Only show when there are items -->
      <div v-else class="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <!-- Left Column - Cart Items -->
        <div class="xl:col-span-2 space-y-6">
      <!-- Cart Items -->
      <div class="space-y-6" :key="refreshKey">
            <div
              v-for="item in cart.items"
              :key="item.id"
              class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6"
            >
              <div class="flex items-center gap-6">
                <!-- Product Image -->
                <div class="relative flex-shrink-0">
                  <img
                    class="w-24 h-24 rounded-xl object-cover shadow-sm"
                    :alt="item.title"
                    :src="item.image"
                  />
                  <div
                    class="absolute -top-2 -right-2 rounded-full w-8 h-8 bg-black flex items-center justify-center shadow-md"
                  >
                    <p class="text-xs font-bold text-white">{{ item.quantity }}</p>
                  </div>
                </div>

                <!-- Product Details -->
                <div class="flex-1 min-w-0">
                  <h3 class="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2">
                    {{ item.title }}
                  </h3>
                  <p class="text-xl font-bold text-neutral-900 mb-4">
                    {{ (item.price || 0).toLocaleString() }}
                  </p>
                  
                  <!-- Quantity Controls -->
                  <div class="flex items-center gap-4">
                    <div class="flex items-center gap-3">
                      <button
                        @click="handleQuantityChange(item.id, item.quantity - 1)"
                        class="w-8 h-8 rounded-lg border border-neutral-300 flex items-center justify-center text-sm hover:bg-neutral-100 hover:border-neutral-400 transition-colors"
                        :disabled="item.quantity <= 1 || updatingMap[item.id]"
                        :class="{'opacity-50 cursor-not-allowed': item.quantity <= 1 || updatingMap[item.id]}"
                      >
                        -
                      </button>
                      <span class="text-lg font-medium w-12 text-center">{{ item.quantity }}</span>
                      <button
                        @click="handleQuantityChange(item.id, item.quantity + 1)"
                        class="w-8 h-8 rounded-lg border border-neutral-300 flex items-center justify-center text-sm hover:bg-neutral-100 hover:border-neutral-400 transition-colors"
                        :disabled="updatingMap[item.id]"
                        :class="{'opacity-50 cursor-not-allowed': updatingMap[item.id]}"
                      >
                        +
                      </button>
                    </div>
                    
                    <!-- Remove Button -->
                    <button
                      @click="handleRemoveItem(item.id)"
                      class="text-red-600 text-sm font-medium hover:text-red-700 transition-colors flex items-center gap-1"
                      :disabled="updatingMap[item.id]"
                      :class="{'opacity-50 cursor-not-allowed': updatingMap[item.id]}"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>

                <!-- Item Total -->
                <div class="text-right flex-shrink-0">
                  <p class="text-2xl font-bold text-neutral-900">
                    {{ ((item.price || 0) * item.quantity).toLocaleString() }}
                  </p>
                  <p class="text-sm text-neutral-600 mt-1">
                    {{ item.quantity }} × {{ (item.price || 0).toLocaleString() }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Order Summary -->
        <div class="xl:col-span-1">
          <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 sticky top-8">
            <h2 class="text-2xl font-bold text-neutral-900 mb-6">ORDER SUMMARY</h2>
            
            <!-- Order Details -->
            <div class="space-y-4 mb-6">
              <div class="flex justify-between py-3 border-b border-neutral-200">
                <span class="text-neutral-600 font-medium">Subtotal ({{ cart.items.length }} item{{ cart.items.length > 1 ? 's' : '' }})</span>
     <span class="font-semibold">{{ cart.cartTotal.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between py-3 border-b border-neutral-200">
                <span class="text-neutral-600 font-medium">Delivery Charge</span>
                <span class="font-semibold">{{ deliveryCharge.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between py-4 border-t border-neutral-300">
                <span class="text-lg font-bold text-neutral-900">TOTAL</span>
               <span class="text-lg font-bold text-neutral-900">{{ totalWithDelivery.toLocaleString() }}</span>
              </div>
            </div>

            <!-- Place Order Button -->
            <button
              @click="handlePlaceOrder"
              class="w-full bg-black text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] mb-4"
              type="button"
            >
              PROCEED TO CHECKOUT
            </button>

            <!-- Continue Shopping -->
            <RouterLink
              to="/"
              class="w-full border-2 border-neutral-300 text-neutral-700 py-3 px-6 rounded-xl font-semibold text-center hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-200 block"
            >
              Continue Shopping
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: color, background-color, border-color, transform;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>