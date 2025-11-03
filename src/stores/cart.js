// src/stores/cart.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { cartService } from "../services/api";
import { useAuthStore } from "./auth";

export const useCartStore = defineStore("cart", () => {
  const items = ref([]);
  const isLoading = ref(false);
  const initialized = ref(false);

  const readCache = () => {
    try {
      const raw = localStorage.getItem('cartCache');
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  };
  const writeCache = () => {
    try { localStorage.setItem('cartCache', JSON.stringify(items.value)); } catch {}
  };

  const cartCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0);
  });

  const cartTotal = computed(() => {
    return items.value.reduce((total, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return total + price * quantity;
    }, 0);
  });

  const loadCart = async () => {
    const auth = useAuthStore();
    if (!auth.isAuthenticated) {
      items.value = [];
      writeCache();
      return;
    }
    isLoading.value = true;
    try {
      const data = await cartService.getCart();
      items.value = data;
      writeCache();
    } finally {
      isLoading.value = false;
    }
  };

  const init = async () => {
    if (initialized.value) return;
    // hydrate from cache immediately for instant UI on refresh
    const cached = readCache();
    if (Array.isArray(cached) && cached.length) {
      items.value = cached;
    }
    await loadCart();
    initialized.value = true;
  };

  const addToCart = async (product) => {
    const auth = useAuthStore();
    if (!auth.isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    await cartService.addToCart(product.id, 1);
    await loadCart();
  };

  const removeFromCart = async (productId) => {
    const auth = useAuthStore();
    if (!auth.isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    const item = items.value.find((i) => i.id === productId);
    if (!item) return;

    // Optimistic update
    const previous = [...items.value];
    items.value = items.value.filter((i) => i.id !== productId);
    writeCache();

    try {
      await cartService.removeFromCart(item.cartItemId);
      await loadCart();
    } catch (e) {
      // rollback on error
      items.value = previous;
      writeCache();
      throw e;
    }
  };

  const updateQuantity = async (productId, quantity) => {
    const auth = useAuthStore();
    if (!auth.isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    const item = items.value.find((i) => i.id === productId);
    if (!item) return;
    const numQuantity = Number(quantity) || 0;
    if (numQuantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    // Optimistic update
    const previous = [...items.value];
    items.value = items.value.map((i) => i.id === productId ? { ...i, quantity: numQuantity } : i);
    writeCache();

    try {
      await cartService.updateQuantity(item.cartItemId, numQuantity);
      await loadCart();
    } catch (e) {
      // rollback on error
      items.value = previous;
      writeCache();
      throw e;
    }
  };

  const clearCart = async () => {
    const auth = useAuthStore();
    if (!auth.isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    // Remove all items one by one (backend has only per-item delete)
    for (const item of items.value) {
      try { await cartService.removeFromCart(item.cartItemId); } catch {}
    }
    await loadCart();
  };

  return {
    items,
    isLoading,
    initialized,
    cartCount,
    cartTotal,
    loadCart,
    init,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
});

// Export a composable function for easier use
export const useCart = () => {
  const store = useCartStore();
  return {
    items: store.items,
    isLoading: store.isLoading,
    initialized: store.initialized,
    cartCount: store.cartCount,
    cartTotal: store.cartTotal,
    loadCart: store.loadCart,
    init: store.init,
    addToCart: store.addToCart,
    removeFromCart: store.removeFromCart,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
  };
};
