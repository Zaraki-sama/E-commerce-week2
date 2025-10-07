// src/stores/cart.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
  const items = ref([]);

  const cartCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0);
  });

  const cartTotal = computed(() => {
    return items.value.reduce(
      (total, item) => {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 0;
        return total + (price * quantity);
      },
      0
    );
  });

  const addToCart = (product) => {
    const existingItem = items.value.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      items.value.push({
        id: product.id,
        title: product.title,
        price: Number(product.price) || 0,
        image: product.image,
        quantity: 1,
      });
    }
  };

  const removeFromCart = (productId) => {
    const index = items.value.findIndex((item) => item.id === productId);
    if (index > -1) {
      items.value.splice(index, 1);
    }
  };

  const updateQuantity = (productId, quantity) => {
    const item = items.value.find((item) => item.id === productId);
    if (item) {
      const numQuantity = Number(quantity) || 0;
      if (numQuantity <= 0) {
        removeFromCart(productId);
      } else {
        item.quantity = numQuantity;
      }
    }
  };

  const clearCart = () => {
    items.value = [];
  };

  return {
    items,
    cartCount,
    cartTotal,
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
    cartCount: store.cartCount,
    cartTotal: store.cartTotal,
    addToCart: store.addToCart,
    removeFromCart: store.removeFromCart,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
  };
};
